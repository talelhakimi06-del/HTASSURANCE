import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-refuse-vol-cambriolage",
  title: "Assurance refuse votre vol ou cambriolage : comment reagir ?",
  seoTitle: "Assurance refuse vol cambriolage : recours et contestation | HT Assurance",
  description: "Vol refuse par l assurance ? Absence d effraction, moyens de protection, sous-declaration... Tous les recours pour contester et obtenir votre indemnisation.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "10 min",
  image: { src: "/blog/images/assurance-refuse-vol-cambriolage.jpg", alt: "Assurance refuse vol cambriolage - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Le depot de plainte est-il obligatoire pour le vol ?", a: "Oui, le depot de plainte est une condition contractuelle dans tous les contrats. Sans plainte, l assureur peut legitimement refuser." },
  { q: "Mon assurance refuse car je n avais pas de serrure 3 points", a: "Verifiez les clauses exactes de votre contrat. L assureur doit prouver que l absence de serrure 3 points a facilite le vol. Si le cambrioleur est passe par la fenetre, la serrure est hors sujet." },
];

export default function Content() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: meta.seoTitle, description: meta.description, datePublished: "2026-03-22",
        author: { "@type": "Organization", name: "HT Assurance", url: "https://htassurance.fr" },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".answer-direct"] },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}} />

      <p className="answer-direct text-lg leading-relaxed">
        L assurance refuse votre sinistre vol ? C est un cas frequent. Absence d effraction, moyens de protection non conformes, declaration tardive... Voici comment contester efficacement et obtenir votre indemnisation.
      </p>

      <h2>Les motifs de refus les plus frequents</h2>
      <p>Les assureurs refusent les sinistres vol pour : absence de traces d effraction, non-respect des moyens de protection exiges (serrure 3 points, alarme), declaration tardive (delai de 2 jours ouvres), sous-declaration de la valeur des biens voles, ou suspicion de fraude.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>Absence d effraction : un motif souvent contestable</h2>
      <p>L absence de traces d effraction ne signifie pas qu il n y a pas eu de vol. Vol par ruse, vol a la fausse qualite, ou utilisation de faux sont des modes operatoires qui ne laissent pas de traces. Si votre contrat couvre le vol sans effraction, le refus est injustifie.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>Les preuves a rassembler</h2>
      <p>Depot de plainte (obligatoire), factures d achat des biens voles, photos des objets (album photo, reseaux sociaux), temoignages de voisins, rapport de police, releves de compte montrant les achats.</p>

      <h2>Contestation : mode d emploi</h2>
      <p>Envoyez une reclamation LRAR au service contentieux, en joignant toutes les preuves. Si le refus persiste, demandez une expertise contradictoire pour evaluer les dommages. Le mediateur de l assurance peut trancher en votre faveur.</p>

      <WarningBox>Ne signez jamais une quittance d&apos;indemnisation sous pression. Prenez le temps de verifier que le montant est juste.</WarningBox>

      <InlineCta text="Diagnostic gratuit sous 48h. Si on ne gagne pas, vous ne payez rien." />

      <h2>Questions frequentes</h2>
      {faq.map((f, i) => (
        <div key={i} className="mb-6">
          <h3 className="text-lg font-bold">{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </>
  );
}
