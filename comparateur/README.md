# HT Assurance — Comparateur IA

Application web conversationnelle qui aide les utilisateurs à trouver leurs assurances via un assistant IA.

**URL cible :** `comparateur.horstaxeassurance.fr`

---

## Architecture

```
comparateur/
├── app/
│   ├── page.tsx              → Page principale (rend ChatContainer)
│   ├── layout.tsx            → Layout + métadonnées SEO
│   ├── globals.css           → Styles globaux Tailwind
│   └── api/
│       ├── chat/route.ts     → Endpoint OpenAI (POST)
│       ├── lead/route.ts     → Enregistrement lead CRM (POST)
│       └── siret/route.ts    → Lookup entreprise data.gouv (GET)
├── components/
│   ├── ChatContainer.tsx     → Composant principal avec état
│   ├── ChatMessage.tsx       → Bulle de message (user/assistant)
│   ├── ChatInput.tsx         → Barre de saisie
│   ├── QuickReplies.tsx      → Boutons de réponse rapide
│   ├── EstimationCard.tsx    → Carte d'estimation de prix
│   ├── LeadFormModal.tsx     → Formulaire de capture lead
│   ├── ModeToggle.tsx        → Bascule Comparateur / Mon contrat
│   └── TypingIndicator.tsx   → Animation de chargement
└── lib/
    ├── types.ts              → Types TypeScript
    ├── systemPrompt.ts       → Prompt IA (flow de conversation)
    └── utils.ts              → Fonctions utilitaires
```

---

## Modes de l'application

### 1. Mode Comparateur (avant souscription)
L'IA guide l'utilisateur avec des questions structurées pour :
1. Identifier le type d'assurance
2. Comprendre le profil (particulier/professionnel)
3. Collecter les informations clés
4. Générer une estimation multi-assureurs
5. Capturer le lead (devis, rappel, WhatsApp)

### 2. Mode Mon contrat (après souscription)
Assistant personnel pour répondre aux questions sur :
- Garanties et couvertures
- Exclusions
- Procédures de sinistre
- Contact courtier

---

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` :

```env
OPENAI_API_KEY=sk-proj-votre-cle-ici
OPENAI_MODEL=gpt-4o-mini

# Optionnel — webhook CRM (Make, Zapier, N8N...)
CRM_WEBHOOK_URL=https://hook.eu1.make.com/xxxxx
```

### 2. Obtenir une clé OpenAI
- Rendez-vous sur [platform.openai.com](https://platform.openai.com/api-keys)
- Créez une nouvelle clé
- Copiez-la dans `.env.local`

---

## Développement local

```bash
cd comparateur
npm install
npm run dev
# → http://localhost:3010
```

---

## Déploiement Vercel

### Option A — CLI Vercel (recommandé)

```bash
cd comparateur
npx vercel --prod
```

Lors du premier déploiement, Vercel vous demandera :
- Nom du projet : `ht-comparateur`
- Framework : Next.js (détecté automatiquement)
- Root directory : `comparateur` (si déployé depuis le dossier parent)

### Option B — Depuis GitHub (intégration continue)

1. Poussez le dossier `comparateur/` dans un repo GitHub séparé
2. Connectez-le sur [vercel.com](https://vercel.com)
3. Configurez les variables d'environnement dans les Settings Vercel

### Variables d'environnement Vercel
Dans `Settings > Environment Variables`, ajoutez :
- `OPENAI_API_KEY` = votre clé
- `OPENAI_MODEL` = `gpt-4o-mini`
- `CRM_WEBHOOK_URL` = votre webhook (optionnel)

---

## Configuration du sous-domaine

Sur Vercel, après déploiement :

1. `Settings > Domains`
2. Ajoutez `comparateur.horstaxeassurance.fr`
3. Chez votre registrar DNS, ajoutez :
   ```
   CNAME  comparateur  cname.vercel-dns.com
   ```
4. Attendez la propagation DNS (5-60 minutes)

---

## Comment fonctionne l'IA

Le flux conversationnel est piloté par `lib/systemPrompt.ts` :

1. **Prompt système** : définit la personnalité, le barème de prix et les phases de conversation
2. **Format de réponse** : l'IA génère du texte + un bloc `<actions>` JSON
3. **Parsing** (`lib/utils.ts`) : le backend extrait le texte visible et les métadonnées structurées
4. **Rendu** : le frontend affiche les quick replies, les cartes d'estimation, etc.

### Phases de conversation
```
greeting → insurance_type → profile → details → estimation → lead_capture → lead_done
```

### Personnaliser le barème de prix
Modifiez `PRICE_REFERENCE` dans `lib/systemPrompt.ts` pour ajuster les fourchettes indicatives par assureur.

---

## Intégration APIs assureurs (futur)

Pour connecter de vraies APIs d'assureurs :

1. Créez `app/api/quote/[insurer]/route.ts` pour chaque assureur
2. Remplacez l'estimation IA par des appels API réels dans `app/api/chat/route.ts`
3. Utilisez le SIRET et les données collectées pour pré-remplir les formulaires assureurs

---

## Intégration CRM

Le fichier `app/api/lead/route.ts` envoie chaque lead au webhook configuré.

Formats supportés :
- **Make (Integromat)** : webhook HTTP
- **Zapier** : webhook Catch Hook
- **N8N** : webhook node
- **HubSpot** : API directe (à implémenter)

---

## Ajouter des fonctionnalités futures

### Base documentaire (Mode Assistant avancé)
Pour que l'assistant réponde sur des contrats spécifiques :
1. Stockez les PDF/conditions générales dans `public/docs/`
2. Utilisez l'API OpenAI Files ou une solution RAG (Pinecone, Supabase Vector)
3. Ajoutez un contexte de contrat au system prompt en mode assistant

### Scoring automatique des leads
Dans `app/api/lead/route.ts`, ajoutez une logique de scoring basée sur :
- Type d'assurance
- Profil professionnel/CA
- Historique de sinistres
- Urgence détectée dans la conversation

### Application mobile
L'architecture Next.js/API est prête pour une consommation via React Native ou une PWA.
