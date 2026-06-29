# Mise en place WhatsApp Business + Standard téléphonique (démarrage gratuit)

> Objectif : connecter WhatsApp Business **et** monter un mini-standard qui renvoie
> ton **09** vers ton portable — sans rien dépenser pour démarrer.
>
> Choix retenus :
> - **WhatsApp** → Meta Cloud API en direct (hébergement gratuit, paiement au message)
> - **Standard voix** → **Zadarma** (PBX cloud gratuit) en **Option B** :
>   on garde le 09 sur la box et on fait un renvoi box → Zadarma → menu → portable.

---

## PARTIE 1 — Standard téléphonique (Zadarma, Option B)

### Étape 1 — Créer le compte Zadarma (gratuit)
1. Aller sur **zadarma.com** → « S'inscrire » (compte gratuit).
2. Vérifier l'email.

### Étape 2 — Prendre un numéro relais Zadarma
1. Menu **« Numéros »** → choisir un numéro **France** (les frais sont de quelques €/mois ;
   c'est le seul coût, parfois offert le 1er mois).
2. Ce numéro sert de **relais** : c'est lui qui portera le menu d'accueil.

### Étape 3 — Activer le standard virtuel (PBX gratuit)
1. Menu **« Standard / PBX »** → activer le PBX (gratuit).
2. Créer un **scénario d'appel** :
   - **Message d'accueil** (ex. « Bienvenue chez HT Assurance, votre courtier à Nice… »).
   - **Renvoi** vers ton **portable** (renvoi d'appel / call forwarding vers ton mobile).
   - (Optionnel) horaires d'ouverture + message hors horaires.
3. Tester en appelant le numéro Zadarma : tu dois entendre le menu, puis être joint sur ton portable.

### Étape 4 — Renvoyer ton 09 (box) vers le numéro Zadarma
> C'est l'étape « Option B » : les clients continuent d'appeler ton **09**,
> la box renvoie automatiquement vers le numéro Zadarma (qui joue le menu puis te transfère).

Selon ton opérateur box (Free / Orange / SFR / Bouygues), le renvoi d'appel se règle :
- soit depuis l'**espace client** / l'appli de l'opérateur (rubrique « téléphonie fixe » → « renvoi d'appel »),
- soit par un **code clavier** sur le téléphone fixe :
  - Renvoi **inconditionnel** : taper `** 21 * <numéro Zadarma> #` puis appel.
  - Désactiver le renvoi : `## 21 #`.

➡️ Mets le **numéro Zadarma** comme cible du renvoi.

### Résultat
Client appelle ton **09** → box renvoie vers **Zadarma** → **menu d'accueil** → **ton portable**.
Coût : seulement le petit numéro Zadarma. Le PBX et le menu sont gratuits.

---

## PARTIE 2 — WhatsApp Business (Meta Cloud API, gratuit)

> Le code d'envoi existe déjà dans le projet (`lib/whatsapp.ts`).
> Il tourne en « simulation » tant qu'il n'y a pas de token. Il faut juste fournir
> les identifiants Meta, puis on ajoutera la réception.

### Étape 1 — Compte Meta Business
1. Aller sur **business.facebook.com** → créer un **compte Business** (gratuit).
2. Renseigner les infos de l'entreprise (HT Assurance).

### Étape 2 — Créer l'app WhatsApp
1. Aller sur **developers.facebook.com** → **Mes apps** → **Créer une app**.
2. Type : **Entreprise** → ajouter le produit **WhatsApp**.

### Étape 3 — Ajouter ton numéro 09
1. Dans la config WhatsApp → **ajouter un numéro de téléphone** → saisir ton **09**.
2. Vérification par **appel vocal** (Meta appelle et **dicte un code**).
   - ⚠️ **À faire AVANT** de brancher le 09 sur le standard Zadarma,
     sinon l'appel de vérif tombe dans le menu et tu ne pourras pas noter le code.
   - ⚠️ Le 09 **ne doit pas** déjà être enregistré sur l'app WhatsApp classique.

### Étape 4 — Récupérer les identifiants
Dans le tableau de bord WhatsApp de l'app, noter :
- **Token d'accès permanent** → variable `WHATSAPP_TOKEN`
- **Phone Number ID** → variable `WHATSAPP_PHONE_ID`

### Étape 5 — Me transmettre les identifiants
1. Les ajouter dans **Vercel** (Project → Settings → Environment Variables) :
   - `WHATSAPP_TOKEN`
   - `WHATSAPP_PHONE_ID`
2. Me prévenir : j'active le mode **live**, je mets l'API à jour (actuellement v18 → version courante),
   et je code la **réception** (webhook) pour brancher les messages entrants sur tes agents.

### Coût
Hébergement **gratuit**. Tu paies seulement les messages envoyés ; les réponses au client
dans la fenêtre de service de 24 h sont généralement **gratuites**.

---

## Ordre conseillé
1. **Vérifier le 09 sur WhatsApp** (Partie 2, étapes 1→4) — tant que le 09 est encore en direct sur la box.
2. **Monter le standard Zadarma** (Partie 1) et activer le renvoi de la box.
3. Me donner les identifiants WhatsApp → j'active le live + la réception.
