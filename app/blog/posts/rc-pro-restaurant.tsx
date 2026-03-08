import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "rc-pro-restaurant",
  title: "RC Pro restaurant : les assurances indispensables pour ouvrir sereinement",
  seoTitle: "RC Pro Restaurant 2025 : Couvertures Obligatoires et Prix",
  description:
    "Ouvrir un restaurant sans être correctement assuré est un risque majeur. RC Pro, RC exploitation, multirisque pro : découvrez ce qui est obligatoire et recommandé.",
  category: "RC Pro",
  date: "Mars 2025",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80",
    alt: "Restaurant professionnel — assurance RC Pro et multirisque pour la restauration",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Ouvrir un restaurant, c&apos;est s&apos;exposer à des risques quotidiens : un client
        qui glisse sur le carrelage, une intoxication alimentaire, un incendie en cuisine,
        une coupure de courant qui détériore les stocks. Sans assurances adaptées, chacun
        de ces événements peut mettre en péril votre établissement. Voici ce qu&apos;il faut
        absolument prévoir.
      </p>

      <h2>RC Pro vs RC exploitation : quelle différence pour un restaurant ?</h2>
      <p>
        Ces deux garanties couvrent des situations différentes et sont souvent confondues :
      </p>
      <ul>
        <li>
          <strong>RC Professionnelle (RC Pro)</strong> : couvre les dommages liés à vos
          fautes professionnelles, vos conseils ou vos prestations. Pour un restaurant,
          elle couvre par exemple une intoxication alimentaire due à un problème de
          préparation.
        </li>
        <li>
          <strong>RC Exploitation</strong> : couvre les dommages causés à des tiers
          dans le cadre de l&apos;exploitation de votre établissement, indépendamment
          de toute faute professionnelle. Exemple : un client qui se blesse en
          tombant dans votre salle.
        </li>
      </ul>
      <p>
        Un bon contrat pour restaurant doit inclure <strong>les deux</strong>. Elles
        sont généralement intégrées dans une assurance multirisque professionnelle (MRP).
      </p>

      <WarningBox>
        La RC Exploitation est <strong>obligatoire</strong> pour tout établissement
        accueillant du public (ERP). Sans elle, vous ne pouvez légalement pas ouvrir
        votre restaurant.
      </WarningBox>

      <h2>Quels risques spécifiques couvrir pour un restaurant ?</h2>
      <ul>
        <li><strong>Intoxication alimentaire</strong> : engagement de votre responsabilité
        si plusieurs clients sont touchés simultanément</li>
        <li><strong>Accident corporel client</strong> : chute, brûlure, blessure
        dans votre établissement</li>
        <li><strong>Incendie et dégâts des eaux</strong> : risques majeurs en restauration
        (cuisine professionnelle, cave à vins, matériels)</li>
        <li><strong>Perte d&apos;exploitation</strong> : maintien d&apos;une partie de votre
        chiffre d&apos;affaires si vous devez fermer temporairement</li>
        <li><strong>Bris de machine</strong> : panne de four professionnel, chambre froide,
        machines à café</li>
        <li><strong>Vol et vandalisme</strong> : protection de vos équipements et stocks</li>
        <li><strong>Dommages électriques</strong> : détérioration des aliments réfrigérés
        suite à une coupure de courant</li>
      </ul>

      <InlineCta text="HT Assurance compare les assurances multirisques professionnelles pour restaurants. Devis gratuit sous 24 h." />

      <TipBox>
        La garantie <strong>perte d&apos;exploitation</strong> est souvent négligée lors
        de l&apos;ouverture d&apos;un restaurant. Pourtant, si vous devez fermer 3 semaines
        suite à un dégât des eaux, c&apos;est votre chiffre d&apos;affaires entier qui s&apos;arrête
        — charges et salaires continuent, eux.
      </TipBox>

      <h2>L&apos;assurance multirisque professionnelle : la solution globale</h2>
      <p>
        Pour un restaurateur, l&apos;assurance multirisque professionnelle (MRP) est le
        contrat de référence. Elle regroupe en une seule police :
      </p>
      <ul>
        <li>RC Exploitation et RC Pro</li>
        <li>Protection des locaux (murs, aménagements)</li>
        <li>Protection du matériel professionnel</li>
        <li>Garantie bris de machine</li>
        <li>Perte d&apos;exploitation optionnelle</li>
        <li>Protection juridique professionnelle</li>
      </ul>
      <p>
        Le prix d&apos;une MRP restaurant varie selon la taille des locaux, le nombre
        de couverts et votre chiffre d&apos;affaires. Pour un restaurant de 30 à 60 couverts
        avec cuisine, comptez entre <strong>1 500 € et 4 000 €</strong> par an.
      </p>

      <h2>Les erreurs fréquentes lors de la souscription</h2>
      <ul>
        <li>Sous-évaluer la valeur de remplacement du matériel professionnel</li>
        <li>Ne pas déclarer la terrasse ou les espaces privatifs</li>
        <li>Oublier de déclarer l&apos;activité de traiteur ou de livraison</li>
        <li>Négliger la garantie perte de froid (stocks réfrigérés)</li>
        <li>Choisir un contrat sans protection juridique</li>
      </ul>

      <h2>HT Assurance, votre courtier pour les professionnels de la restauration</h2>
      <p>
        HT Assurance accompagne les restaurateurs et professionnels de la restauration
        à Nice et sur la Côte d&apos;Azur. Nous analysons votre activité en détail pour vous
        proposer une couverture sans lacune — et négocions les meilleures conditions
        auprès des assureurs spécialisés en risques commerciaux et restauration.
      </p>
    </>
  );
}
