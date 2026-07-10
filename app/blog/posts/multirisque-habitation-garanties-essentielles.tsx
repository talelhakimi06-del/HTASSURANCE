import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "multirisque-habitation-garanties-essentielles",
  title: "Multirisque habitation : quelles garanties sont vraiment utiles ?",
  seoTitle: "Multirisque Habitation 2026 : Garanties Essentielles et Pièges",
  description:
    "Responsabilité civile, dégât des eaux, vol, catastrophes naturelles, valeur à neuf : décryptage des garanties d'une multirisque habitation, des franchises et des pièges à éviter.",
  category: "Habitation",
  date: "Juillet 2026",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    alt: "Salon d'un logement assuré — garanties multirisque habitation",
  },
};

export default function Content() {
  return (
    <>
      <p>
        &laquo; Multirisque habitation &raquo; : le nom rassure, mais toutes les formules ne se
        valent pas. Entre les garanties indispensables, les options utiles et les clauses
        qui vident la couverture de son sens, il est facile de payer pour de mauvaises
        protections. Voici ce qui compte vraiment.
      </p>

      <h2>Les garanties indispensables</h2>
      <p>
        Un bon contrat repose sur un socle incontournable :
      </p>
      <ul>
        <li><strong>La responsabilité civile</strong> : les dommages que vous, votre famille ou vos biens causez à des tiers.</li>
        <li><strong>L&apos;incendie et les événements assimilés</strong> (explosion, foudre, fumée).</li>
        <li><strong>Le dégât des eaux</strong> : le sinistre le plus fréquent, de loin.</li>
        <li><strong>Le vol et le vandalisme</strong> (attention aux conditions de protection exigées).</li>
        <li><strong>Le bris de glace</strong> (fenêtres, vérandas, plaques vitrocéramiques).</li>
        <li><strong>Les catastrophes naturelles et technologiques</strong>, dont la garantie tempête.</li>
      </ul>

      <h2>Les options qui valent le coup (ou pas)</h2>
      <p>
        Selon votre situation, certaines extensions sont pertinentes : la garantie
        <strong> dommages électriques</strong>, la <strong>protection juridique</strong>,
        le <strong>rééquipement à neuf</strong> (indemnisation sans vétusté), ou la garantie
        <strong> objets de valeur</strong>. À l&apos;inverse, méfiez-vous des options
        gadget qui gonflent la cotisation sans réel bénéfice.
      </p>

      <TipBox>
        La garantie <strong>valeur à neuf</strong> change tout en cas de sinistre important :
        sans elle, l&apos;assureur applique une vétusté qui peut réduire fortement
        l&apos;indemnisation de vos biens et de vos aménagements.
      </TipBox>

      <h2>Le piège n°1 : la sous-assurance</h2>
      <p>
        Déclarer une surface ou une valeur mobilière inférieure à la réalité fait baisser la
        cotisation… jusqu&apos;au sinistre. L&apos;assureur applique alors la <strong>règle
        proportionnelle</strong> : l&apos;indemnité est réduite dans la même proportion que
        la sous-déclaration. Résultat : un chèque bien inférieur au préjudice réel.
      </p>

      <WarningBox>
        Lisez attentivement les <strong>exclusions</strong> et les <strong>conditions de
        garantie vol</strong> (serrures, volets, alarme). Un cambriolage peut être refusé si
        les moyens de protection prévus au contrat n&apos;étaient pas en place.
      </WarningBox>

      <InlineCta text="Vous doutez de vos garanties ? HT Assurance audite gratuitement votre contrat habitation et traque les doublons comme les trous de couverture." />

      <h2>Franchises : le vrai levier sur la cotisation</h2>
      <p>
        La franchise (ce qui reste à votre charge) influence directement le prix. Une
        franchise plus élevée réduit la cotisation, mais augmente votre reste à charge en
        cas de petit sinistre. L&apos;équilibre dépend de votre capacité à absorber une
        dépense ponctuelle. C&apos;est un arbitrage à faire consciemment, pas à subir.
      </p>

      <h2>Locataire, propriétaire : les obligations diffèrent</h2>
      <p>
        Le locataire a l&apos;obligation légale d&apos;assurer le logement (a minima les
        risques locatifs) — nous détaillons cela dans notre guide{" "}
        <a href="/blog/assurance-locataire-obligatoire" className="text-blue-600 font-semibold underline">
          sur l&apos;assurance habitation obligatoire du locataire
        </a>
        . Le propriétaire, lui, a intérêt à couvrir le bâti et sa responsabilité, et
        s&apos;il possède une résidence secondaire, à anticiper l&apos;inoccupation — voir
        notre article sur l&apos;
        <a href="/blog/assurance-residence-secondaire-cote-azur" className="text-blue-600 font-semibold underline">
          assurance d&apos;une résidence secondaire
        </a>
        .
      </p>

      <h2>Comment obtenir le meilleur rapport garanties / prix ?</h2>
      <p>
        La bonne méthode : comparer <strong>à garanties équivalentes</strong>, pas seulement
        les cotisations. Un contrat moins cher avec des plafonds bas ou des exclusions larges
        coûte cher le jour du sinistre. Lancez une{" "}
        <a href="/comparateur" className="text-blue-600 font-semibold underline">
          comparaison en ligne
        </a>{" "}
        puis affinez avec un courtier. Et si votre assureur a déjà refusé une prise en
        charge, sachez qu&apos;il existe{" "}
        <a href="/sinistres" className="text-blue-600 font-semibold underline">
          des recours en cas de sinistre refusé
        </a>
        .
      </p>

      <h2>HT Assurance, votre courtier habitation</h2>
      <p>
        Nous comparons les multirisques habitation des principaux assureurs et bâtissons une
        couverture adaptée à votre logement, sans doublon ni trou de garantie. Audit gratuit
        à Nice, Cannes, Antibes, Cagnes-sur-Mer et dans toute la France.
      </p>
    </>
  );
}
