# Documentation — APIs Google sur htassurance.fr

Ce document décrit les APIs Google utilisées par le site et les
procédures de configuration. Voir aussi `cookies-et-analytics.md`,
`setup-search-console-api.md`, `securite-api.md`.

## TÂCHE A — Google Maps Embed

### Composants disponibles

- `app/components/GoogleMap.tsx` — wrapper public, charge l'iframe
  Maps Embed côté client (`next/dynamic` avec `ssr: false`).
- `app/components/GoogleMapIframe.tsx` — composant interne qui
  rend réellement l'iframe.
- `app/components/GoogleMapMulti.tsx` — affiche les 2 bureaux côte
  à côte (≥md) ou en onglets (<md).

### Variable d'environnement requise

| Nom | Type | Valeur |
|-----|------|--------|
| `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | publique (préfixe `NEXT_PUBLIC_`) | clé Maps Embed restreinte par domaine |

### Restrictions à appliquer sur la clé Maps

C'est une clé **publique** (visible dans le HTML servi). Sa sécurité
repose sur 2 restrictions à configurer dans Google Cloud Console :

1. **Restrictions d'application → Référents HTTP (sites web)** :
   - `https://www.htassurance.fr/*`
   - `https://htassurance.fr/*`
   - `https://*.vercel.app/*` (uniquement pour les previews Vercel,
     à retirer si non utilisé)

2. **Restrictions d'API → Restreindre la clé** :
   - Cocher uniquement **"Maps Embed API"**

Ces 2 restrictions empêchent la clé d'être utilisée :
- depuis un autre site (référent invalide)
- pour appeler une autre API que Maps Embed (par ex. Places, Directions…)

## Comment obtenir un Place ID Google

Un **Place ID** est l'identifiant unique d'un établissement chez Google
(au format `ChIJ…`). C'est le bon moyen de pointer une carte sur un
établissement précis (vs des coordonnées GPS imprécises).

### Méthode 1 — Place ID Finder (officiel, le plus rapide)

1. Va sur https://developers.google.com/maps/documentation/places/web-service/place-id
2. Dans le champ de recherche au-dessus de la carte, tape le nom
   exact ou l'adresse (ex : `HT Assurance Nice`).
3. Sélectionne le bon établissement dans la liste.
4. Une infobulle s'ouvre avec le **Place ID** (`ChIJ…`).
5. Copie-le et colle-le dans la prop `placeId` du composant
   `<GoogleMap>` ou dans la liste `offices` de `GoogleMapMulti`.

### Méthode 2 — Places API Text Search (programmatique)

```bash
curl -X POST "https://places.googleapis.com/v1/places:searchText" \
  -H "Content-Type: application/json" \
  -H "X-Goog-Api-Key: $GOOGLE_PLACES_API_KEY" \
  -H "X-Goog-FieldMask: places.id,places.displayName,places.formattedAddress" \
  -d '{"textQuery": "HT Assurance 25 rue Trachel Nice", "languageCode": "fr"}'
```

La réponse contient `places[0].id` = le Place ID.

### Place IDs actuels

| Bureau | Place ID | Adresse |
|--------|----------|---------|
| Siège Trachel | `ChIJuSypYgbQzRIRqX2X-zuw5ao` | 25 rue Trachel, 06000 Nice |
| Bureau Suède | `ChIJQ2lcfaDazRIRKNPg1zZn180` | 1 avenue de Suède, 06000 Nice |

> ⚠️ Il existe aussi 2 fiches "fantômes" (Cannes 23 rue Commandant André,
> Cagnes-sur-Mer 55 av. de la Gare) qui devraient être consolidées avec
> le siège Nice via Google Business Profile pour éviter de diluer
> l'autorité SEO locale.

## Coût Maps Embed API

Maps Embed est **gratuit** sans limite (depuis 2018, Google ne facture
plus les `place` embeds simples). Aucun risque de facture surprise.

Si on passe plus tard à Maps Static API ou Maps JS API, le tarif passe
à $7/1000 chargements pour Static et $7/1000 chargements pour JS. À
prévoir si on intègre une carte custom interactive.

## Évolutions possibles

- Marker custom HT Assurance (logo) → nécessite Maps JS API + composant
  React (`@vis.gl/react-google-maps` recommandé).
- Itinéraire intégré (entrée adresse de départ + tracé) → Directions API.
- Streetview embed → Maps Embed API mode `streetview`.

---

## Récapitulatif des 5 APIs Google utilisées

| API | Variable d'env | Usage | Quota gratuit | Tarif au-delà |
|-----|----------------|-------|---------------|---------------|
| **Maps Embed** | `NEXT_PUBLIC_GOOGLE_MAPS_KEY` | Carte siège + plan d'accès | Gratuit illimité | — |
| **Places (New)** | `GOOGLE_PLACES_API_KEY` | Avis Google live | 200$/mois de crédit | $17/1000 Place Details |
| **reCAPTCHA v3** | `RECAPTCHA_SITE_KEY` + `_SECRET_KEY` | Anti-spam formulaire | 1M req/mois | À partir de 1$ /1k |
| **Analytics 4** | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Mesure d'audience | Gratuit illimité | — |
| **Search Console** | `GOOGLE_SERVICE_ACCOUNT_JSON` | Dashboard `/admin/seo` | Gratuit illimité | — |

### Coût estimé selon trafic

Hypothèse : 1 fetch /api/google-reviews par jour (cache 24h), 1 affichage
Maps par session, 1 reCAPTCHA par formulaire envoyé.

| Visiteurs/mois | Coût Google Cloud | Coût Resend (1$/1k emails) | Total |
|----------------|-------------------|----------------------------|-------|
| 1 000 | ~0€ (largement dans le crédit gratuit) | ~0,02€ (20 leads) | ~0,02€ |
| 10 000 | ~0€ | ~0,20€ (200 leads) | ~0,20€ |
| 100 000 | ~0,50€ (Places + reCAPTCHA pics) | ~2€ (2 000 leads) | ~2,50€ |

**Conclusion** : tant que le trafic reste sous 100k visites/mois, le
coût total des APIs reste sous **3€/mois**.

## Procédure de rotation des clés

À effectuer **annuellement** ou **immédiatement en cas de fuite**.

### Maps + Places (clés Cloud)

1. Cloud Console → APIs & Services → Credentials
2. Créer une **nouvelle clé** avec les mêmes restrictions que l'ancienne
3. Mettre à jour la valeur dans Vercel → Settings → Environment Variables
4. Redéployer (commit vide ou bouton Redeploy)
5. **Tester en prod** : la carte s'affiche, les avis se chargent
6. **Supprimer l'ancienne clé** dans Cloud Console

### reCAPTCHA

1. https://www.google.com/recaptcha/admin → ton site → ⚙
2. Bouton **"Reset secret key"** → confirmer
3. Mettre à jour `RECAPTCHA_SECRET_KEY` dans Vercel
4. Redéployer
5. La site key reste la même (pas besoin de la régénérer)

### Resend

1. https://resend.com/api-keys → bouton "Create API Key"
2. Mettre à jour `RESEND_API_KEY` dans Vercel
3. Redéployer
4. Tester en envoyant un mail depuis le formulaire
5. **Revoke** l'ancienne clé

### Service account Search Console

1. Cloud Console → IAM & Admin → Service Accounts → ton compte
2. Onglet **Clés** → Add Key → Create new key (JSON)
3. Coller dans `GOOGLE_SERVICE_ACCOUNT_JSON` Vercel
4. Redéployer
5. Tester `/admin/seo`
6. **Supprimer l'ancienne clé** (onglet Clés → ⋮ → Delete)

## Procédure de désactivation propre

Si tu veux **arrêter** un service Google complètement :

1. Retirer la variable d'env de Vercel (Settings → Environment Variables → ⋮ → Delete)
2. Redéployer → le service est inactif (fallback gracieux dans le code)
3. Cloud Console → APIs & Services → Library → Désactiver l'API
4. (Optionnel) Supprimer la clé associée pour faire le ménage
