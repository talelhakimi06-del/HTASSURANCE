import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { centsToEurosLabel } from "@/lib/stripe";
import { notify } from "@/lib/notify";

/* ─────────────────────────────────────────────────────────────────────
   Webhook Stripe — PUBLIC (appelé par Stripe, pas par le navigateur).

   Sécurité : on ne fait JAMAIS confiance au corps de la requête sans
   vérifier la signature `stripe-signature` avec STRIPE_WEBHOOK_SECRET.
   C'est la seule preuve que l'événement vient bien de Stripe.

   Configuration (Dashboard → Developers → Webhooks) :
     URL     : https://www.htassurance.fr/api/stripe/webhook
     Events  : invoice.paid, invoice.payment_failed, invoice.finalized,
               checkout.session.completed, payment_intent.succeeded,
               payment_intent.payment_failed

   Test en local :
     stripe listen --forward-to localhost:3000/api/stripe/webhook
───────────────────────────────────────────────────────────────────── */

// Force le runtime Node (le SDK Stripe et la vérif de signature en ont
// besoin) et désactive tout cache : chaque événement doit être traité.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET manquant");
    return NextResponse.json(
      { error: "Webhook non configuré" },
      { status: 503 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Signature absente" }, { status: 400 });
  }

  // IMPORTANT : corps BRUT (raw), pas de JSON.parse — la signature porte
  // sur les octets exacts reçus.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "inconnue";
    console.warn("[stripe/webhook] Signature invalide:", msg);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    await handleEvent(event);
  } catch (err) {
    // On log mais on renvoie 200 quand l'erreur vient de NOTRE traitement
    // (ex : notification échouée) pour éviter que Stripe ne réessaie en
    // boucle un événement déjà correctement reçu. Les vraies erreurs de
    // signature/config sont déjà traitées plus haut avec un 4xx/5xx.
    console.error(`[stripe/webhook] Erreur traitement ${event.type}:`, err);
  }

  return NextResponse.json({ received: true });
}

async function handleEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "invoice.paid": {
      const inv = event.data.object as Stripe.Invoice;
      const total = centsToEurosLabel(inv.amount_paid ?? inv.total ?? 0);
      const client = inv.customer_name || inv.customer_email || "client";
      await notify(
        `💶 Facture payée — ${total}\n` +
          `Client : ${client}\n` +
          `N° ${inv.number ?? inv.id}\n` +
          `${inv.hosted_invoice_url ?? ""}`,
        "haute"
      );
      break;
    }

    case "invoice.payment_failed": {
      const inv = event.data.object as Stripe.Invoice;
      const total = centsToEurosLabel(inv.amount_due ?? inv.total ?? 0);
      const client = inv.customer_name || inv.customer_email || "client";
      await notify(
        `❌ Échec de paiement facture — ${total}\n` +
          `Client : ${client}\n` +
          `N° ${inv.number ?? inv.id}`,
        "haute"
      );
      break;
    }

    case "invoice.finalized": {
      const inv = event.data.object as Stripe.Invoice;
      console.log(
        `[stripe/webhook] Facture finalisée ${inv.number ?? inv.id} → ${inv.hosted_invoice_url}`
      );
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === "paid") {
        const total = centsToEurosLabel(session.amount_total ?? 0);
        const client =
          session.customer_details?.name ||
          session.customer_details?.email ||
          "client";
        await notify(
          `💶 Paiement reçu (lien de paiement) — ${total}\n` +
            `Client : ${client}\n` +
            `${session.metadata?.description ?? ""}`,
          "haute"
        );
      }
      break;
    }

    case "payment_intent.succeeded": {
      // Souvent redondant avec checkout.session.completed / invoice.paid.
      // On log seulement pour éviter les doubles notifications.
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[stripe/webhook] PaymentIntent réussi ${pi.id} — ${centsToEurosLabel(pi.amount ?? 0)}`
      );
      break;
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.warn(
        `[stripe/webhook] PaymentIntent échoué ${pi.id} — ${pi.last_payment_error?.message ?? ""}`
      );
      break;
    }

    default:
      // Événement non traité — on l'ignore proprement.
      console.log(`[stripe/webhook] Événement ignoré : ${event.type}`);
  }
}
