import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { getAgentFlag, setAgentFlag } from "@/lib/memory";
import { autoSubmitForm, type SubmitConfig, type SubmitOutcome } from "@/lib/autoSubmit";

export const maxDuration = 300;

/* ─────────────────────────────────────────────────────────────
   AGENT auto-register — Inscription automatique sur annuaires
   via lib/autoSubmit (Browserless pilote Chrome + CapSolver
   résout les captchas).

   ⚠️ Chaque annuaire = sélecteurs CSS propres. Les configs ci-
   dessous sont à AFFINER au fil des runs : autoSubmit renvoie
   "champ KO: <selector>" quand un sélecteur ne matche pas → on
   corrige et on relance.

   Déclenchement :
     GET /api/agents/auto-register            → tous les sites non encore faits
     GET /api/agents/auto-register?site=KEY   → un seul site (test)
     GET /api/agents/auto-register?force=1    → ignore le flag "déjà fait"
───────────────────────────────────────────────────────────── */

const NAP = {
  name: "HT Assurance",
  address: "25 rue Trachel",
  postal: "06000",
  city: "Nice",
  phone: "0986113257",
  email: "talelhakimi06@gmail.com",
  website: "https://www.htassurance.fr",
  category: "Courtier en assurances",
  desc: "Courtier en assurance indépendant à Nice. Spécialiste de la contestation des refus de sinistre, optimisation de contrats, assurance emprunteur, RC pro, décennale et VTC. Particuliers et professionnels.",
};

/* Registre des annuaires. `key` sert au dédup KV.
   On démarre avec un petit set ; on ajoute au fur et à mesure
   que les sélecteurs sont validés. */
const DIRECTORIES: (SubmitConfig & { key: string })[] = [
  {
    key: "misterwhat",
    name: "Misterwhat",
    url: "https://www.misterwhat.fr/company/add",
    fields: [
      { selector: 'input[name="name"]', value: NAP.name },
      { selector: 'input[name="street"]', value: NAP.address },
      { selector: 'input[name="zipcode"]', value: NAP.postal },
      { selector: 'input[name="city"]', value: NAP.city },
      { selector: 'input[name="phone"]', value: NAP.phone },
      { selector: 'input[name="email"]', value: NAP.email },
      { selector: 'input[name="website"]', value: NAP.website },
    ],
    submitSelector: 'button[type="submit"], input[type="submit"]',
    successText: "merci",
  },
  {
    key: "opendi",
    name: "Opendi Nice",
    url: "https://www.opendi.fr/addbiz/",
    fields: [
      { selector: 'input[name="company"]', value: NAP.name },
      { selector: 'input[name="street"]', value: NAP.address },
      { selector: 'input[name="zip"]', value: NAP.postal },
      { selector: 'input[name="city"]', value: NAP.city },
      { selector: 'input[name="phone"]', value: NAP.phone },
      { selector: 'input[name="email"]', value: NAP.email },
      { selector: 'input[name="url"]', value: NAP.website },
    ],
    submitSelector: 'button[type="submit"], input[type="submit"]',
    successText: "merci",
  },
];

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  if (!process.env.BROWSERLESS_TOKEN) {
    return NextResponse.json({ error: "BROWSERLESS_TOKEN manquant" }, { status: 500 });
  }

  const siteParam = req.nextUrl.searchParams.get("site");
  const force = req.nextUrl.searchParams.get("force") === "1";

  let targets = DIRECTORIES;
  if (siteParam) targets = DIRECTORIES.filter((d) => d.key === siteParam);

  const outcomes: (SubmitOutcome & { key: string })[] = [];

  for (const dir of targets) {
    // Dédup : déjà inscrit avec succès ?
    if (!force) {
      const flag = await getAgentFlag(`autoreg:${dir.key}`);
      if (flag === "ok") {
        outcomes.push({ key: dir.key, name: dir.name, ok: true, finalUrl: "", captchaSolved: false, message: "déjà inscrit (skip)" });
        continue;
      }
    }

    const res = await autoSubmitForm(dir);
    outcomes.push({ key: dir.key, ...res });
    if (res.ok) await setAgentFlag(`autoreg:${dir.key}`, "ok");
  }

  const ok = outcomes.filter((o) => o.ok && o.message !== "déjà inscrit (skip)").length;
  const solved = outcomes.filter((o) => o.captchaSolved).length;

  const report = `🤖 Auto-register terminé
✅ ${ok} inscription(s) réussie(s) · 🔓 ${solved} captcha(s) résolu(s)

${outcomes.map((o) => `${o.ok ? "✅" : "❌"} ${o.name}${o.captchaSolved ? " 🔓" : ""}\n   ${o.message}${o.finalUrl ? `\n   → ${o.finalUrl}` : ""}`).join("\n")}

ℹ️ « champ KO: <selector> » = sélecteur à corriger dans la config.`;

  await notify(report, "normale");

  return NextResponse.json({ ok, solved, total: outcomes.length, outcomes });
}
