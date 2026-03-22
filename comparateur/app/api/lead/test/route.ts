import { NextResponse } from "next/server";

export async function GET() {
  const resendKey = process.env.RESEND_API_KEY;

  // Test direct envoi email
  let emailResult = null;
  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "ELIA - HT Assurance <onboarding@resend.dev>",
          to: "talelhakimi06@gmail.com",
          subject: "🔔 Test automatique — " + new Date().toLocaleString("fr-FR"),
          html: "<h2>Test automatique</h2><p>Si tu reçois ceci, la route /api/lead fonctionne correctement sur Vercel.</p>",
        }),
      });
      emailResult = await res.json();
    } catch (err) {
      emailResult = { error: String(err) };
    }
  }

  return NextResponse.json({
    resendKeyPresent: !!resendKey,
    resendKeyLength: resendKey?.length ?? 0,
    resendKeyPrefix: resendKey?.slice(0, 6) ?? "MISSING",
    emailResult,
  });
}
