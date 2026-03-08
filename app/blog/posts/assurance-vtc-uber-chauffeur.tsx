import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-vtc-uber-chauffeur",
  title: "Assurance VTC Uber : ce que couvre la plateforme et ce qu'il vous faut en plus",
  seoTitle: "Assurance VTC Uber 2025 : Couverture Plateforme et Complémentaire Nécessaire",
  description:
    "Chauffeur Uber ? Découvrez exactement ce que couvre l'assurance proposée par la plateforme, ses limites, et quelle assurance complémentaire vous devez souscrire.",
  category: "Assurance VTC",
  date: "Mars 2025",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80",
    alt: "Chauffeur Uber VTC — assurance spécifique pour chauffeurs de plateformes",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Uber propose à ses chauffeurs partenaires une couverture d&apos;assurance. Beaucoup
        de chauffeurs pensent qu&apos;elle est suffisante — c&apos;est une erreur qui peut leur
        coûter très cher. Dans cet article, nous expliquons précisément ce que couvre
        l&apos;assurance Uber, ses limites importantes, et quelle couverture personnelle
        vous devez impérativement souscrire en parallèle.
      </p>

      <h2>Ce que couvre l&apos;assurance proposée par Uber</h2>
      <p>
        Uber propose via son partenaire assureur une couverture d&apos;assurance pour les
        chauffeurs partenaires en France. Cette couverture s&apos;active en trois phases :
      </p>
      <ul>
        <li><strong>Phase 1 : application ouverte, en attente de course</strong>
        — couverture RC de base uniquement</li>
        <li><strong>Phase 2 : course acceptée, en route vers le passager</strong>
        — RC professionnelle activée</li>
        <li><strong>Phase 3 : passager à bord</strong>
        — couverture la plus complète, incluant les dommages corporels au passager</li>
      </ul>

      <WarningBox>
        En dehors de ces trois phases — c&apos;est-à-dire lorsque vous êtes connecté à
        l&apos;application mais sans course en cours, ou lorsque vous êtes hors connexion —
        vous n&apos;êtes couvert que par votre propre assurance personnelle ou professionnelle.
      </WarningBox>

      <h2>Les limites importantes de la couverture Uber</h2>
      <ul>
        <li><strong>Pas de couverture des dommages à votre véhicule</strong> : si votre
        voiture est endommagée lors d&apos;une course, Uber ne couvre généralement pas les
        réparations sauf en cas de tiers identifié.</li>
        <li><strong>Franchises élevées</strong> : selon les contrats, les franchises
        peuvent être très significatives.</li>
        <li><strong>Pas de protection juridique personnelle</strong> : en cas de
        contentieux avec un passager ou une plateforme, vous êtes seul.</li>
        <li><strong>Pas de couverture de la vie personnelle</strong> : utiliser votre
        véhicule VTC à titre personnel (courses, vacances) ne rentre pas dans la
        couverture Uber.</li>
      </ul>

      <h2>De quoi avez-vous besoin en plus ?</h2>
      <p>
        Pour être complètement couvert en tant que chauffeur Uber, vous devez souscrire
        un contrat d&apos;assurance VTC professionnel qui couvre :
      </p>
      <ul>
        <li><strong>Les dommages à votre véhicule</strong> (tous risques ou tierce
        collision) quelle que soit la phase d&apos;activité</li>
        <li><strong>L&apos;usage mixte professionnel et personnel</strong> de votre véhicule</li>
        <li><strong>La protection du conducteur</strong> : dommages corporels que vous
        subissez vous-même</li>
        <li><strong>La protection juridique</strong> : pour vous défendre en cas de
        litige avec un passager, une plateforme ou un autre conducteur</li>
        <li><strong>L&apos;assistance 0 km</strong> : intervention en cas de panne même
        à votre domicile ou à proximité</li>
      </ul>

      <InlineCta text="HT Assurance trouve l'assurance VTC qui complète parfaitement la couverture Uber pour votre profil." />

      <TipBox>
        Conservez précieusement votre relevé d&apos;information conducteur. Même en VTC,
        votre coefficient bonus-malus s&apos;applique et peut vous permettre d&apos;obtenir
        des réductions importantes sur votre prime.
      </TipBox>

      <h2>Que faire en cas d&apos;accident lors d&apos;une course Uber ?</h2>
      <p>
        Les démarches à suivre en cas d&apos;accident lors d&apos;une mission VTC :
      </p>
      <ul>
        <li>Remplir un constat amiable même si vous êtes responsable</li>
        <li>Prendre des photos des véhicules impliqués et des dommages</li>
        <li>Récupérer les coordonnées des témoins</li>
        <li>Déclarer l&apos;accident à Uber via l&apos;application (aide mémo de la course)</li>
        <li>Déclarer le sinistre à votre assureur personnel dans les 5 jours ouvrés</li>
      </ul>
      <p>
        Votre courtier joue un rôle crucial dans ces moments : il coordonne les déclarations,
        suit le dossier auprès des assureurs et défend vos intérêts si l&apos;indemnisation
        est contestée.
      </p>

      <h2>HT Assurance, courtier spécialisé VTC à Nice</h2>
      <p>
        Nous connaissons les spécificités de l&apos;assurance pour les chauffeurs de plateformes
        comme Uber, Bolt ou Heetch. Nous vous aidons à choisir le contrat qui complète
        efficacement la couverture de votre plateforme, sans surpayer.
      </p>
      <p>
        Contactez-nous depuis Nice, Cannes, Antibes ou Monaco pour une analyse gratuite
        de votre situation et un devis personnalisé sous 24 h.
      </p>
    </>
  );
}
