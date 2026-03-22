import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body: {
    prenom: string;
    nom: string;
    telephone: string;
    email: string;
    statut?: string;
    assurance?: string;
    siret?: string;
    message?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  if (!body.prenom || !body.nom || !body.telephone || !body.email) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants" },
      { status: 400 }
    );
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[/api/contact] RESEND_API_KEY manquante");
    return NextResponse.json(
      { error: "Configuration email manquante" },
      { status: 500 }
    );
  }

  const rows = [
    ["Prénom", body.prenom],
    ["Nom", body.nom],
    ["Téléphone", body.telephone],
    ["Email", body.email],
    ["Statut", body.statut],
    ["Type d'assurance", body.assurance],
    ["SIRET", body.siret],
    ["Message", body.message],
  ]
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;width:140px;">${label}</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${value}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#1e293b,#0f172a);padding:24px 28px;border-radius:16px 16px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">📩 Nouvelle demande — htassurance.fr</h1>
        <p style="color:#94a3b8;margin:6px 0 0;font-size:14px;">${body.assurance || "Demande de contact"}</p>
      </div>
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${rows}
        </table>
        <div style="padding:16px 14px;text-align:center;">
          <a href="tel:${body.telephone}" style="display:inline-block;background:#2563eb;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">📞 Rappeler ${body.prenom}</a>
          <a href="mailto:${body.email}" style="display:inline-block;background:#475569;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin-left:8px;">✉️ Répondre</a>
        </div>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:12px;">Envoyé automatiquement depuis htassurance.fr</p>
    </div>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "HT Assurance <onboarding@resend.dev>",
        to: "talelhakimi06@gmail.com",
        subject: `📩 Nouveau contact : ${body.assurance || "Demande"} — ${body.prenom} ${body.nom}`,
        html,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[/api/contact] Resend error:", res.status, JSON.stringify(data));
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    console.log("[/api/contact] Email envoyé OK, id:", data.id);
    return NextResponse.json({ success: true, emailId: data.id });
  } catch (err) {
    console.error("[/api/contact] Erreur:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
