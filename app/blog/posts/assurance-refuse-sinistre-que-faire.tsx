import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-refuse-sinistre-que-faire",
  title: "Assurance refuse votre sinistre : que faire ? Guide complet 2026",
  seoTitle: "Assurance refuse sinistre : que faire ? Recours et solutions | HT Assurance",
  description: "Votre assurance refuse votre sinistre ? Droits, recours, expertise contradictoire, mediateur : guide expert pour contester un refus abusif en 2026.",
  category: "Sinistres",
  date: "22 mars 2026",
  readTime: "12 min",
  image: { src: "/blog/images/assurance-refuse-sinistre-que-faire.jpg", alt: "Assurance refuse sinistre que faire - HT Assurance Expert Sinistres" },
};

const faq = [
  { q: "Quel est le delai pour contester un refus d'assurance ?", a: "Vous disposez de 2 ans a compter de la notification du refus (article L114-1 du Code des assurances). Une lettre recommandee interrompt ce delai." },
  { q: "Peut-on contester un refus sans avocat ?", a: "Oui. La plupart des contestations se reglent par reclamation ecrite, expertise contradictoire ou mediation, sans passer par un avocat." },
  { q: "L'expertise contradictoire est-elle obligatoire ?", a: "Non, mais c'est un droit fondamental de l'assure. Elle est fortement recommandee quand l'expert de l'assureur sous-evalue vos dommages." },
  { q: "Le mediateur de l'assurance est-il gratuit ?", a: "Oui, la saisine du mediateur est entierement gratuite. Il rend un avis sous 90 jours, suivi dans 99% des cas." },
  { q: "Que faire si l'assureur ne repond pas a ma reclamation ?", a: "Apres 2 mois sans reponse, vous pouvez saisir directement le mediateur de l'assurance ou envoyer une mise en demeure par LRAR." },
];

export default function Content() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: meta.seoTitle, description: meta.description, datePublished: "2026-03-22", dateModified: "2026-03-22",
        author: { "@type": "Organization", name: "HT Assurance", url: "https://htassurance.fr" },
        publisher: { "@type": "Organization", name: "HT Assurance" },
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2", ".answer-direct"] },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faq.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      })}} />

      <p className="answer-direct text-lg leading-relaxed">
        <strong>Oui, vous avez des recours.</strong> Un refus de sinistre n&apos;est pas une decision definitive. Vous disposez d&apos;un delai legal de 2 ans pour contester (article L114-1 du Code des assurances), et de nombreux refus reposent sur des interpretations abusives des clauses contractuelles. Ce guide vous explique etape par etape comment faire valoir vos droits.
      </p>

      <h2>Pourquoi l&apos;assurance refuse-t-elle un sinistre ?</h2>
      <p>Les assureurs refusent les sinistres pour plusieurs raisons, parfois legitimes, souvent contestables :</p>
      <ul>
        <li><strong>Exclusion contractuelle</strong> : une clause du contrat exclut le type de dommage subi</li>
        <li><strong>Defaut d&apos;entretien</strong> : l&apos;assureur estime que vous n&apos;avez pas entretenu le bien</li>
        <li><strong>Declaration tardive</strong> : vous avez depasse le delai de declaration (generalement 5 jours ouvrés)</li>
        <li><strong>Fausse declaration</strong> : les informations fournies a la souscription seraient inexactes</li>
        <li><strong>Sous-assurance</strong> : la valeur declaree est inferieure a la valeur reelle</li>
      </ul>

      <TipBox>
        En pratique, <strong>plus de 30% des refus</strong> sont contestables avec succes. L&apos;assureur a la charge de la preuve : c&apos;est a lui de demontrer que l&apos;exclusion s&apos;applique.
      </TipBox>

      <h2>Les 5 etapes pour contester un refus</h2>

      <h3>Etape 1 : Analyser la lettre de refus</h3>
      <p>Lisez attentivement le motif invoque. Demandez le contrat complet (conditions generales ET particulieres) si vous ne l&apos;avez pas. Verifiez si la clause d&apos;exclusion citee est bien applicable a votre situation.</p>

      <h3>Etape 2 : Envoyer une reclamation ecrite</h3>
      <p>Adressez une lettre recommandee avec AR au service reclamations de votre assureur. Expliquez pourquoi vous contestez, citez les articles du contrat et du Code des assurances. Ce courrier interrompt le delai de prescription.</p>

      <h3>Etape 3 : Demander une expertise contradictoire</h3>
      <p>C&apos;est votre droit fondamental. Designez votre propre expert (CNEI ou compagnie des experts de justice) pour contester les conclusions de l&apos;expert de l&apos;assureur. Cout : 500 a 2 000 euros, mais souvent tres rentable.</p>

      <InlineCta text="Nos courtiers analysent gratuitement votre dossier sous 48h et vous disent si le refus est contestable." />

      <h3>Etape 4 : Saisir le mediateur</h3>
      <p>Si le reclamation echoue, saisissez le Mediateur de l&apos;Assurance (gratuit). Envoyez votre dossier a La Mediation de l&apos;Assurance, TSA 50110, 75441 Paris Cedex 09. Avis sous 90 jours, suivi dans 99% des cas.</p>

      <h3>Etape 5 : Le tribunal judiciaire</h3>
      <p>En dernier recours, vous pouvez saisir le tribunal. Pour les litiges inferieurs a 5 000 euros, le tribunal de proximite suffit (pas d&apos;avocat obligatoire). Au-dela, le tribunal judiciaire avec avocat.</p>

      <WarningBox>
        <strong>Ne signez jamais</strong> une quittance d&apos;indemnisation sous pression. Une fois signee, elle est definitive et vous ne pourrez plus contester.
      </WarningBox>

      <h2>Le delai de prescription : 2 ans, mais interruptible</h2>
      <p>L&apos;article L114-1 du Code des assurances fixe le delai de prescription a 2 ans. Mais ce delai est interrompu par :</p>
      <ul>
        <li>Une lettre recommandee de reclamation</li>
        <li>La designation d&apos;un expert</li>
        <li>Une action en justice</li>
        <li>La saisine du mediateur</li>
      </ul>
      <p>Chaque interruption fait repartir un nouveau delai de 2 ans. Vous avez donc plus de temps que vous ne le pensez.</p>

      <h2>Quand faire appel a un courtier ?</h2>
      <p>Un courtier en assurance comme HT Assurance intervient <strong>en amont du contentieux</strong>. Nous connaissons les rouages internes des compagnies, les failles des contrats, et les leviers de negociation. 80% de nos dossiers se reglent sans tribunal, en 2 a 6 mois.</p>
      <p>Avantage decisif : notre remuneration est liee au resultat. Si nous ne recuperons rien, vous ne payez rien.</p>

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
