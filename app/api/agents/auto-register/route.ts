import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { getAgentFlag, setAgentFlag } from "@/lib/memory";
import { reconForm, autoSubmitForm, type SubmitConfig, type SubmitOutcome, type FieldFill, type FormMap } from "@/lib/autoSubmit";

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

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
  if (!process.env.BROWSERLESS_TOKEN) return NextResponse.json({ error: "BROWSERLESS_TOKEN manquant" }, { status: 500 });

  const mode = (req.nextUrl.searchParams.get("mode") === "article" ? "article" : "directory") as "directory" | "article";
  const forceUrl = req.nextUrl.searchParams.get("url");
  const max = parseInt(req.nextUrl.searchParams.get("max") || "4");

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

  // Cibles
  let targets: { name: string; url: string }[];
  if (forceUrl) targets = [{ name: forceUrl, url: forceUrl }];
  else { try { targets = await discover(apiKey, mode); } catch (e) { return NextResponse.json({ error: `discovery: ${e instanceof Error ? e.message : e}` }, { status: 500 }); } }

  const results: Record<string, unknown>[] = [];
  let processed = 0;

  for (const t of targets) {
    if (processed >= max) break;
    const key = `autoreg:${mode}:${t.url}`.slice(0, 120);
    if (!forceUrl && (await getAgentFlag(key)) === "ok") { results.push({ name: t.name, url: t.url, status: "déjà fait (skip)" }); continue; }
    processed++;

    const form = await reconForm(t.url);
    if (!form.ok) { results.push({ name: t.name, url: t.url, status: "skip", reason: form.message, captcha: form.captcha }); continue; }

    let plan;
    try { plan = await planFill(apiKey, form, payload, rules); }
    catch (e) { results.push({ name: t.name, url: t.url, status: "erreur plan", reason: String(e) }); continue; }
    if (!plan.fields?.length || !plan.submitSelector) { results.push({ name: t.name, url: t.url, status: "plan vide", note: plan.note }); continue; }

    const config: SubmitConfig = { name: t.name, url: t.url, fields: plan.fields, submitSelector: plan.submitSelector, captcha: form.captcha };
    const out: SubmitOutcome = await autoSubmitForm(config);
    if (out.ok) await setAgentFlag(key, "ok");
    results.push({ name: t.name, url: t.url, status: out.ok ? "✅ soumis" : "❌ échec", captchaSolved: out.captchaSolved, captcha: form.captcha, message: out.message, finalUrl: out.finalUrl });
  }

  const okCount = results.filter((r) => String(r.status).startsWith("✅")).length;
  const solved = results.filter((r) => r.captchaSolved).length;

  const report = `🤖 Auto-register autonome — mode ${mode}
${mode === "article" && article ? `📝 Article : « ${article.title} » (lien → ${SITE})\n` : ""}🎯 ${targets.length} cibles découvertes · ${processed} traitées
✅ ${okCount} soumis · 🔓 ${solved} captcha(s) résolu(s)

${results.map((r) => `${r.status} — ${r.name}${r.captcha && r.captcha !== "none" ? ` [${r.captcha}${r.captchaSolved ? "✓" : ""}]` : ""}\n   ${r.message || r.reason || r.note || ""}`).join("\n")}`;

  await notify(report, "normale");
  return NextResponse.json({ mode, article: article ? { title: article.title } : undefined, discovered: targets.length, processed, ok: okCount, solved, results });
}
