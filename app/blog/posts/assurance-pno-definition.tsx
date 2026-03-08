import { InlineCta, TipBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-pno-definition",
  title: "Assurance PNO : définition, utilité et ce qu'elle couvre pour les propriétaires",
  seoTitle: "Assurance PNO (Propriétaire Non Occupant) : Définition et Couvertures 2025",
  description:
    "L'assurance PNO est indispensable pour tout propriétaire qui loue son bien. Découvrez ce qu'elle couvre, pourquoi elle diffère de l'assurance habitation classique.",
  category: "Habitation",
  date: "Mars 2025",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
    alt: "Propriétaire non occupant avec clés d'appartement — assurance PNO pour investisseurs",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Vous êtes propriétaire d&apos;un appartement ou d&apos;une maison que vous mettez en
        location ? L&apos;assurance PNO (Propriétaire Non Occupant) est faite pour vous.
        Méconnue de beaucoup d&apos;investisseurs immobiliers, elle comble les lacunes
        que ni votre assurance de copropriété ni l&apos;assurance de votre locataire
        ne couvrent. Voici tout ce qu&apos;il faut savoir.
      </p>

      <h2>PNO : qu&apos;est-ce que c&apos;est exactement ?</h2>
      <p>
        L&apos;assurance Propriétaire Non Occupant (PNO) est un contrat d&apos;assurance habitation
        destiné aux propriétaires bailleurs — c&apos;est-à-dire ceux qui possèdent un bien
        immobilier mais ne l&apos;habitent pas.
      </p>
      <p>
        Elle couvre la responsabilité civile du propriétaire en tant que tel, ainsi que
        les dommages subis par le bien lors de situations où l&apos;assurance du locataire
        ne s&apos;applique pas :
      </p>
      <ul>
        <li>Période de vacance locative (logement inoccupé)</li>
        <li>Dommages imputables à la structure du bâtiment (vice de construction)</li>
        <li>Sinistres causés par les parties communes ou la toiture</li>
        <li>Mise en cause du propriétaire suite à un sinistre chez un voisin</li>
      </ul>

      <h2>PNO vs assurance habitation : quelle différence ?</h2>
      <p>
        L&apos;assurance habitation classique (multirisque habitation) est conçue pour
        l&apos;occupant — qu&apos;il soit propriétaire ou locataire. Elle couvre les biens
        mobiliers et la responsabilité civile de la personne qui vit dans le logement.
      </p>
      <p>
        L&apos;assurance PNO, elle, est conçue pour le propriétaire qui n&apos;occupe pas les lieux.
        Elle se concentre sur :
      </p>
      <ul>
        <li>La responsabilité civile du propriétaire vis-à-vis du locataire et des tiers</li>
        <li>Les dommages aux éléments immobiliers (murs, planchers, toiture, façade)</li>
        <li>La protection du logement en cas d&apos;inoccupation</li>
      </ul>

      <TipBox>
        Si votre locataire est assuré et qu&apos;un sinistre survient, son assurance prend
        en charge les dommages dont il est responsable. La PNO intervient lorsque
        la responsabilité incombe au propriétaire, ou quand le locataire n&apos;est pas
        ou pas suffisamment assuré.
      </TipBox>

      <h2>L&apos;assurance PNO est-elle obligatoire ?</h2>
      <p>
        La loi ALUR de 2014 rend l&apos;assurance PNO <strong>obligatoire pour les
        copropriétaires bailleurs</strong>. Elle doit couvrir au minimum la responsabilité
        civile du propriétaire.
      </p>
      <p>
        Pour les propriétaires de maisons individuelles en location, elle n&apos;est pas
        légalement obligatoire — mais elle est <strong>fortement recommandée</strong>
        car les risques sans assurance sont réels.
      </p>

      <InlineCta text="HT Assurance compare les meilleures assurances PNO pour les investisseurs immobiliers à Nice et en France." />

      <h2>Que couvre une bonne assurance PNO ?</h2>
      <ul>
        <li><strong>Responsabilité civile propriétaire</strong> : si votre logement
        cause un dommage à un tiers (fuite de votre appartement qui inonde le voisin
        du dessous)</li>
        <li><strong>Dommages aux biens immobiliers</strong> : incendie, dégâts des eaux,
        tempête, catastrophes naturelles</li>
        <li><strong>Garantie vacance locative</strong> : protection du bien pendant
        les périodes entre deux locations</li>
        <li><strong>Recours du locataire contre le propriétaire</strong> : si votre
        locataire vous attaque suite à un sinistre dont vous êtes responsable</li>
        <li><strong>Protection juridique</strong> : en cas de litige avec le locataire</li>
      </ul>

      <h2>Quel est le prix d&apos;une assurance PNO ?</h2>
      <p>
        L&apos;assurance PNO est peu coûteuse au regard de la protection qu&apos;elle offre :
      </p>
      <ul>
        <li><strong>Studio ou petit appartement</strong> : entre 80 € et 150 €/an</li>
        <li><strong>Appartement T3-T4</strong> : entre 120 € et 250 €/an</li>
        <li><strong>Maison individuelle</strong> : entre 150 € et 350 €/an</li>
      </ul>
      <p>
        Si vous êtes propriétaire de plusieurs biens en location, un courtier peut
        vous négocier un contrat global couvrant l&apos;ensemble de votre parc immobilier
        à des conditions préférentielles.
      </p>

      <h2>HT Assurance, votre courtier PNO à Nice</h2>
      <p>
        Investisseurs immobiliers, propriétaires bailleurs : HT Assurance vous aide
        à protéger votre patrimoine avec la couverture PNO la mieux adaptée à votre
        situation. Nous intervenons à Nice, Cannes, Antibes, Monaco et dans toute
        la France.
      </p>
    </>
  );
}
