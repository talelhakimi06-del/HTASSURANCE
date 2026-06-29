# Guide de configuration ELIA — Variables d'environnement

## ANTHROPIC_API_KEY
1. Va sur https://console.anthropic.com
2. API Keys → Create key
3. Copie la clé `sk-ant-...`
4. Ajoute dans Vercel : `npx vercel env add ANTHROPIC_API_KEY production`

## RESEND_API_KEY
1. Va sur https://resend.com
2. API Keys → Create
3. Copie la clé `re_...`
4. Ajoute dans Vercel

## ADMIN_PASSWORD
Choisis un mot de passe pour le backoffice /admin.
```
printf "MonMotDePasse" | npx vercel env add ADMIN_PASSWORD production
```

## GMAIL_CLIENT_ID + GMAIL_CLIENT_SECRET
1. Va sur https://console.cloud.google.com
2. Créer un nouveau projet "HT Assurance ELIA"
3. APIs & Services → Enable APIs → Active **Gmail API**
4. Credentials → Create → OAuth 2.0 Client ID
5. Application type : **Web application**
6. Authorized redirect URIs : `https://developers.google.com/oauthplayground`
7. Copie Client ID et Client Secret
8. Ajoute dans Vercel :
   ```
   npx vercel env add GMAIL_CLIENT_ID production
   npx vercel env add GMAIL_CLIENT_SECRET production
   ```

## GMAIL_REFRESH_TOKEN
1. Va sur https://developers.google.com/oauthplayground
2. En haut à droite : Settings (engrenage) → Use your own OAuth credentials
3. Colle Client ID + Client Secret
4. À gauche : cherche "Gmail API v1" → sélectionne `https://mail.google.com/`
5. Clique "Authorize APIs" → connecte-toi avec contact@htassurance.fr
6. Clique "Exchange authorization code for tokens"
7. Copie le **Refresh Token**
8. Ajoute dans Vercel :
   ```
   npx vercel env add GMAIL_REFRESH_TOKEN production
   ```

## GITHUB_TOKEN
1. Va sur https://github.com/settings/tokens
2. Generate new token (classic)
3. Coche : `repo`, `workflow`
4. Copie le token `ghp_...`
5. Ajoute dans Vercel :
   ```
   npx vercel env add GITHUB_TOKEN production
   ```

## CRON_SECRET
Génère une clé aléatoire pour sécuriser les crons :
```
printf "$(openssl rand -hex 16)" | npx vercel env add CRON_SECRET production
```

## GPT_API_KEY
Déjà configuré : `gpt_ht_2026_elia_comparateur`
C'est la clé Bearer pour les Actions du Custom GPT ChatGPT.

## WHATSAPP (quand prêt)
1. Va sur https://developers.facebook.com
2. Crée une app → type Business
3. Ajoute le produit **WhatsApp**
4. Configuration → récupère :
   - **WHATSAPP_TOKEN** (permanent token)
   - **WHATSAPP_PHONE_ID**
5. Webhook URL : `https://www.htassurance.fr/api/agents/whatsapp-webhook`
6. Verify Token : choisis un mot de passe et ajoute comme `WHATSAPP_VERIFY_TOKEN`
7. Ajoute les 3 variables dans Vercel
8. **Zéro code à toucher** — tout s'active automatiquement

## Vérification
Lance le script de vérification :
```
npx tsx scripts/check-env.ts
```
