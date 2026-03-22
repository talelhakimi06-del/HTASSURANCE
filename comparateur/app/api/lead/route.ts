import { NextRequest, NextResponse } from "next/server";
import type { Lead } from "@/lib/types";

export async function POST(req: NextRequest) {
  let lead: Lead;
  try {
    lead = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête JSON invalide" },
      { status: 400 }
    );
  }

  try {
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

    console.log("📥 Nouveau lead reçu:", JSON.stringify(enrichedLead, null, 2));

    // ── Envoi email via API Resend (fetch direct, pas de SDK) ────────────
    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.LEAD_NOTIFY_EMAIL ?? "talelhakimi06@gmail.com";
    console.log("[/api/lead] RESEND_API_KEY present:", !!resendKey, "length:", resendKey?.length ?? 0, "to:", notifyEmail);

    if (resendKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "ELIA - HT Assurance <onboarding@resend.dev>",
            to: notifyEmail,
            subject: `🔔 Nouveau lead : ${enrichedLead.insuranceType ?? "Assurance"} — ${enrichedLead.nom}`,
            html: buildLeadEmailHtml(enrichedLead),
          }),
        });

        const emailData = await emailRes.json();

        if (!emailRes.ok) {
          console.error("[/api/lead] Resend error:", emailRes.status, JSON.stringify(emailData));
        } else {
          console.log("[/api/lead] Email envoyé OK, id:", emailData.id);
        }
      } catch (emailErr) {
        console.error("[/api/lead] Erreur envoi email:", emailErr);
      }
    } else {
      console.warn("[/api/lead] RESEND_API_KEY manquante — email non envoyé");
    }

    // ── Webhook CRM (optionnel) ─────────────────────────────────────────
    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enrichedLead),
        });
        if (!res.ok) console.warn("[/api/lead] Webhook CRM:", res.status);
      } catch (webhookErr) {
        console.error("[/api/lead] Erreur webhook CRM:", webhookErr);
      }
    }

    return NextResponse.json({ success: true, message: "Lead enregistré avec succès", emailSent: !!resendKey });
  } catch (err) {
    console.error("[/api/lead] Erreur:", err);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement du lead" }, { status: 500 });
  }
}

function buildLeadEmailHtml(lead: Lead): string {
  const rows = [
    ["Nom", lead.nom],
    ["Prénom", lead.prenom],
    ["Téléphone", lead.telephone],
    ["Email", lead.email],
    ["Type d'assurance", lead.insuranceType],
    ["Profil", lead.profile],
    ["Entreprise", lead.entreprise],
    ["SIRET", lead.siret],
    ["Source", lead.source],
    ["Date", lead.createdAt ? new Date(lead.createdAt).toLocaleString("fr-FR") : undefined],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;">${label}</td><td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${value}</td></tr>`
    )
    .join("");

  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#2563eb,#1d4ed8);padding:24px 28px;border-radius:16px 16px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">🔔 Nouveau lead comparateur</h1>
        <p style="color:#bfdbfe;margin:6px 0 0;font-size:14px;">${lead.insuranceType ?? "Demande de devis"}</p>
      </div>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows}
        </table>
        <div style="padding:16px 12px;text-align:center;">
          <a href="tel:${lead.telephone}" style="display:inline-block;background:#2563eb;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">📞 Rappeler ${lead.prenom ?? lead.nom}</a>
        </div>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:12px;">Envoyé automatiquement par ELIA — HT Assurance</p>
    </div>
  `;
}
