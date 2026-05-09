import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "sinistre-auto-refuse-assurance-recours",
  title: "Sinistre auto refuse par l assurance : tous vos recours",
  seoTitle: "Sinistre auto refuse : recours et contestation assurance | HT Assurance",
  description: "Votre assurance auto refuse votre sinistre ? Responsabilite contestee, indemnisation trop basse, exclusion... Tous les recours pour obtenir gain de cause.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "11 min",
  image: { src: "/blog/images/sinistre-auto-refuse-assurance-recours.jpg", alt: "Sinistre auto refuse assurance recours - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Mon assurance refuse car j ai souffle positif a l alcootest", a: "L exclusion pour alcool doit etre explicite dans le contrat. De plus, la garantie RC (responsabilite civile) reste obligatoire : l assureur doit indemniser la victime puis peut se retourner contre vous." },
  { q: "L assurance propose l argus mais mon vehicule vaut plus", a: "L argus n est pas une reference obligatoire. Fournissez des annonces de vehicules comparables pour prouver la valeur reelle du marche." },
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
        En assurance auto, les refus de sinistre sont frequents : contestation de responsabilite, exclusion pour alcool, indemnisation sous-evaluee. Voici tous vos recours pour obtenir une juste indemnisation.
      </p>

      <h2>Motifs de refus auto les plus frequents</h2>
      <p>Les assureurs auto refusent pour : contestation du taux de responsabilite via le constat amiable, exclusion alcool ou stupefiants, defaut de controle technique, fausse declaration sur le conducteur habituel, ou sinistre juge non accidentel.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>Le constat amiable : attention aux pieges</h2>
      <p>Le constat amiable est un document juridique. Une fois signe, il est tres difficile a contester. Ne signez jamais sous le choc. Si vous n etes pas d accord avec l autre conducteur, notez vos reserves et ne signez pas la partie commune.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>Indemnisation trop basse : la contre-expertise</h2>
      <p>Si la valeur venale proposee est trop basse, rassemblez les annonces de vehicules similaires (meme modele, annee, kilometrage) sur les sites de vente. L argus n est qu une reference, pas une obligation legale. Demandez une contre-expertise.</p>

      <h2>Convention IRSA entre assureurs</h2>
      <p>La convention IRSA regit les recours entre assureurs auto. Elle simplifie les procedures mais peut parfois defavoriser l assure. Si vous estimez que le partage de responsabilite est injuste, vous pouvez contester independamment de la convention.</p>

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
