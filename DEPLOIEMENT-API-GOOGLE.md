# Checklist de déploiement — Intégrations API Google

Ce document liste **précisément ce que tu dois faire toi-même** dans
chaque console externe **avant** de considérer le site comme déployé.
Suis l'ordre — chaque étape conditionne la suivante.

---

## 1. Google Cloud Console — APIs à activer

🔗 https://console.cloud.google.com/apis/dashboard

1. Sélectionne ton projet (ou crée `ht-assurance-prod`).
2. Va dans **APIs & Services → Library**.
3. Active ces 4 APIs (clic sur chaque puis bouton ENABLE) :
   - [ ] **Maps Embed API** (https://console.cloud.google.com/apis/library/maps-embed-backend.googleapis.com)
   - [ ] **Places API (New)** (https://console.cloud.google.com/apis/library/places.googleapis.com)
   - [ ] **Search Console API** (https://console.cloud.google.com/apis/library/searchconsole.googleapis.com)
4. Vérifie la facturation :
   - [ ] Carte bancaire enregistrée (https://console.cloud.google.com/billing)
   - [ ] Budget mensuel à **5€** avec alertes 50/90/100% configuré

### Créer 2 clés API (Maps + Places)

🔗 https://console.cloud.google.com/apis/credentials

#### Clé Maps (publique)

- [ ] **+ CRÉER DES IDENTIFIANTS** → **Clé API**
- [ ] Renomme : `htassurance-maps-public`
- [ ] **Restrictions d'application** → "Référents HTTP" :
  - `https://www.htassurance.fr/*`
  - `https://htassurance.fr/*`
  - `https://*.vercel.app/*`
- [ ] **Restrictions d'API** → cocher uniquement **"Maps Embed API"**
- [ ] Save → copier la valeur → **NEXT_PUBLIC_GOOGLE_MAPS_KEY**

#### Clé Places (server-only)

- [ ] **+ CRÉER DES IDENTIFIANTS** → **Clé API**
- [ ] Renomme : `htassurance-places-server`
- [ ] **Restrictions d'application** → **Aucune**
- [ ] **Restrictions d'API** → cocher uniquement **"Places API (New)"**
- [ ] Save → copier la valeur → **GOOGLE_PLACES_API_KEY**

### Plafonner les quotas Places

🔗 https://console.cloud.google.com/apis/api/places.googleapis.com/quotas

- [ ] "Place Details requests per day" → **100**
- [ ] (Optionnel) Pareil pour les autres méthodes Places

### Compte de service Search Console

Voir [`docs/setup-search-console-api.md`](docs/setup-search-console-api.md) pour la procédure complète.

- [ ] Compte de service créé
- [ ] Clé JSON téléchargée
- [ ] `client_email` ajouté en lecteur dans Search Console
- [ ] JSON copié dans **GOOGLE_SERVICE_ACCOUNT_JSON**

---

## 2. reCAPTCHA Admin

🔗 https://www.google.com/recaptcha/admin

- [ ] **+** (créer un site)
- [ ] Label : `htassurance.fr`
- [ ] Type : **reCAPTCHA v3**
- [ ] Domaines :
  - `htassurance.fr`
  - `www.htassurance.fr`
  - `localhost` (pour le dev)
- [ ] Accepte les conditions
- [ ] Soumettre
- [ ] **Site key** copiée → **NEXT_PUBLIC_RECAPTCHA_SITE_KEY**
- [ ] **Secret key** copiée → **RECAPTCHA_SECRET_KEY**

---

## 3. Google Analytics 4

🔗 https://analytics.google.com

- [ ] Property GA4 créée pour `htassurance.fr`
- [ ] Data Stream Web créé pour `https://www.htassurance.fr`
- [ ] **Measurement ID** récupéré : `G-XXXXXXXXXX` → **NEXT_PUBLIC_GA_MEASUREMENT_ID**
- [ ] Paramètres → **IP Anonymization** activé (par défaut sur GA4)
- [ ] (Optionnel) Lier Search Console à GA4 pour les rapports croisés

---

## 4. Resend (envoi emails)

🔗 https://resend.com

- [ ] Compte créé
- [ ] Domaine `htassurance.fr` ajouté → **DNS records (SPF, DKIM, DMARC) à publier dans ton registrar**
- [ ] Domaine vérifié (statut "Verified")
- [ ] API Key créée → **RESEND_API_KEY**
- [ ] Dans `app/api/contact/route.ts` ligne `from:`, remplacer
      `onboarding@resend.dev` par `contact@htassurance.fr` une fois le
      domaine vérifié

---

## 5. Variables Vercel — la liste exacte

🔗 https://vercel.com/dashboard → projet `ht-assurance` → **Settings** → **Environment Variables**

Pour **chaque** variable ci-dessous, clique **Add New** puis coche les
3 environments (Production, Preview, Development) sauf indication contraire.

| Variable | Valeur | Environments |
|----------|--------|--------------|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | clé Maps | Production + Preview |
| `GOOGLE_PLACES_API_KEY` | clé Places | Production + Preview + Development |
| `GOOGLE_PLACE_ID` | `ChIJuSypYgbQzRIRqX2X-zuw5ao` | Production + Preview + Development |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | site key reCAPTCHA | Production + Preview |
| `RECAPTCHA_SECRET_KEY` | secret key reCAPTCHA | Production + Preview |
| `RESEND_API_KEY` | re_... | Production + Preview |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | G-XXXXXXXXXX | Production uniquement (pas Preview) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | JSON complet | Production uniquement |
| `ADMIN_PASSWORD` | mot de passe fort (`openssl rand -base64 32`) | Production + Preview |

> **Pourquoi GA4 et Service Account uniquement en Production ?**
> Pour ne pas polluer les statistiques avec le trafic des deploys
> Preview, et limiter la surface d'exposition du JSON sensible.

Une fois toutes les variables ajoutées :
- [ ] **Redeploy** (Deployments → ⋮ → Redeploy) ou push d'un commit vide

---

## 6. Tests post-déploiement

À exécuter **dans cet ordre** sur la prod (https://www.htassurance.fr/) :

### Test 1 — La carte Google s'affiche

- [ ] Ouvrir https://www.htassurance.fr/#contact
- [ ] La carte du siège (25 rue Trachel) s'affiche en bas du block info
- [ ] Cliquer sur "Voir les 2 bureaux & accès"
- [ ] La page `/plan-acces` affiche **les 2 cartes** côte à côte (desktop)
      ou en onglets (mobile)
- [ ] Le bouton "Itinéraire Google Maps" ouvre Google Maps avec le
      bon Place ID

**Si la carte ne s'affiche pas** : ouvrir la console DevTools → vérifier
que `NEXT_PUBLIC_GOOGLE_MAPS_KEY` est définie et que la restriction
de référents inclut bien `htassurance.fr`.

### Test 2 — Avis Google sur la home

- [ ] Scroll jusqu'à la section "Avis clients"
- [ ] Note **4.1/5 (31 avis Google)** affichée en gros
- [ ] Au moins 3 cartes d'avis visibles (Yannick MAFFONE, HICHRI Hatem, Angel Car…)
- [ ] Photo de profil ou initiale du client
- [ ] Cliquer sur "Lire la suite" d'un avis long → modal s'ouvre, fermeture par Esc + clic backdrop OK
- [ ] Bouton "Voir les 31 avis sur Google" ouvre la fiche Google Maps

### Test 3 — Formulaire envoie un email avec reCAPTCHA validé

- [ ] Section #contact → remplir prénom + téléphone + email + type d'assurance
- [ ] Soumettre → message "Demande reçue !" affiché
- [ ] Vérifier que `talelhakimi06@gmail.com` reçoit un email formaté HT Assurance
- [ ] Soumettre 4 fois en moins de 10 min → la 4e soumission doit retourner **HTTP 429** (rate limit)
- [ ] Logs Vercel : pas d'erreur reCAPTCHA, score affiché ≥ 0.5

### Test 4 — Bannière cookies à la première visite

- [ ] Ouvrir un onglet **navigation privée** sur https://www.htassurance.fr/
- [ ] La bannière s'affiche en bas à droite avec 3 boutons
- [ ] **Inspecter > Application > Cookies** : aucun cookie `_ga` présent

### Test 5 — GA4 ne se charge PAS sans consentement

- [ ] Toujours en navigation privée, cliquer "Tout refuser"
- [ ] Inspecter > Network → filtrer "googletagmanager" : **0 requête**
- [ ] Inspecter > Application > Cookies : **toujours aucun cookie `_ga`**

### Test 6 — GA4 se charge bien APRÈS consentement

- [ ] Recharger la page
- [ ] Cliquer sur "Gérer mes cookies" du footer
- [ ] Activer "Mesure d'audience" → "Enregistrer mes choix"
- [ ] Recharger → vérifier dans Network qu'une requête vers
      `googletagmanager.com/gtag/js?id=G-...` part bien
- [ ] Cookies `_ga` et `_ga_<ID>` présents

### Test 7 — Dashboard `/admin/seo` accessible avec mot de passe

- [ ] Ouvrir https://www.htassurance.fr/admin/seo
- [ ] Redirection vers `/admin/login?next=/admin/seo`
- [ ] Saisir un mauvais mot de passe → message d'erreur "Mot de passe incorrect"
- [ ] Saisir le bon `ADMIN_PASSWORD` → redirection vers `/admin/seo`
- [ ] Le dashboard affiche : 4 KPI cards + graphique d'évolution + 2 tableaux Top 20
- [ ] Filtres "7 jours / 30 jours / 90 jours" changent l'URL et les données
- [ ] Bouton "Exporter CSV" télécharge un fichier
- [ ] Bouton "Déconnexion" supprime le cookie et redirige vers /

**Si le dashboard affiche "Search Console API non configurée"** : revérifier
que `GOOGLE_SERVICE_ACCOUNT_JSON` est valide (JSON parsable) et que
l'email du compte de service est bien ajouté en lecteur dans Search Console.

---

## 7. Tests de sécurité post-déploiement

### Aucune clé serveur fuitée

- [ ] `npm run check:secrets` en local → "Aucun secret détecté"
- [ ] DevTools sur la prod → Sources → chercher "AIzaSy" :
      uniquement la clé **Maps** doit apparaître (préfixe NEXT_PUBLIC_).
      La clé Places ne doit **jamais** apparaître côté client.
- [ ] Inspecter le HTML de la page : la balise `<head>` ne contient
      ni `RESEND_API_KEY`, ni `RECAPTCHA_SECRET_KEY`, ni `GOOGLE_PLACES_API_KEY`.

### Page admin non accessible publiquement

- [ ] Visiter `/admin/seo` sans cookie → redirection vers login (HTTP 307)
- [ ] Tenter `curl /api/admin/seo-stats` sans cookie → HTTP 401

---

## 8. Quand tout est vert

- [ ] Marquer cette checklist comme complète dans une note interne
- [ ] Ajouter une entrée dans `docs/maintenance.md` (date du dernier déploiement)
- [ ] Programmer la première vérif mensuelle (suivant la checklist
      `docs/maintenance.md`)
- [ ] **Révoquer** tous les tokens / clés temporaires utilisés pendant
      la mise en place et qui sont encore actifs (anciens tokens
      Vercel/GitHub, anciennes clés Google Cloud)

🎉 **Le site est en production avec toutes les intégrations Google.**
