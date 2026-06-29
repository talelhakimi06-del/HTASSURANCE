import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";

export const maxDuration = 60;

/*
  Agent review-responder — répond automatiquement aux NOUVEAUX avis Google Business.
  Politique : avis positifs (4-5★) → réponse auto variée et personnalisée ;
  avis négatifs (≤3★) → PAS de réponse auto, alerte Talel (WhatsApp/email) avec un brouillon suggéré.

  Nécessite l'API Google Business Profile (OAuth) — variables d'env :
    GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN  (scope: https://www.googleapis.com/auth/business.manage)
    GBP_ACCOUNT_ID, GBP_LOCATION_ID
  Si non configuré → mode simulation (log only).
*/

const STAR: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

type Review = {
  reviewId: string;
  reviewer?: { displayName?: string };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: { comment?: string };
};

async function getAccessToken(): Promise<string | null> {
  const client_id = process.env.GBP_CLIENT_ID;
  const client_secret = process.env.GBP_CLIENT_SECRET;
  const refresh_token = process.env.GBP_REFRESH_TOKEN;
  if (!client_id || !client_secret || !refresh_token) return null;
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id, client_secret, refresh_token, grant_type: "refresh_token" }),
    });
    const { access_token } = await res.json();
    return access_token ?? null;
  } catch (err) {
    console.error("[AGENT AVIS] OAuth error:", err);
    return null;
  }
}

async function fetchReviews(token: string): Promise<Review[]> {
  const account = process.env.GBP_ACCOUNT_ID;
  const location = process.env.GBP_LOCATION_ID;
  if (!account || !location) return [];
  try {
    const res = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${account}/locations/${location}/reviews?orderBy=updateTime%20desc&pageSize=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    return (data.reviews ?? []) as Review[];
  } catch (err) {
    console.error("[AGENT AVIS] fetch reviews error:", err);
    return [];
  }
}

async function postReply(token: string, reviewId: string, comment: string): Promise<boolean> {
  const account = process.env.GBP_ACCOUNT_ID;
  const location = process.env.GBP_LOCATION_ID;
  try {
    const res = await fetch(
      `https://mybusiness.googleapis.com/v4/accounts/${account}/locations/${location}/reviews/${reviewId}/reply`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      }
    );
    return res.ok;
  } catch (err) {
    console.error("[AGENT AVIS] post reply error:", err);
    return false;
  }
}

async function draftPositiveReply(apiKey: string, name: string, comment: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      system: `Tu réponds, au nom de HT Assurance (courtier en assurances à Nice), à un avis Google POSITIF laissé par ${name || "un client"}.
Rédige une réponse en français :
- chaleureuse, courte (1-2 phrases, max 40 mots), jamais robotique
- commence par le prénom si disponible
- reprend brièvement un mot de son avis pour personnaliser
- varie la formulation (pas de phrase passe-partout)
- termine par « — HT Assurance »
Retourne UNIQUEMENT le texte de la réponse.`,
      messages: [{ role: "user", content: `Avis de ${name || "client"} : "${comment || "(avis sans texte, juste une bonne note)"}"` }],
    }),
  });
  const data = await res.json();
  return (data.content?.[0]?.text ?? "").trim();
}

export async function GET(req: NextRequest) {
  // Sécurité cron (même schéma que les autres agents)
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const isVercelCron = req.headers.get("x-vercel-cron") === "true";
    if (!isVercelCron && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });

  const token = await getAccessToken();
  if (!token) {
    console.log("[AGENT AVIS] API Google Business non configurée — simulation");
    return NextResponse.json({ processed: 0, mode: "simulation", note: "Configurer GBP_CLIENT_ID/SECRET/REFRESH_TOKEN + GBP_ACCOUNT_ID/LOCATION_ID" });
  }

  const reviews = await fetchReviews(token);
  // Fenêtre de fraîcheur : on ne traite que les avis récents (évite de re-notifier les anciens à chaque run)
  const SINCE = Date.now() - 26 * 60 * 60 * 1000; // 26h (cron quotidien/6h)

  let autoReplied = 0;
  let flagged = 0;

  for (const r of reviews) {
    if (r.reviewReply?.comment) continue; // déjà répondu
    const rating = STAR[r.starRating ?? ""] ?? 0;
    const when = new Date(r.updateTime || r.createTime || 0).getTime();
    const name = r.reviewer?.displayName ?? "";
    const comment = r.comment ?? "";

    if (rating >= 4) {
      // Avis positif → réponse automatique
      try {
        const reply = await draftPositiveReply(apiKey, name, comment);
        if (reply) {
          const ok = await postReply(token, r.reviewId, reply);
          if (ok) autoReplied++;
        }
      } catch (err) {
        console.error("[AGENT AVIS] auto-reply error:", err);
      }
    } else if (rating > 0 && rating <= 3 && when >= SINCE) {
      // Avis négatif récent → on N'AUTO-RÉPOND PAS, on alerte Talel avec un brouillon
      const suggestion = `Bonjour ${name || ""}, sincèrement désolés de cette expérience, ce n'est pas notre standard. Contactez-nous au 09 86 11 32 57 pour qu'on règle ça ensemble. — HT Assurance`;
      await notify(
        `⭐ AVIS NÉGATIF (${rating}/5) à traiter\n👤 ${name || "?"}\n📝 « ${comment.slice(0, 200)} »\n\n💬 Brouillon de réponse :\n${suggestion}\n\n👉 À publier toi-même après avoir recontacté le client.`,
        "haute"
      );
      flagged++;
    }
  }

  return NextResponse.json({ mode: "live", autoReplied, flagged, totalFetched: reviews.length });
}
