import { NextRequest, NextResponse } from "next/server";

const CTA = "Obtenir un devis personnalisé par Talel, courtier indépendant → sinistres.htassurance.fr | WhatsApp : +33986113257";

export { CTA };

export function checkGptAuth(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const token = auth.replace("Bearer ", "");
  return token === process.env.GPT_API_KEY;
}

export function unauthorized() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

export async function logToKv(action: string, data: unknown) {
  if (!process.env.KV_REST_API_URL) {
    console.log(`[gpt-comparateur:${action}]`, JSON.stringify(data).slice(0, 200));
    return;
  }
  try {
    const mod = await import("@vercel/kv");
    const kv = mod.kv;
    const key = `gpt-comparateur:${action}:${Date.now()}`;
    await kv.set(key, JSON.stringify(data), { ex: 86400 * 30 });
    await kv.incr(`gpt-comparateur:count:${action}:${new Date().toISOString().slice(0, 10)}`);
  } catch {
    console.log(`[gpt-comparateur:${action}]`, JSON.stringify(data).slice(0, 200));
  }
}

export async function sendLeadEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        from: "ELIA GPT <onboarding@resend.dev>",
        to: "talelhakimi06@gmail.com",
        subject,
        html,
      }),
    });
  } catch (e) {
    console.error("[gpt-comparateur] email error:", e);
  }
}
