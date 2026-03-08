import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import type { Lead } from "../../_lib/types";

const RECIPIENT = "ovbcourtage@gmail.com";

/* ── Template HTML email ──────────────────────────────────────────────────── */
function buildEmailHtml(lead: Lead): string {
  const now = new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" });

  const rows = (pairs: [string, string | undefined][]) =>
    pairs
      .filter(([, v]) => v)
      .map(
        ([label, value]) => `
        <tr>
          <td style="padding:10px 16px;font-size:13px;color:#8090A8;white-space:nowrap;width:160px;border-bottom:1px solid #1A3570;">${label}</td>
          <td style="padding:10px 16px;font-size:13px;color:#e8edf5;border-bottom:1px solid #1A3570;"><strong>${value}</strong></td>
        </tr>`
      )
      .join("");

  const conversationHtml = lead.conversationSummary
    ? lead.conversationSummary
        .split("\n")
        .map((line) => {
          if (line.startsWith("👤")) {
            return `<div style="margin:6px 0;padding:8px 12px;background:#1A3570;border-radius:8px;font-size:13px;color:#e8edf5;">${line}</div>`;
          }
          if (line.startsWith("🤖")) {
            return `<div style="margin:6px 0;padding:8px 12px;background:#0D2456;border-radius:8px;font-size:13px;color:#C9A84C;">${line}</div>`;
          }
          return `<p style="font-size:12px;color:#8090A8;margin:4px 0;">${line}</p>`;
        })
        .join("")
    : '<p style="color:#8090A8;font-size:13px;">Résumé non disponible</p>';

  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080f24;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0D1B3E,#0D2456);border:1px solid #C9A84C;border-radius:16px;padding:24px;margin-bottom:20px;text-align:center;">
      <div style="font-size:28px;margin-bottom:8px;">🛡️</div>
      <h1 style="margin:0;font-size:22px;color:#C9A84C;font-weight:800;letter-spacing:0.5px;">Nouveau lead — ELIA</h1>
      <p style="margin:6px 0 0;font-size:13px;color:#8090A8;">HT Assurance · Comparateur IA · ${now}</p>
    </div>

    <!-- Infos produit -->
    ${lead.insuranceType || lead.conversationSummary?.includes("fourchette") ? `
    <div style="background:#0D2456;border:1px solid #C9A84C;border-radius:12px;padding:16px;margin-bottom:16px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;">✦ Demande</p>
      <table style="width:100%;border-collapse:collapse;">
        ${rows([
          ["Produit", lead.insuranceType],
          ["Profil", lead.profile],
          ["Résumé", lead.conversationSummary?.split("\n").find(l => l.startsWith("📋"))?.replace("📋 ", "")],
          ["Fourchette", lead.conversationSummary?.split("\n").find(l => l.startsWith("💶"))?.replace("💶 ", "")],
        ])}
      </table>
    </div>
    ` : ""}

    <!-- Coordonnées -->
    <div style="background:#0D2456;border:1px solid #1A3570;border-radius:12px;padding:16px;margin-bottom:16px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;">👤 Coordonnées</p>
      <table style="width:100%;border-collapse:collapse;">
        ${rows([
          ["Prénom", lead.prenom],
          ["Nom", lead.nom],
          ["Téléphone", lead.telephone],
          ["Email", lead.email],
          ["Entreprise", lead.entreprise],
          ["SIRET", lead.siret],
        ])}
      </table>
    </div>

    <!-- Boutons d'action rapide -->
    <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;">
      <a href="tel:${lead.telephone?.replace(/\s/g, "")}"
        style="flex:1;min-width:140px;background:#C9A84C;color:#0D1B3E;text-decoration:none;font-weight:700;font-size:13px;padding:12px 16px;border-radius:10px;text-align:center;display:block;">
        📞 Appeler ${lead.prenom}
      </a>
      <a href="mailto:${lead.email}?subject=Suite%20à%20votre%20demande%20d'assurance%20sur%20HT%20Assurance"
        style="flex:1;min-width:140px;background:#1A3570;color:#e8edf5;text-decoration:none;font-weight:700;font-size:13px;padding:12px 16px;border-radius:10px;text-align:center;display:block;">
        ✉️ Répondre par email
      </a>
    </div>

    <!-- Conversation complète -->
    <div style="background:#0D1B3E;border:1px solid #1A3570;border-radius:12px;padding:16px;margin-bottom:20px;">
      <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#C9A84C;letter-spacing:1px;text-transform:uppercase;">💬 Conversation avec ELIA</p>
      ${conversationHtml}
    </div>

    <!-- Footer -->
    <p style="text-align:center;font-size:11px;color:#8090A8;margin:0;">
      HT Assurance · ORIAS 16004865 · Nice ·
      <a href="https://ht-assurance.vercel.app/comparateur" style="color:#C9A84C;text-decoration:none;">Accéder au comparateur</a>
    </p>
  </div>
</body>
</html>`;
}

/* ── Route POST ───────────────────────────────────────────────────────────── */
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

    /* ── Envoi email via Resend ─────────────────────────────────────────── */
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const { error } = await resend.emails.send({
          from: "ELIA – HT Assurance <onboarding@resend.dev>",
          to: [RECIPIENT],
          replyTo: lead.email,
          subject: `🛡️ Nouveau lead ${lead.insuranceType ?? "assurance"} — ${lead.prenom} ${lead.nom} (${lead.telephone})`,
          html: buildEmailHtml(enrichedLead),
        });
        if (error) {
          console.error("[comparateur/api/lead] Resend error:", error);
        } else {
          console.log(`✅ Email envoyé à ${RECIPIENT}`);
        }
      } catch (e) {
        console.error("[comparateur/api/lead] Resend exception:", e);
      }
    } else {
      console.warn("[comparateur/api/lead] RESEND_API_KEY manquante — email non envoyé");
    }

    /* ── Webhook CRM optionnel ──────────────────────────────────────────── */
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
