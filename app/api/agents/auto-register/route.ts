import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { getAgentFlag, setAgentFlag } from "@/lib/memory";
import { reconForm, autoSubmitForm, type SubmitConfig, type SubmitOutcome, type FieldFill } from "@/lib/autoSubmit";

export const maxDuration = 300;

/* ─────────────────────────────────────────────────────────────
   AGENT auto-register — AUTONOME
   1) Claude propose les meilleurs annuaires FR à formulaire ouvert
   2) reconForm() "voit" le formulaire de chaque annuaire
   3) Claude mappe les infos HT Assurance sur les bons champs
      (AUCUN sélecteur codé en dur)
   4) autoSubmitForm() remplit + résout le captcha (CapSolver) + soumet
   5) dédup KV, notification

   GET /api/agents/auto-register            → run autonome (best effort, cap N)
   GET /api/agents/auto-register?url=...     → force un annuaire précis
   GET /api/agents/auto-register?max=3       → limite le nombre traité
───────────────────────────────────────────────────────────── */

const NAP = {
  name: "HT Assurance",
  legal: "OVB ASSURANCE",
  address: "25 rue Trachel",
  postal: "06000",
  city: "Nice",
  country: "France",
  phone: "0986113257",
  email: "talelhakimi06@gmail.com",
  website: "https://www.htassurance.fr",
  category: "Courtier en assurances",
  desc: "Courtier en assurance indépendant à Nice. Spécialiste de la contestation des refus de sinistre, optimisation de contrats, assurance emprunteur, RC pro, décennale et VTC. Particuliers et professionnels. Tél/WhatsApp 09 86 11 32 57.",
};

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

async function callClaude(apiKey: string, system: string, user: string, maxTokens = 1024): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: maxTokens, system, messages: [{ role: "user", content: user }] }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Claude ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  return data.content?.[0]?.text ?? "";
}

function parseJson<T>(text: string, fallback: T): T {
  try { return JSON.parse(text); } catch {
    const m = text.match(/[[{][\s\S]*[\]}]/);
    if (m) { try { return JSON.parse(m[0]); } catch { /* */ } }
    return fallback;
  }
}

/* 1) Découverte autonome des meilleurs annuaires */
async function discoverDirectories(apiKey: string): Promise<{ name: string; url: string }[]> {
  const text = await callClaude(
    apiKey,
    `Tu es expert SEO local français. Liste les MEILLEURS annuaires d'entreprises français où l'on peut AJOUTER une entreprise via un FORMULAIRE WEB OUVERT (idéalement sans connexion obligatoire), pertinents pour un courtier en assurance à Nice. Classe par valeur SEO/citation décroissante.
Réponds UNIQUEMENT en JSON : [{"name":"...","url":"URL de la page d'AJOUT/inscription d'entreprise"}]. Donne l'URL la plus directe possible vers le formulaire d'ajout. Max 8 entrées. Évite Google/Bing/PagesJaunes (déjà faits) et les sites 100% payants.`,
    `Donne la liste maintenant.`,
    1024
  );
  return parseJson<{ name: string; url: string }[]>(text, []);
}

/* 3) Mapping autonome des champs par Claude (pas de sélecteur en dur) */
async function planFill(apiKey: string, formMap: Awaited<ReturnType<typeof reconForm>>): Promise<{ fields: FieldFill[]; submitSelector: string; note?: string }> {
  const text = await callClaude(
    apiKey,
    `Tu remplis un formulaire d'inscription d'entreprise sur un annuaire. On te donne les CHAMPS détectés (name/id/placeholder/label/type) et les BOUTONS. Mappe les données de l'entreprise sur les bons champs.

Données entreprise :
${JSON.stringify(NAP, null, 0)}

Règles :
- Pour chaque champ pertinent, renvoie un sélecteur CSS construit à partir de l'id ("#id") sinon du name ("[name='xxx']").
- "kind": "type" (texte), "select" (menu déroulant — value = libellé d'option proche), "check" (case à cocher : conditions/CGU → value "true").
- N'invente PAS de champs. Ignore les champs non pertinents (recherche, newsletter…). Pour mot de passe éventuel, utilise "HtAssurNice!2026".
- "submitSelector" : le bouton qui SOUMET l'inscription (pas "rechercher"/"login"). Construis-le par id ("#id") ou par texte via :has-text n'est pas supporté → préfère un sélecteur input[type=submit] ou button[type=submit] si pas d'id.

Réponds UNIQUEMENT en JSON : {"fields":[{"selector":"...","value":"...","kind":"type"}],"submitSelector":"...","note":"court"}`,
    `CHAMPS:\n${JSON.stringify(formMap.fields)}\n\nBOUTONS:\n${JSON.stringify(formMap.submits)}`,
    1500
  );
  return parseJson(text, { fields: [], submitSelector: "", note: "parse fail" });
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
  if (!process.env.BROWSERLESS_TOKEN) return NextResponse.json({ error: "BROWSERLESS_TOKEN manquant" }, { status: 500 });

  const forceUrl = req.nextUrl.searchParams.get("url");
  const max = parseInt(req.nextUrl.searchParams.get("max") || "4");

  // 1) Cibles : forcée, ou découverte autonome
  let targets: { name: string; url: string }[];
  if (forceUrl) {
    targets = [{ name: forceUrl, url: forceUrl }];
  } else {
    try { targets = await discoverDirectories(apiKey); }
    catch (e) { return NextResponse.json({ error: `discovery: ${e instanceof Error ? e.message : e}` }, { status: 500 }); }
  }

  const results: Record<string, unknown>[] = [];
  let processed = 0;

  for (const t of targets) {
    if (processed >= max) break;
    const key = `autoreg:${t.url}`.slice(0, 120);
    if (!forceUrl && (await getAgentFlag(key)) === "ok") {
      results.push({ name: t.name, url: t.url, status: "déjà fait (skip)" });
      continue;
    }
    processed++;

    // 2) recon
    const form = await reconForm(t.url);
    if (!form.ok) {
      results.push({ name: t.name, url: t.url, status: "skip", reason: form.message, captcha: form.captcha });
      continue;
    }

    // 3) mapping autonome
    let plan;
    try { plan = await planFill(apiKey, form); }
    catch (e) { results.push({ name: t.name, url: t.url, status: "erreur plan", reason: String(e) }); continue; }
    if (!plan.fields?.length || !plan.submitSelector) {
      results.push({ name: t.name, url: t.url, status: "plan vide", note: plan.note });
      continue;
    }

    // 4) remplir + captcha + soumettre
    const config: SubmitConfig = {
      name: t.name,
      url: t.url,
      fields: plan.fields,
      submitSelector: plan.submitSelector,
      captcha: form.captcha,
    };
    const out: SubmitOutcome = await autoSubmitForm(config);
    if (out.ok) await setAgentFlag(key, "ok");
    results.push({ name: t.name, url: t.url, status: out.ok ? "✅ soumis" : "❌ échec", captchaSolved: out.captchaSolved, captcha: form.captcha, message: out.message, finalUrl: out.finalUrl });
  }

  const okCount = results.filter((r) => String(r.status).startsWith("✅")).length;
  const solved = results.filter((r) => r.captchaSolved).length;

  const report = `🤖 Auto-register autonome
🎯 ${targets.length} annuaires découverts · ${processed} traités
✅ ${okCount} soumis · 🔓 ${solved} captcha(s) résolu(s)

${results.map((r) => `${r.status} — ${r.name}${r.captcha && r.captcha !== "none" ? ` [${r.captcha}${r.captchaSolved ? "✓" : ""}]` : ""}\n   ${r.message || r.reason || r.note || ""}`).join("\n")}`;

  await notify(report, "normale");
  return NextResponse.json({ discovered: targets.length, processed, ok: okCount, solved, results });
}
