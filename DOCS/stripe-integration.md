# Intégration Stripe — Paiements & Facturation

Intégration Stripe pour **HT Assurance** (courtier en assurance) : facturation
et encaissement de montants libres saisis par le staff, sans code de paiement
sur le site public.

## Ce qui est en place

| Élément | Chemin | Rôle |
|---|---|---|
| Client Stripe (server-only) | `lib/stripe.ts` | Singleton + helpers montants |
| Garde admin | `lib/adminAuth.ts` | Vérifie le cookie `ht-admin-auth` |
| Webhook | `app/api/stripe/webhook/route.ts` | Reçoit les événements Stripe (signature vérifiée) |
| API Facture | `app/api/admin/stripe/invoice/route.ts` | Crée + envoie une facture hébergée |
| API Lien de paiement | `app/api/admin/stripe/payment-link/route.ts` | Génère un lien pour un montant libre |
| Interface staff | `app/admin/paiements` | Formulaires Facture / Lien |

Le middleware (`middleware.ts`) protège `/admin/*` et `/api/admin/stripe/*` par
le cookie admin. Le webhook est **public** (appelé par Stripe) et sécurisé par
vérification de signature, pas par cookie.

## Configuration

### 1. Variables d'environnement

Copier depuis `.env.example`. En local dans `.env.local`, en prod dans
**Vercel → Settings → Environment Variables** :

```
STRIPE_SECRET_KEY=sk_test_…      # sk_live_… en production — NE JAMAIS committer
STRIPE_WEBHOOK_SECRET=whsec_…    # secret de signature du webhook
ADMIN_PASSWORD=…                 # déjà utilisé par le back-office
```

> La clé secrète est **server-only**. Ne jamais la préfixer `NEXT_PUBLIC_`.
> `lib/stripe.ts` importe `server-only` : toute fuite vers un composant client
> fait échouer le build.

### 2. Activer les moyens de paiement

**Dashboard → Settings → Payment methods** : activer Carte, **SEPA Direct
Debit**, et les moyens locaux souhaités (Bancontact, etc.). Les factures et
liens de paiement suivent automatiquement cette configuration.

### 3. Configurer le webhook

**Dashboard → Developers → Webhooks → Add endpoint** :

- URL : `https://www.htassurance.fr/api/stripe/webhook`
- Événements :
  - `invoice.paid`
  - `invoice.payment_failed`
  - `invoice.finalized`
  - `checkout.session.completed`
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`

Copier le **Signing secret** (`whsec_…`) dans `STRIPE_WEBHOOK_SECRET`.

Les événements payés/échoués déclenchent une notification via `lib/notify.ts`
(WhatsApp puis email de repli).

## Utilisation (staff)

1. Se connecter sur `/admin/login`, puis aller sur **`/admin/paiements`**.
2. **Onglet Facture** — saisir client, email, description, montant, TVA. Stripe
   crée une facture numérotée (page web + PDF) et l'envoie par email. Le client
   paie en ligne (carte, SEPA…).
3. **Onglet Lien de paiement** — saisir description + montant. On obtient une URL
   `buy.stripe.com/…` à transmettre par email / WhatsApp / SMS.

### TVA

Les opérations d'assurance sont en principe **exonérées de TVA** (art. 261 C, 2°
du CGI) — c'est le défaut (mention d'exonération ajoutée en pied de facture).
Pour des prestations taxables, choisir un taux dans le formulaire. **En cas de
doute sur le traitement TVA, valider avec votre comptable.**

## Tests

### En local avec la CLI Stripe

```bash
# 1. Lancer le site
npm run dev

# 2. Rediriger les webhooks vers le local (fournit un whsec_ de test)
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 3. Déclencher un événement de test
stripe trigger invoice.paid
```

### Cartes de test

- Succès : `4242 4242 4242 4242` (date future, CVC quelconque)
- Authentification 3DS : `4000 0025 0000 3155`
- Refus : `4000 0000 0000 0002`

Documentation : <https://docs.stripe.com/testing>

## Sécurité — rappels

- Clés secrètes uniquement en variables d'environnement (jamais dans le code).
- Webhook : signature **toujours** vérifiée avant traitement.
- Routes `/api/admin/stripe/*` protégées par cookie admin (middleware + garde
  `requireAdmin` en défense en profondeur).
- Utiliser les clés **test** tant que l'intégration n'est pas validée, puis
  basculer sur les clés **live** dans Vercel.
