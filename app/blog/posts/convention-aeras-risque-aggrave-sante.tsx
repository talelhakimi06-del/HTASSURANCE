import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "convention-aeras-risque-aggrave-sante",
  title: "Convention AERAS : emprunter avec un problème de santé",
  seoTitle: "Convention AERAS 2026 : Assurance de Prêt et Risque de Santé",
  description:
    "Un antécédent médical complique l'assurance de votre prêt ? La convention AERAS et le droit à l'oubli facilitent l'accès au crédit. Fonctionnement, démarches et recours expliqués.",
  category: "Assurance emprunteur",
  date: "Juillet 2026",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    alt: "Rendez-vous médical — convention AERAS et assurance de prêt",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Un antécédent de santé — cancer, diabète, maladie chronique, affection cardiaque —
        peut transformer la recherche d&apos;une assurance de prêt en parcours du combattant :
        surprime élevée, exclusions, voire refus. La <strong>convention AERAS</strong>
        {" "}(&laquo; s&apos;Assurer et Emprunter avec un Risque Aggravé de Santé &raquo;) existe
        précisément pour faciliter l&apos;accès au crédit dans ces situations. Voici comment
        elle fonctionne.
      </p>

      <h2>Qu&apos;est-ce que la convention AERAS ?</h2>
      <p>
        C&apos;est un accord entre l&apos;État, les banques et les assureurs qui organise un
        examen approfondi des demandes d&apos;assurance présentant un <strong>risque aggravé
        de santé</strong>. Concrètement, si votre dossier est refusé au niveau standard, il
        est automatiquement réexaminé à plusieurs niveaux, avec des solutions et des plafonds
        de surprime encadrés.
      </p>

      <h2>Le droit à l&apos;oubli : ne plus déclarer certaines pathologies</h2>
      <p>
        Avancée majeure : le <strong>droit à l&apos;oubli</strong> vous permet de ne plus
        déclarer certaines pathologies passées. Pour un cancer ou une hépatite C, vous
        n&apos;avez plus à les mentionner <strong>5 ans après la fin du protocole
        thérapeutique</strong> sans rechute. Aucune surprime ni exclusion ne peut alors être
        appliquée pour ce motif.
      </p>

      <TipBox>
        La <strong>grille de référence AERAS</strong> liste de nombreuses pathologies pour
        lesquelles l&apos;assurance est possible sans surprime ni exclusion, ou avec des
        conditions plafonnées, passé un certain délai. Elle est régulièrement mise à jour.
      </TipBox>

      <WarningBox>
        Ne dissimulez jamais un antécédent qui doit être déclaré : une <strong>fausse
        déclaration</strong> peut entraîner la nullité du contrat et un refus total de prise
        en charge le jour du sinistre. Le bon réflexe n&apos;est pas de cacher, mais de{" "}
        <strong>bien orienter</strong> le dossier.
      </WarningBox>

      <InlineCta text="Un problème de santé complique votre assurance de prêt ? HT Assurance connaît les assureurs les plus souples et monte votre dossier AERAS." />

      <h2>Quand et comment la convention s&apos;applique-t-elle ?</h2>
      <p>
        Elle s&apos;active pour les prêts immobiliers et certains prêts professionnels, sous
        conditions de montant et d&apos;âge en fin de prêt. Le questionnaire de santé (quand
        il est requis) déclenche, en cas de risque, un réexamen automatique. Depuis la loi
        Lemoine, le <strong>questionnaire de santé est même supprimé</strong> pour les prêts
        jusqu&apos;à 200 000 € par assuré remboursés avant vos 60 ans.
      </p>

      <h2>Que faire en cas de surprime ou de refus ?</h2>
      <p>
        Plusieurs leviers existent :
      </p>
      <ul>
        <li>Faire jouer la <strong>concurrence</strong> : à profil égal, les assureurs ne tarifent pas le risque de la même façon.</li>
        <li>Demander le <strong>réexamen AERAS</strong> aux niveaux 2 et 3 si le niveau standard refuse.</li>
        <li>Vérifier l&apos;application du <strong>droit à l&apos;oubli</strong> et de la grille de référence.</li>
        <li>Contester un refus mal motivé — voir notre guide sur le{" "}
          <a href="/blog/refus-assurance-emprunteur-que-faire" className="text-blue-600 font-semibold underline">
            refus d&apos;assurance emprunteur
          </a>.
        </li>
      </ul>

      <h2>Pourquoi passer par un courtier ?</h2>
      <p>
        Sur un risque aggravé, l&apos;orientation du dossier fait toute la différence :
        certains assureurs sont beaucoup plus souples que d&apos;autres selon la pathologie.
        Un courtier sait où présenter votre dossier et comment. La{" "}
        <a href="/blog/delegation-assurance-emprunteur" className="text-blue-600 font-semibold underline">
          délégation d&apos;assurance
        </a>{" "}
        est souvent la clé pour obtenir de meilleures conditions que le contrat de la banque.
        Vous pouvez démarrer par une{" "}
        <a href="/comparateur" className="text-blue-600 font-semibold underline">
          comparaison en ligne
        </a>
        .
      </p>

      <h2>HT Assurance, votre courtier pour les dossiers difficiles</h2>
      <p>
        Nous accompagnons les emprunteurs présentant un risque aggravé de santé : montage du
        dossier, application de la convention AERAS et du droit à l&apos;oubli, mise en
        concurrence des assureurs. Audit gratuit à Nice, Cannes, Antibes et dans toute la
        France.
      </p>
    </>
  );
}
