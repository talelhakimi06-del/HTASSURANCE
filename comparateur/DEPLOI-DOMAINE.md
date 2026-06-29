# Configurer comparateur.htassurance.fr

## Étape 1 : Ajouter le domaine sur Vercel (terminal)

Connecte-toi d'abord si besoin :
```bash
cd comparateur
npx vercel login
```

Puis ajoute le domaine :
```bash
npx vercel domains add comparateur.htassurance.fr
```

---

## Étape 2 : Configurer le DNS chez Google / Squarespace

Va sur ton gestionnaire de domaine (domains.google.com ou domains.squarespace.com).

**Ajoute cet enregistrement :**

| Type   | Nom / Hôte | Valeur / Cible        | TTL  |
|--------|------------|------------------------|------|
| CNAME  | comparateur| cname.vercel-dns.com   | 3600 |

---

## Étape 3 : Vérifier

- Attends 5 min à 1 h (propagation DNS)
- Sur Vercel : Settings > Domains → le domaine doit afficher "Valid Configuration"
- Teste : https://comparateur.htassurance.fr
