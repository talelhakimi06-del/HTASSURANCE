# Sécurité des clés API — htassurance.fr

Ce document décrit les bonnes pratiques de gestion des secrets, les
restrictions à appliquer sur chaque clé, et les procédures de rotation
et de réaction en cas de fuite.

## Principe général

| Type de secret | Préfixe d'env | Visibilité | Restriction |
|----------------|---------------|------------|-------------|
| **Publique** (ex: Maps key, reCAPTCHA site key, GA Measurement ID) | `NEXT_PUBLIC_` | Visible dans le HTML | Restriction par **référent HTTP** |
| **Privée** (ex: Places, reCAPTCHA secret, Resend, service account) | sans préfixe | Server-only | Restriction par **API** + IP optionnelle |

⚠️ Une clé restreinte par référent HTTP **ne fonctionne pas côté
serveur** (pas de header `Referer` envoyé par Vercel). Les clés
serveur doivent rester **sans restriction de référent**.

## Restrictions à appliquer (Cloud Console)

### `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
- **Restrictions d'application** → Référents HTTP :
  - `https://www.htassurance.fr/*`
  - `https://htassurance.fr/*`
  - `https://*.vercel.app/*` (preview deployments — à retirer si non utilisé)
- **Restrictions d'API** : cocher **uniquement** `Maps Embed API`.

### `GOOGLE_PLACES_API_KEY`
- **Restrictions d'application** : **Aucune** (Vercel n'envoie pas de Referer).
- **Restrictions d'API** : cocher **uniquement** `Places API (New)`.

### `GOOGLE_SERVICE_ACCOUNT_JSON`
- Aucune restriction Cloud nécessaire — c'est un compte de service
  séparé avec son propre IAM.
- **Côté Search Console** : ajouter l'email du compte de service en
  rôle **Lecteur uniquement** (jamais Owner ou Full).

### `RECAPTCHA_SITE_KEY` / `RECAPTCHA_SECRET_KEY`
- **Site Key** publique (dans le HTML) → reCAPTCHA Admin → champ
  "Domaines" : `htassurance.fr`, `www.htassurance.fr`,
  `localhost` (pour le dev).
- **Secret Key** server-only → aucune restriction de domaine côté
  reCAPTCHA (le secret est utilisé pour appeler `siteverify`, pas pour
  exécuter sur la page).

### `RESEND_API_KEY`
- Resend ne propose pas (à date) de restriction de domaine sur les API
  keys. Le contrôle se fait au niveau du domaine vérifié dans Resend
  (le champ `from` des emails).

## Quotas et alertes de facturation

À configurer impérativement dans Cloud Console :

### Quotas API
1. https://console.cloud.google.com/apis/api/places.googleapis.com/quotas
2. "Place Details requests per day" → **plafonner à 100**
3. Idem pour Maps Embed (déjà gratuit illimité, mais on plafonne par sécurité).

### Alertes de facturation
1. https://console.cloud.google.com/billing/budgets
2. Créer un budget mensuel : **5€**.
3. Notifications par email à 50%, 90%, 100%.
4. **Tout dépassement = alerte instantanée**.

## Procédure en cas de fuite de clé

### 1. Détection
- Alerte de facturation Cloud → suspect.
- Push GitHub → notification "secret detected" si Push Protection est
  activée sur le repo.
- Notre script `npm run check:secrets` peut être lancé manuellement
  ou en pre-commit hook.

### 2. Révocation immédiate

| Type | Où révoquer |
|------|-------------|
| Google Cloud (Maps, Places) | https://console.cloud.google.com/apis/credentials → ⋮ → **Delete** |
| Service account | IAM & Admin → Service Accounts → ton compte → onglet **Clés** → ⋮ → **Delete** |
| reCAPTCHA | https://www.google.com/recaptcha/admin → ton site → ⚙ → **"Reset secret key"** |
| Resend | https://resend.com/api-keys → **Revoke** |
| GitHub PAT | https://github.com/settings/tokens → **Revoke** |
| Vercel Token | https://vercel.com/account/tokens → **Delete** |

### 3. Régénération
- Crée une nouvelle clé.
- Mets à jour `process.env.NOM_VARIABLE` dans Vercel → **Settings → Environment Variables → Edit**.
- Redéploie (commit vide ou bouton Redeploy).

### 4. Si la clé a été commitée dans Git
- La révocation **suffit** : la clé est dans les commits passés mais
  désormais inutilisable.
- Rewrite Git history (`git filter-repo`) **uniquement si** tu veux la
  retirer du repo public — mais c'est lourd et casse les forks.
  Préférable : la révocation seule.

## Pre-commit hook (optionnel)

Ajouter dans `package.json` :

```json
"husky": {
  "hooks": {
    "pre-commit": "node scripts/check-secrets.js --staged"
  }
}
```

Ou plus simplement avec `husky` v9 :

```bash
npm install -D husky
npx husky init
echo "node scripts/check-secrets.js --staged" > .husky/pre-commit
```

## Checklist finale avant production

- [ ] `.env.local` est dans `.gitignore`
- [ ] `.env.example` est commité (sans vraies valeurs)
- [ ] Toutes les clés Cloud GCP sont restreintes (référent OU API)
- [ ] Quotas Places API plafonnés à 100/jour
- [ ] Budget GCP à 5€/mois avec alertes
- [ ] Compte de service Search Console = Lecteur uniquement
- [ ] reCAPTCHA Domaines limités à htassurance.fr
- [ ] `node scripts/check-secrets.js` passe en vert
