import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, eurosToCents } from "@/lib/stripe";
import { requireAdmin } from "@/lib/adminAuth";

/* ─────────────────────────────────────────────────────────────────────
   Génération d'un lien de paiement Stripe (produit « Payments ») pour un
   montant libre. Réservé au staff (garde requireAdmin).

   Le collaborateur saisit un libellé + un montant ; l'API renvoie une URL
   (buy.stripe.com/…) à transmettre au client par email / WhatsApp / SMS.
   Le client paie via une page hébergée Stripe (carte, SEPA… selon les
   moyens activés dans le Dashboard). Aucun code de paiement côté site
   public : c'est bien un simple lien.

   POST /api/admin/stripe/payment-link
   Body JSON :
     {
       "description": "Frais de dossier — contrat habitation",  (requis)
       "amountEuros": "150" | 150 | "150,00"                    (requis)
     }
───────────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Marqueur pour retrouver/réutiliser le produit générique « prestation ».
const GENERIC_PRODUCT_MARKER = "htassurance_generic";

type Body = { description?: string; amountEuros?: string | number };

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const description = body.description?.trim();
  if (!description) {
    return NextResponse.json({ error: "description requise" }, { status: 400 });
  }
  const amountCents = eurosToCents(body.amountEuros);
  if (amountCents === null) {
    return NextResponse.json(
      { error: "amountEuros invalide (doit être un montant positif)" },
      { status: 400 }
    );
  }

  const stripe = getStripe();

  try {
    const productId = await getOrCreateGenericProduct(stripe);

    // Prix ad-hoc pour ce montant précis (rattaché au produit générique).
    const price = await stripe.prices.create({
      currency: "eur",
      unit_amount: amountCents,
      product: productId,
      metadata: { source: "admin-htassurance", description },
    });

    const link = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      // Les moyens de paiement (carte, SEPA…) suivent la configuration du
      // Dashboard → Settings → Payment methods.
      metadata: { source: "admin-htassurance", description },
      payment_intent_data: { description },
    });

    return NextResponse.json({
      success: true,
      url: link.url,
      paymentLinkId: link.id,
      priceId: price.id,
      amount: amountCents,
      description,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur Stripe";
    console.error("[admin/stripe/payment-link] Erreur:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

/**
 * Retourne l'ID d'un produit générique unique (« Prestation HT
 * Assurance »), réutilisé d'un appel à l'autre pour éviter d'encombrer le
 * catalogue Stripe. Chaque lien de paiement porte son propre Prix.
 */
async function getOrCreateGenericProduct(stripe: Stripe): Promise<string> {
  const products = await stripe.products.list({ active: true, limit: 100 });
  const match = products.data.find(
    (p) => p.metadata?.[GENERIC_PRODUCT_MARKER] === "1"
  );
  if (match) return match.id;

  const created = await stripe.products.create({
    name: "Prestation HT Assurance",
    metadata: { [GENERIC_PRODUCT_MARKER]: "1", source: "admin-htassurance" },
  });
  return created.id;
}
