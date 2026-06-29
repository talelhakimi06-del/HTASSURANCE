import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { saveCatnat, setAgentFlag } from "@/lib/memory";

export const maxDuration = 120;

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  try {
    // Fetch recent CatNat arrêtés from georisques API
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);

    let arretes: Array<{ cod_nat_catnat: string; lib_risque_jo: string; dat_pub_arrete: string; num_dep: string; lib_commune: string }> = [];

    try {
      const res = await fetch(
        `https://georisques.gouv.fr/api/v1/gaspar/catnat?rayon=0&latlon=&date_debut_pub=${yesterday}&date_fin_pub=${today}&page=1&page_size=50`,
        { signal: AbortSignal.timeout(10000) }
      );
      if (res.ok) {
        const data = await res.json();
        arretes = data.data ?? [];
      }
    } catch {
      // API may be unavailable — try alternate endpoint
      try {
        const res2 = await fetch(
          `https://www.georisques.gouv.fr/api/v1/gaspar/catnat?date_debut_pub=${yesterday}&date_fin_pub=${today}&page=1&page_size=50`,
          { signal: AbortSignal.timeout(10000) }
        );
        if (res2.ok) {
          const data2 = await res2.json();
          arretes = data2.data ?? [];
        }
      } catch {
        console.log("[AGENT CATNAT] API georisques indisponible");
      }
    }

    if (arretes.length === 0) {
      console.log("[AGENT CATNAT] Aucun nouvel arrêté détecté");
      return NextResponse.json({ arretes: 0, message: "RAS" });
    }

    // Group by department
    const byDep: Record<string, string[]> = {};
    const types = new Set<string>();
    for (const a of arretes) {
      const dep = a.num_dep ?? "??";
      if (!byDep[dep]) byDep[dep] = [];
      byDep[dep].push(a.lib_commune ?? "");
      if (a.lib_risque_jo) types.add(a.lib_risque_jo);
    }

    const depList = Object.entries(byDep)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 5)
      .map(([dep, communes]) => `${dep} (${communes.length} communes)`)
      .join(", ");

    const typesList = Array.from(types).join(", ");

    // Save to memory
    await saveCatnat({
      date: today,
      total_arretes: arretes.length,
      departements: byDep,
      types: Array.from(types),
    });

    // Flag for Marketing agent
    await setAgentFlag(
      "catnat_article_topic",
      `${arretes.length} arrêtés CatNat publiés le ${today}. Types: ${typesList}. Départements les plus touchés: ${depList}.`
    );

    // Use Claude to generate summary if API key available
    const apiKey = process.env.ANTHROPIC_API_KEY;
    let articleSuggestion = "";

    if (apiKey) {
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 256,
            system: "Tu es veilleur réglementaire pour HT Assurance. Génère un titre et angle d'article de blog basé sur ces arrêtés CatNat. Retourne: {\"titre\":\"...\",\"angle\":\"...\"}",
            messages: [{ role: "user", content: `${arretes.length} arrêtés CatNat publiés. Types: ${typesList}. Départements: ${depList}.` }],
          }),
        });
        const data = await res.json();
        articleSuggestion = data.content?.[0]?.text ?? "";
      } catch {
        // Non-blocking
      }
    }

    // Notify Talel
    await notify(
      `🌊 Veille CatNat — ${today}\n📍 ${arretes.length} nouvelles communes reconnues\n🏘️ Départements : ${depList}\n⚠️ Types : ${typesList}\n✍️ Article en cours de génération...${articleSuggestion ? `\n📝 Suggestion : ${articleSuggestion.slice(0, 100)}` : ""}`,
      arretes.length > 20 ? "haute" : "normale"
    );

    return NextResponse.json({ arretes: arretes.length, departements: byDep, types: Array.from(types) });
  } catch (err) {
    console.error("[AGENT CATNAT]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
