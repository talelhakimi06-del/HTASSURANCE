/* ─────────────────────────────────────────────────────────────────────
   Schémas de formulaires par produit — utilisés en remplacement du
   chat "1 question 1 réponse" : ELIA affiche TOUS les champs d'un coup
   et fait UN SEUL appel IA à la soumission pour générer l'estimation.
───────────────────────────────────────────────────────────────────── */

export type FieldType = "select" | "text" | "tel" | "number" | "plate";

export type FormField = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];        // pour les selects
  placeholder?: string;
  helper?: string;           // texte d'aide sous le champ
  required?: boolean;
  pattern?: string;          // regex de validation HTML
};

export type ProductForm = {
  product: string;           // clé identifiant le produit
  label: string;             // label affiché et utilisé pour matcher les quickReplies
  emoji: string;
  title: string;
  subtitle: string;
  fields: FormField[];
  /** Mots-clés (lowercase) déclenchant l'ouverture du formulaire si tapés
      au clavier — recherche par inclusion, multi-mot accepté. */
  keywords: string[];
};

/* Les labels DOIVENT correspondre aux quickReplies du greeting dans
   ChatContainer.tsx → la fonction findFormByLabel() fait le match. */
export const FORMS: ProductForm[] = [
  {
    product: "auto",
    label: "Assurance auto",
    emoji: "🚗",
    title: "Assurance auto",
    subtitle: "Remplis tes infos en 1 minute, je te donne les fourchettes par assureur.",
    keywords: ["auto", "voiture", "véhicule", "vehicule", "automobile", "car"],
    fields: [
      {
        name: "usage",
        label: "Usage du véhicule",
        type: "select",
        options: ["Personnel", "Professionnel", "Mixte"],
        required: true,
      },
      {
        name: "codePostal",
        label: "Code postal du conducteur",
        type: "text",
        placeholder: "06000",
        required: true,
        pattern: "[0-9]{5}",
      },
      {
        name: "vehicule",
        label: "Plaque OU marque + modèle + année",
        type: "plate",
        placeholder: "AB-123-CD ou Peugeot 208 2022",
        helper: "Tape ta plaque : on récupère la photo et les infos automatiquement. Sinon, marque + modèle + année à la main.",
        required: true,
      },
      {
        name: "bonusMalus",
        label: "Bonus-malus actuel",
        type: "select",
        options: ["0.50", "0.60–0.70", "0.80", "0.90", "1.00 (neutre)", "Malus > 1"],
        required: true,
      },
      {
        name: "sinistres",
        label: "Sinistres dans les 3 dernières années",
        type: "select",
        options: ["Aucun", "1 sinistre", "2 sinistres ou plus"],
        required: true,
      },
      {
        name: "kilometrage",
        label: "Kilométrage annuel",
        type: "select",
        options: ["< 10 000 km", "10 000–20 000 km", "> 20 000 km"],
        required: true,
      },
      {
        name: "formule",
        label: "Formule souhaitée",
        type: "select",
        options: ["Tiers", "Intermédiaire", "Tous risques"],
        required: true,
      },
    ],
  },
  {
    product: "habitation",
    label: "Assurance habitation",
    emoji: "🏠",
    title: "Assurance habitation (MRH)",
    subtitle: "5 champs et je te donne les fourchettes par assureur.",
    keywords: ["habitation", "maison", "appartement", "logement", "mrh", "multirisque habitation", "résidence", "residence", "locataire", "propriétaire", "proprietaire"],
    fields: [
      {
        name: "statut",
        label: "Tu es",
        type: "select",
        options: ["Propriétaire occupant", "Propriétaire bailleur", "Locataire"],
        required: true,
      },
      {
        name: "adresse",
        label: "Adresse complète",
        type: "text",
        placeholder: "12 rue X, 06000 Nice",
        helper: "Pour analyser les risques naturels de ta zone.",
        required: true,
      },
      {
        name: "surface",
        label: "Surface",
        type: "select",
        options: ["< 40 m²", "40–80 m²", "80–120 m²", "> 120 m²"],
        required: true,
      },
      {
        name: "sinistres",
        label: "Sinistres habitation dans les 5 dernières années",
        type: "select",
        options: ["Aucun", "1 sinistre", "2 ou plus"],
        required: true,
      },
      {
        name: "equipements",
        label: "Équipements spéciaux",
        type: "select",
        options: ["Aucun", "Piscine", "Panneaux solaires", "Plusieurs"],
        required: true,
      },
    ],
  },
  {
    product: "rcpro",
    label: "RC Pro / Freelance",
    emoji: "💼",
    title: "RC Pro / Freelance",
    subtitle: "5 questions pour estimer ta RC Pro.",
    keywords: ["rc pro", "rcpro", "responsabilité civile pro", "responsabilite civile pro", "freelance", "indépendant", "independant", "auto-entrepreneur", "auto entrepreneur", "micro-entreprise", "consultant"],
    fields: [
      {
        name: "activite",
        label: "SIRET OU activité exacte",
        type: "text",
        placeholder: "Consultant IT freelance, ou 123 456 789 00012",
        helper: "Avec le SIRET, on confirme ton activité et ton ancienneté automatiquement.",
        required: true,
      },
      {
        name: "ca",
        label: "Chiffre d'affaires l'année passée",
        type: "select",
        options: ["< 50 k€", "50–150 k€", "150–500 k€", "> 500 k€"],
        required: true,
      },
      {
        name: "sinistres",
        label: "Sinistres RC Pro dans les 5 dernières années",
        type: "select",
        options: ["Aucun", "1 sinistre", "2 ou plus"],
        required: true,
      },
      {
        name: "rgpd",
        label: "Traitement de données personnelles (RGPD)",
        type: "select",
        options: ["Oui", "Non"],
        required: true,
      },
      {
        name: "couverture",
        label: "Montant de couverture souhaité",
        type: "select",
        options: ["100 k€", "500 k€", "1 M€", "2 M€ et plus"],
        required: true,
      },
    ],
  },
  {
    product: "decennale",
    label: "Décennale BTP",
    emoji: "🏗️",
    title: "Décennale BTP",
    subtitle: "5 questions pour estimer ta garantie décennale.",
    keywords: ["décennale", "decennale", "btp", "artisan", "chantier", "construction", "maçon", "macon", "couvreur", "plombier", "électricien", "electricien", "charpentier", "bâtiment", "batiment"],
    fields: [
      {
        name: "siret",
        label: "SIRET OU corps de métier",
        type: "text",
        placeholder: "Maçon gros œuvre, ou 123 456 789 00012",
        helper: "Avec le SIRET, on confirme ton corps de métier et ton ancienneté.",
        required: true,
      },
      {
        name: "ca",
        label: "Chiffre d'affaires prévisionnel HT",
        type: "select",
        options: ["< 50 k€", "50–150 k€", "150–500 k€", "> 500 k€"],
        required: true,
      },
      {
        name: "sinistres",
        label: "Sinistres dans les 3 dernières années",
        type: "select",
        options: ["Aucun", "1 sinistre", "2 ou plus"],
        required: true,
      },
      {
        name: "soustraitance",
        label: "Part de sous-traitance",
        type: "select",
        options: ["0 %", "< 30 %", "> 30 %"],
        required: true,
      },
      {
        name: "hauteur",
        label: "Travaux en hauteur > 4 m",
        type: "select",
        options: ["Oui", "Non"],
        required: true,
      },
    ],
  },
  {
    product: "vtc",
    label: "Assurance VTC",
    emoji: "🚙",
    title: "Assurance VTC",
    subtitle: "4 questions pour estimer ton contrat VTC.",
    keywords: ["vtc", "uber", "bolt", "chauffeur privé", "chauffeur prive", "taxi", "transport personnes"],
    fields: [
      {
        name: "plateforme",
        label: "Plateforme",
        type: "select",
        options: ["Uber", "Bolt", "Chauffeur Privé", "Plusieurs plateformes"],
        required: true,
      },
      {
        name: "vehicule",
        label: "Marque et modèle du véhicule (et année si connue)",
        type: "text",
        placeholder: "Mercedes Classe E 2021",
        required: true,
      },
      {
        name: "permis",
        label: "Ancienneté du permis",
        type: "select",
        options: ["< 3 ans", "3–5 ans", "5–10 ans", "> 10 ans"],
        required: true,
      },
      {
        name: "sinistres",
        label: "Sinistres dans les 3 dernières années",
        type: "select",
        options: ["Aucun", "1 sinistre", "2 ou plus"],
        required: true,
      },
    ],
  },
  {
    product: "emprunteur",
    label: "Assurance emprunteur",
    emoji: "🏦",
    title: "Assurance emprunteur",
    subtitle: "6 questions pour estimer ton coût mensuel.",
    keywords: ["emprunteur", "prêt", "pret", "crédit", "credit", "immobilier", "prêt immobilier", "pret immobilier", "crédit immo", "credit immo", "banque", "hypothèque", "hypotheque"],
    fields: [
      {
        name: "typePret",
        label: "Type de prêt",
        type: "select",
        options: ["Résidence principale", "Investissement locatif", "Prêt professionnel"],
        required: true,
      },
      {
        name: "montant",
        label: "Montant emprunté",
        type: "select",
        options: ["< 150 k€", "150–300 k€", "300–500 k€", "> 500 k€"],
        required: true,
      },
      {
        name: "duree",
        label: "Durée du prêt",
        type: "select",
        options: ["10 ans", "15 ans", "20 ans", "25 ans ou plus"],
        required: true,
      },
      {
        name: "age",
        label: "Ton âge (et co-emprunteur si applicable)",
        type: "text",
        placeholder: "38 ans, co-emprunteur 36 ans",
        required: true,
      },
      {
        name: "fumeur",
        label: "Fumeur",
        type: "select",
        options: ["Non fumeur", "Fumeur"],
        required: true,
      },
      {
        name: "professionRisque",
        label: "Profession à risque",
        type: "select",
        options: ["Non", "Oui (pompier, militaire, BTP en hauteur, etc.)"],
        required: true,
      },
    ],
  },
  {
    product: "trottinette",
    label: "Trottinette électrique",
    emoji: "🛴",
    title: "Trottinette électrique (NVEI/EDPM)",
    subtitle: "L'assurance RC est OBLIGATOIRE depuis 2019 (amende 500 € à 3 750 € sinon).",
    keywords: ["trottinette", "edpm", "nvei", "engin déplacement", "engin deplacement", "scooter électrique", "scooter electrique", "monoroue", "gyroroue", "hoverboard"],
    fields: [
      {
        name: "usage",
        label: "Usage",
        type: "select",
        options: ["Loisirs / Personnel", "Livraison / Professionnel"],
        required: true,
      },
      {
        name: "valeur",
        label: "Valeur de la trottinette",
        type: "select",
        options: ["< 300 €", "300–700 €", "700–1 500 €", "> 1 500 €"],
        required: true,
      },
      {
        name: "vitesse",
        label: "Vitesse max",
        type: "select",
        options: ["≤ 25 km/h (standard)", "Entre 25 et 45 km/h", "Je ne sais pas"],
        required: true,
      },
      {
        name: "codePostal",
        label: "Code postal",
        type: "text",
        placeholder: "06000",
        helper: "Le risque vol varie selon la ville.",
        required: true,
        pattern: "[0-9]{5}",
      },
      {
        name: "formule",
        label: "Formule souhaitée",
        type: "select",
        options: [
          "RC seule (obligatoire)",
          "RC + protection conducteur",
          "Tous risques (vol + dommages)",
        ],
        required: true,
      },
    ],
  },
];

export function findFormByLabel(label: string): ProductForm | undefined {
  return FORMS.find((f) => f.label.toLowerCase() === label.toLowerCase());
}

/* Normalise un texte pour le matching tolérant :
   - lowercase
   - retire les accents
   - collapse les espaces multiples
   - trim */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* Matching tolérant : retrouve un formulaire à partir d'un texte libre.
   1. Match exact sur le label (priorité absolue)
   2. Match par inclusion sur les keywords (tri par longueur de keyword
      descendant — préfère le keyword le plus spécifique, p.ex. "rc pro"
      avant "pro") */
export function findFormFromText(text: string): ProductForm | undefined {
  const norm = normalize(text);
  if (!norm) return undefined;

  // 1. Match exact label
  const exact = FORMS.find((f) => normalize(f.label) === norm);
  if (exact) return exact;

  // 2. Match keyword le plus long d'abord
  type Candidate = { form: ProductForm; keyword: string };
  const candidates: Candidate[] = [];
  for (const form of FORMS) {
    for (const kw of form.keywords) {
      const nkw = normalize(kw);
      if (nkw && norm.includes(nkw)) {
        candidates.push({ form, keyword: nkw });
      }
    }
  }
  if (candidates.length === 0) return undefined;

  candidates.sort((a, b) => b.keyword.length - a.keyword.length);
  return candidates[0].form;
}
