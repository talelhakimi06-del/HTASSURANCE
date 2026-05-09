import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "degat-des-eaux-assurance-refuse",
  title: "Degat des eaux : mon assurance refuse, comment contester ?",
  seoTitle: "Degat des eaux assurance refuse : recours et contestation | HT Assurance",
  description: "Votre assureur refuse votre degat des eaux ? Defaut d'entretien, vetuste, convention IRSI... Tous les recours pour obtenir votre indemnisation.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "11 min",
  image: { src: "/blog/images/degat-des-eaux-assurance-refuse.jpg", alt: "Degat des eaux assurance refuse - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Le constat amiable degat des eaux est-il obligatoire ?", a: "Il est fortement recommande mais pas obligatoire. Son absence ne peut pas justifier un refus total. Il facilite neanmoins la gestion du sinistre entre assureurs." },
  { q: "Qui paye si la fuite vient de chez mon voisin ?", a: "La convention IRSI prevoit que l'assureur de l'occupant du local ou se situe la cause du dommage gere le sinistre pour les montants inferieurs a 5 000 euros HT." },
  { q: "Mon assureur invoque la vetuste des canalisations", a: "La vetuste des canalisations est de l'usure normale, pas un defaut d'entretien. L'assureur doit prouver un veritable manquement a votre obligation d'entretien." },
  { q: "Quel est le delai pour declarer un degat des eaux ?", a: "5 jours ouvres a compter de la decouverte du sinistre. Un retard est tolere s'il n'a pas cause de prejudice a l'assureur." },
  { q: "La recherche de fuite est-elle a ma charge ?", a: "En general, la recherche de fuite est couverte par votre assurance habitation. Verifiez la garantie 'recherche de fuite' dans vos conditions particulieres." },
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
        Le degat des eaux est le <strong>sinistre le plus frequent en France</strong> (environ 800 000 par an) et aussi celui qui genere le plus de refus. Si votre assurance refuse votre degat des eaux, voici comment contester et obtenir votre indemnisation.
      </p>

      <h2>La convention IRSI : comment ca marche ?</h2>
      <p>La convention IRSI (Indemnisation et Recours des Sinistres Immeuble) simplifie la gestion des degats des eaux en copropriete :</p>
      <ul>
        <li><strong>Moins de 1 600 euros HT</strong> : l&apos;assureur de l&apos;occupe du local sinistre gere tout</li>
        <li><strong>1 600 a 5 000 euros HT</strong> : l&apos;assureur de l&apos;occupe du local d&apos;origine gere</li>
        <li><strong>Plus de 5 000 euros HT</strong> : chaque assureur gere ses propres assures, droit commun</li>
      </ul>

      <TipBox>Si votre assureur refuse en invoquant que la fuite vient de chez le voisin, verifiez si la convention IRSI s&apos;applique. Elle impose a votre propre assureur de gerer le sinistre dans certains cas.</TipBox>

      <h2>Les 4 motifs de refus les plus frequents</h2>

      <h3>1. Defaut d&apos;entretien</h3>
      <p>L&apos;argument prefere des assureurs. Ils pretendent que vous n&apos;avez pas entretenu vos canalisations. Or, une canalisation qui cede apres 20-30 ans d&apos;utilisation, c&apos;est de l&apos;usure normale. L&apos;assureur doit prouver un veritable manquement, pas simplement constater que le materiel est ancien.</p>

      <h3>2. Absence de constat amiable</h3>
      <p>Le constat amiable degat des eaux facilite la gestion mais n&apos;est pas une condition d&apos;indemnisation. Son absence ne peut justifier un refus total.</p>

      <h3>3. Origine inconnue de la fuite</h3>
      <p>Si la recherche de fuite n&apos;identifie pas la cause, l&apos;assureur peut tenter de refuser. Demandez une expertise approfondie et verifiez si votre contrat couvre la recherche de fuite.</p>

      <h3>4. Travaux non declares</h3>
      <p>Si vous avez fait des travaux de plomberie non declares, l&apos;assureur peut invoquer un changement de risque. Mais il doit prouver le lien entre les travaux et le sinistre.</p>

      <InlineCta text="Nous analysons gratuitement votre refus de degat des eaux sous 48h." />

      <WarningBox>Ne faites jamais de reparations avant le passage de l&apos;expert, sauf en cas d&apos;urgence (couper l&apos;eau, proteger les biens). Prenez des photos datees avant toute intervention.</WarningBox>

      <h2>Comment contester etape par etape</h2>
      <ol>
        <li><strong>Rassemblez les preuves</strong> : photos datees, factures, constat amiable, rapport de recherche de fuite</li>
        <li><strong>Reclamation ecrite</strong> : LRAR au service reclamations avec references au contrat</li>
        <li><strong>Expertise contradictoire</strong> : designez votre propre expert si les dommages sont sous-evalues</li>
        <li><strong>Mediateur</strong> : saisissez le mediateur de l&apos;assurance si le blocage persiste</li>
      </ol>

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
