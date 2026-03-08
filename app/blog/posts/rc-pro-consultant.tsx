import { InlineCta, TipBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "rc-pro-consultant",
  title: "RC Pro pour consultant : êtes-vous vraiment protégé ?",
  seoTitle: "RC Pro Consultant 2025 : Ce Qu'Elle Couvre et Comment Choisir",
  description:
    "La RC Pro est indispensable pour tout consultant. Découvrez ce qu'elle couvre réellement, les risques mal couverts et comment choisir le bon contrat.",
  category: "RC Pro",
  date: "Mars 2025",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    alt: "Consultant en réunion professionnelle — RC Pro obligatoire pour les consultants",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Un consultant, qu&apos;il soit en stratégie, IT, RH, marketing ou finance, vend avant
        tout son expertise. Mais que se passe-t-il si l&apos;un de vos conseils cause un
        préjudice financier à votre client ? Si une erreur dans votre livrable entraîne
        des pertes pour son entreprise ? Sans RC Pro, vous êtes personnellement exposé
        à ces risques — parfois pour des montants considérables.
      </p>

      <h2>Qu&apos;est-ce que la RC Pro pour un consultant ?</h2>
      <p>
        La responsabilité civile professionnelle (RC Pro) est l&apos;assurance qui protège
        le consultant contre les conséquences financières des dommages causés à ses
        clients ou à des tiers dans le cadre de son activité professionnelle.
      </p>
      <p>
        Elle couvre trois types de responsabilité :
      </p>
      <ul>
        <li><strong>Responsabilité contractuelle</strong> : manquement à vos obligations
        définies dans le contrat de mission</li>
        <li><strong>Responsabilité délictuelle</strong> : dommages causés à des tiers
        n&apos;ayant pas de lien contractuel avec vous</li>
        <li><strong>Responsabilité pénale</strong> : certains contrats incluent une
        défense pénale professionnelle</li>
      </ul>

      <h2>Quels risques sont couverts pour un consultant ?</h2>
      <ul>
        <li><strong>Erreur de conseil</strong> : une recommandation stratégique erronée
        qui coûte de l&apos;argent à votre client</li>
        <li><strong>Omission</strong> : avoir oublié de mentionner un risque ou une
        information importante dans votre rapport</li>
        <li><strong>Retard de livraison</strong> : si votre retard cause un préjudice
        financier mesurable à votre client</li>
        <li><strong>Violation de confidentialité</strong> : divulgation involontaire
        d&apos;informations sensibles appartenant à votre client</li>
        <li><strong>Atteinte aux droits de propriété intellectuelle</strong> : utilisation
        de contenus soumis à copyright dans vos livrables</li>
        <li><strong>Dommages aux locaux du client</strong> : si vous intervenez chez
        le client et causez des dégâts matériels</li>
      </ul>

      <TipBox>
        La RC Pro ne couvre pas les fraudes intentionnelles ni les malveillances.
        Elle est conçue pour protéger contre les erreurs non intentionnelles et les
        fautes professionnelles commises de bonne foi.
      </TipBox>

      <InlineCta text="HT Assurance compare les RC Pro consultants et vous trouve la couverture adaptée à votre secteur d'activité." />

      <h2>La RC Pro est-elle obligatoire pour un consultant ?</h2>
      <p>
        Pour la plupart des consultants indépendants (non réglementés), la RC Pro
        n&apos;est pas imposée par la loi. Mais elle est souvent <strong>exigée
        contractuellement</strong> :
      </p>
      <ul>
        <li>Par les grandes entreprises clientes (grands groupes, ETI)</li>
        <li>Par les ESN (entreprises de services numériques) qui vous référencent</li>
        <li>Par les marchés publics</li>
        <li>Par certains portages salarials</li>
      </ul>
      <p>
        Ne pas avoir de RC Pro peut donc vous exclure d&apos;opportunités commerciales
        significatives, en plus du risque financier que cela représente.
      </p>

      <h2>Quel montant de garantie choisir ?</h2>
      <p>
        Le montant dépend de la nature et du chiffre d&apos;affaires de vos missions :
      </p>
      <ul>
        <li><strong>Missions courtes, faible enjeu financier</strong> : 500 000 € à
        1 million d&apos;euros par sinistre</li>
        <li><strong>Missions complexes ou à fort enjeu</strong> (transformation IT,
        stratégie d&apos;entreprise...) : 2 à 5 millions d&apos;euros recommandés</li>
        <li><strong>Grandes entreprises clientes</strong> : vérifiez les exigences
        minimales de vos contrats clients — certains demandent 5 millions d&apos;euros</li>
      </ul>

      <h2>Quel est le prix d&apos;une RC Pro pour consultant ?</h2>
      <p>
        Pour un consultant indépendant avec un CA annuel de 50 000 à 150 000 € :
      </p>
      <ul>
        <li><strong>Couverture à 500 k€</strong> : à partir de 300 €/an</li>
        <li><strong>Couverture à 1 million €</strong> : entre 400 € et 800 €/an</li>
        <li><strong>Couverture à 2 millions €</strong> : entre 700 € et 1 500 €/an</li>
      </ul>
      <p>
        Les tarifs varient selon votre secteur d&apos;activité (conseil IT, conseil financier,
        conseil RH...) et votre chiffre d&apos;affaires. Un courtier peut accéder à des
        conditions tarifaires négociées.
      </p>

      <h2>HT Assurance, votre courtier RC Pro à Nice</h2>
      <p>
        HT Assurance accompagne les consultants indépendants, freelances et petites
        structures de conseil dans la souscription de leur RC Pro. Nous comparons les
        offres de plusieurs compagnies et vous trouvons la couverture adaptée à votre
        secteur d&apos;activité — à Nice et dans toute la France.
      </p>
    </>
  );
}
