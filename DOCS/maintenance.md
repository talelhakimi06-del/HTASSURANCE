# Checklist de maintenance — htassurance.fr

À effectuer **chaque mois** pour garder le site sain, sécurisé et
performant.

## Quotas et facturation Google Cloud

- [ ] Vérifier la consommation des APIs sur https://console.cloud.google.com/apis/dashboard
  - Places API : doit rester sous 100 req/jour (cache 24h prévu)
  - Maps Embed : gratuit illimité, mais surveiller les pics anormaux
  - Search Console : cache 1h côté serveur, doit rester < 5 000 req/jour
- [ ] Consulter https://console.cloud.google.com/billing
  - Le total mensuel doit rester proche de 0€
  - Si > 1€ : investiguer (fuite de clé probable)

## Search Console

- [ ] https://search.google.com/search-console/performance
  - Évolution des clics (mois N vs mois N-1)
  - Nouvelles requêtes émergentes → potentiels articles à écrire
- [ ] Onglet "Pages" : vérifier qu'aucune page critique n'est en erreur ou exclue
- [ ] Sitemaps : doit être en "Réussi" sur la dernière soumission

## Search Console — Alertes par email

- [ ] Vérifier que les alertes sont activées (Settings → Users and permissions)
- [ ] Aucune alerte en cours de type :
  - "Issues detected" (problèmes d'exploration)
  - "Manual action" (pénalité Google)
  - "Mobile usability" (problèmes mobile)

## Sécurité

- [ ] Lancer `npm run check:secrets` → doit passer en vert
- [ ] Vérifier que les clés API n'ont pas été dupliquées sur Cloud Console
  par erreur
- [ ] Tester `/admin/seo` avec un mauvais mot de passe → doit refuser
- [ ] Vérifier que les preview Vercel ne sont pas indexés par Google :
  ```
  curl -sI https://<preview>.vercel.app/robots.txt
  ```
  doit contenir `Disallow: /` ou bénéficier de l'authentification preview.

## Dépendances npm

- [ ] `npm outdated` → identifier les paquets dépassés
- [ ] `npm audit` → corriger les CVE critiques (`npm audit fix`)
- [ ] Mettre à jour Next.js, React, googleapis si versions majeures
  disponibles **sur une branche séparée** + tests manuels avant merge

## Performance

- [ ] Lighthouse mobile sur la home : score Performance ≥ 90
  (https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fwww.htassurance.fr)
- [ ] Vérifier le poids du bundle dans Vercel → Deployments → ⋮ → Build logs
- [ ] Si une nouvelle dépendance lourde est ajoutée, faire un audit
  via `npx @next/bundle-analyzer`

## Cookies / RGPD

- [ ] Tester en navigation privée :
  1. La bannière s&apos;affiche bien
  2. "Tout refuser" → aucun cookie `_ga` n'est posé
  3. "Tout accepter" → cookies `_ga` posés
  4. Le bouton "Gérer mes cookies" du footer ré-ouvre le modal
- [ ] Vérifier que la page `/politique-confidentialite` est à jour avec
  la liste des sous-traitants utilisés.

## Email / Resend

- [ ] Domaine d'envoi vérifié sur https://resend.com/domains
- [ ] Statistiques d'envoi : taux de délivrance > 98%
- [ ] Auth SPF/DKIM/DMARC en place

## Avis Google Business

- [ ] Répondre à tout nouvel avis (positif ou négatif) sous 48h
- [ ] Surveiller les 4 fiches Google Business (Trachel, Suède, Cannes, Cagnes)
  - Idéalement : consolider les fiches inactives via Google Business
- [ ] Cohérence des infos (téléphone, adresse, horaires) entre les fiches

## Vercel

- [ ] Builds : tous en "Ready" sur les 30 derniers jours
- [ ] Bandwidth (Hobby = 100 GB/mois) : voir Settings → Usage
- [ ] Domains : `htassurance.fr` redirige bien vers `www.htassurance.fr`

## Fréquence recommandée

| Tâche | Fréquence |
|-------|-----------|
| Quotas + facturation Cloud | Mensuel |
| Search Console alertes | Hebdo |
| Lighthouse | Mensuel |
| Avis Google répondus | < 48h après dépôt |
| `npm audit` | Mensuel |
| `npm outdated` + upgrade | Trimestriel |
| Rotation clés API | Annuelle (ou si fuite) |
