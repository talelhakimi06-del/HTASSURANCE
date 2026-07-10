import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-residence-secondaire-cote-azur",
  title: "Assurance résidence secondaire sur la Côte d'Azur : le guide",
  seoTitle: "Assurance Résidence Secondaire 2026 : Garanties et Prix",
  description:
    "Vacance longue, squat, tempête, location saisonnière : une résidence secondaire présente des risques spécifiques. Le guide des garanties et du prix pour bien l'assurer sur la Côte d'Azur.",
  category: "Habitation",
  date: "Juillet 2026",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80",
    alt: "Villa sur la Côte d'Azur — assurance résidence secondaire",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Sur la Côte d&apos;Azur, les résidences secondaires sont partout — et elles
        présentent des risques que peu de propriétaires anticipent. Une maison inoccupée
        plusieurs mois par an, exposée aux intempéries et parfois louée l&apos;été, ne
        s&apos;assure pas comme une résidence principale. Voici ce qu&apos;il faut savoir
        pour être vraiment couvert.
      </p>

      <h2>Pourquoi une résidence secondaire est-elle plus risquée à assurer ?</h2>
      <p>
        Parce qu&apos;elle est <strong>inoccupée une grande partie de l&apos;année</strong>.
        Cette vacance prolongée aggrave plusieurs risques :
      </p>
      <ul>
        <li>Un <strong>dégât des eaux</strong> qui coule pendant des semaines avant d&apos;être détecté</li>
        <li>Un <strong>cambriolage</strong> facilité par l&apos;absence d&apos;occupants</li>
        <li>Des <strong>dommages climatiques</strong> (tempête, grêle, inondation) non constatés à temps</li>
        <li>Un <strong>squat</strong>, dont la résolution peut être longue et coûteuse</li>
      </ul>

      <WarningBox>
        La plupart des contrats prévoient une <strong>clause d&apos;inhabitation</strong> :
        au-delà d&apos;un certain nombre de jours consécutifs sans occupation (souvent 30 à
        90 jours), certaines garanties (vol, notamment) peuvent être réduites ou suspendues.
        Vérifiez ce point avant de signer.
      </WarningBox>

      <h2>Quelles garanties privilégier ?</h2>
      <p>
        Au-delà du socle multirisque habitation (incendie, dégât des eaux, responsabilité
        civile), portez une attention particulière à la garantie <strong>vol et vandalisme</strong>
        {" "}adaptée à l&apos;inoccupation, à la garantie <strong>tempête / événements
        climatiques</strong>, et à la <strong>protection juridique</strong>. Si vous ne
        connaissez pas encore le détail de ces garanties, notre guide{" "}
        <a href="/blog/multirisque-habitation-garanties-essentielles" className="text-blue-600 font-semibold underline">
          des garanties essentielles de la multirisque habitation
        </a>{" "}
        fait le tour de la question.
      </p>

      <InlineCta text="Vous possédez une résidence secondaire sur la Côte d'Azur ? HT Assurance compare les contrats adaptés à l'inoccupation et à la location saisonnière." />

      <h2>Résidence secondaire mise en location saisonnière</h2>
      <p>
        Si vous louez votre bien l&apos;été (Airbnb, location de vacances), une assurance
        habitation classique ne suffit pas. Il faut une extension <strong>« location
        saisonnière »</strong> qui couvre la responsabilité vis-à-vis des locataires, les
        dommages qu&apos;ils pourraient causer, et le recours des voisins. Certains
        propriétaires exigent aussi une garantie <strong>villégiature</strong>.
      </p>

      <TipBox>
        Déclarez toujours l&apos;usage réel du bien. Une résidence secondaire louée mais
        assurée comme un simple pied-à-terre expose à un refus d&apos;indemnisation pour
        fausse déclaration le jour d&apos;un sinistre.
      </TipBox>

      <h2>Faut-il une PNO pour une résidence secondaire louée ?</h2>
      <p>
        Si vous louez, l&apos;assurance <strong>propriétaire non occupant (PNO)</strong>
        prend tout son sens : elle couvre le logement entre deux locations et complète
        l&apos;assurance du locataire. Nous expliquons son fonctionnement dans notre article
        dédié à la{" "}
        <a href="/blog/assurance-pno-definition" className="text-blue-600 font-semibold underline">
          définition de l&apos;assurance PNO
        </a>
        .
      </p>

      <h2>Combien coûte l&apos;assurance d&apos;une résidence secondaire ?</h2>
      <p>
        Le tarif dépend de la surface, de la valeur du mobilier, de la localisation et du
        niveau d&apos;occupation. Il est souvent <strong>un peu plus élevé</strong> qu&apos;une
        résidence principale équivalente, du fait des risques liés à l&apos;inoccupation.
        L&apos;écart entre assureurs peut être important : mieux vaut{" "}
        <a href="/comparateur" className="text-blue-600 font-semibold underline">
          comparer les offres
        </a>{" "}
        plutôt que d&apos;ajouter le bien à un contrat existant sans réévaluation.
      </p>

      <h2>HT Assurance, votre courtier sur la Côte d&apos;Azur</h2>
      <p>
        Résidence secondaire, location saisonnière, copropriété : nous connaissons les
        spécificités du littoral azuréen. Faites auditer gratuitement votre contrat avec
        un{" "}
        <a href="/courtier-assurance/nice" className="text-blue-600 font-semibold underline">
          courtier en assurance à Nice
        </a>
        , à Cannes, Antibes ou Cagnes-sur-Mer. Et si un sinistre vous a déjà été refusé,
        découvrez{" "}
        <a href="/sinistres" className="text-blue-600 font-semibold underline">
          vos recours
        </a>
        .
      </p>
    </>
  );
}
