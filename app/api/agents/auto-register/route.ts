import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { getAgentFlag, setAgentFlag } from "@/lib/memory";
import { reconForm, autoSubmitForm, type SubmitConfig, type SubmitOutcome, type FieldFill, type FormMap } from "@/lib/autoSubmit";
import { scanAndActivate } from "@/lib/emailActivate";

export const maxDuration = 300;

/* ─────────────────────────────────────────────────────────────
   AGENT auto-register — AUTONOME (2 modes)

   mode=directory (défaut) : Claude découvre les meilleurs annuaires FR,
     lit chaque formulaire, mappe les infos HT Assurance, résout le
     captcha et soumet.
   mode=article : Claude rédige un article unique optimisé mots-clés AVEC
     un lien retour vers htassurance.fr, découvre des plateformes
     acceptant la publication ouverte, et le poste (form + captcha).

   AUCUN sélecteur codé en dur : Claude mappe à chaque fois.

   GET ?mode=article            → publie un article + backlink
   GET ?url=...                 → force une cible
   GET ?max=3                   → limite le nombre traité
───────────────────────────────────────────────────────────── */

const SITE = "https://www.htassurance.fr";
const NAP = {
  name: "HT Assurance",
  legal: "OVB ASSURANCE",
  address: "25 rue Trachel",
  postal: "06000",
  city: "Nice",
  country: "France",
  phone: "0986113257",
  email: "talelhakimi06@gmail.com",
  website: SITE,
  category: "Courtier en assurances",
  desc: "Courtier en assurance indépendant à Nice. Spécialiste de la contestation des refus de sinistre, optimisation de contrats, assurance emprunteur, RC pro, décennale et VTC. Particuliers et professionnels. Tél/WhatsApp 09 86 11 32 57.",
};

/* Liste blanche d'annuaires à inscription ouverte (URLs réelles, pas
   d'hallucination). Beaucoup sont en reCAPTCHA → l'agent les gère.
   Certains seront gated (login/Cloudflare) → recon les skip vite.
   L'agent avance dans la liste run après run (dédup KV). */
const WHITELIST: { name: string; url: string }[] = [
  { name: "Tupalo", url: "https://tupalo.com/fr/users/sign_up" },
  { name: "Brownbook", url: "https://www.brownbook.net/account/signup/" },
  { name: "CallUpContact", url: "https://www.callupcontact.com/Business_Time_Registration" },
  { name: "2FindLocal", url: "https://www.2findlocal.com/add-business" },
  { name: "Fyple", url: "https://www.fyple.fr/add-business/" },
  { name: "EnrollBusiness", url: "https://www.enrollbusiness.com/Login/SignUp" },
  { name: "iGlobal", url: "https://www.iglobal.co/sign-up" },
  { name: "Cybo", url: "https://www.cybo.com/add-business/" },
  { name: "ExpressBusinessDirectory", url: "https://www.expressbusinessdirectory.com/AddCompany" },
  { name: "FindUsHere", url: "https://www.find-us-here.com/signup.aspx" },
  { name: "Hotfrog FR", url: "https://www.hotfrog.fr/ajouter-une-entreprise" },
  { name: "Yalwa FR", url: "https://www.yalwa.fr/services/ajouter-une-entreprise.html" },
  { name: "Opendi FR", url: "https://www.opendi.fr/addbiz/" },
  { name: "Misterwhat FR", url: "https://www.misterwhat.fr/company/add" },
  { name: "Nicelocal FR", url: "https://nicelocal.fr/add-company" },
  { name: "Where-To FR", url: "https://www.where-to.fr/" },
  { name: "Bizzduniya", url: "https://www.bizzduniya.com/register" },
  { name: "AdsCT", url: "https://www.adsct.com/" },
  { name: "Lacartes", url: "https://www.lacartes.com/business/add" },
  { name: "Pingmybiz", url: "https://www.pingmybiz.com/" },
  { name: "Wand (hub.biz)", url: "https://hub.biz/add" },
  { name: "Cataloxy FR", url: "https://www.cataloxy.fr/add_firm.htm" },
  { name: "Infoisinfo FR", url: "https://www.infoisinfo.fr/new/company" },
  { name: "TodoFr (Tuugo)", url: "https://www.tuugo.fr/AddYourBusiness" },
  { name: "GoMyLocal", url: "https://www.gomylocal.com/business/listing/" },
  { name: "ShowMeLocal", url: "https://www.showmelocal.com/addbusiness.aspx" },
  { name: "Bizidex", url: "https://www.bizidex.com/en/register" },
  { name: "AdLocal", url: "https://adlocalpages.com/" },
];

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

/* Découverte autonome (annuaires OU plateformes d'articles) */
async function discover(apiKey: string, mode: "directory" | "article"): Promise<{ name: string; url: string }[]> {
  const system = mode === "directory"
    ? `Tu es expert SEO local français. Liste les MEILLEURS annuaires d'entreprises français où l'on AJOUTE une entreprise via un FORMULAIRE WEB OUVERT (idéalement sans connexion obligatoire), pertinents pour un courtier en assurance à Nice, classés par valeur SEO décroissante.
Réponds UNIQUEMENT en JSON : [{"name":"...","url":"URL directe de la page d'ajout d'entreprise"}]. Max 8. Évite Google/Bing/PagesJaunes (déjà faits) et le 100% payant.`
    : `Tu es expert netlinking français. Liste des plateformes où l'on peut PUBLIER un article/communiqué via un FORMULAIRE OUVERT et où un LIEN dofollow/contextuel vers un site externe est autorisé (sites d'articles, communiqués de presse gratuits, blogs ouverts). Évite les fermes de spam de très basse qualité.
Réponds UNIQUEMENT en JSON : [{"name":"...","url":"URL de la page de soumission d'article"}]. Max 6.`;
  return parseJson<{ name: string; url: string }[]>(await callClaude(apiKey, system, "Donne la liste maintenant.", 1024), []);
}

/* Rédaction autonome d'un article unique + backlink */
async function writeArticle(apiKey: string): Promise<{ title: string; body: string; summary: string; tags: string; anchor: string }> {
  const topics = ["refus de sinistre dégât des eaux", "contre-expertise assurance", "assurance emprunteur : changer pour économiser", "RC pro et décennale pour artisans", "sinistre incendie : recours", "catastrophe naturelle et fissures"];
  // varier selon l'heure (pas de Math.random dispo côté edge cron, on prend l'heure)
  const topic = topics[new Date().getUTCHours() % topics.length];
  const text = await callClaude(
    apiKey,
    `Tu es Talel, courtier expert en assurance à Nice (HT Assurance). Rédige un article de blog ORIGINAL et utile (600-800 mots) sur : "${topic}".
Contraintes :
- Français, ton expert et concret, conseils actionnables, 1 exemple, 1 article du Code des assurances si pertinent.
- Intègre UNE SEULE fois un lien contextuel naturel vers ${SITE} (ou ${SITE}/sinistres) avec une ancre descriptive (pas "cliquez ici").
- Mots-clés naturels (refus de sinistre, courtier assurance Nice, expertise…).
Réponds UNIQUEMENT en JSON :
{"title":"titre 50-70 car.","body":"corps en texte avec le lien sous forme 'ancre (${SITE}/...)' OU balise <a href> si HTML accepté — texte simple par défaut","summary":"meta 140-155 car.","tags":"5 mots-clés séparés par virgule","anchor":"l'ancre du lien"}`,
    `Rédige l'article maintenant.`,
    2500
  );
  return parseJson(text, { title: "", body: "", summary: "", tags: "", anchor: "" });
}

/* Mapping autonome des champs (annuaire ou article) — zéro sélecteur en dur */
async function planFill(apiKey: string, form: FormMap, payload: object, rules: string): Promise<{ fields: FieldFill[]; submitSelector: string; note?: string }> {
  const text = await callClaude(
    apiKey,
    `Tu remplis un formulaire web. On te donne les CHAMPS détectés (name/id/placeholder/label/type) et les BOUTONS. Mappe les DONNÉES sur les bons champs.

DONNÉES :
${JSON.stringify(payload)}

Règles :
- Sélecteur CSS via id ("#id") sinon name ("[name='xxx']").
- "kind": "type" (texte/zone de texte), "select" (value = libellé d'option proche), "check" (CGU/conditions → "true").
- ${rules}
- N'invente pas de champs ; ignore recherche/newsletter. Mot de passe éventuel : "HtAssurNice!2026".
- "submitSelector" : le bouton qui SOUMET (pas rechercher/login). id ("#id") sinon button[type=submit]/input[type=submit].
Réponds UNIQUEMENT en JSON : {"fields":[{"selector":"...","value":"...","kind":"type"}],"submitSelector":"...","note":"court"}`,
    `CHAMPS:\n${JSON.stringify(form.fields)}\n\nBOUTONS:\n${JSON.stringify(form.submits)}`,
    1500
  );
  return parseJson(text, { fields: [], submitSelector: "", note: "parse fail" });
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Mode activation : scanne Gmail et ouvre les liens d'activation des inscriptions
  if (req.nextUrl.searchParams.get("mode") === "activate") {
    const rep = await scanAndActivate();
    const okN = rep.activated.filter((a) => a.status >= 200 && a.status < 400).length;
    await notify(
      `📧 Activation emails — ${rep.scanned} mail(s) scanné(s) · ${okN} lien(s) activé(s)\n` +
      (rep.activated.map((a) => `${a.status >= 200 && a.status < 400 ? "✅" : "⚠️"} ${a.subject.slice(0, 40)} → ${a.url.slice(0, 55)}`).join("\n") || (rep.note ?? "(rien à activer)")),
      "normale"
    );
    return NextResponse.json(rep);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
  if (!process.env.BROWSERLESS_TOKEN) return NextResponse.json({ error: "BROWSERLESS_TOKEN manquant" }, { status: 500 });

  const mode = (req.nextUrl.searchParams.get("mode") === "article" ? "article" : "directory") as "directory" | "article";
  const forceUrl = req.nextUrl.searchParams.get("url");
  const max = parseInt(req.nextUrl.searchParams.get("max") || "30");
  const retry = req.nextUrl.searchParams.get("retry") === "1";
  const startTime = Date.now();
  const TIME_BUDGET_MS = 165000; // marge pour qu'une dernière itération lente (~115s) reste sous maxDuration 300s

  // Données à injecter selon le mode
  let payload: object = NAP;
  let rules = "Mappe nom, adresse, code postal, ville, téléphone, email, site web, catégorie, description sur les champs correspondants.";
  let article: Awaited<ReturnType<typeof writeArticle>> | null = null;

  if (mode === "article") {
    try { article = await writeArticle(apiKey); } catch (e) { return NextResponse.json({ error: `article: ${e instanceof Error ? e.message : e}` }, { status: 500 }); }
    if (!article.title || !article.body) return NextResponse.json({ error: "article vide" }, { status: 500 });
    payload = { title: article.title, content: article.body, summary: article.summary, tags: article.tags, authorName: "Talel Hakimi", email: NAP.email, website: SITE, companyName: NAP.name };
    rules = "Mappe le TITRE sur le champ titre/sujet, le CONTENU (long) sur la zone de texte principale (textarea), le résumé/extrait si présent, l'auteur, l'email, le site web. Le contenu contient déjà le lien vers le site.";
  }

  // Cibles : forcée, sinon (annuaire) liste blanche + découverte Claude dédupées, (article) découverte
  let targets: { name: string; url: string }[];
  if (forceUrl) {
    targets = [{ name: forceUrl, url: forceUrl }];
  } else {
    let discovered: { name: string; url: string }[] = [];
    try { discovered = await discover(apiKey, mode); } catch { /* la liste blanche suffit */ }
    const base = mode === "directory" ? [...WHITELIST, ...discovered] : discovered;
    const seen = new Set<string>();
    targets = base.filter((t) => t.url && !seen.has(t.url) && (seen.add(t.url), true));
  }

  const results: Record<string, unknown>[] = [];
  let processed = 0;
  let stoppedForTime = false;

  for (const t of targets) {
    if (processed >= max) break;
    if (Date.now() - startTime > TIME_BUDGET_MS) { stoppedForTime = true; break; }

    const key = `autoreg:${mode}:${t.url}`.slice(0, 120);
    if (!forceUrl) {
      const flag = await getAgentFlag(key);
      if (flag === "ok") { continue; }            // déjà inscrit → silencieux
      if (flag === "skip" && !retry) { continue; } // déjà jugé inexploitable → on avance
    }
    processed++;

    const form = await reconForm(t.url);
    if (!form.ok) {
      await setAgentFlag(key, "skip"); // ne pas re-tenter à chaque run (sauf ?retry=1)
      results.push({ name: t.name, url: t.url, status: "skip", reason: form.message, captcha: form.captcha });
      continue;
    }

    let plan;
    try { plan = await planFill(apiKey, form, payload, rules); }
    catch (e) { results.push({ name: t.name, url: t.url, status: "erreur plan", reason: String(e) }); continue; }
    if (!plan.fields?.length || !plan.submitSelector) {
      await setAgentFlag(key, "skip");
      results.push({ name: t.name, url: t.url, status: "plan vide", note: plan.note });
      continue;
    }

    const config: SubmitConfig = { name: t.name, url: t.url, fields: plan.fields, submitSelector: plan.submitSelector, captcha: form.captcha };
    const out: SubmitOutcome = await autoSubmitForm(config);
    await setAgentFlag(key, out.ok ? "ok" : "skip");
    results.push({ name: t.name, url: t.url, status: out.ok ? "✅ soumis" : "❌ échec", captchaSolved: out.captchaSolved, captcha: form.captcha, message: out.message, finalUrl: out.finalUrl });
  }

  // Activation automatique des emails de confirmation reçus pendant le run
  let activation: Awaited<ReturnType<typeof scanAndActivate>> | null = null;
  if (mode === "directory" && !forceUrl) {
    try { activation = await scanAndActivate(); } catch { /* best effort */ }
  }

  const okCount = results.filter((r) => String(r.status).startsWith("✅")).length;
  const solved = results.filter((r) => r.captchaSolved).length;
  const activatedN = activation ? activation.activated.filter((a) => a.status >= 200 && a.status < 400).length : 0;

  const report = `🤖 Auto-register autonome — mode ${mode}
${mode === "article" && article ? `📝 Article : « ${article.title} » (lien → ${SITE})\n` : ""}🎯 ${targets.length} cibles · ${processed} traitées${stoppedForTime ? " (arrêt budget temps — reprise au prochain run)" : ""}
✅ ${okCount} soumis · 🔓 ${solved} captcha(s) résolu(s)${activation ? ` · 📧 ${activatedN} email(s) activé(s)` : ""}

${results.map((r) => `${r.status} — ${r.name}${r.captcha && r.captcha !== "none" ? ` [${r.captcha}${r.captchaSolved ? "✓" : ""}]` : ""}\n   ${r.message || r.reason || r.note || ""}`).join("\n")}`;

  await notify(report, "normale");
  return NextResponse.json({ mode, article: article ? { title: article.title } : undefined, discovered: targets.length, processed, ok: okCount, solved, activated: activatedN, activation: activation?.activated, results });
}
