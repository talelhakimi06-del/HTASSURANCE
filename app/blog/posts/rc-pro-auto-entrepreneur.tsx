import { InlineCta, TipBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "rc-pro-auto-entrepreneur",
  title: "RC Pro auto-entrepreneur : obligatoire ou pas ? Ce qu'il faut vraiment savoir",
  seoTitle: "RC Pro Auto-Entrepreneur 2025 : Obligatoire, Prix et Souscription",
  description:
    "RC Pro obligatoire ou facultative pour un auto-entrepreneur ? La réponse dépend de votre activité. Découvrez ce dont vous avez besoin et comment souscrire.",
  category: "RC Pro",
  date: "Mars 2025",
  readTime: "6 min",
  image: {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80",
    alt: "Auto-entrepreneur professionnel — souscrire une RC Pro pour son activité",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Beaucoup d&apos;auto-entrepreneurs se lancent sans RC Pro, pensant s&apos;en passer
        facilement. C&apos;est une erreur qui peut coûter très cher. Si votre activité
        cause un dommage à un client ou à un tiers, vous êtes personnellement responsable
        — et votre patrimoine personnel peut être mis en jeu, même sous le régime
        de la micro-entreprise.
      </p>

      <h2>La RC Pro est-elle obligatoire pour un auto-entrepreneur ?</h2>
      <p>
        La réponse dépend de votre activité :
      </p>
      <ul>
        <li>
          <strong>Obligatoire légalement</strong> pour les professions réglementées :
          agent immobilier, expert-comptable, architecte, avocat, courtier d&apos;assurance,
          agent de voyage, ostéopathe, et de nombreuses autres professions libérales.
        </li>
        <li>
          <strong>Fortement recommandée</strong> pour toutes les autres activités
          de services (consultants, développeurs, artisans, prestataires...). Elle n&apos;est
          pas imposée par la loi mais elle est souvent exigée par vos clients.
        </li>
        <li>
          <strong>Quasi-indispensable</strong> si vous travaillez avec des entreprises
          ou des collectivités publiques qui demandent systématiquement une attestation
          RC Pro.
        </li>
      </ul>

      <h2>Quelles activités auto-entrepreneur nécessitent une RC Pro ?</h2>
      <p>
        Voici les profils pour lesquels la RC Pro est particulièrement importante :
      </p>
      <ul>
        <li><strong>Artisans</strong> : plombier, électricien, menuisier, maçon —
        tout dommage causé chez un client engage votre responsabilité</li>
        <li><strong>Prestataires de services intellectuels</strong> : développeur web,
        graphiste, rédacteur, consultant</li>
        <li><strong>Professionnels de la santé et du bien-être</strong> : coach,
        sophrologue, praticien en médecine douce</li>
        <li><strong>Auto-écoles et formateurs</strong></li>
        <li><strong>Professionnels de l&apos;événementiel</strong> : wedding planner,
        organisateur d&apos;événements</li>
      </ul>

      <TipBox>
        Même si votre client ne vous la demande pas, la RC Pro vous protège personnellement.
        Un auto-entrepreneur n&apos;a pas de bouclier juridique entre lui et ses dettes
        professionnelles — contrairement à une société avec responsabilité limitée.
      </TipBox>

      <InlineCta text="HT Assurance trouve votre RC Pro auto-entrepreneur en 24 h. Attestation délivrée immédiatement." />

      <h2>Quel est le prix d&apos;une RC Pro pour un auto-entrepreneur ?</h2>
      <p>
        Bonne nouvelle : les RC Pro pour auto-entrepreneurs sont parmi les assurances
        professionnelles les moins chères du marché :
      </p>
      <ul>
        <li><strong>Activités intellectuelles (CA &lt; 30 k€)</strong> : à partir de 200 €/an</li>
        <li><strong>Artisans (CA &lt; 50 k€)</strong> : entre 300 € et 700 €/an</li>
        <li><strong>Activités réglementées</strong> : montants variables selon la profession,
        souvent entre 500 € et 2 000 €/an</li>
      </ul>
      <p>
        Ces montants sont très accessibles au regard de la protection offerte. Une
        simple erreur non assurée peut entraîner un litige à plusieurs dizaines de
        milliers d&apos;euros.
      </p>

      <h2>Comment souscrire sa RC Pro en tant qu&apos;auto-entrepreneur ?</h2>
      <p>
        Le processus est simple et rapide :
      </p>
      <ul>
        <li>Vous transmettez votre numéro SIRET, votre activité et votre CA prévisionnel</li>
        <li>Le courtier identifie les assureurs adaptés à votre secteur</li>
        <li>Vous recevez une ou plusieurs propositions sous 24 h</li>
        <li>Vous signez en ligne et obtenez votre attestation immédiatement</li>
      </ul>
      <p>
        HT Assurance accompagne les auto-entrepreneurs à Nice, Cannes, Antibes, Monaco
        et dans toute la France pour la souscription de leur RC Pro. Audit gratuit
        de votre situation sans engagement.
      </p>
    </>
  );
}
