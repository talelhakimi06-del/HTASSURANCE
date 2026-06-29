"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/33986113257?text=Bonjour%2C%20mon%20assurance%20a%20refus%C3%A9%20mon%20sinistre.%20Pouvez-vous%20m%27aider%20%3F";
const PHONE = "tel:+33986113257";

const NAVY = "#0f1f3d";
const AMBER = "#d4832a";
const CREAM = "#f5f0e8";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */

const sinistresTypes = [
  { icon: "💧", title: "Dégât des eaux", desc: "Fuite, infiltration, dommages voisins — refus classique sur vétusté ou défaut d'entretien." },
  { icon: "🔥", title: "Incendie", desc: "Sinistre total ou partiel — refus fréquent pour sous-évaluation ou exclusion contractuelle." },
  { icon: "🔒", title: "Vol / Cambriolage", desc: "Vol de véhicule, effraction domicile — contestation des moyens de protection." },
  { icon: "🌊", title: "Catastrophe naturelle", desc: "Inondation, sécheresse, fissures — refus lié à l'arrêté CatNat ou aux franchises." },
  { icon: "🏚️", title: "Fissures / Malfaçons", desc: "Fissures structurelles, désordres post-travaux — litige décennale ou dommages-ouvrage." },
  { icon: "🚗", title: "Accident auto", desc: "Sinistre auto, vol, bris de glace — contestation du taux de responsabilité." },
  { icon: "🏗️", title: "Dommages-ouvrage", desc: "Refus de garantie décennale, délai de réponse dépassé, vice caché." },
  { icon: "💼", title: "RC Professionnelle", desc: "Mise en cause professionnelle, erreur de conseil — refus de prise en charge." },
];

const steps = [
  { num: "01", title: "Soumettez votre dossier", desc: "Envoyez-nous votre lettre de refus, votre contrat et les pièces du sinistre.", color: AMBER },
  { num: "02", title: "Analyse sous 48h", desc: "Notre équipe analyse la légitimité du refus et identifie les failles juridiques.", color: NAVY },
  { num: "03", title: "Verdict clair", desc: "On vous dit franchement si votre dossier est contestable ou non. Pas de faux espoirs.", color: AMBER },
  { num: "04", title: "Accompagnement complet", desc: "Recours amiable, médiation, expertise contradictoire — on gère tout jusqu'au résultat.", color: NAVY },
];

const comparatif = [
  { critere: "Analyse initiale", avocat: "200-500€/h", expert: "500-1500€", ht: "Gratuite" },
  { critere: "Délai d'analyse", avocat: "2-4 semaines", expert: "1-3 semaines", ht: "48 heures" },
  { critere: "Connaissance assurance", avocat: "Variable", expert: "Technique seule", ht: "Expertise métier" },
  { critere: "Négociation assureur", avocat: "Contentieux long", expert: "Non inclus", ht: "Directe & rapide" },
  { critere: "Coût si échec", avocat: "Honoraires dus", expert: "Honoraires dus", ht: "0€" },
];

const diagnosticQuestions = [
  {
    question: "Quel type de sinistre avez-vous subi ?",
    options: ["Dégât des eaux", "Incendie", "Vol", "Catastrophe naturelle", "Fissures/Malfaçons", "Accident auto", "Autre"],
  },
  {
    question: "Quand le sinistre est-il survenu ?",
    options: ["Moins de 6 mois", "6 mois à 1 an", "1 à 2 ans", "Plus de 2 ans"],
  },
  {
    question: "Avez-vous reçu une lettre de refus écrite ?",
    options: ["Oui, par courrier", "Oui, par email", "Non, refus verbal uniquement", "Pas encore de réponse"],
  },
  {
    question: "Le motif de refus invoqué est :",
    options: ["Exclusion contractuelle", "Défaut d'entretien / vétusté", "Déclaration tardive", "Sous-évaluation / franchise", "Je ne comprends pas le motif", "Autre"],
  },
  {
    question: "Avez-vous des preuves (photos, factures, rapports) ?",
    options: ["Oui, dossier complet", "Quelques éléments", "Non, rien du tout"],
  },
];

const faqItems = [
  // -- Recours et droits --
  { q: "Mon assurance a refuse mon sinistre, quels sont mes recours ?", a: "Vous disposez de plusieurs recours : la reclamation ecrite aupres du service contentieux de l'assureur, la saisine du mediateur de l'assurance (gratuit, delai de reponse de 90 jours), l'expertise contradictoire avec un expert de votre choix, et en dernier ressort le tribunal judiciaire. Le delai de prescription est de 2 ans a compter de la notification de refus (article L114-1 du Code des assurances). Nous vous accompagnons sur l'ensemble de ces demarches." },
  { q: "Quel est le delai de prescription pour contester un refus d'assurance ?", a: "Le delai de prescription est de 2 ans (article L114-1 du Code des assurances). Ce delai court a compter du jour ou l'assure a eu connaissance du refus. Attention : une lettre recommandee de reclamation interrompt ce delai et fait repartir un nouveau delai de 2 ans. N'attendez donc pas pour agir, mais sachez que vous avez des leviers pour gagner du temps." },
  { q: "L'assurance peut-elle legalement refuser un sinistre ?", a: "Oui, un assureur peut refuser un sinistre pour plusieurs raisons legitimes : exclusion contractuelle explicite, declaration tardive au-dela des delais prevus, fausse declaration intentionnelle, defaut de paiement des primes, ou sinistre anterieur a la souscription du contrat. Cependant, en pratique, de nombreux refus sont abusifs ou mal fondes : clause floue, interpretation excessive d'une exclusion, absence de preuve du manquement invoque. C'est precisement ces refus que nous contestons avec succes." },
  { q: "Combien coute votre analyse de dossier sinistre ?", a: "L'analyse initiale est 100% gratuite et sans engagement. Nous etudions votre contrat, la lettre de refus et les pieces du dossier, puis nous vous donnons un avis honnete sous 48 heures. Si nous prenons votre dossier en charge, nos honoraires sont lies au resultat : si nous ne recuperons rien, vous ne payez rien. Zero risque financier pour vous." },
  // -- Degat des eaux --
  { q: "Mon assurance refuse mon degat des eaux pour defaut d'entretien, que faire ?", a: "Le defaut d'entretien est le motif de refus le plus frequent et souvent le plus contestable. L'assureur doit prouver que vous avez manque a votre obligation d'entretien et que ce manquement est la cause directe du sinistre. En realite, une canalisation vetuste qui cede n'est pas forcement un defaut d'entretien — c'est souvent de l'usure normale. Nous analysons votre contrat pour verifier si l'exclusion est bien applicable et si l'assureur peut reellement la prouver." },
  { q: "Degat des eaux entre voisins : qui doit payer si l'assurance refuse ?", a: "En cas de degat des eaux entre voisins, la convention IRSI (Indemnisation et Recours des Sinistres Immeuble) s'applique pour les sinistres inferieurs a 5 000 euros HT. Si votre assureur refuse, verifiez d'abord si le constat amiable degat des eaux a bien ete rempli. L'assureur de l'occupant du local ou se situe la cause du dommage doit gerer le sinistre. Si le refus persiste, une expertise contradictoire peut debloquer la situation." },
  // -- Catastrophe naturelle --
  { q: "Mon assurance refuse mon sinistre catastrophe naturelle, est-ce legal ?", a: "L'indemnisation CatNat est encadree par la loi (articles L125-1 et suivants du Code des assurances). L'assureur ne peut pas refuser si : un arrete interministeriel de catastrophe naturelle a ete publie au Journal Officiel, votre commune est concernee, et vous avez declare le sinistre dans les 10 jours suivant la publication. Le refus est souvent lie a un probleme de franchise (1 520 euros minimum pour les habitations) ou a la contestation du lien entre la CatNat et les dommages. Nous verifions la conformite du refus avec les textes." },
  { q: "Fissures sur ma maison apres secheresse : comment contester le refus ?", a: "Les fissures liees au retrait-gonflement des argiles (RGA) representent 40% des sinistres CatNat. L'assureur conteste souvent le lien de causalite entre la secheresse et les fissures, ou invoque un vice de construction. Pour contester : faites realiser une etude de sol G5 par un geotechnicien, obtenez un rapport d'expert independant, et verifiez que votre commune figure bien dans l'arrete CatNat. Le cout des reparations peut depasser 50 000 euros — un refus non conteste represente une perte considerable." },
  // -- Incendie --
  { q: "Refus d'indemnisation incendie : quels sont les motifs contestables ?", a: "Les refus apres incendie reposent souvent sur : la suspicion de fraude (incendie volontaire), la sous-declaration de la valeur des biens, le non-respect des normes de securite (detecteur de fumee, installation electrique), ou une exclusion contractuelle pour negligence. Si l'assureur invoque la fraude, c'est a lui de le prouver (et non a vous de prouver votre innocence). Si c'est la valeur des biens qui est contestee, une expertise contradictoire avec devis de remplacement peut retablir la juste indemnisation." },
  // -- Vol --
  { q: "Mon assurance refuse mon sinistre vol : comment contester ?", a: "L'assureur refuse souvent un sinistre vol en invoquant : l'absence d'effraction (pas de traces visibles), le non-respect des moyens de protection exiges au contrat (serrure 3 points, alarme), ou la sous-declaration des biens voles. Pour contester : verifiez les clauses exactes de votre contrat sur les moyens de protection, rassemblez les preuves d'achat des biens voles, et sachez qu'un vol par ruse ou usage de faux est couvert meme sans effraction si votre contrat le prevoit. Le depot de plainte est indispensable." },
  // -- Auto --
  { q: "Mon assurance auto refuse mon sinistre : que faire ?", a: "En assurance auto, les refus courants concernent : la contestation du taux de responsabilite (via le constat amiable), l'exclusion pour alcool ou stupefiants, le refus de prise en charge du vehicule de remplacement, ou la sous-evaluation de l'indemnisation (valeur venale trop basse). Vous pouvez contester en demandant une contre-expertise du vehicule, en faisant jouer la convention IRSA entre assureurs, ou en saisissant le mediateur. Pour un accident corporel, ne signez jamais de transaction sans avis prealable." },
  { q: "Sinistre auto : l'assurance propose une indemnisation trop basse, comment faire ?", a: "Si l'indemnisation proposee vous semble insuffisante (valeur venale sous-evaluee, vetuste excessive), vous avez le droit de demander une contre-expertise. Rassemblez les annonces de vehicules similaires (meme modele, annee, kilometrage) pour prouver la valeur reelle du marche. L'argus n'est qu'une reference, pas une obligation legale. Si l'ecart est important, nous negocions directement avec l'expert de l'assureur pour obtenir une reevaluation." },
  // -- Decennale / Dommages-ouvrage --
  { q: "L'assurance decennale refuse de couvrir les malfacons, ai-je un recours ?", a: "La garantie decennale couvre les desordres qui compromettent la solidite de l'ouvrage ou le rendent impropre a sa destination (article 1792 du Code civil). L'assureur peut refuser si : les dommages sont purement esthetiques, le delai de 10 ans est depasse, l'entreprise n'etait pas assuree au moment des travaux, ou les travaux ne relevent pas de la construction (entretien courant). Si le refus porte sur la nature du desordre, une expertise judiciaire peut trancher. Nos courtiers connaissent les failles des contrats decennaux." },
  { q: "Dommages-ouvrage : l'assureur ne repond pas dans les 60 jours, que se passe-t-il ?", a: "L'assureur dommages-ouvrage a l'obligation legale de notifier sa decision dans les 60 jours suivant la reception de la declaration de sinistre (article L242-1 du Code des assurances). Passe ce delai, l'indemnisation est consideree comme acquise et vous pouvez engager les travaux de reparation aux frais de l'assureur. C'est un levier tres puissant que beaucoup d'assures ignorent. Nous verifions systematiquement le respect de ce delai." },
  // -- RC Pro --
  { q: "Ma RC Pro refuse de couvrir une mise en cause professionnelle, que faire ?", a: "La RC Professionnelle couvre les dommages causes aux tiers dans le cadre de votre activite. L'assureur peut refuser si : l'activite exercee ne correspond pas a celle declaree au contrat, le dommage resulte d'une faute intentionnelle, ou la reclamation est hors du perimetre de la garantie. Verifiez si votre contrat est en base fait dommageable ou reclamation — cela change le perimetre de couverture. Nous analysons la conformite du refus avec vos garanties reelles." },
  // -- Expertise contradictoire --
  { q: "Qu'est-ce qu'une expertise contradictoire et comment la demander ?", a: "L'expertise contradictoire est un droit fondamental de l'assure (article L114-1 du Code des assurances). Si vous contestez les conclusions de l'expert mandate par votre assureur, vous pouvez designer votre propre expert. Les deux experts tentent de s'accorder. En cas de desaccord, un troisieme expert (arbitre) est designe d'un commun accord ou par le tribunal. Le cout de votre expert est a votre charge (500 a 2 000 euros selon la complexite), mais c'est souvent un investissement tres rentable face a un refus injustifie." },
  { q: "Comment choisir un bon expert d'assure ?", a: "Un expert d'assure defend vos interets (contrairement a l'expert mandate par l'assureur). Choisissez un expert inscrit a la compagnie des experts de justice ou membre du CNEI. Verifiez sa specialite (batiment, automobile, incendie), demandez ses tarifs a l'avance, et assurez-vous qu'il est independant de toute compagnie d'assurance. Nous travaillons avec un reseau d'experts de confiance que nous pouvons vous recommander." },
  // -- Mediateur --
  { q: "Comment saisir le mediateur de l'assurance ?", a: "Le mediateur de l'assurance est un recours gratuit et independant. Pour le saisir : 1) Vous devez d'abord avoir epuise les voies de recours internes (reclamation ecrite au service client, puis au service reclamations). 2) Envoyez votre dossier complet a La Mediation de l'Assurance (TSA 50110, 75441 Paris Cedex 09) ou sur leur site mediation-assurance.org. 3) Le mediateur rend un avis dans un delai moyen de 90 jours. Cet avis n'est pas contraignant mais il est suivi dans 99% des cas par les assureurs." },
  // -- Pratique --
  { q: "Quels documents fournir pour contester un refus d'assurance ?", a: "Pour constituer un dossier solide : 1) Le contrat d'assurance complet (conditions generales ET particulieres), 2) La lettre de refus de l'assureur avec le motif invoque, 3) La declaration de sinistre et le constat, 4) Les photos et videos des dommages (datees), 5) Les factures et devis de reparation, 6) Le rapport de l'expert mandate par l'assureur (si disponible), 7) Toute correspondance echangee avec l'assureur. Plus votre dossier est complet, plus notre analyse sera rapide et precise." },
  { q: "Quelle est la difference entre un courtier et un avocat pour un litige assurance ?", a: "Un avocat specialise intervient principalement en phase contentieuse (tribunal), avec des honoraires de 200 a 500 euros/heure et des procedures qui durent 1 a 3 ans. Un courtier comme HT Assurance intervient en amont : nous connaissons les rouages internes des compagnies, nous negocions directement avec les services indemnisation, et nous utilisons l'expertise contradictoire et la mediation. Resultat : 80% des dossiers se reglent sans tribunal, en 2 a 6 mois, et a moindre cout. Si le contentieux est inevitable, nous vous orientons vers un avocat partenaire." },
  { q: "Mon assureur me propose une indemnisation partielle, dois-je accepter ?", a: "Ne signez jamais une quittance d'indemnisation sous pression. Une fois signee, elle est definitive — vous ne pourrez plus reclamer la difference. Avant d'accepter, faites evaluer le montant reel de vos dommages par un expert independant. Si l'offre est inferieure de plus de 20% a l'evaluation reelle, il y a matiere a negocier. Nous analysons gratuitement les propositions d'indemnisation pour vous dire si elles sont justes ou sous-evaluees." },
  { q: "Intervenez-vous partout en France ou uniquement a Nice ?", a: "Nous intervenons sur toute la France. Notre cabinet est base a Nice (06), mais 90% de nos dossiers sinistres se traitent a distance : envoi de documents par email, echanges telephoniques, visioconference si necessaire. Pour les expertises necessitant un deplacement (expertise contradictoire sur site), nous mobilisons notre reseau d'experts partenaires dans toute la France. Que vous soyez a Paris, Lyon, Marseille, Bordeaux ou ailleurs, nous traitons votre dossier avec la meme reactivite." },
  { q: "Combien de temps dure une procedure de contestation de sinistre ?", a: "Les delais varient selon la voie choisie : reclamation amiable directe (2 a 8 semaines), mediation de l'assurance (3 a 6 mois), expertise contradictoire (1 a 3 mois), tribunal judiciaire (12 a 36 mois). Notre approche privilegie les voies rapides : 65% de nos dossiers sont resolus en moins de 3 mois grace a la negociation directe et a l'expertise contradictoire. Le tribunal n'est envisage qu'en dernier recours." },
];

/* ─────────────────────────────────────────────────────────────────────────
   DIAGNOSTIC COMPONENT
───────────────────────────────────────────────────────────────────────── */

function DiagnosticWidget() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < diagnosticQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function getScore(): { score: number; verdict: string; detail: string } {
    let score = 0;

    // Type de sinistre — tous contestables
    score += 15;

    // Délai
    if (answers[1] === "Moins de 6 mois") score += 25;
    else if (answers[1] === "6 mois à 1 an") score += 20;
    else if (answers[1] === "1 à 2 ans") score += 10;
    else score += 0;

    // Lettre de refus
    if (answers[2]?.includes("courrier") || answers[2]?.includes("email")) score += 20;
    else if (answers[2]?.includes("verbal")) score += 10;
    else score += 15;

    // Motif
    if (answers[3]?.includes("comprends pas") || answers[3]?.includes("Exclusion")) score += 25;
    else if (answers[3]?.includes("Sous-évaluation") || answers[3]?.includes("Autre")) score += 20;
    else score += 15;

    // Preuves
    if (answers[4]?.includes("complet")) score += 15;
    else if (answers[4]?.includes("Quelques")) score += 10;
    else score += 5;

    if (score >= 75) return { score, verdict: "Dossier très contestable", detail: "Votre dossier présente des éléments solides. Nous avons de bonnes chances d'obtenir gain de cause." };
    if (score >= 50) return { score, verdict: "Dossier contestable", detail: "Des leviers existent pour contester ce refus. Une analyse approfondie permettra de confirmer." };
    return { score, verdict: "Analyse nécessaire", detail: "Votre situation nécessite un examen détaillé par nos experts. Soumettez votre dossier pour un diagnostic complet." };
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  }

  if (showResult) {
    const { score, verdict, detail } = getScore();
    const barColor = score >= 75 ? "#22c55e" : score >= 50 ? AMBER : "#ef4444";

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: barColor, fontFamily: "'Playfair Display', serif" }}>
            {score}%
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: NAVY, marginTop: 8, fontFamily: "'Playfair Display', serif" }}>
            {verdict}
          </div>
        </div>

        <div style={{ background: "#e5e7eb", borderRadius: 999, height: 12, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ width: `${score}%`, height: "100%", background: barColor, borderRadius: 999, transition: "width 1s ease" }} />
        </div>

        <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
          {detail}
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "white", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}
          >
            💬 Soumettre mon dossier
          </a>
          <button
            onClick={reset}
            style={{ background: "transparent", border: `2px solid ${NAVY}`, color: NAVY, padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            Refaire le diagnostic
          </button>
        </div>
      </div>
    );
  }

  const q = diagnosticQuestions[step];

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {diagnosticQuestions.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 999,
              background: i <= step ? AMBER : "#e2e8f0",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
        Question {step + 1} / {diagnosticQuestions.length}
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 20, fontFamily: "'Playfair Display', serif" }}>
        {q.question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{
              textAlign: "left",
              padding: "14px 18px",
              borderRadius: 12,
              border: "2px solid #e2e8f0",
              background: "white",
              fontSize: 15,
              color: NAVY,
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = AMBER;
              e.currentTarget.style.background = "#fffbf5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.background = "white";
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────────────────────────────────── */

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {faqItems.map((item, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: NAVY, paddingRight: 16, lineHeight: 1.5 }}>
              {item.q}
            </span>
            <span
              style={{
                fontSize: 22,
                color: AMBER,
                flexShrink: 0,
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
                fontWeight: 300,
              }}
            >
              +
            </span>
          </button>
          <div
            style={{
              maxHeight: open === i ? 500 : 0,
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, paddingBottom: 20 }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */

export default function SinistresPage() {
  return (
    <>
      {/* JSON-LD FAQPage schema for Google rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, background: CREAM }}>

        {/* ══ NAVBAR ══════════════════════════════════════════════════════ */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ fontSize: 18, fontWeight: 800, color: NAVY, textDecoration: "none" }}>
              HT<span style={{ color: "#2563eb" }}> Assurance</span>
            </Link>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Link href="/" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>
                Accueil
              </Link>
              <Link href="/blog" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>
                Blog
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </nav>

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 140,
            paddingBottom: 80,
            background: `linear-gradient(135deg, ${NAVY} 0%, #1a2d52 100%)`,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent line */}
          <div style={{ width: 60, height: 4, background: AMBER, borderRadius: 999, margin: "0 auto 24px" }} />

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              maxWidth: 800,
              margin: "0 auto 20px",
              padding: "0 24px",
            }}
          >
            Votre assurance refuse{" "}
            <span style={{ color: AMBER }}>votre sinistre</span> ?
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#94a3b8",
              maxWidth: 600,
              margin: "0 auto 40px",
              lineHeight: 1.7,
              padding: "0 24px",
            }}
          >
            Ne restez pas seul face à un refus abusif. Notre équipe de courtiers experts analyse
            gratuitement votre dossier et conteste les décisions injustifiées.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              flexWrap: "wrap",
              marginBottom: 48,
              padding: "0 24px",
            }}
          >
            {[
              { value: "2 ans", label: "Délai légal pour contester" },
              { value: "0€", label: "Si on ne gagne pas" },
              { value: "48h", label: "Analyse de votre dossier" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: AMBER, fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", padding: "0 24px" }}>
            <a
              href="#diagnostic"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: AMBER,
                color: "white",
                padding: "16px 32px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(212,131,42,0.4)",
              }}
            >
              Diagnostic gratuit →
            </a>
            <a
              href={PHONE}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.1)",
                color: "white",
                padding: "16px 32px",
                borderRadius: 14,
                fontWeight: 600,
                fontSize: 16,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              📞 09 86 11 32 57
            </a>
          </div>
        </section>

        {/* ══ TYPES DE SINISTRES ══════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
              Nos expertises
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              8 types de sinistres que nous contestons
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {sinistresTypes.map((s) => (
              <div
                key={s.title}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: 28,
                  border: "1px solid #e8e4de",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ PROCESS ══════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", background: NAVY }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
                Comment ça marche
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "white", marginTop: 12 }}>
                4 étapes vers votre indemnisation
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 24,
              }}
            >
              {steps.map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 32,
                    border: "1px solid rgba(255,255,255,0.1)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: s.color,
                      fontFamily: "'Playfair Display', serif",
                      marginBottom: 16,
                      opacity: 0.8,
                    }}
                  >
                    {s.num}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPARATIF ══════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
              Comparatif
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              Pourquoi nous plutôt qu&apos;un autre ?
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 15,
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <thead>
                <tr style={{ background: NAVY }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Critère</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", color: "#94a3b8", fontWeight: 600 }}>Avocat</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", color: "#94a3b8", fontWeight: 600 }}>Expert bâtiment</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", color: AMBER, fontWeight: 700 }}>HT Assurance</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: NAVY }}>{row.critere}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", color: "#64748b" }}>{row.avocat}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", color: "#64748b" }}>{row.expert}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", color: AMBER, fontWeight: 700 }}>{row.ht}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══ DIAGNOSTIC ══════════════════════════════════════════════════ */}
        <section
          id="diagnostic"
          style={{
            padding: "80px 24px",
            background: `linear-gradient(135deg, ${NAVY} 0%, #1a2d52 100%)`,
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
                Diagnostic gratuit
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, color: "white", marginTop: 12 }}>
                Votre dossier est-il contestable ?
              </h2>
              <p style={{ color: "#94a3b8", marginTop: 12, lineHeight: 1.7 }}>
                Répondez à 5 questions simples — résultat immédiat.
              </p>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: "36px 32px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              }}
            >
              <DiagnosticWidget />
            </div>
          </div>
        </section>

        {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
              Questions fréquentes
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              Tout savoir sur le recours sinistre
            </h2>
          </div>

          <FaqAccordion />
        </section>

        {/* ══ CTA FINAL ═══════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "80px 24px",
            background: NAVY,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 700,
                color: "white",
                marginBottom: 16,
                lineHeight: 1.25,
              }}
            >
              Ne laissez pas votre assureur{" "}
              <span style={{ color: AMBER }}>gagner</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 40 }}>
              Chaque jour qui passe réduit vos chances. Contactez-nous maintenant — l&apos;analyse est gratuite.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#22c55e",
                  color: "white",
                  padding: "18px 36px",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 17,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
                }}
              >
                💬 Envoyer mon dossier sur WhatsApp
              </a>
              <a
                href={PHONE}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "18px 36px",
                  borderRadius: 14,
                  fontWeight: 600,
                  fontSize: 17,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                📞 Nous appeler
              </a>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
        <footer style={{ background: "#0a1628", padding: "40px 24px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            © {new Date().getFullYear()} HT Assurance — Cabinet de courtage en assurance — Nice, France
          </p>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>
            <Link href="/" style={{ color: "#475569", textDecoration: "none" }}>Accueil</Link>
            {" · "}
            <Link href="/blog" style={{ color: "#475569", textDecoration: "none" }}>Blog</Link>
            {" · "}
            <Link href="/comparateur" style={{ color: "#475569", textDecoration: "none" }}>Comparateur IA</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
