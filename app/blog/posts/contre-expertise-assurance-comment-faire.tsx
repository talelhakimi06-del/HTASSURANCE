import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "contre-expertise-assurance-comment-faire",
  title: "Contre-expertise assurance : comment faire ? Guide pratique",
  seoTitle: "Contre-expertise assurance : guide complet pour contester l expert | HT Assurance",
  description: "L expert de l assurance sous-evalue vos dommages ? Decouvrez comment demander une contre-expertise, choisir votre expert et obtenir une juste indemnisation.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "9 min",
  image: { src: "/blog/images/contre-expertise-assurance-comment-faire.jpg", alt: "Contre-expertise assurance comment faire - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "La contre-expertise est-elle un droit ?", a: "Oui, c est un droit fondamental de l assure prevu par les conditions generales de la plupart des contrats." },
  { q: "L assureur peut-il refuser ma contre-expertise ?", a: "Non, l assureur ne peut pas refuser votre droit a une contre-expertise. Il doit accepter les conclusions du tiers expert en cas de desaccord." },
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
        Quand l expert mandate par votre assureur sous-evalue vos dommages, vous avez le droit de demander une contre-expertise. C est un levier puissant pour obtenir une juste indemnisation.
      </p>

      <h2>Qu est-ce qu une contre-expertise ?</h2>
      <p>L expertise contradictoire permet a l assure de designer son propre expert pour contester les conclusions de l expert de l assureur. Les deux experts tentent de s accorder. En cas de desaccord, un troisieme expert arbitre est designe.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>Quand la demander ?</h2>
      <p>Demandez une contre-expertise quand : <a href="/blog/indemnisation-insuffisante-assurance-contester" className="text-blue-600 font-semibold underline">l indemnisation proposee est nettement inferieure au cout reel des reparations</a>, l expert a oublie des postes de dommages, ou le taux de vetuste applique est excessif.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>Comment choisir son expert ?</h2>
      <p>Choisissez un expert inscrit au CNEI ou a la compagnie des experts de justice. Verifiez sa specialite (batiment, auto, incendie), son independance vis-a-vis des compagnies, et demandez un devis avant.</p>

      <h2>Combien ca coute ?</h2>
      <p>Entre 500 et 2 000 euros selon la complexite du dossier. C est a votre charge, mais c est souvent un investissement tres rentable : un expert d assure peut faire doubler votre indemnisation.</p>

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
