import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-vtc-resilie",
  title: "Assurance VTC après résiliation : comment retrouver une couverture",
  seoTitle: "Assurance VTC Résilié : Solutions pour Chauffeurs Sans Couverture",
  description:
    "Votre assurance VTC a été résiliée ? Découvrez vos droits, les assureurs spécialisés et comment retrouver une couverture rapidement malgré votre historique.",
  category: "Assurance VTC",
  date: "Mars 2025",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1200&q=80",
    alt: "Chauffeur VTC résilié — solutions pour retrouver une assurance après résiliation",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Une résiliation d&apos;assurance VTC est une situation redoutée par les chauffeurs
        professionnels. Elle peut intervenir après un sinistre important, un défaut de
        paiement ou une aggravation du risque. Et ses conséquences sont immédiates :
        sans assurance valide, vous ne pouvez plus exercer légalement. Retrouver une
        couverture après résiliation est possible — mais cela demande de la méthode
        et souvent l&apos;aide d&apos;un professionnel.
      </p>

      <h2>Les principales causes de résiliation d&apos;assurance VTC</h2>
      <ul>
        <li><strong>Sinistres répétés ou grave</strong> : plusieurs accidents déclarés
        sur une courte période ou un sinistre avec dommages corporels importants</li>
        <li><strong>Non-paiement des primes</strong> : retard ou défaut de paiement,
        même partiel</li>
        <li><strong>Fausse déclaration</strong> : kilométrage sous-déclaré, usage
        non déclaré, informations incorrectes à la souscription</li>
        <li><strong>Aggravation du risque</strong> : changement de véhicule, retrait
        de permis, nouvelles infractions</li>
        <li><strong>Résiliation à l&apos;échéance</strong> : l&apos;assureur décide de ne plus
        vous couvrir à la date anniversaire du contrat</li>
      </ul>

      <WarningBox>
        Conduire votre véhicule VTC sans assurance valide, même quelques jours après
        résiliation, est une infraction grave. Votre compte sur les plateformes peut être
        désactivé et vous vous exposez à des poursuites pénales.
      </WarningBox>

      <h2>Vos droits après une résiliation</h2>
      <p>
        La résiliation d&apos;assurance ne signifie pas que vous ne pouvez plus être assuré.
        Plusieurs droits s&apos;appliquent :
      </p>
      <ul>
        <li><strong>Relevé d&apos;information</strong> : votre ancien assureur est obligé
        de vous remettre un relevé d&apos;information gratuit dans les 15 jours suivant
        votre demande. Ce document retrace votre historique de sinistres.</li>
        <li><strong>Résiliation motivée</strong> : si la résiliation est due à un sinistre,
        l&apos;assureur doit vous en informer par lettre recommandée avec un préavis d&apos;au
        moins un mois.</li>
        <li><strong>Remboursement de prime</strong> : si vous avez payé une prime en avance,
        la part non consommée doit vous être remboursée.</li>
      </ul>

      <TipBox>
        Conservez tous les documents relatifs à votre résiliation (lettres, mails, relevés).
        Ils vous seront demandés par le prochain assureur pour évaluer votre dossier.
      </TipBox>

      <InlineCta text="HT Assurance spécialise dans les dossiers VTC difficiles. Nous trouvons une solution même après résiliation." />

      <h2>Comment retrouver une assurance VTC après résiliation ?</h2>
      <h3>1. Les assureurs spécialisés profils résilés</h3>
      <p>
        Certains assureurs acceptent les profils résilés, à des conditions adaptées
        (prime plus élevée, franchise importante, garanties restreintes dans un premier
        temps). Ces compagnies ne sont généralement pas accessibles en direct via des
        comparateurs grand public.
      </p>
      <h3>2. Le Bureau Central de Tarification (BCT)</h3>
      <p>
        Si vous essuyez plusieurs refus, vous pouvez saisir le BCT. Cet organisme
        public oblige une compagnie d&apos;assurance à vous couvrir au minimum en RC
        professionnelle. La procédure prend environ 3 mois — un délai à anticiper.
      </p>
      <h3>3. Passer par un courtier spécialisé</h3>
      <p>
        Un courtier connaît les assureurs qui acceptent les profils résilés VTC et
        sait comment présenter votre dossier pour maximiser vos chances. C&apos;est
        la solution la plus rapide et la plus efficace.
      </p>

      <h2>Préparer un bon dossier après résiliation</h2>
      <p>
        Pour convaincre un nouvel assureur, constituez un dossier solide :
      </p>
      <ul>
        <li>Votre relevé d&apos;information conducteur des 5 dernières années</li>
        <li>La lettre de résiliation et ses motifs</li>
        <li>Votre carte VTC en cours de validité</li>
        <li>Le certificat d&apos;immatriculation du véhicule</li>
        <li>Votre permis de conduire</li>
        <li>Une lettre explicative si la résiliation fait suite à des circonstances
        exceptionnelles (problème de santé, accident de vie...)</li>
      </ul>

      <h2>HT Assurance, spécialiste des dossiers VTC difficiles</h2>
      <p>
        Chez HT Assurance, nous traitons régulièrement des dossiers de chauffeurs VTC
        en situation de résiliation. Nous savons quels assureurs contactter, comment
        présenter votre profil et comment négocier les meilleures conditions dans
        votre situation.
      </p>
      <p>
        Notre objectif : vous permettre de reprendre votre activité le plus rapidement
        possible, avec une couverture adaptée. Contactez-nous pour une analyse
        gratuite et confidentielle de votre dossier.
      </p>
    </>
  );
}
