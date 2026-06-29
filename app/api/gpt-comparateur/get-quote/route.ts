import { NextRequest, NextResponse } from "next/server";
import { checkGptAuth, unauthorized, logToKv, sendLeadEmail, CTA } from "../_lib";

export const maxDuration = 30;

type Body = {
  type_assurance: string;
  prenom: string;
  email: string;
  telephone: string;
  donnees_profil: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  if (!checkGptAuth(req)) return unauthorized();

  const body: Body = await req.json();

  if (!body.prenom || !body.email || !body.telephone) {
    return NextResponse.json({ error: "Champs obligatoires: prenom, email, telephone" }, { status: 400 });
  }

  const devisId = `GPT-${Date.now().toString(36).toUpperCase()}`;

  await logToKv("get-quote", { devisId, ...body });

  // Build profile summary
  const profilEntries = Object.entries(body.donnees_profil || {});
  const profilResume = profilEntries.length > 0
    ? profilEntries.map(([k, v]) => `${k}: ${v}`).join(" | ")
    : "Profil non détaillé";

  // Send email notification to Talel
  const emailHtml = `
    <div style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#0f1f3d,#1a2d52);padding:24px 28px;border-radius:16px 16px 0 0;">
        <h1 style="color:white;margin:0;font-size:20px;">🎯 Nouveau devis via ChatGPT</h1>
        <p style="color:#d4832a;margin:6px 0 0;font-size:14px;font-weight:600;">Comparateur ELIA GPT — ${body.type_assurance}</p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 16px 16px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;width:140px;">Devis ID</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;font-family:monospace;">${devisId}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;">Prénom</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${body.prenom}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;">Email</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${body.email}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;">Téléphone</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${body.telephone}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;">Type</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${body.type_assurance}</td></tr>
          <tr><td style="padding:10px 14px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;">Profil</td><td style="padding:10px 14px;color:#0f172a;border-bottom:1px solid #e2e8f0;">${profilResume}</td></tr>
        </table>
        <div style="padding:16px 14px;text-align:center;">
          <a href="tel:${body.telephone}" style="display:inline-block;background:#0f1f3d;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">📞 Rappeler ${body.prenom}</a>
          <a href="mailto:${body.email}" style="display:inline-block;background:#d4832a;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin-left:8px;">✉️ Email</a>
        </div>
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:11px;margin-top:12px;">Envoyé par ELIA GPT Comparateur — HT Assurance</p>
    </div>
  `;

  await sendLeadEmail(
    `🎯 Nouveau devis ChatGPT : ${body.type_assurance} — ${body.prenom}`,
    emailHtml
  );

  return NextResponse.json({
    devis_id: devisId,
    resume: `Devis ${body.type_assurance} pour ${body.prenom} (${body.email}, ${body.telephone}). Profil : ${profilResume}.`,
    prochaine_etape: `Talel, votre courtier HT Assurance, va analyser votre profil et vous recontacter sous 24h (souvent le jour même) avec une offre personnalisée négociée auprès des meilleures compagnies du marché.`,
    cta: CTA,
  });
}
