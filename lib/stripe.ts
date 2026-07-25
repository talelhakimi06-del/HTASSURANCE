import "server-only";
import Stripe from "stripe";

/* ─────────────────────────────────────────────────────────────────────
   Client Stripe — server-only.

   La clé secrète (STRIPE_SECRET_KEY) ne doit JAMAIS être importée côté
   navigateur. Le préfixe `server-only` fait échouer le build si ce
   module est importé dans un composant client.

   Variables d'environnement (voir .env.example) :
     STRIPE_SECRET_KEY       sk_live_… / sk_test_…  (server-only)
     STRIPE_WEBHOOK_SECRET   whsec_…               (server-only)
───────────────────────────────────────────────────────────────────── */

let cached: Stripe | null = null;

/**
 * Retourne un singleton Stripe. Lève une erreur claire si la clé n'est
 * pas configurée (plutôt qu'un échec obscur au premier appel API).
 *
 * On ne fixe pas `apiVersion` : le SDK utilise la version épinglée par
 * la librairie installée, cohérente avec les types TypeScript.
 */
export function getStripe(): Stripe {
  if (cached) return cached;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY non configurée. Ajoutez-la dans .env.local (dev) " +
        "et dans Vercel → Settings → Environment Variables (prod)."
    );
  }

  cached = new Stripe(key, {
    appInfo: { name: "htassurance.fr", url: "https://www.htassurance.fr" },
    maxNetworkRetries: 2,
    typescript: true,
  });
  return cached;
}

/** Vrai si une clé Stripe est présente (utile pour dégrader proprement). */
export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Convertit un montant en euros (nombre ou chaîne "12,50" / "12.50")
 * vers des centimes entiers, comme l'attend l'API Stripe.
 * Retourne null si l'entrée n'est pas un montant valide et positif.
 */
export function eurosToCents(input: unknown): number | null {
  if (typeof input === "number" && Number.isFinite(input)) {
    const cents = Math.round(input * 100);
    return cents > 0 ? cents : null;
  }
  if (typeof input === "string") {
    const normalized = input.trim().replace(/\s/g, "").replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
    const cents = Math.round(parseFloat(normalized) * 100);
    return cents > 0 ? cents : null;
  }
  return null;
}

/** Formate des centimes en libellé « 1 234,56 € » pour l'affichage. */
export function centsToEurosLabel(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
