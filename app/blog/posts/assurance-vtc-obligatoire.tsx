import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-vtc-obligatoire",
  title: "Assurance VTC obligatoire : ce que la loi exige vraiment",
  seoTitle: "Assurance VTC Obligatoire 2025 : Couvertures Légales et Sanctions",
  description:
    "Quelles assurances sont obligatoires pour exercer en tant que chauffeur VTC ? Découvrez les couvertures imposées par la loi et les sanctions en cas de défaut.",
  category: "Assurance VTC",
  date: "Mars 2025",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
    alt: "Chauffeur VTC professionnel — assurance VTC obligatoire et garanties requises",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Devenir chauffeur VTC implique une réglementation stricte en matière d&apos;assurance.
        Contrairement à un particulier qui utilise sa voiture personnelle, un chauffeur VTC
        effectue un transport public de personnes à titre onéreux — ce qui change radicalement
        les exigences assurantielles. Ne pas être correctement assuré expose à des sanctions
        lourdes et à des risques financiers considérables.
      </p>

      <h2>Le cadre légal : la loi Thévenoud et ses décrets</h2>
      <p>
        La loi Thévenoud de 2014 a créé un cadre juridique clair pour les VTC (Voitures de
        Transport avec Chauffeur). Elle impose notamment que tout chauffeur VTC soit couvert
        par une assurance spécifique au transport de personnes. Cette obligation a été précisée
        et renforcée par plusieurs décrets depuis 2014.
      </p>
      <p>
        L&apos;assurance VTC n&apos;est donc pas une simple assurance auto classique. Il s&apos;agit
        d&apos;un contrat professionnel couvrant le transport rémunéré de passagers, qui doit
        être souscrit avant le premier trajet commercial.
      </p>

      <h2>Les couvertures obligatoires pour un chauffeur VTC</h2>
      <p>
        Voici les garanties minimales que tout chauffeur VTC doit impérativement avoir :
      </p>
      <ul>
        <li><strong>Responsabilité civile professionnelle</strong> (RC Pro transport) : couvre
        les dommages causés aux passagers, aux tiers et aux biens d&apos;autrui lors d&apos;une
        mission.</li>
        <li><strong>Assurance corporelle du conducteur</strong> : couvre les dommages
        corporels subis par le chauffeur lui-même en cas d&apos;accident.</li>
        <li><strong>Assurance responsabilité civile du véhicule</strong> : obligatoire
        pour tout véhicule en circulation, en mode professionnel.</li>
      </ul>

      <WarningBox>
        Une assurance auto personnelle ne couvre PAS l&apos;activité VTC. En cas d&apos;accident
        lors d&apos;une course Uber, Bolt ou autre plateforme, votre assureur personnel peut
        refuser d&apos;indemniser les victimes si votre contrat ne mentionne pas l&apos;usage
        professionnel transport de personnes.
      </WarningBox>

      <h2>Ce que couvre Uber pendant une mission — et ce qu&apos;il ne couvre pas</h2>
      <p>
        Uber propose une couverture d&apos;assurance pour les chauffeurs partenaires, mais elle
        est <strong>partielle et conditionnelle</strong> :
      </p>
      <ul>
        <li>Elle s&apos;active uniquement pendant une course acceptée</li>
        <li>Elle ne couvre pas les périodes en attente de commande</li>
        <li>Elle ne couvre pas le véhicule lui-même (pas de dommages matériels)</li>
        <li>Elle peut comporter des franchises importantes</li>
      </ul>
      <p>
        Un chauffeur VTC qui travaille avec Uber ou une autre plateforme doit donc
        impérativement souscrire sa propre assurance VTC pour combler les lacunes de
        la couverture plateforme.
      </p>

      <InlineCta text="HT Assurance compare les meilleures assurances VTC du marché pour les chauffeurs indépendants." />

      <h2>Quelles sont les sanctions en cas de défaut d&apos;assurance VTC ?</h2>
      <p>
        Exercer l&apos;activité VTC sans assurance adéquate peut entraîner des conséquences graves :
      </p>
      <ul>
        <li>Amende pénale pouvant atteindre <strong>3 750 €</strong></li>
        <li>Suspension ou retrait de la carte VTC</li>
        <li>Suspension du permis de conduire</li>
        <li>Responsabilité personnelle illimitée en cas d&apos;accident avec un passager</li>
        <li>Désactivation du compte sur les plateformes (Uber, Bolt, Heetch)</li>
      </ul>

      <TipBox>
        Certaines plateformes VTC exigent de télécharger une attestation d&apos;assurance
        valide pour activer ou maintenir votre compte chauffeur. Assurez-vous que votre
        attestation mentionne bien l&apos;activité de transport de personnes à titre onéreux.
      </TipBox>

      <h2>Comment choisir son assurance VTC ?</h2>
      <p>
        Au-delà des obligations légales, un bon contrat VTC doit inclure :
      </p>
      <ul>
        <li>La protection du véhicule (tous risques recommandé)</li>
        <li>La couverture hors mission (trajet domicile-travail, usage personnel)</li>
        <li>L&apos;assistance 24h/24 en cas de panne</li>
        <li>La protection juridique en cas de litige avec une plateforme ou un passager</li>
      </ul>
      <p>
        HT Assurance est spécialisé dans les assurances pour les professionnels du transport.
        Nous comparons les offres des principales compagnies couvrant les VTC pour vous
        trouver le meilleur rapport garanties/prix, à Nice et partout en France.
      </p>
    </>
  );
}
