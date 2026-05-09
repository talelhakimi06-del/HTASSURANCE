import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const MIN_RECAPTCHA_SCORE = 0.5;
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min

type ContactBody = {
  prenom: string;
  nom?: string;
  telephone: string;
  email: string;
  statut?: string;
  assurance?: string;
  siret?: string;
  message?: string;
  profile?: string;
  recaptchaToken?: string | null;
};

type SiteVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

async function verifyRecaptcha(token: string): Promise<{ ok: boolean; score: number }> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    // Pas de secret configuré → on saute la vérif (mode dev/staging).
    return { ok: true, score: 1 };
  }

  try {
    const params = new URLSearchParams({ secret, response: token });
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await res.json()) as SiteVerifyResponse;
    if (!data.success) {
      console.warn("[/api/contact] reCAPTCHA fail:", data["error-codes"]);
      return { ok: false, score: 0 };
    }
    const score = data.score ?? 0;
    return { ok: score >= MIN_RECAPTCHA_SCORE, score };
  } catch (err) {
    console.error("[/api/contact] reCAPTCHA verify error:", err);
    // En cas d'erreur réseau côté Google, on n'empêche pas le user
    // légitime de soumettre — on log juste.
    return { ok: true, score: 0 };
  }
}

export async function POST(req: NextRequest) {
  // 1. Rate limit par IP
  const ip = getClientIp(req);
  const rl = checkRateLimit(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Trop de demandes, réessayez dans quelques minutes." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rl.resetMs / 1000)),
        },
      }
    );
  }

  // 2. Parse body
  let body: ContactBody;
  try {
    body = (await req.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  if (!body.prenom || !body.telephone || !body.email) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants" },
      { status: 400 }
    );
  }

  // 3. reCAPTCHA v3
  if (body.recaptchaToken) {
    const { ok, score } = await verifyRecaptcha(body.recaptchaToken);
    if (!ok) {
      console.warn("[/api/contact] Soumission bloquée — score reCAPTCHA:", score);
      return NextResponse.json(
        { error: "Vérification anti-spam échouée. Réessayez ou appelez-nous." },
        { status: 403 }
      );
    }
  } else if (process.env.RECAPTCHA_SECRET_KEY) {
    // Si secret configuré mais pas de token → suspect, on rejette
    return NextResponse.json(
      { error: "Vérification anti-spam manquante." },
      { status: 403 }
    );
  }

  // 4. Envoi email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error("[/api/contact] RESEND_API_KEY manquante");
    return NextResponse.json(
      { error: "Configuration email manquante" },
      { status: 500 }
    );
  }

  const fullName = body.nom ? `${body.prenom} ${body.nom}` : body.prenom;
  const rows = [
    ["Prénom", body.prenom],
    ["Nom", body.nom],
    ["Téléphone", body.telephone],
    ["Email", body.email],
    ["Profil", body.profile || body.statut],
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
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}</table>
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
        reply_to: body.email,
        subject: `📩 Nouveau contact : ${body.assurance || "Demande"} — ${fullName}`,
        html,
      }),
    });

    const data = (await res.json()) as { id?: string; message?: string };

    if (!res.ok) {
      console.error("[/api/contact] Resend error:", res.status, data);
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, emailId: data.id });
  } catch (err) {
    console.error("[/api/contact] Erreur:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
