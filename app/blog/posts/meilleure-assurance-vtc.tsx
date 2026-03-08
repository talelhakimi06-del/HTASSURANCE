import { InlineCta, TipBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "meilleure-assurance-vtc",
  title: "Meilleure assurance VTC : les critères pour bien choisir en 2025",
  seoTitle: "Meilleure Assurance VTC 2025 : Comparatif et Critères de Choix",
  description:
    "Comment choisir la meilleure assurance VTC ? Découvrez les critères essentiels, les garanties indispensables et comment comparer les offres efficacement.",
  category: "Assurance VTC",
  date: "Mars 2025",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    alt: "Comparer les meilleures assurances VTC professionnelles en 2025",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Face à la multiplication des offres d&apos;assurance VTC, trouver la « meilleure »
        n&apos;est pas une question de prix seul. Un contrat VTC adapté à votre profil doit
        couvrir l&apos;ensemble de votre activité, sans failles ni surprises en cas de sinistre.
        Voici les critères essentiels pour choisir en toute connaissance de cause.
      </p>

      <h2>Les garanties indispensables d&apos;une bonne assurance VTC</h2>
      <p>
        Avant de comparer les prix, identifiez les garanties que votre contrat VTC doit
        impérativement inclure :
      </p>
      <ul>
        <li><strong>RC professionnelle transport de personnes</strong> : couvre les dommages
        causés aux passagers et aux tiers lors d&apos;une course.</li>
        <li><strong>Protection du conducteur</strong> : indemnisation de vos propres
        dommages corporels si vous êtes responsable d&apos;un accident.</li>
        <li><strong>Dommages tous risques ou tierce collision</strong> : protection de
        votre véhicule, quelle que soit la cause du sinistre.</li>
        <li><strong>Assistance 0 km</strong> : intervention en cas de panne y compris
        devant chez vous.</li>
        <li><strong>Usage pro + perso</strong> : couverture de votre véhicule pour
        vos déplacements personnels.</li>
        <li><strong>Protection juridique</strong> : défense de vos intérêts en cas
        de litige avec un passager, une plateforme ou un tiers.</li>
      </ul>

      <TipBox>
        Vérifiez que le contrat couvre les <strong>trois phases d&apos;activité</strong> :
        application ouverte sans course, en route vers le passager, et passager à bord.
        Certains contrats n&apos;activent la couverture pro qu&apos;à partir de la phase 2.
      </TipBox>

      <h2>Les critères pour évaluer la qualité d&apos;un contrat</h2>
      <h3>Les plafonds de garantie</h3>
      <p>
        Un sinistre avec plusieurs victimes peut engager votre responsabilité pour
        des montants très élevés. Vérifiez que les plafonds RC de votre contrat
        sont suffisants (minimum 5 millions d&apos;euros recommandés).
      </p>
      <h3>Les franchises</h3>
      <p>
        La franchise est le montant qui reste à votre charge en cas de sinistre.
        Une franchise de 500 à 1 000 € sur les dommages matériels est raisonnable.
        Au-delà de 2 000 €, la garantie devient peu efficace.
      </p>
      <h3>Les exclusions</h3>
      <p>
        Lisez attentivement les exclusions de votre contrat. Les plus courantes
        en VTC sont : conduite sous l&apos;emprise de l&apos;alcool ou de stupéfiants
        (logique), mais aussi parfois la conduite de nuit, les sinistres survenus
        en dehors d&apos;une mission déclarée sur plateforme, ou les dommages dus
        à la fatigue.
      </p>
      <h3>La qualité du service en cas de sinistre</h3>
      <p>
        La réactivité de l&apos;assureur lors d&apos;un sinistre est aussi important que le
        niveau de couverture. Un véhicule immobilisé, c&apos;est un manque à gagner
        direct. Choisissez un assureur ou un courtier qui vous accompagne
        activement lors des démarches de sinistre.
      </p>

      <InlineCta text="HT Assurance compare les meilleurs contrats VTC du marché et vous accompagne en cas de sinistre." />

      <h2>VTC à temps plein vs VTC en complément d&apos;une activité</h2>
      <p>
        Votre niveau d&apos;activité influence fortement le contrat recommandé :
      </p>
      <ul>
        <li><strong>VTC à temps plein (plus de 40 000 km/an)</strong> : optez pour
        un contrat tous risques avec protection juridique et franchise basse.
        Le coût est plus élevé mais la protection est maximale.</li>
        <li><strong>VTC partiel (weekends, soirs)</strong> : un contrat mixte
        pro/perso avec kilométrage limité peut réduire la prime tout en vous
        couvrant sur toutes les missions.</li>
      </ul>

      <h2>Comment comparer efficacement les offres VTC ?</h2>
      <p>
        Pour comparer des offres de façon pertinente, suivez ces étapes :
      </p>
      <ul>
        <li>Listez vos besoins réels : kilométrage annuel, usage perso/pro, type de
        missions, plateformes utilisées</li>
        <li>Obtenez au moins 3 devis auprès d&apos;assureurs spécialisés VTC</li>
        <li>Comparez les garanties et exclusions, pas seulement le prix</li>
        <li>Vérifiez les avis sur la gestion des sinistres</li>
        <li>Faites appel à un courtier qui effectue ce travail pour vous</li>
      </ul>

      <h2>HT Assurance, votre partenaire assurance VTC</h2>
      <p>
        HT Assurance compare pour vous les meilleures offres VTC disponibles sur le
        marché. Nous travaillons avec des assureurs spécialisés dans le transport
        de personnes et négocions les conditions en votre faveur.
      </p>
      <p>
        Que vous soyez basé à Nice, Cannes, Antibes, Monaco ou ailleurs en France,
        contactez-nous pour une comparaison gratuite et personnalisée.
      </p>
    </>
  );
}
