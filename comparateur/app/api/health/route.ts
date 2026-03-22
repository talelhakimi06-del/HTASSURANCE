import { NextResponse } from "next/server";

/**
 * Endpoint de santé pour vérifier la configuration avant déploiement.
 * Ne révèle jamais les clés API, uniquement leur présence.
 */
export async function GET() {
  const checks: Record<string, boolean> = {
    anthropic: !!process.env.ANTHROPIC_API_KEY?.trim(),
    crmWebhook: !!process.env.CRM_WEBHOOK_URL?.trim(),
  };

  const ok = checks.anthropic;
  const status = ok ? 200 : 503;

  return NextResponse.json(
    {
      ok,
      message: ok
        ? "Tous les services sont configurés"
        : "ANTHROPIC_API_KEY manquante — ajoutez-la dans Vercel > Settings > Environment Variables",
      checks: {
        chat: checks.anthropic ? "ok" : "missing_api_key",
        lead: checks.crmWebhook ? "webhook_configured" : "optional",
      },
    },
    { status }
  );
}
