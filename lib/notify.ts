import { sendWhatsApp, isWhatsAppEnabled } from "./whatsapp";

const OWNER_PHONE = process.env.OWNER_PHONE ?? "33986113257";
const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "talelhakimi06@gmail.com";
const RESEND_KEY = () => process.env.RESEND_API_KEY;

type Urgence = "normale" | "haute" | "critique";

export async function notify(message: string, urgence: Urgence = "normale") {
  const prefix = urgence === "critique" ? "🚨 " : urgence === "haute" ? "⚡ " : "";
  const fullMessage = `${prefix}${message}`;

  // Try WhatsApp first
  if (isWhatsAppEnabled()) {
    const wa = await sendWhatsApp(OWNER_PHONE, fullMessage);
    if (wa.success && wa.mode === "live") return;
  } else {
    console.log(`[WHATSAPP SIMULÉ] Message : ${fullMessage.slice(0, 100)}...`);
  }

  // Fallback: email via Resend
  const key = RESEND_KEY();
  if (!key) {
    console.log(`[NOTIFY EMAIL SIMULÉ] → ${OWNER_EMAIL}\n${fullMessage}`);
    return;
  }

  const subject = urgence === "critique"
    ? `🚨 URGENT ELIA — ${message.split("\n")[0].slice(0, 60)}`
    : urgence === "haute"
    ? `⚡ ELIA — ${message.split("\n")[0].slice(0, 60)}`
    : `📬 ELIA — ${message.split("\n")[0].slice(0, 60)}`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "ELIA Agents <onboarding@resend.dev>",
        to: OWNER_EMAIL,
        subject,
        html: `<div style="font-family:monospace;white-space:pre-wrap;font-size:14px;line-height:1.6;max-width:600px;margin:0 auto;padding:20px;background:#0f1f3d;color:#e2e8f0;border-radius:12px;">${fullMessage.replace(/\n/g, "<br>")}</div>`,
      }),
    });
  } catch (err) {
    console.error("[NOTIFY] Erreur email:", err);
  }
}

export async function sendClientEmail(
  to: string,
  subject: string,
  body: string
) {
  const key = RESEND_KEY();
  if (!key) {
    console.log(`[EMAIL CLIENT SIMULÉ] → ${to} | ${subject}`);
    return { success: false, mode: "simulation" as const };
  }

  const signature = `\n\n---\nTalel\nExpert Sinistres & Courtier Indépendant\nHT Assurance — Nice\n📞 09 86 11 32 57\n💬 wa.me/33986113257\n🌐 sinistres.htassurance.fr`;

  const html = `
    <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;font-size:15px;line-height:1.7;color:#1a1a1a;">
      ${body.replace(/\n/g, "<br>")}
      <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b;">
        <strong>Talel</strong><br>
        Expert Sinistres & Courtier Indépendant<br>
        HT Assurance — Nice<br>
        📞 09 86 11 32 57<br>
        💬 <a href="https://wa.me/33986113257" style="color:#2563eb;">wa.me/33986113257</a><br>
        🌐 <a href="https://sinistres.htassurance.fr" style="color:#2563eb;">sinistres.htassurance.fr</a>
      </div>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "Talel — HT Assurance <onboarding@resend.dev>",
        to,
        subject,
        html,
        text: body + signature,
      }),
    });
    const data = await res.json();
    return { success: res.ok, mode: "live" as const, id: data.id };
  } catch (err) {
    console.error("[EMAIL CLIENT] Erreur:", err);
    return { success: false, mode: "live" as const };
  }
}
