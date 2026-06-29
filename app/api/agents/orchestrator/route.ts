import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { getDailyStats, getWeeklySummary, getAgentFlag, getRecentItems } from "@/lib/memory";

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const mode = req.nextUrl.searchParams.get("mode");
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (mode === "learn") {
    return handleLearn(apiKey);
  }

  return handleBriefing(apiKey);
}

async function handleBriefing(apiKey: string | undefined) {
  const today = new Date().toISOString().slice(0, 10);

  // Gather all agent reports
  const [stats, catnatStatus, devStatus, recentLeads, recentEmails, recentArticles] = await Promise.all([
    getDailyStats(),
    getAgentFlag("catnat_article_topic"),
    getAgentFlag("dev_audit_status"),
    getRecentItems("lead", 5),
    getRecentItems("email", 5),
    getRecentItems("article", 3),
  ]);

  const devReport = await getAgentFlag("dev_audit_report");
  let devParsed: { errors?: string[]; warnings?: string[]; perfScore?: string } = {};
  if (devReport) try { devParsed = JSON.parse(devReport); } catch { /* */ }

  // Build briefing with Claude if available
  let briefingMessage: string;

  if (apiKey) {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: `Tu es le Chef d'orchestre d'ELIA pour Talel chez HT Assurance (Nice). Compile un briefing matinal clair et actionnable. Format : émojis + phrases courtes. Termine par 3 priorités du jour numérotées. Max 300 mots.`,
          messages: [{
            role: "user",
            content: JSON.stringify({
              date: today,
              stats,
              catnat: catnatStatus ?? "RAS",
              dev: { status: devStatus, errors: devParsed.errors, warnings: devParsed.warnings, perf: devParsed.perfScore },
              leads_recents: recentLeads.slice(0, 3),
              emails_recents: recentEmails.slice(0, 3),
              articles_recents: recentArticles.slice(0, 2),
            }),
          }],
        }),
      });

      const data = await res.json();
      briefingMessage = data.content?.[0]?.text ?? "";
    } catch {
      briefingMessage = "";
    }
  } else {
    briefingMessage = "";
  }

  // Fallback if Claude didn't generate
  if (!briefingMessage) {
    briefingMessage = `☀️ Bonjour Talel — Briefing ELIA ${today}

🌊 CatNat : ${catnatStatus ?? "RAS"}
🛠️ Dev : ${devStatus ?? "non vérifié"}${devParsed.errors?.length ? ` — ${devParsed.errors.length} erreur(s)` : ""}
📧 Emails : ${stats.emails} traités
🎯 Leads : ${stats.leads} nouveaux
📰 Articles : ${stats.articles} publiés

🔴 PRIORITÉS DU JOUR :
1. ${stats.leads > 0 ? `Rappeler les ${stats.leads} nouveaux leads` : "Vérifier le comparateur"}
2. ${catnatStatus ? "Vérifier l'article CatNat publié" : "Partager un article sur LinkedIn"}
3. Consulter le backoffice htassurance.fr/admin

🔗 htassurance.fr/admin`;
  }

  await notify(briefingMessage, "normale");

  return NextResponse.json({ mode: "briefing", date: today, stats, message: briefingMessage });
}

async function handleLearn(apiKey: string | undefined) {
  const summary = await getWeeklySummary();

  if (!apiKey) {
    await notify(
      `🧠 Rapport LEARN — ANTHROPIC_API_KEY manquante, rapport simplifié\n📊 Leads: ${summary.lead?.length ?? 0} | Articles: ${summary.article?.length ?? 0} | Emails: ${summary.email?.length ?? 0}`,
      "normale"
    );
    return NextResponse.json({ mode: "learn", summary: { leads: summary.lead?.length, articles: summary.article?.length, emails: summary.email?.length } });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: `Tu es l'agent LEARN d'ELIA. Analyse les interactions de la semaine pour HT Assurance (Talel, courtier sinistres à Nice). Identifie les patterns, les insights et les recommandations concrètes pour la semaine prochaine. Format : émojis + sections claires. Max 400 mots.`,
        messages: [{
          role: "user",
          content: JSON.stringify({
            leads: summary.lead?.slice(0, 20),
            articles: summary.article?.slice(0, 10),
            emails: summary.email?.slice(0, 20),
            interactions: summary.interaction?.slice(0, 20),
          }),
        }],
      }),
    });

    const data = await res.json();
    const learnMessage = data.content?.[0]?.text ?? "Rapport LEARN non disponible cette semaine.";

    await notify(`🧠 Rapport LEARN — Semaine\n\n${learnMessage}`, "normale");

    return NextResponse.json({ mode: "learn", report: learnMessage });
  } catch (err) {
    console.error("[ORCHESTRATOR LEARN]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
