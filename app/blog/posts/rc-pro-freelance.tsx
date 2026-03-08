import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "rc-pro-freelance",
  title: "RC Pro freelance : ce qu'il faut savoir avant de signer une mission",
  seoTitle: "RC Pro Freelance 2025 : Obligatoire, Prix et Comment Choisir",
  description:
    "Freelance, la RC Pro est indispensable avant votre première mission. Découvrez ce qu'elle couvre, si elle est obligatoire et comment l'obtenir rapidement.",
  category: "RC Pro",
  date: "Mars 2025",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&q=80",
    alt: "Freelance travaillant sur ordinateur portable — assurance RC Pro indispensable",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Lorsqu&apos;on se lance en freelance, la RC Pro figure rarement en tête de la liste
        des priorités. C&apos;est pourtant l&apos;une des premières assurances à souscrire —
        avant même la signature de votre premier contrat de mission. Sans elle, votre
        patrimoine personnel est exposé en cas d&apos;erreur, d&apos;omission ou de litige
        avec un client.
      </p>

      <h2>RC Pro freelance : de quoi s&apos;agit-il exactement ?</h2>
      <p>
        La RC Pro (responsabilité civile professionnelle) est une assurance qui couvre
        les dommages que vous pourriez causer à vos clients ou à des tiers dans le cadre
        de votre activité professionnelle. Elle s&apos;active lorsque votre responsabilité
        est engagée et permet d&apos;indemniser les victimes à votre place, dans la limite
        des garanties souscrites.
      </p>
      <p>
        Pour un freelance, les situations les plus courantes sont :
      </p>
      <ul>
        <li>Un bug dans un code livré qui cause une perte financière au client</li>
        <li>Un conseil juridique ou comptable erroné</li>
        <li>Un projet graphique qui porte atteinte à des droits d&apos;auteur</li>
        <li>Un retard de livraison qui entraîne des pénalités pour le client</li>
        <li>Une violation de la confidentialité d&apos;un projet client</li>
      </ul>

      <h2>La RC Pro est-elle obligatoire pour un freelance ?</h2>
      <p>
        Pour la majorité des activités freelance non réglementées, la RC Pro n&apos;est pas
        une obligation légale. En revanche, elle est <strong>souvent imposée par les
        clients</strong> dans les contrats de prestation, notamment :
      </p>
      <ul>
        <li>Les grandes entreprises et groupes (ils exigent systématiquement une attestation)</li>
        <li>Les ESN (sociétés de services numériques) pour les missions en régie</li>
        <li>Les administrations et collectivités publiques</li>
        <li>Les plateformes de mise en relation professionnelle (certaines l&apos;imposent)</li>
      </ul>

      <WarningBox>
        Certaines activités freelance <strong>réglementées</strong> imposent la RC Pro
        par la loi : expert-comptable, architecte, avocat, médecin, notaire, agent
        immobilier. Si vous exercez une profession réglementée, renseignez-vous sur
        les montants minimaux obligatoires.
      </WarningBox>

      <InlineCta text="Obtenez votre RC Pro freelance en 24 h. HT Assurance compare les offres et vous envoie une attestation rapidement." />

      <h2>Quelles activités freelance sont les plus exposées ?</h2>
      <p>
        Certains métiers freelance présentent un niveau de risque plus élevé et
        nécessitent des garanties plus importantes :
      </p>
      <ul>
        <li><strong>Développeurs, ingénieurs logiciels</strong> : un bug en production
        peut paralyser l&apos;activité d&apos;un client entier</li>
        <li><strong>Consultants financiers ou comptables</strong> : une erreur de conseil
        peut entraîner des pertes importantes</li>
        <li><strong>Rédacteurs, créatifs, graphistes</strong> : risques de plagiat
        et d&apos;atteinte à la propriété intellectuelle</li>
        <li><strong>Formateurs</strong> : responsabilité sur le contenu des formations
        et leurs conséquences</li>
        <li><strong>Chefs de projet</strong> : responsabilité sur la coordination et
        les délais</li>
      </ul>

      <TipBox>
        Même avec une EURL ou SASU, votre responsabilité personnelle peut être engagée
        dans certains cas (faute grave, défaut d&apos;assurance). La RC Pro reste indispensable
        quelle que soit votre forme juridique.
      </TipBox>

      <h2>Quel prix pour une RC Pro freelance ?</h2>
      <p>
        Les tarifs sont accessibles, même pour les petites structures :
      </p>
      <ul>
        <li><strong>Freelance CA &lt; 50 k€/an</strong> : à partir de 250 €/an</li>
        <li><strong>Freelance CA entre 50 et 150 k€/an</strong> : entre 400 € et 900 €/an</li>
        <li><strong>Freelance CA &gt; 150 k€/an</strong> : entre 800 € et 2 000 €/an</li>
      </ul>
      <p>
        Pour les activités à risque élevé (développement, conseil financier), prévoyez
        des garanties entre 1 et 3 millions d&apos;euros. Le coût supplémentaire est marginal
        comparé à la protection apportée.
      </p>

      <h2>HT Assurance, votre courtier RC Pro freelance</h2>
      <p>
        Que vous soyez développeur, consultant, graphiste ou formateur, HT Assurance
        vous aide à trouver la RC Pro adaptée à votre activité. Nous comparons les
        offres des principaux assureurs et vous délivrons une attestation rapidement —
        en 24 à 48 h pour la plupart des dossiers.
      </p>
      <p>
        Nous accompagnons les freelances à Nice, Cannes, Antibes, Monaco et dans
        toute la France.
      </p>
    </>
  );
}
