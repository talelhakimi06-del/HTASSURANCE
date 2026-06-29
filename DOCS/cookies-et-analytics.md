# Cookies et Analytics — htassurance.fr

Documentation interne pour comprendre la mécanique de consentement,
les cookies déposés et les events Google Analytics utilisés. Ce
fichier sert de **base de mise à jour** pour la page publique
`/politique-confidentialite` et `/cookies`.

## Architecture du consentement

### Composants

| Fichier | Rôle |
|---------|------|
| `app/hooks/useCookieConsent.ts` | Source de vérité — lit/écrit `localStorage`, émet `ht-consent-change` |
| `app/components/CookieBanner.tsx` | Bandeau bottom-right + modal "Personnaliser" |
| `app/components/CookieManageButton.tsx` | Bouton footer "Gérer mes cookies" qui ré-ouvre le modal |
| `app/components/GoogleAnalytics.tsx` | Charge GA4 SI `consent.analytics === true` |

### Stockage

```ts
localStorage["ht-cookie-consent"] = {
  analytics: boolean,
  marketing: boolean,
  timestamp: ISO,
  version: "1.0"
}
```

- **TTL** : 13 mois (recommandation CNIL). Au-delà, la bannière se
  ré-affiche automatiquement.
- **Version** : si on change la liste des catégories, incrémenter
  `CONSENT_VERSION` dans `useCookieConsent.ts` → tous les utilisateurs
  re-consentent.

### Cycle de vie

```
1. Première visite → banner s'affiche (3 boutons : Accepter / Refuser / Personnaliser)
2. Choix utilisateur → écrit dans localStorage + émet 'ht-consent-change'
3. <GoogleAnalytics /> écoute l'event → charge ou décharge le tag GA4
4. Footer "Gérer mes cookies" → émet 'ht-consent-reopen' → modal Personnaliser
5. Après 13 mois → consent.timestamp expiré → readStored() retourne null → banner re-s'affiche
```

## GA4 — Configuration

### Variable d'environnement

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-SLL7N7KBG7
```

À configurer dans Vercel → Settings → Environment Variables, sur les
3 environments (Production, Preview, Development).

### Anonymisation

Le tag GA4 est configuré strict :

```js
gtag('config', GA_ID, {
  anonymize_ip: true,
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
  cookie_flags: 'SameSite=Lax;Secure'
});
```

- **anonymize_ip** : la dernière partie de l'IP est tronquée côté Google
  avant tout stockage.
- **allow_google_signals** : pas de signaux pub croisés avec d'autres
  produits Google (DoubleClick, Search Ads, etc.).
- **allow_ad_personalization_signals** : pas de personnalisation
  publicitaire — utile uniquement si on n'utilise pas Google Ads.

### Au retrait du consentement

Quand l'utilisateur passe `analytics: true → false`, on supprime
manuellement les cookies `_ga`, `_ga_*` posés par GA4. Le script reste
chargé en mémoire pour la session courante (pas de vrai unload côté
GA4) mais **ne pose plus de cookies**.

## Events GA4 trackés

Les helpers sont dans `lib/gtag.ts`. Tous les events sont **opt-in** :
sans consentement, `window.gtag` n'existe pas et l'appel est no-op.

| Event | Quand l'envoyer | Paramètres |
|-------|-----------------|------------|
| `form_submit` | Formulaire contact envoyé avec succès | `form_name`, `assurance` |
| `phone_click` | Clic sur un lien `tel:` | `location` (header/hero/footer/sticky) |
| `whatsapp_click` | Clic sur un lien `wa.me/...` | `location` |
| `product_page_view` | Vue d'une page produit | `product` |
| `review_click` | Clic vers les avis Google | `destination: "google_business"` |

### Comment ajouter un nouvel event

```tsx
"use client";
import { trackEvent } from "@/lib/gtag";

<a href="tel:..." onClick={() => trackEvent("phone_click", { location: "navbar" })}>
  09 86 11 32 57
</a>
```

## Cookies déposés (vue d'ensemble)

| Cookie | Famille | Catégorie | Durée | Éditeur | Finalité |
|--------|---------|-----------|-------|---------|----------|
| `ht-cookie-consent` | localStorage | Strictement nécessaire | 13 mois | HT Assurance | Mémoriser le choix de consentement |
| `_ga` | Cookie | Mesure d'audience (opt-in) | 24 mois | Google | Identifier un visiteur unique GA4 |
| `_ga_<MEASUREMENT_ID>` | Cookie | Mesure d'audience (opt-in) | 24 mois | Google | Maintenir l'état de session GA4 |
| reCAPTCHA cookies | Cookie | Strictement nécessaire | Session | Google | Empêcher le spam du formulaire (ne pose des cookies QUE quand le formulaire est soumis) |
| Maps cookies | iframe | Tiers fonctionnel | Session | Google | Affichage carte (ne se chargent qu'à l'interaction avec l'iframe) |

> Note RGPD : les cookies reCAPTCHA et Maps sont chargés via un iframe
> ou un script Google. Ils sont **techniquement nécessaires** au
> fonctionnement du formulaire et de la carte ; nous estimons donc
> qu'ils n'exigent pas un consentement préalable distinct (analyse
> CNIL : reCAPTCHA est exempté car indispensable à un service demandé
> par l'utilisateur). Si une autorité de contrôle considère le
> contraire, basculer reCAPTCHA derrière le consent (charger le
> Provider seulement si `consent.analytics === true`).

## Mise à jour des pages publiques

À chaque modification de cette mécanique :
1. Maj `/politique-confidentialite/page.tsx`
2. Maj `/cookies/page.tsx` (tableau exhaustif)
3. Incrémenter `CONSENT_VERSION` si nouvelle catégorie
4. Mettre à jour la version dans `app/hooks/useCookieConsent.ts`
