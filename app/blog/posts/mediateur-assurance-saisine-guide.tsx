import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "mediateur-assurance-saisine-guide",
  title: "Saisir le mediateur de l assurance : guide complet 2026",
  seoTitle: "Mediateur assurance : comment le saisir ? Guide et procedure | HT Assurance",
  description: "Comment saisir le mediateur de l assurance ? Conditions, delais, procedure et chances de succes. Guide complet par HT Assurance.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "10 min",
  image: { src: "/blog/images/mediateur-assurance-saisine-guide.jpg", alt: "Mediateur assurance saisine guide - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "La saisine du mediateur est-elle gratuite ?", a: "Oui, la procedure est entierement gratuite pour l assure." },
  { q: "L avis du mediateur est-il obligatoire pour l assureur ?", a: "Non, l avis n est pas juridiquement contraignant, mais il est suivi dans 99% des cas. En cas de refus, vous pouvez saisir le tribunal." },
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
        Le mediateur de l assurance est un recours gratuit et independant pour resoudre les litiges avec votre assureur. Voici comment le saisir efficacement et maximiser vos chances de succes.
      </p>

      <h2>Role du mediateur</h2>
      <p>Le mediateur examine les litiges entre assures et assureurs. Il rend un avis motive sous 90 jours. Cet avis n est pas contraignant juridiquement mais il est suivi dans 99% des cas par les assureurs.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>Conditions de saisine</h2>
      <p>Vous devez avoir epuise les voies de recours internes : reclamation ecrite au service client, puis au service reclamations. Conservez les copies de tous vos echanges. Le mediateur refuse les dossiers ou les recours internes n ont pas ete tentes.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>Comment envoyer votre dossier</h2>
      <p>Envoyez votre dossier complet a : La Mediation de l Assurance, TSA 50110, 75441 Paris Cedex 09. Ou en ligne sur mediation-assurance.org. Joignez : contrat, lettre de refus, correspondances, et justificatifs.</p>

      <h2>Delais et statistiques</h2>
      <p>Le mediateur rend son avis sous 90 jours en moyenne. En 2025, 60% des avis etaient favorables aux assures, totalement ou partiellement. C est donc un recours efficace et gratuit.</p>

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
