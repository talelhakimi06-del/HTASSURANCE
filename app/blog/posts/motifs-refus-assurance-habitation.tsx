import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "motifs-refus-assurance-habitation",
  title: "Les 10 motifs de refus d'assurance habitation les plus frequents",
  seoTitle: "Motifs refus assurance habitation : les 10 plus frequents et comment contester",
  description: "Defaut d'entretien, vetuste, exclusion... Decouvrez les 10 motifs de refus d'assurance habitation et nos solutions pour contester chacun.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "10 min",
  image: { src: "/blog/images/motifs-refus-assurance-habitation.jpg", alt: "Motifs refus assurance habitation - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Mon assurance peut-elle refuser un degat des eaux pour vetuste ?", a: "L'assureur peut invoquer la vetuste pour reduire l'indemnisation, mais pas pour refuser totalement le sinistre sauf si le contrat prevoit une exclusion explicite pour usure normale." },
  { q: "Que faire si le motif de refus est flou ?", a: "Demandez une explication ecrite detaillee avec reference aux clauses exactes du contrat. Un motif vague est souvent le signe d'un refus contestable." },
  { q: "Le defaut d'entretien est-il un motif valable ?", a: "Seulement si l'assureur prouve le lien direct entre le defaut d'entretien et le sinistre. La charge de la preuve est sur l'assureur, pas sur vous." },
  { q: "Peut-on contester un refus pour declaration tardive ?", a: "Oui, si vous prouvez que le retard n'a pas cause de prejudice a l'assureur (article L113-2 du Code des assurances)." },
  { q: "Mon assurance refuse car je n'avais pas de detecteur de fumee", a: "La loi impose un detecteur mais son absence n'est generalement pas un motif de refus d'indemnisation. Verifiez les clauses specifiques de votre contrat." },
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
        Chaque annee, des milliers d&apos;assures voient leur sinistre habitation refuse. Voici les <strong>10 motifs les plus frequents</strong> et comment les contester efficacement.
      </p>

      <h2>1. Defaut d&apos;entretien</h2>
      <p>Le motif le plus invoque et le plus contestable. L&apos;assureur pretend que vous n&apos;avez pas entretenu votre bien. Mais c&apos;est a lui de prouver le lien entre le defaut et le sinistre. Une canalisation qui cede apres 30 ans, c&apos;est de l&apos;usure, pas un defaut d&apos;entretien.</p>

      <h2>2. Vetuste / Usure normale</h2>
      <p>L&apos;assureur applique un coefficient de vetuste excessif pour reduire ou refuser l&apos;indemnisation. Contestez en demandant le detail du calcul et en comparant avec les baremes habituels du secteur.</p>

      <h2>3. Exclusion contractuelle</h2>
      <p>Une clause du contrat exclut le type de sinistre. Verifiez que la clause est claire, limitee et qu&apos;elle a ete portee a votre connaissance. Les clauses ambigues s&apos;interpretent en faveur de l&apos;assure (article L133-2 du Code de la consommation).</p>

      <TipBox>Les clauses d&apos;exclusion doivent etre formelles et limitees. Une exclusion vague comme &quot;negligence&quot; sans precision est juridiquement contestable.</TipBox>

      <h2>4. Declaration tardive</h2>
      <p>Le delai de declaration est generalement de 5 jours ouvres (2 jours pour le vol). Mais un retard n&apos;est un motif de refus que s&apos;il a cause un prejudice a l&apos;assureur (article L113-2 du Code des assurances).</p>

      <h2>5. Sous-assurance</h2>
      <p>Si la valeur declaree est inferieure a la valeur reelle, l&apos;assureur applique la regle proportionnelle. Exemple : bien assure pour 100 000 euros mais valant 200 000 euros = indemnisation divisee par 2.</p>

      <InlineCta text="Nous verifions gratuitement si le motif de refus est juridiquement fonde." />

      <h2>6. Defaut de moyens de protection</h2>
      <p>Serrure non conforme, alarme non activee... L&apos;assureur doit prouver que les moyens exiges au contrat n&apos;etaient pas en place ET que cela a facilite le sinistre.</p>

      <h2>7. Non-paiement des primes</h2>
      <p>L&apos;assureur doit avoir envoye une mise en demeure par LRAR, puis respecte un delai de 30 jours avant de suspendre les garanties. Verifiez que cette procedure a ete respectee.</p>

      <h2>8. Fausse declaration intentionnelle</h2>
      <p>C&apos;est le motif le plus grave : nullite du contrat. Mais l&apos;assureur doit prouver l&apos;intentionnalite de la fausse declaration, pas une simple erreur ou oubli.</p>

      <WarningBox>Une fausse declaration non intentionnelle ne peut pas entrainer la nullite du contrat. L&apos;assureur peut seulement appliquer une reduction proportionnelle.</WarningBox>

      <h2>9. Sinistre anterieur a la souscription</h2>
      <p>L&apos;assureur pretend que le dommage existait avant la signature du contrat. Contestez avec un rapport d&apos;expert datant les dommages.</p>

      <h2>10. Absence de constat amiable</h2>
      <p>Pour les degats des eaux, le constat amiable est recommande mais pas obligatoire. Son absence ne peut pas justifier un refus total d&apos;indemnisation.</p>

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
