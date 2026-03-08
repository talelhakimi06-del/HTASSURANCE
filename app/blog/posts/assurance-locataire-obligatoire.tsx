import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-locataire-obligatoire",
  title: "Assurance locataire : est-elle vraiment obligatoire et que couvre-t-elle ?",
  seoTitle: "Assurance Locataire Obligatoire 2025 : Ce Qu'Elle Couvre et Son Prix",
  description:
    "L'assurance habitation est obligatoire pour tout locataire. Découvrez exactement ce qu'elle couvre, son prix moyen et les conséquences d'un défaut d'assurance.",
  category: "Habitation",
  date: "Mars 2025",
  readTime: "6 min",
  image: {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    alt: "Appartement en location — assurance habitation obligatoire pour le locataire",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Vous êtes locataire et vous vous demandez si vous êtes vraiment obligé de souscrire
        une assurance habitation ? La réponse est oui — et les conséquences d&apos;un défaut
        d&apos;assurance peuvent être graves, tant pour vous que pour votre propriétaire.
        Voici ce que vous devez savoir.
      </p>

      <h2>L&apos;assurance locataire est-elle obligatoire ?</h2>
      <p>
        Oui. La loi ALUR du 24 mars 2014 impose à tout locataire de justifier
        d&apos;une assurance habitation couvrant au minimum les <strong>risques locatifs</strong>
        (incendie, dégâts des eaux, explosions).
      </p>
      <p>
        Cette obligation s&apos;applique à tous les types de locations :
      </p>
      <ul>
        <li>Location vide (résidence principale)</li>
        <li>Location meublée (résidence principale)</li>
        <li>Location étudiante</li>
        <li>Colocation (chaque colocataire doit être assuré)</li>
      </ul>
      <p>
        Seule exception : les locations saisonnières ne sont généralement pas concernées
        par cette obligation légale.
      </p>

      <WarningBox>
        Le propriétaire peut résilier votre bail si vous ne fournissez pas d&apos;attestation
        d&apos;assurance lors de l&apos;entrée dans les lieux ou à chaque renouvellement annuel.
        Il peut également souscrire une assurance à votre place et vous en répercuter
        le coût, majoré de 10 %.
      </WarningBox>

      <h2>Que couvre l&apos;assurance locataire ?</h2>
      <p>
        Un contrat d&apos;assurance habitation locataire comprend généralement :
      </p>
      <ul>
        <li><strong>Responsabilité civile vie privée</strong> : couvre les dommages
        que vous causez à des tiers dans votre vie quotidienne (pas seulement dans
        le logement)</li>
        <li><strong>Risques locatifs</strong> : incendie, dégât des eaux, explosion —
        vous couvre vis-à-vis du propriétaire si vous êtes responsable</li>
        <li><strong>Protection de vos biens mobiliers</strong> : vol, incendie,
        dégât des eaux sur vos affaires personnelles</li>
        <li><strong>Catastrophes naturelles et technologiques</strong> : obligation
        légale pour tout contrat habitation en France</li>
        <li><strong>Protection juridique</strong> : en cas de litige avec le propriétaire,
        un voisin ou un prestataire</li>
      </ul>

      <TipBox>
        La valeur de vos biens mobiliers est souvent sous-évaluée lors de la souscription.
        Faites un inventaire réaliste (meubles, électroménager, vêtements, équipements
        hi-tech, vélo) — un sinistre grave peut vous coûter plusieurs milliers d&apos;euros.
      </TipBox>

      <InlineCta text="HT Assurance compare les meilleures assurances habitation locataire et vous trouve la meilleure offre." />

      <h2>Quel est le prix d&apos;une assurance locataire ?</h2>
      <p>
        Le tarif dépend de la surface du logement, du nombre de pièces, de la ville
        et du niveau de garanties choisi :
      </p>
      <ul>
        <li><strong>Studio ou T1 (&lt; 30 m²)</strong> : à partir de 60 €/an</li>
        <li><strong>T2 ou T3 (30 à 70 m²)</strong> : entre 80 € et 200 €/an</li>
        <li><strong>Grand appartement ou maison (&gt; 80 m²)</strong> : entre 150 € et 400 €/an</li>
      </ul>
      <p>
        Ces tarifs sont pour une formule de base. Avec des options (garantie valeur à neuf,
        protection high-tech, vélo...), la prime peut augmenter significativement.
      </p>

      <h2>Les pièges courants à éviter</h2>
      <ul>
        <li><strong>Sous-évaluer le capital mobilier</strong> : en cas de sinistre total,
        vous ne serez indemnisé qu&apos;à hauteur du montant déclaré</li>
        <li><strong>Oublier de déclarer des équipements de valeur</strong> : bijoux,
        instruments de musique, équipements photo nécessitent souvent une déclaration
        spécifique</li>
        <li><strong>Ne pas vérifier la clause de capitalisation</strong> : vérifiez si
        votre contrat couvre à la valeur de remplacement ou à la valeur vétustée</li>
      </ul>

      <h2>HT Assurance, votre courtier habitation à Nice</h2>
      <p>
        HT Assurance compare les offres d&apos;assurance habitation pour les locataires
        à Nice et sur la Côte d&apos;Azur. Nous vous aidons à choisir la couverture adaptée
        à votre logement et à vos biens, au meilleur prix.
      </p>
    </>
  );
}
