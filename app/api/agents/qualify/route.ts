import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { saveLead } from "@/lib/memory";

export const maxDuration = 120;

type Body = {
  type_sinistre: string;
  motif_refus: string;
  delai: string;
  documents: string;
  enjeu: string;
  client_phone?: string;
  client_email?: string;
  score_diagnostic?: number;
};

export async function POST(req: NextRequest) {
  const body: Body = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[AGENT COMMERCIAL] ANTHROPIC_API_KEY manquante");
    return NextResponse.json({ error: "Config manquante" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: `Tu es l'agent Commercial d'ELIA pour HT Assurance (Talel, courtier à Nice). Analyse ce dossier sinistre et retourne UNIQUEMENT un JSON valide (pas de texte autour) :
{
  "score": number (1-10, 10 = dossier en or),
  "verdict": "À prendre" | "À étudier" | "À refuser",
  "arguments": ["arg1", "arg2", "arg3"],
  "urgence": "critique" | "haute" | "normale",
  "prescription_risque": boolean,
  "message_notification": "message court pour Talel, 5 lignes max avec émojis"
}
Critères de scoring :
- Enjeu > 10 000€ = +3 points
- Documents complets = +2 points
- Délai < 1 an = +2 points
- Motif contestable (défaut entretien, exclusion floue, vétusté) = +2 points
- Prescription < 6 mois = urgence critique`,
        messages: [{ role: "user", content: JSON.stringify(body) }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[AGENT COMMERCIAL] Claude error:", err);
      return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
    }

    const data = await res.json();
    const text = data.content?.[0]?.text ?? "{}";

    let analysis;
    try {
      analysis = JSON.parse(text);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { score: 5, verdict: "À étudier", arguments: [], urgence: "normale", prescription_risque: false, message_notification: "Nouveau dossier à analyser" };
    }

    // Save to memory
    await saveLead({
      ...body,
      score: analysis.score,
      verdict: analysis.verdict,
      arguments: analysis.arguments,
      urgence: analysis.urgence,
    });

    // Notify Talel
    const message = `🔔 Nouveau dossier sinistre
📋 Type : ${body.type_sinistre}
⚖️ Motif refus : ${body.motif_refus}
📅 Délai : ${body.delai}
💰 Enjeu : ${body.enjeu}
📁 Documents : ${body.documents}
🎯 Score : ${analysis.score}/10 — ${analysis.verdict}
✅ Arguments : ${(analysis.arguments || []).join(", ")}
${analysis.prescription_risque ? "🚨 PRESCRIPTION PROCHE" : ""}
👉 Contact : ${body.client_phone || body.client_email || "Non fourni"}`;

    await notify(message, analysis.urgence === "critique" ? "critique" : analysis.urgence === "haute" ? "haute" : "normale");

    return NextResponse.json({ success: true, analysis });
  } catch (err) {
    console.error("[AGENT COMMERCIAL]", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
