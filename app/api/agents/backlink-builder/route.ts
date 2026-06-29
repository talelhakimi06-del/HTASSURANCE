import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { setAgentFlag, getAgentFlag } from "@/lib/memory";
import { solveTurnstile, isCapsolverEnabled } from "@/lib/capsolver";

export const maxDuration = 300;

/* ─────────────────────────────────────────────────────────────
   BACKLINK BUILDER — Soumission automatisée
   Tourne via cron 1x/jour (Hobby) ou manuellement via ?tier=all
───────────────────────────────────────────────────────────── */

const SITE_URL = "https://www.htassurance.fr";
const SITE_NAME = "HT Assurance";
const SITE_DESC = "Courtier indépendant à Nice. Expert sinistres refusés, assurance décennale, VTC, RC Pro. Audit gratuit.";
const INDEXNOW_KEY = "htassurance2026indexnow";

/* NAP (Name/Address/Phone) — à coller À L'IDENTIQUE sur chaque annuaire
   (la cohérence NAP est LE facteur clé du référencement local) */
const NAP = `${SITE_NAME}
25 rue Trachel, 06000 Nice
09 86 11 32 57
${SITE_URL}
${SITE_DESC}`;

const ALL_URLS = [
  `${SITE_URL}`,
  `${SITE_URL}/sinistres`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/gpt-comparateur`,
  `${SITE_URL}/comparateur`,
  `${SITE_URL}/blog/assurance-refuse-sinistre-que-faire`,
  `${SITE_URL}/blog/motifs-refus-assurance-habitation`,
  `${SITE_URL}/blog/degat-des-eaux-assurance-refuse`,
  `${SITE_URL}/blog/contre-expertise-assurance-comment-faire`,
  `${SITE_URL}/blog/mediateur-assurance-saisine-guide`,
  `${SITE_URL}/blog/lettre-mise-en-demeure-assureur-modele`,
  `${SITE_URL}/blog/sinistre-auto-refuse-assurance-recours`,
  `${SITE_URL}/blog/fissures-secheresse-assurance-catastrophe-naturelle`,
  `${SITE_URL}/blog/assurance-refuse-vol-cambriolage`,
  `${SITE_URL}/blog/indemnisation-insuffisante-assurance-contester`,
  `${SITE_URL}/blog/assurance-decennale-auto-entrepreneur`,
  `${SITE_URL}/blog/assurance-vtc-obligatoire`,
  `${SITE_URL}/blog/rc-pro-freelance`,
  `${SITE_URL}/blog/changer-assurance-emprunteur`,
  `${SITE_URL}/blog/degat-des-eaux-assurance-que-faire`,
];

type SubmitResult = {
  site: string;
  status: "ok" | "error" | "manual" | "already_done";
  message: string;
  tier: number;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

/* ── Browserless: vrai Chrome headless pour contourner Cloudflare ── */
const BROWSERLESS_URL = "https://chrome.browserless.io/content";

async function browserFetch(url: string): Promise<{ ok: boolean; status: number; html: string }> {
  const token = process.env.BROWSERLESS_TOKEN;

  if (token) {
    // Browserless Chrome headless — token in URL (v2 API)
    try {
      const res = await fetch(`${BROWSERLESS_URL}?token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
        signal: AbortSignal.timeout(15000),
      });
      const html = await res.text();
      const isCloudflare = html.includes("challenge-platform") || html.includes("Just a moment");
      const hasContent = html.length > 500 && !isCloudflare;

      // If Cloudflare detected + Capsolver available → solve Turnstile
      if (isCloudflare && isCapsolverEnabled()) {
        const turnstileMatch = html.match(/sitekey['":\s]+['"]([a-zA-Z0-9_-]+)['"]/);
        if (turnstileMatch) {
          console.log(`[BACKLINK] Solving Turnstile for ${url}...`);
          const solved = await solveTurnstile(url, turnstileMatch[1]);
          if (solved.success) {
            // Retry with solved token via Browserless
            const retryRes = await fetch(`${BROWSERLESS_URL}?token=${token}`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                url,
                cookies: [{ name: "cf_clearance", value: solved.solution ?? "", domain: new URL(url).hostname }],
              }),
              signal: AbortSignal.timeout(15000),
            });
            const retryHtml = await retryRes.text();
            const retryOk = retryHtml.length > 500 && !retryHtml.includes("challenge-platform");
            if (retryOk) {
              return { ok: true, status: 200, html: retryHtml.slice(0, 3000) };
            }
          }
        }
      }

      return { ok: hasContent, status: hasContent ? 200 : isCloudflare ? 403 : 0, html: html.slice(0, 3000) };
    } catch {
      // Fallback to direct fetch if Browserless fails
    }
  }

  // Direct fetch fallback
  try {
    const res = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
    });
    const html = await res.text().catch(() => "");
    const isCloudflare = html.includes("challenge-platform") || html.includes("Just a moment");
    return { ok: (res.ok || res.status === 301 || res.status === 302) && !isCloudflare, status: res.status, html: html.slice(0, 3000) };
  } catch {
    return { ok: false, status: 0, html: "" };
  }
}

/* ── Detect if site has our link ── */
function hasBacklink(html: string): boolean {
  return html.includes("htassurance.fr") || html.includes("ht-assurance") || html.includes("HT Assurance");
}

/* ── KV status tracking ── */
async function getSiteStatus(siteKey: string): Promise<string | null> {
  return getAgentFlag(`backlink:${siteKey}`);
}

async function setSiteStatus(siteKey: string, status: string) {
  await setAgentFlag(`backlink:${siteKey}`, status);
}

/* ─────────────────────────────────────────────────────────────
   TIER 1 — Search engines & indexing APIs (automatisable)
───────────────────────────────────────────────────────────── */
async function submitTier1(): Promise<SubmitResult[]> {
  const results: SubmitResult[] = [];

  // 1. IndexNow (Bing, Yandex, DuckDuckGo, Naver, Seznam)
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "www.htassurance.fr",
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: ALL_URLS,
      }),
    });
    results.push({ site: "IndexNow (Bing/Yandex/DuckDuckGo)", status: res.status < 300 ? "ok" : "error", message: `HTTP ${res.status} — ${ALL_URLS.length} URLs soumises`, tier: 1 });
  } catch (e) { results.push({ site: "IndexNow", status: "error", message: String(e), tier: 1 }); }

  // 2. Bing individual URL submit
  for (const url of ALL_URLS.slice(0, 5)) {
    try {
      const res = await fetch(`https://www.bing.com/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`, { signal: AbortSignal.timeout(5000) });
      results.push({ site: `Bing IndexNow: ${url.split("/").pop()}`, status: res.status === 200 ? "ok" : "error", message: `HTTP ${res.status}`, tier: 1 });
    } catch { results.push({ site: `Bing: ${url.split("/").pop()}`, status: "error", message: "timeout", tier: 1 }); }
  }

  // 3. Google Sitemap ping
  try {
    await fetch(`https://www.google.com/ping?sitemap=${SITE_URL}/sitemap.xml`, { signal: AbortSignal.timeout(5000) });
    results.push({ site: "Google Sitemap Ping", status: "ok", message: "Ping envoyé", tier: 1 });
  } catch { results.push({ site: "Google Sitemap Ping", status: "error", message: "deprecated endpoint", tier: 1 }); }

  // 4. Yandex Webmaster ping
  try {
    const res = await fetch(`https://webmaster.yandex.com/ping?sitemap=${SITE_URL}/sitemap.xml`, { signal: AbortSignal.timeout(5000) });
    results.push({ site: "Yandex Webmaster Ping", status: res.ok ? "ok" : "error", message: `HTTP ${res.status}`, tier: 1 });
  } catch { results.push({ site: "Yandex Ping", status: "error", message: "timeout", tier: 1 }); }

  return results;
}

/* ─────────────────────────────────────────────────────────────
   TIER 2 — Annuaires avec soumission automatisable
───────────────────────────────────────────────────────────── */
async function submitTier2(): Promise<SubmitResult[]> {
  const results: SubmitResult[] = [];

  const autoCheckSites = [
    { name: "Pages Jaunes (Solocal)", url: "https://www.pagesjaunes.fr/pros/821376498", key: "pagesjaunes" },
    { name: "Hoodspot (La Poste)", url: "https://hoodspot.fr/courtier-en-assurance/ht-assurance-06000", key: "hoodspot" },
    { name: "Verif.com", url: "https://www.verif.com/societe/OVB-ASSURANCE-SAS-821376498/", key: "verif" },
    { name: "Societe.com", url: "https://www.societe.com/societe/ovb-assurance-sas-821376498.html", key: "societe" },
    { name: "Pappers.fr", url: "https://www.pappers.fr/entreprise/ovb-assurance-sas-821376498", key: "pappers" },
    { name: "Infogreffe", url: "https://www.infogreffe.fr/entreprise/ovb-assurance-sas/821376498", key: "infogreffe" },
  ];

  const batches = chunkArray(autoCheckSites, 3);
  for (const batch of batches) {
    const batchResults = await Promise.all(
      batch.map(async (site) => {
        const existing = await getSiteStatus(site.key);
        if (existing === "verified") return { site: site.name, status: "already_done" as const, message: "Déjà vérifié", tier: 2 };

        const res = await browserFetch(site.url);
        if (res.ok) {
          const linked = hasBacklink(res.html);
          await setSiteStatus(site.key, linked ? "verified" : "found_no_link");
          return {
            site: site.name,
            status: "ok" as const,
            message: linked
              ? `Fiche existante AVEC backlink htassurance.fr`
              : `Fiche existante (${res.status}) — backlink non détecté, ajouter URL manuellement`,
            tier: 2,
          };
        }
        return { site: site.name, status: "manual" as const, message: `${res.status || "bloqué"} — Browserless: inscription manuelle requise`, tier: 2 };
      })
    );
    results.push(...batchResults);
    await sleep(rand(1000, 2000));
  }

  return results;
}

/* ─────────────────────────────────────────────────────────────
   TIER 3 — Annuaires sectoriels assurance
───────────────────────────────────────────────────────────── */
async function submitTier3(): Promise<SubmitResult[]> {
  const results: SubmitResult[] = [];

  const sites = [
    { name: "ORIAS (registre officiel)", url: "https://www.orias.fr/welcome", key: "orias" },
    { name: "JeChercheUnAssureur", url: "https://www.jechercheunassureur.com", key: "jechercheunassureur" },
    { name: "LeComparateurAssurance", url: "https://www.lecomparateurassurance.com/annuaire-assurance/assurance-nice-06000", key: "lecomparateurassurance" },
    { name: "Mon-Presta (FNAE)", url: "https://mon-presta.fr/annuaire/activites/courtier-en-assurances", key: "monpresta" },
    { name: "Annuaire SG", url: "https://www.annuaire-sg.fr/annuaire/activites/courtier-assurances", key: "annuairesg" },
    { name: "AnnuaireAssurances.fr", url: "http://annuaireassurances.fr/", key: "annuaireassurances" },
  ];

  const batches = chunkArray(sites, 3);
  for (const batch of batches) {
    const batchResults = await Promise.all(
      batch.map(async (site) => {
        const existing = await getSiteStatus(site.key);
        if (existing === "verified") return { site: site.name, status: "already_done" as const, message: "Déjà traité", tier: 3 };

        const res = await browserFetch(site.url);
        await setSiteStatus(site.key, res.ok ? "checked" : "error");
        if (res.ok && hasBacklink(res.html)) {
          await setSiteStatus(site.key, "verified");
          return { site: site.name, status: "ok" as const, message: `Backlink htassurance.fr détecté !`, tier: 3 };
        }
        return res.ok
          ? { site: site.name, status: "manual" as const, message: `Accessible (${res.status}) — inscription manuelle : ${site.url}`, tier: 3 }
          : { site: site.name, status: "error" as const, message: "Site inaccessible via Browserless", tier: 3 };
      })
    );
    results.push(...batchResults);
    await sleep(rand(1000, 2000));
  }

  return results;
}

/* ─────────────────────────────────────────────────────────────
   TIER 4 — Annuaires locaux Nice/PACA
───────────────────────────────────────────────────────────── */
async function submitTier4(): Promise<SubmitResult[]> {
  const results: SubmitResult[] = [];

  const sites = [
    { name: "CCI Nice Côte d'Azur", url: "https://www.cote-azur.cci.fr", key: "ccinice" },
    { name: "Opendi Nice", url: "https://nice.opendi.fr", key: "opendi" },
    { name: "Guide Jalis B2B Nice", url: "https://b2b.guidejalis.com", key: "jalis" },
    { name: "NiceAssure", url: "https://www.niceassure.fr", key: "niceassure" },
    { name: "StarOfService Nice", url: "https://www.starofservice.com/annubis/provence-alpes-cote-d-azur/alpes-maritimes/nice/courtage-en-assurance", key: "starofservice" },
  ];

  const batches = chunkArray(sites, 3);
  for (const batch of batches) {
    const batchResults = await Promise.all(
      batch.map(async (site) => {
        const existing = await getSiteStatus(site.key);
        if (existing === "verified") return { site: site.name, status: "already_done" as const, message: "Déjà traité", tier: 4 };

        const res = await browserFetch(site.url);
        await setSiteStatus(site.key, res.ok ? "checked" : "error");
        if (res.ok && hasBacklink(res.html)) {
          await setSiteStatus(site.key, "verified");
          return { site: site.name, status: "ok" as const, message: `Backlink htassurance.fr détecté !`, tier: 4 };
        }
        return res.ok
          ? { site: site.name, status: "manual" as const, message: `Accessible (${res.status}) — inscription manuelle`, tier: 4 }
          : { site: site.name, status: "error" as const, message: "Inaccessible via Browserless", tier: 4 };
      })
    );
    results.push(...batchResults);
    await sleep(rand(1000, 2000));
  }

  return results;
}

/* ─────────────────────────────────────────────────────────────
   TIER 5 — Annuaires généralistes dofollow
───────────────────────────────────────────────────────────── */
async function submitTier5(): Promise<SubmitResult[]> {
  const results: SubmitResult[] = [];

  const sites = [
    { name: "Kompass", url: "https://fr.kompass.com", key: "kompass" },
    { name: "PagesPro", url: "https://www.pagespro.com", key: "pagespro" },
    { name: "Faitesvousconnaitre", url: "https://www.faitesvousconnaitre.com", key: "faitesvousconnaitre" },
    { name: "2AZ Annuaire", url: "https://www.2az.fr", key: "2az" },
    { name: "AnnuaireProfessionnels.fr", url: "https://annuaireprofessionnels.fr", key: "annuairepro" },
    { name: "Gralon Annuaire", url: "https://www.gralon.net", key: "gralon" },
    { name: "Yelp France", url: "https://www.yelp.fr", key: "yelp" },
    { name: "Cylex France", url: "https://www.cylex-france.fr", key: "cylex" },
    { name: "118712.fr", url: "https://www.118712.fr", key: "118712" },
    { name: "Justacôté", url: "https://www.justacote.com", key: "justacote" },
    { name: "Foursquare", url: "https://foursquare.com", key: "foursquare" },
    { name: "Bing Places", url: "https://www.bingplaces.com", key: "bingplaces" },
    { name: "Apple Business Connect", url: "https://businessconnect.apple.com", key: "applebusiness" },
    { name: "Tuugo France", url: "https://www.tuugo.fr", key: "tuugo" },
    { name: "Misterwhat", url: "https://www.misterwhat.fr", key: "misterwhat" },
  ];

  const batches = chunkArray(sites, 3);
  for (const batch of batches) {
    const batchResults = await Promise.all(
      batch.map(async (site) => {
        const existing = await getSiteStatus(site.key);
        if (existing === "verified") return { site: site.name, status: "already_done" as const, message: "Déjà traité", tier: 5 };

        const res = await browserFetch(site.url);
        await setSiteStatus(site.key, res.ok ? "checked" : "error");
        if (res.ok && hasBacklink(res.html)) {
          await setSiteStatus(site.key, "verified");
          return { site: site.name, status: "ok" as const, message: `Backlink htassurance.fr détecté !`, tier: 5 };
        }
        return res.ok
          ? { site: site.name, status: "manual" as const, message: `Accessible (${res.status}) — inscription manuelle`, tier: 5 }
          : { site: site.name, status: "error" as const, message: "Inaccessible via Browserless", tier: 5 };
      })
    );
    results.push(...batchResults);
    await sleep(rand(1000, 2000));
  }

  return results;
}

/* ─────────────────────────────────────────────────────────────
   TIER 6 — Forums, blogs, wikis
───────────────────────────────────────────────────────────── */
async function submitTier6(): Promise<SubmitResult[]> {
  const results: SubmitResult[] = [];

  const sites = [
    { name: "Forum Que Choisir", url: "https://forum.quechoisir.org", key: "quechoisir" },
    { name: "Légavox", url: "https://www.legavox.fr/forum/consommation/assurances/", key: "legavox" },
    { name: "Forum-Juridique.net", url: "https://www.forum-juridique.net/autres/assurance/", key: "forumjuridique" },
    { name: "Alexia.fr", url: "https://www.alexia.fr", key: "alexia" },
    { name: "CommentCaMarche Assurances", url: "https://droit-finances.commentcamarche.com/forum/assurances-16", key: "commentcamarche" },
    { name: "Caradisiac Assurance", url: "https://forum-auto.caradisiac.com/forum/1472-assurance/", key: "caradisiac" },
    { name: "Forums-Assurances.com", url: "https://www.forums-assurances.com", key: "forumsassurances" },
  ];

  const batches = chunkArray(sites, 3);
  for (const batch of batches) {
    const batchResults = await Promise.all(
      batch.map(async (site) => {
        const existing = await getSiteStatus(site.key);
        if (existing === "verified") return { site: site.name, status: "already_done" as const, message: "Déjà traité", tier: 6 };

        const res = await browserFetch(site.url);
        await setSiteStatus(site.key, res.ok ? "checked" : "error");
        if (res.ok && hasBacklink(res.html)) {
          await setSiteStatus(site.key, "verified");
          return { site: site.name, status: "ok" as const, message: `Backlink htassurance.fr détecté !`, tier: 6 };
        }
        return res.ok
          ? { site: site.name, status: "manual" as const, message: `Accessible (${res.status}) — créer compte + répondre avec lien htassurance.fr`, tier: 6 }
          : { site: site.name, status: "error" as const, message: "Inaccessible via Browserless", tier: 6 };
      })
    );
    results.push(...batchResults);
    await sleep(rand(1000, 2000));
  }

  return results;
}

/* ─────────────────────────────────────────────────────────────
   MAIN HANDLER
───────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const tierParam = req.nextUrl.searchParams.get("tier");
  const runAll = tierParam === "all";

  // Determine which tier to run based on hour or param
  const hour = new Date().getUTCHours();
  const tierToRun = runAll ? 0 : tierParam ? parseInt(tierParam) : Math.floor(hour / 4) + 1;

  const allResults: SubmitResult[] = [];
  const startTime = Date.now();

  await notify(`🚀 Backlink-builder démarré\n📋 Mode : ${runAll ? "TOUS les tiers" : `Tier ${tierToRun}`}\n⏱️ Début : ${new Date().toLocaleTimeString("fr-FR")}`, "normale");

  try {
    if (runAll || tierToRun === 1) {
      const r = await submitTier1();
      allResults.push(...r);
    }
    if (runAll || tierToRun === 2) {
      const r = await submitTier2();
      allResults.push(...r);
    }
    if (runAll || tierToRun === 3) {
      const r = await submitTier3();
      allResults.push(...r);
    }
    if (runAll || tierToRun === 4) {
      const r = await submitTier4();
      allResults.push(...r);
    }
    if (runAll || tierToRun === 5) {
      const r = await submitTier5();
      allResults.push(...r);
    }
    if (runAll || tierToRun === 6) {
      const r = await submitTier6();
      allResults.push(...r);
    }
  } catch (err) {
    console.error("[BACKLINK-BUILDER]", err);
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const ok = allResults.filter((r) => r.status === "ok").length;
  const manual = allResults.filter((r) => r.status === "manual").length;
  const errors = allResults.filter((r) => r.status === "error").length;
  const done = allResults.filter((r) => r.status === "already_done").length;

  // Save summary
  await setAgentFlag("backlink_last_run", JSON.stringify({
    date: new Date().toISOString(),
    total: allResults.length,
    ok, manual, errors, done,
    results: allResults,
  }));

  // Final notification — checklist actionnable
  const manualList = allResults
    .filter((r) => r.status === "manual")
    .map((r) => `  📋 ${r.site} — ${r.message}`)
    .join("\n");

  const report = `🔗 Backlink-builder terminé (${elapsed}s)

✅ ${ok} vérifiés/soumis auto (pings moteurs + fiches avec backlink détecté)
📋 ${manual} annuaires À INSCRIRE manuellement
${done > 0 ? `⏭️ ${done} déjà traités\n` : ""}${errors > 0 ? `❌ ${errors} inaccessibles\n` : ""}
✅ Détecté avec backlink :
${allResults.filter((r) => r.status === "ok" && r.tier > 1).map((r) => `  ✅ ${r.site}`).join("\n") || "  (aucun nouveau)"}

📋 À INSCRIRE (checklist) :
${manualList || "  (rien en attente)"}

📇 Infos à coller À L'IDENTIQUE (cohérence NAP) :
${NAP}

ℹ️ Rappel : viser des annuaires RÉPUTÉS et une fiche cohérente (pas du volume spam). Guide : DOCS/BACKLINKS-GUIDE.md`;

  await notify(report, "normale");

  return NextResponse.json({
    elapsed_seconds: elapsed,
    total: allResults.length,
    ok, manual, errors, already_done: done,
    results: allResults,
  });
}
