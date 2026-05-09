import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "indemnisation-insuffisante-assurance-contester",
  title: "Indemnisation insuffisante : comment contester votre assurance ?",
  seoTitle: "Indemnisation insuffisante assurance : comment contester et obtenir plus | HT Assurance",
  description: "Votre assurance propose une indemnisation trop basse ? Vetuste abusive, franchise excessive, valeur sous-estimee... Comment obtenir une juste indemnisation.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "10 min",
  image: { src: "/blog/images/indemnisation-insuffisante-assurance-contester.jpg", alt: "Indemnisation insuffisante assurance contester - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Puis-je refuser l indemnisation proposee ?", a: "Oui, vous n etes pas oblige d accepter. Ne signez pas la quittance et contestez par ecrit en demandant une reevaluation." },
  { q: "La vetuste peut-elle depasser 50% ?", a: "Oui, les taux de vetuste peuvent aller jusqu a 80-90% pour du materiel tres ancien. Mais ils doivent etre justifies par un bareme objectif et transparent." },
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
        Votre assureur vous propose une indemnisation, mais le montant est nettement inferieur au cout reel de vos dommages. Vetuste excessive, franchise abusive, postes oublies : voici comment obtenir une juste indemnisation.
      </p>

      <h2>Indemnisation partielle vs refus total</h2>
      <p>L indemnisation insuffisante est differente du refus total. L assureur reconnait le sinistre mais minimise le montant. C est souvent plus facile a contester car le principe de la couverture est acquis, seul le montant est en discussion.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>La vetuste : le levier prefere des assureurs</h2>
      <p>L assureur applique un coefficient de vetuste pour deprecier vos biens. Exemple : votre canape de 3 ans achete 2 000 euros se voit appliquer 60% de vetuste = 800 euros d indemnisation. Contestez en demandant le bareme utilise et en comparant avec les baremes du marche.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>La quittance subrogative : attention danger</h2>
      <p>L assureur vous demande de signer une quittance en echange du paiement. UNE FOIS SIGNEE, ELLE EST DEFINITIVE. Vous ne pourrez plus reclamer la difference. Prenez le temps d evaluer si le montant est juste avant de signer.</p>

      <h2>La contre-expertise : votre meilleur atout</h2>
      <p>Designez votre propre expert pour reevaluer les dommages. L expert d assure connait les techniques des assureurs pour minimiser les montants. Il peut faire augmenter votre indemnisation de 30 a 100% dans de nombreux cas.</p>

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
