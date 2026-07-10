import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "fissures-secheresse-assurance-catastrophe-naturelle",
  title: "Fissures et secheresse : comment obtenir l indemnisation CatNat",
  seoTitle: "Fissures secheresse assurance CatNat : indemnisation et recours | HT Assurance",
  description: "Fissures apres secheresse, arrete CatNat, retrait-gonflement argiles. Comment obtenir l indemnisation de votre assurance. Guide expert.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "12 min",
  image: { src: "/blog/images/fissures-secheresse-assurance-catastrophe-naturelle.jpg", alt: "Fissures secheresse assurance catastrophe naturelle - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Quelle est la franchise CatNat pour une habitation ?", a: "La franchise legale est de 1 520 euros pour les habitations. Elle peut etre majoree si votre commune a fait l objet de plus de 3 arretes CatNat en 5 ans." },
  { q: "Mon assureur dit que les fissures sont un vice de construction", a: "Demandez une expertise independante pour determiner si les fissures sont liees au RGA ou a un defaut de construction. Si c est le RGA, la garantie CatNat s applique." },
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
        Les fissures liees a la secheresse (retrait-gonflement des argiles) representent 40% des sinistres CatNat en France. Si votre assurance refuse, voici <a href="/sinistres" className="text-blue-600 font-semibold underline">comment contester</a> et obtenir votre indemnisation.
      </p>

      <h2>Le mecanisme du retrait-gonflement des argiles (RGA)</h2>
      <p>Les sols argileux gonflent avec l eau et se retractent en cas de secheresse, provoquant des mouvements de terrain qui fissurent les fondations. Le phenomene touche particulierement le sud de la France, dont les Alpes-Maritimes.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>L arrete CatNat : condition prealable</h2>
      <p>Pour etre indemnise, votre commune doit faire l objet d un arrete interministeriel de catastrophe naturelle publie au Journal Officiel. Vous avez ensuite 10 jours pour declarer le sinistre a votre assureur. Consultez le site georisques.gouv.fr pour verifier.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>Pourquoi l assureur refuse</h2>
      <p>Les motifs de refus : absence d arrete CatNat pour votre commune, contestation du lien de causalite entre la secheresse et les fissures, vice de construction invoque, ou franchise legale de 1 520 euros jugee suffisante.</p>

      <h2>Comment contester</h2>
      <p>Faites realiser une etude de sol G5 par un geotechnicien pour prouver le lien causal. Obtenez un <a href="/blog/contre-expertise-assurance-comment-faire" className="text-blue-600 font-semibold underline">rapport d expert independant</a>. Verifiez les dates : l arrete CatNat doit couvrir la periode de votre sinistre. Le cout des reparations peut depasser 50 000 euros.</p>

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
