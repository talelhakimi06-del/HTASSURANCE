import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "../../_lib/types";

export async function POST(req: NextRequest) {
  try {
    const lead: Lead = await req.json();

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

    console.log("📥 Nouveau lead comparateur:", JSON.stringify(enrichedLead, null, 2));

    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enrichedLead),
        });
      } catch (e) {
        console.error("[comparateur/api/lead] Webhook error:", e);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[comparateur/api/lead] Erreur:", err);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement" }, { status: 500 });
  }
}
