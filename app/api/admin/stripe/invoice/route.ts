import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe, eurosToCents } from "@/lib/stripe";
import { requireAdmin } from "@/lib/adminAuth";

/* ─────────────────────────────────────────────────────────────────────
   Création + envoi d'une facture Stripe (produit « Invoicing »).

   Réservé au staff (garde requireAdmin). Le collaborateur saisit un
   client + un montant libre ; Stripe génère une facture hébergée
   (page web + PDF), l'envoie par email et gère l'encaissement (carte,
   SEPA, etc. selon les moyens activés dans le Dashboard).

   POST /api/admin/stripe/invoice
   Body JSON :
     {
       "clientEmail": "client@exemple.fr",   (requis)
       "clientName":  "Dupont SARL",          (optionnel mais recommandé)
       "description": "Frais de dossier — contrat auto",  (requis)
       "amountEuros": "150" | 150 | "150,00", (requis, montant HT)
       "tvaRate":     0 | 20 | 10 | 5.5,      (optionnel, défaut 0)
       "dueDays":     30,                      (optionnel, défaut 30)
       "footer":      "…",                     (optionnel, remplace la mention TVA par défaut)
       "sendNow":     true                     (optionnel, défaut true)
     }

   NOTE TVA — les opérations d'assurance sont en principe exonérées
   (art. 261 C, 2° du CGI). Le défaut est donc « sans TVA » avec une
   mention d'exonération. Pour des prestations taxables (ex. certains
   frais annexes), passez `tvaRate` et adaptez `footer`. En cas de doute,
   validez le traitement TVA avec votre comptable.
───────────────────────────────────────────────────────────────────── */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_TVA_FOOTER =
  "TVA non applicable — opération d'assurance exonérée (art. 261 C, 2° du CGI).";

type Body = {
  clientEmail?: string;
  clientName?: string;
  description?: string;
  amountEuros?: string | number;
  tvaRate?: number;
  dueDays?: number;
  footer?: string;
  sendNow?: boolean;
};

export async function POST(req: NextRequest) {
  const denied = requireAdmin(req);
  if (denied) return denied;

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  // ── Validation ──────────────────────────────────────────────────
  const clientEmail = body.clientEmail?.trim();
  if (!clientEmail || !EMAIL_RE.test(clientEmail)) {
    return NextResponse.json(
      { error: "clientEmail requis et valide" },
      { status: 400 }
    );
  }
  const description = body.description?.trim();
  if (!description) {
    return NextResponse.json(
      { error: "description requise" },
      { status: 400 }
    );
  }
  const amountCents = eurosToCents(body.amountEuros);
  if (amountCents === null) {
    return NextResponse.json(
      { error: "amountEuros invalide (doit être un montant positif)" },
      { status: 400 }
    );
  }
  const tvaRate =
    typeof body.tvaRate === "number" && body.tvaRate >= 0 && body.tvaRate <= 100
      ? body.tvaRate
      : 0;
  const dueDays =
    typeof body.dueDays === "number" && body.dueDays >= 0 && body.dueDays <= 365
      ? Math.round(body.dueDays)
      : 30;
  const sendNow = body.sendNow !== false; // défaut true

  const stripe = getStripe();

  try {
    // ── 1. Client : réutiliser s'il existe (par email), sinon créer ──
    const existing = await stripe.customers.list({
      email: clientEmail,
      limit: 1,
    });
    const customer =
      existing.data[0] ??
      (await stripe.customers.create({
        email: clientEmail,
        name: body.clientName?.trim() || undefined,
        metadata: { source: "admin-htassurance" },
      }));

    // ── 2. Taux de TVA (réutilisé s'il existe déjà) ─────────────────
    const taxRateId =
      tvaRate > 0 ? await getOrCreateTaxRate(stripe, tvaRate) : null;

    // ── 3. Facture en brouillon (n'aspire pas d'autres items en attente)
    const footer = body.footer?.trim() || (tvaRate === 0 ? DEFAULT_TVA_FOOTER : undefined);
    const draft = await stripe.invoices.create({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: dueDays,
      currency: "eur",
      description,
      auto_advance: false,
      pending_invoice_items_behavior: "exclude",
      footer,
      metadata: { source: "admin-htassurance" },
    });

    // ── 4. Ligne de facture (montant libre) ─────────────────────────
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: draft.id,
      currency: "eur",
      amount: amountCents, // HT ; la TVA éventuelle est ajoutée par tax_rates
      description,
      tax_rates: taxRateId ? [taxRateId] : undefined,
    });

    // ── 5. Finalisation → numéro + PDF + page hébergée ──────────────
    const finalized = await stripe.invoices.finalizeInvoice(draft.id, {
      auto_advance: true,
    });

    // ── 6. Envoi par email au client ────────────────────────────────
    let sent = finalized;
    if (sendNow) {
      sent = await stripe.invoices.sendInvoice(finalized.id);
    }

    return NextResponse.json({
      success: true,
      invoiceId: sent.id,
      number: sent.number,
      status: sent.status,
      total: sent.total,
      hostedInvoiceUrl: sent.hosted_invoice_url,
      invoicePdf: sent.invoice_pdf,
      customerId: customer.id,
      sent: sendNow,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Erreur Stripe";
    console.error("[admin/stripe/invoice] Erreur:", msg);
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

/**
 * Retourne l'ID d'un taux de TVA actif correspondant au pourcentage
 * demandé, en le réutilisant s'il existe déjà (évite de polluer le
 * compte Stripe avec des doublons).
 */
async function getOrCreateTaxRate(
  stripe: Stripe,
  percentage: number
): Promise<string> {
  const rates = await stripe.taxRates.list({ active: true, limit: 100 });
  const match = rates.data.find(
    (r) => r.percentage === percentage && r.inclusive === false
  );
  if (match) return match.id;

  const created = await stripe.taxRates.create({
    display_name: "TVA",
    description: `TVA ${percentage} %`,
    percentage,
    inclusive: false,
    country: "FR",
  });
  return created.id;
}
