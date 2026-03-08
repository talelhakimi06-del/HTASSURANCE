import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const lead: Lead = await req.json();

    // Validation basique
    if (!lead.nom || !lead.telephone || !lead.email) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants (nom, téléphone, email)" },
        { status: 400 }
      );
    }

    const enrichedLead: Lead = {
      ...lead,
      source: "comparateur-ht",
      createdAt: new Date().toISOString(),
    };

    // ── Log console (développement) ──────────────────────────────────────────
    console.log("📥 Nouveau lead reçu:", JSON.stringify(enrichedLead, null, 2));

    // ── Webhook CRM (optionnel) ───────────────────────────────────────────────
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enrichedLead),
        });
        if (!res.ok) {
          console.warn("[/api/lead] Webhook CRM a retourné:", res.status);
        } else {
          console.log("[/api/lead] Lead envoyé au CRM avec succès");
        }
      } catch (webhookErr) {
        console.error("[/api/lead] Erreur webhook CRM:", webhookErr);
      }
    }

    return NextResponse.json({ success: true, message: "Lead enregistré avec succès" });
  } catch (err) {
    console.error("[/api/lead] Erreur:", err);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement du lead" }, { status: 500 });
  }
}
