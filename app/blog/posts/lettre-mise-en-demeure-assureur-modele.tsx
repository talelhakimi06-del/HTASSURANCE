import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "lettre-mise-en-demeure-assureur-modele",
  title: "Lettre de mise en demeure assureur : modele gratuit et guide",
  seoTitle: "Mise en demeure assureur : modele de lettre gratuit et conseils | HT Assurance",
  description: "Modele gratuit de lettre de mise en demeure a votre assureur. Quand l envoyer, comment la rediger et les effets juridiques. Guide expert.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "8 min",
  image: { src: "/blog/images/lettre-mise-en-demeure-assureur-modele.jpg", alt: "Lettre mise en demeure assureur modele - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "La mise en demeure est-elle obligatoire avant le tribunal ?", a: "Elle n est pas juridiquement obligatoire mais fortement recommandee. Elle prouve votre bonne foi et peut suffire a debloquer le dossier." },
  { q: "Quel delai donner dans la mise en demeure ?", a: "Un delai de 15 jours calendaires est standard. Pour les cas urgents, 8 jours peuvent suffire." },
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
        La mise en demeure est une etape cle pour faire pression sur votre assureur. Elle interrompt le delai de prescription et constitue une preuve de votre bonne foi. Voici un modele gratuit et nos conseils pour la rediger efficacement.
      </p>

      <h2>Quand envoyer une mise en demeure ?</h2>
      <p>Envoyez une mise en demeure quand : l assureur ne repond pas a votre reclamation dans les 2 mois, l indemnisation proposee est manifestement insuffisante, ou l assureur refuse sans motif valable.</p>

      <TipBox>Consultez un courtier expert avant d&apos;accepter toute proposition d&apos;indemnisation. Notre analyse est gratuite et sans engagement.</TipBox>

      <h2>Les elements obligatoires</h2>
      <p>La mise en demeure doit contenir : vos coordonnees et numero de contrat, le rappel des faits et du sinistre, les references legales (article L114-1 Code des assurances), un delai de reponse (generalement 15 jours), et la mention que vous vous reservez le droit de saisir le mediateur ou le tribunal.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h2>Modele de lettre</h2>
      <p>Objet : Mise en demeure - Sinistre n [numero] du [date]. Madame, Monsieur, Par la presente, je vous mets en demeure de proceder a l indemnisation de mon sinistre declare le [date], conformement aux garanties prevues par mon contrat n [numero]. A defaut de reponse sous 15 jours, je me reserve le droit de saisir le Mediateur de l Assurance puis le tribunal competent. Envoyez toujours par LRAR.</p>

      <h2>Effets juridiques</h2>
      <p>La mise en demeure interrompt le delai de prescription de 2 ans (article L114-1). Elle constitue une preuve de votre diligence en cas de procedure. Elle fait courir les interets moratoires a compter de sa reception.</p>

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
