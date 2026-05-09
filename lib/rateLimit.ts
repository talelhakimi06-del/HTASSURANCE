/* ─────────────────────────────────────────────────────────────────────
   Rate limiting léger en mémoire (pas de Redis externe).

   Note : sur Vercel Serverless, chaque instance a sa propre Map — un
   attaquant peut donc dépasser la limite en frappant plusieurs régions.
   Suffisant pour bloquer le bruit casual (bots simples, double-clic).
   Pour une protection robuste, basculer sur @upstash/ratelimit + KV.
───────────────────────────────────────────────────────────────────── */

type Entry = { hits: number[]; firstHit: number };

const store = new Map<string, Entry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const cutoff = now - windowMs;

  const entry = store.get(key) ?? { hits: [], firstHit: now };
  // Nettoie les hits hors fenêtre
  entry.hits = entry.hits.filter((t) => t > cutoff);

  if (entry.hits.length >= limit) {
    const oldest = entry.hits[0];
    return {
      allowed: false,
      remaining: 0,
      resetMs: oldest + windowMs - now,
    };
  }

  entry.hits.push(now);
  store.set(key, entry);

  return {
    allowed: true,
    remaining: limit - entry.hits.length,
    resetMs: windowMs,
  };
}

/** Récupère l'IP client de manière fiable derrière le proxy Vercel. */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
