# Setup Search Console API — Dashboard `/admin/seo`

Procédure pas-à-pas pour activer la Search Console API et nourrir le
dashboard `/admin/seo` avec les vraies données SEO du site.

## 1. Activer l'API dans Google Cloud Console

1. Va sur https://console.cloud.google.com/apis/library/searchconsole.googleapis.com
2. Sélectionne ton projet GCP (le même que celui de Maps/Places).
3. Clique **"ACTIVER"**.

## 2. Créer un compte de service

1. Va sur https://console.cloud.google.com/iam-admin/serviceaccounts
2. Clique **"+ CRÉER UN COMPTE DE SERVICE"**.
3. Nom : `htassurance-search-console`.
4. ID : laissé par défaut (ex : `htassurance-search-console`).
5. Étape 2 (rôle) : laisse vide ou choisis "Aucun" (le rôle est donné
   ensuite côté Search Console, pas côté GCP IAM).
6. Étape 3 (utilisateur) : laisse vide. Clique **"OK"**.

## 3. Télécharger la clé JSON

1. Sur la liste des comptes de service, clique sur celui que tu viens
   de créer.
2. Onglet **"Clés"** → **"Ajouter une clé"** → **"Créer une clé"** →
   format **JSON** → **"Créer"**.
3. Un fichier `htassurance-xxx.json` se télécharge. **Garde-le précieusement** :
   c'est le secret qui authentifie le serveur.

## 4. Donner accès à Search Console

Le compte de service a un email du type
`htassurance-search-console@<project-id>.iam.gserviceaccount.com`.
Cet email doit être ajouté comme **utilisateur en lecture** dans
Search Console.

1. Ouvre le fichier JSON et copie la valeur de `client_email`.
2. Va sur https://search.google.com/search-console
3. Sélectionne la propriété `htassurance.fr` (Domain Property).
4. **Paramètres** (engrenage en bas à gauche) → **Utilisateurs et autorisations**.
5. Bouton **"AJOUTER UN UTILISATEUR"**.
6. Email = `htassurance-search-console@...iam.gserviceaccount.com`.
7. Autorisation = **Lecteur**.
8. **Ajouter**.

## 5. Stocker le JSON dans Vercel

1. Ouvre le fichier JSON dans un éditeur de texte (VS Code, etc.).
2. Sélectionne **tout le contenu** (Ctrl/Cmd+A, Ctrl/Cmd+C).
3. Va sur https://vercel.com/dashboard → projet `ht-assurance` →
   **Settings** → **Environment Variables**.
4. Bouton **"Add New"** :
   - **Name** : `GOOGLE_SERVICE_ACCOUNT_JSON`
   - **Value** : colle l'intégralité du JSON (oui, en une seule ligne ou avec retours, Vercel accepte les deux).
   - Coche **Production**, **Preview**, **Development**.
   - **Save**.

## 6. Configurer le mot de passe admin

1. Génère un mot de passe fort : `openssl rand -base64 32`.
2. Vercel → **Add New** :
   - **Name** : `ADMIN_PASSWORD`
   - **Value** : le mot de passe.
   - **Save**.

## 7. Redeploy + test

1. Déclenche un nouveau déploiement (push ou bouton "Redeploy" dans Vercel).
2. Va sur https://www.htassurance.fr/admin/seo → tu es redirigé vers
   `/admin/login`.
3. Saisis ton `ADMIN_PASSWORD` → tu accèdes au dashboard.
4. Si tu vois "Search Console API non configurée" : revérifie l'étape 5
   (JSON valide, multi-line correctement collé).

## ⚠️ Sécurité

- Le fichier JSON téléchargé en local **ne doit jamais** être commité
  dans Git. Ajoute son nom dans `.gitignore` (déjà couvert par `*.json`
  exclus dans `.gitignore`).
- En cas de fuite : Cloud Console → IAM → Service Accounts →
  ton compte → onglet **Clés** → supprime l'ancienne clé → crée-en une
  nouvelle → mets à jour `GOOGLE_SERVICE_ACCOUNT_JSON` dans Vercel.
- Le compte de service n'a accès qu'**en lecture** sur Search Console
  (étape 4) et n'a aucun rôle GCP (étape 2). Il ne peut donc rien
  modifier ni dans Search Console ni dans Cloud.

## Champ `siteUrl`

Dans `lib/searchConsole.ts`, la constante `SITE_URL` vaut :

```
sc-domain:htassurance.fr
```

C'est le format **Domain Property** (cf. Search Console "type de
propriété"). Si ta propriété SC est de type **URL prefix** (ex :
`https://www.htassurance.fr/`), remplace la valeur par
`https://www.htassurance.fr/`.
