# Guide de publication — Comparateur Assurance GPT

## Prérequis
- Compte ChatGPT Plus (20$/mois)
- GPT_API_KEY définie dans Vercel (voir étape 0)

## Étape 0 : Générer la clé API
1. Va dans Vercel → projet ht-assurance → Settings → Environment Variables
2. Ajoute `GPT_API_KEY` avec une valeur aléatoire sécurisée (ex: `gpt_ht_2026_xxxxxxxxxxxx`)
3. Redéploie le projet

## Étape 1 : Créer le GPT
1. Va sur https://chat.openai.com/create
2. Ou via https://chatgpt.com/gpts/editor

## Étape 2 : Nom et description
- **Nom** : Comparateur Assurance France 🇫🇷
- **Description** : Comparez en 2 minutes les meilleures assurances habitation, auto et santé du marché français. Par ELIA, le moteur IA de HT Assurance.

## Étape 3 : Instructions système
Copie-colle le contenu de `CHATGPT-COMPARATEUR-PROMPT.md` (section "INSTRUCTIONS SYSTÈME") dans le champ "Instructions".

## Étape 4 : Ajouter les Actions
1. Clique sur "Create new action"
2. Dans le champ "Import from URL", colle :
   ```
   https://www.htassurance.fr/.well-known/openapi-comparateur.json
   ```
3. OpenAI importe automatiquement les 5 actions :
   - compareHabitation
   - compareAuto
   - compareSante
   - getQuote
   - explainInsurance

## Étape 5 : Authentification
1. Clique sur l'icône engrenage à côté de "Authentication"
2. Choisis **"API Key"**
3. Auth Type : **Bearer**
4. Colle ta `GPT_API_KEY` (la même que dans Vercel)

## Étape 6 : Conversation Starters
Ajoute ces 5 starters :
1. "Compare les meilleures assurances habitation pour un locataire à Nice"
2. "Quelle mutuelle santé pour une famille de 4 ?"
3. "Je veux changer d'assurance auto, aide-moi"
4. "Quelle différence entre tiers et tous risques ?"
5. "J'ai un profil malussé, quelles options j'ai ?"

## Étape 7 : Tester
Teste chaque conversation starter. Vérifie que :
- [ ] Les Actions sont appelées correctement
- [ ] Les tableaux comparatifs s'affichent
- [ ] Le CTA vers htassurance.fr apparaît
- [ ] get-quote envoie bien l'email à talelhakimi06@gmail.com

## Étape 8 : Publier
1. Clique "Save" → "Everyone" (public)
2. Catégorie recommandée : **"Productivity"** ou **"Lifestyle"**
3. Note l'URL du GPT publié

## Étape 9 : Configurer l'ID
1. L'URL du GPT ressemble à : `https://chat.openai.com/g/g-XXXXXXXXXXXX`
2. Copie l'ID (g-XXXXXXXXXXXX)
3. Ajoute `GPT_COMPARATEUR_ID=g-XXXXXXXXXXXX` dans Vercel env vars
4. Met à jour le lien sur la page htassurance.fr/gpt-comparateur

## Vérification finale
- [ ] 5 actions fonctionnelles
- [ ] Email de notification reçu à chaque devis
- [ ] Tableau comparatif affiché correctement
- [ ] CTA vers htassurance.fr visible
- [ ] BackOffice /admin affiche les stats GPT
