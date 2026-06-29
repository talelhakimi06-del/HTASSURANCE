/* ─────────────────────────────────────────────────────────────
   autoSubmit — Remplissage + soumission automatique de formulaires
   d'annuaires, avec résolution de captcha (reCAPTCHA v2 / hCaptcha
   / Turnstile) via CapSolver.

   Pilote un vrai Chrome headless via l'API Browserless /function :
   tout le parcours (goto → fill → solve captcha → submit) tourne
   DANS le navigateur distant, en une seule requête. La résolution
   du captcha est faite par CapSolver, appelé depuis le script
   Browserless lui-même (il a accès à fetch).

   NB : chaque annuaire a un formulaire différent → on passe une
   « config » avec les sélecteurs CSS. Sites protégés différemment
   (parcours multi-étapes, e-mail à confirmer) peuvent échouer :
   le résultat le dit explicitement.
───────────────────────────────────────────────────────────── */

export type FieldFill = {
  selector: string;
  value: string;
  /** "type" (défaut) tape le texte ; "select" choisit une option ; "check" coche */
  kind?: "type" | "select" | "check";
};

export type CaptchaKind = "recaptcha_v2" | "hcaptcha" | "turnstile" | "none";

export type SubmitConfig = {
  /** Nom lisible de l'annuaire (logs) */
  name: string;
  /** URL du formulaire d'inscription */
  url: string;
  /** Champs à remplir (sélecteurs CSS) */
  fields: FieldFill[];
  /** Sélecteur du bouton de soumission */
  submitSelector: string;
  /** Type de captcha attendu (auto-détecté si omis) */
  captcha?: CaptchaKind;
  /** Texte attendu dans la page après succès (heuristique) */
  successText?: string;
};

export type SubmitOutcome = {
  name: string;
  ok: boolean;
  finalUrl: string;
  captchaSolved: boolean;
  message: string;
};

const BROWSERLESS_FUNCTION_URL = "https://chrome.browserless.io/function";

/* Script exécuté DANS le Chrome distant (Browserless /function).
   Reçoit `context` = { config, capsolverKey }. Tout doit être inline. */
const REMOTE_FN = `
export default async function ({ page, context }) {
  const { config, capsolverKey } = context;
  const out = { name: config.name, ok: false, finalUrl: "", captchaSolved: false, message: "" };

  try {
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(config.url, { waitUntil: "networkidle2", timeout: 45000 });

    // 1) Remplissage des champs
    for (const f of config.fields) {
      try {
        await page.waitForSelector(f.selector, { timeout: 8000 });
        if (f.kind === "select") {
          await page.select(f.selector, f.value);
        } else if (f.kind === "check") {
          await page.evaluate((s) => { const el = document.querySelector(s); if (el && !el.checked) el.click(); }, f.selector);
        } else {
          await page.click(f.selector, { clickCount: 3 }).catch(() => {});
          await page.type(f.selector, f.value, { delay: 25 });
        }
      } catch (e) {
        out.message += "champ KO: " + f.selector + " | ";
      }
    }

    // 2) Détection du captcha + sitekey
    const detected = await page.evaluate(() => {
      const rc = document.querySelector(".g-recaptcha[data-sitekey], [data-sitekey].g-recaptcha, div.g-recaptcha");
      if (rc && rc.getAttribute("data-sitekey")) return { kind: "recaptcha_v2", key: rc.getAttribute("data-sitekey") };
      const hc = document.querySelector(".h-captcha[data-sitekey], [data-hcaptcha-sitekey]");
      if (hc) return { kind: "hcaptcha", key: hc.getAttribute("data-sitekey") || hc.getAttribute("data-hcaptcha-sitekey") };
      const ts = document.querySelector(".cf-turnstile[data-sitekey]");
      if (ts) return { kind: "turnstile", key: ts.getAttribute("data-sitekey") };
      // iframe fallback
      const f = [...document.querySelectorAll("iframe")].map(i => i.src).find(s => /recaptcha|hcaptcha|turnstile/.test(s||""));
      if (f) {
        const m = (f.match(/[?&]k=([^&]+)/) || f.match(/sitekey=([^&]+)/));
        if (/hcaptcha/.test(f)) return { kind: "hcaptcha", key: m ? decodeURIComponent(m[1]) : null };
        if (/turnstile/.test(f)) return { kind: "turnstile", key: m ? decodeURIComponent(m[1]) : null };
        return { kind: "recaptcha_v2", key: m ? decodeURIComponent(m[1]) : null };
      }
      return { kind: "none", key: null };
    });

    // 3) Résolution captcha via CapSolver (si présent + clé dispo)
    if (detected.kind !== "none" && detected.key && capsolverKey) {
      const typeMap = {
        recaptcha_v2: "ReCaptchaV2TaskProxyLess",
        hcaptcha: "HCaptchaTaskProxyLess",
        turnstile: "AntiTurnstileTaskProxyLess",
      };
      const task = { type: typeMap[detected.kind], websiteURL: config.url, websiteKey: detected.key };
      const created = await fetch("https://api.capsolver.com/createTask", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientKey: capsolverKey, task }),
      }).then(r => r.json()).catch(() => null);

      if (created && created.taskId) {
        let token = null;
        for (let i = 0; i < 40; i++) {
          await new Promise(r => setTimeout(r, 3000));
          const res = await fetch("https://api.capsolver.com/getTaskResult", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ clientKey: capsolverKey, taskId: created.taskId }),
          }).then(r => r.json()).catch(() => null);
          if (res && res.status === "ready") {
            token = (res.solution && (res.solution.gRecaptchaResponse || res.solution.token)) || null;
            break;
          }
          if (res && res.errorId && res.errorId !== 0) { out.message += "capsolver: " + (res.errorDescription||"err") + " | "; break; }
        }

        if (token) {
          await page.evaluate((tok) => {
            // reCAPTCHA / hCaptcha : remplir les textarea de réponse
            const ids = ["g-recaptcha-response", "h-captcha-response", "cf-turnstile-response"];
            for (const id of ids) {
              let t = document.getElementById(id);
              if (!t) {
                document.querySelectorAll('textarea[name="'+id+'"]').forEach(e => t = e);
              }
              if (t) { t.value = tok; t.innerHTML = tok; }
            }
            // certains forms ont un champ caché g-recaptcha-response[i]
            document.querySelectorAll('textarea[id^="g-recaptcha-response"], textarea[name="h-captcha-response"], input[name="cf-turnstile-response"]').forEach(e => { e.value = tok; });
          }, token);
          out.captchaSolved = true;
        } else {
          out.message += "captcha non résolu | ";
        }
      }
    }

    // 4) Soumission
    const before = page.url();
    await Promise.all([
      page.click(config.submitSelector).catch(() => {}),
      page.waitForNavigation({ waitUntil: "networkidle2", timeout: 20000 }).catch(() => {}),
    ]);
    await new Promise(r => setTimeout(r, 1500));
    out.finalUrl = page.url();

    // 5) Heuristique de succès
    const bodyText = await page.evaluate(() => document.body ? document.body.innerText.slice(0, 4000) : "");
    const navigated = out.finalUrl !== before;
    const hasSuccess = config.successText ? bodyText.toLowerCase().includes(config.successText.toLowerCase()) : false;
    const looksError = /(erreur|error|invalid|incorrect|captcha)/i.test(bodyText) && !hasSuccess;
    out.ok = hasSuccess || (navigated && !looksError);
    out.message += out.ok ? "soumis" : (looksError ? "page d'erreur détectée" : "pas de confirmation claire");

  } catch (e) {
    out.message += "exception: " + (e && e.message ? e.message : String(e));
  }

  return { data: out, type: "application/json" };
};
`;

export async function autoSubmitForm(config: SubmitConfig): Promise<SubmitOutcome> {
  const token = process.env.BROWSERLESS_TOKEN;
  const capsolverKey = process.env.CAPSOLVER_API_KEY ?? process.env.CAPSOLVER ?? null;

  if (!token) {
    return { name: config.name, ok: false, finalUrl: "", captchaSolved: false, message: "BROWSERLESS_TOKEN manquant" };
  }

  try {
    const res = await fetch(`${BROWSERLESS_FUNCTION_URL}?token=${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: REMOTE_FN,
        context: { config, capsolverKey },
      }),
      signal: AbortSignal.timeout(170000),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      return { name: config.name, ok: false, finalUrl: "", captchaSolved: false, message: `Browserless HTTP ${res.status}: ${txt.slice(0, 200)}` };
    }

    const data = await res.json();
    // Browserless renvoie directement l'objet `data` retourné par la fonction
    const o = (data && data.name) ? data : (data?.data ?? data);
    return {
      name: o.name ?? config.name,
      ok: !!o.ok,
      finalUrl: o.finalUrl ?? "",
      captchaSolved: !!o.captchaSolved,
      message: o.message ?? "réponse vide",
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { name: config.name, ok: false, finalUrl: "", captchaSolved: false, message: `exception: ${msg}` };
  }
}
