import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "rc-pro-pharmacien-responsabilite-titulaire",
  title: "RC Pro du pharmacien : jusqu'où va votre responsabilité ?",
  seoTitle: "RC Pro Pharmacien 2026 : Erreur de Délivrance, Garanties, Prix",
  description:
    "Erreur de délivrance, défaut de conseil, préparation magistrale : ce que couvre la RC pro du pharmacien titulaire, l'étendue de votre responsabilité et comment bien vous assurer.",
  category: "Pharmacien",
  date: "Juillet 2026",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
    alt: "Pharmacien vérifiant une délivrance — responsabilité civile professionnelle",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Le pharmacien est un professionnel de santé à part entière : chaque délivrance
        engage sa responsabilité. Une boîte confondue, un dosage mal expliqué, une
        interaction médicamenteuse non signalée, et les conséquences peuvent être graves —
        pour le patient comme pour l&apos;officine. La responsabilité civile professionnelle
        (RC pro) est là pour absorber ce risque. Encore faut-il en comprendre l&apos;étendue.
      </p>

      <h2>Que couvre la RC pro d&apos;un pharmacien ?</h2>
      <p>
        La RC pro prend en charge les dommages causés à un patient ou à un tiers dans le
        cadre de votre activité, ainsi que votre défense en cas de mise en cause. Pour une
        officine, les situations couvertes les plus fréquentes sont :
      </p>
      <ul>
        <li>Une <strong>erreur de délivrance</strong> (mauvais médicament, mauvais dosage)</li>
        <li>Un <strong>défaut de conseil</strong> ou une contre-indication non signalée</li>
        <li>Une erreur sur une <strong>préparation magistrale</strong></li>
        <li>Une faute d&apos;un préparateur ou d&apos;un salarié de l&apos;officine</li>
        <li>Un dommage corporel subi par un client dans les locaux</li>
      </ul>

      <h2>Votre responsabilité couvre-t-elle aussi votre équipe ?</h2>
      <p>
        Oui — et c&apos;est essentiel. En tant que titulaire, vous êtes responsable des actes
        de vos <strong>préparateurs et salariés</strong> dans l&apos;exercice de leurs
        fonctions. Le contrat RC pro doit donc explicitement couvrir l&apos;ensemble de
        l&apos;équipe, pas seulement le titulaire. Vérifiez ce point : c&apos;est une source
        classique de mauvaise surprise.
      </p>

      <WarningBox>
        La RC pro ne couvre pas les <strong>fautes intentionnelles</strong> ni le
        non-respect délibéré de la réglementation. Elle ne remplace pas non plus votre
        multirisque (dégâts aux biens) ni votre prévoyance (vos propres revenus).
      </WarningBox>

      <InlineCta text="Besoin d'une RC pro adaptée à votre officine et à votre équipe ? HT Assurance compare les contrats spécialisés pharmacie et vous conseille." />

      <h2>RC pro et responsabilité disciplinaire : deux choses différentes</h2>
      <p>
        La RC pro couvre le volet <em>indemnisation</em> (réparer le préjudice de la
        victime). Elle ne fait pas disparaître une éventuelle <strong>responsabilité
        disciplinaire</strong> devant l&apos;Ordre des pharmaciens, ni la responsabilité
        pénale en cas de faute grave. En revanche, une bonne <strong>protection
        juridique</strong> associée vous accompagne dans ces procédures. Les deux garanties
        sont complémentaires.
      </p>

      <h2>Combien coûte une RC pro pharmacien ?</h2>
      <p>
        Prise isolément, la RC pro d&apos;une officine est relativement accessible — souvent
        quelques centaines d&apos;euros par an. Mais elle est presque toujours intégrée dans
        un contrat global <strong>multirisque officine</strong>, ce qui a du sens : on
        mutualise les garanties et on évite les trous de couverture. Retrouvez le détail de
        cet ensemble dans notre guide des{" "}
        <a href="/blog/assurance-pharmacie-officine-garanties" className="text-blue-600 font-semibold underline">
          garanties de l&apos;assurance officine
        </a>
        .
      </p>

      <TipBox>
        Ce qui fait la différence sur un contrat RC pro, ce n&apos;est pas le prix, mais les{" "}
        <strong>plafonds de garantie</strong> et l&apos;absence d&apos;exclusions piégeuses.
        À cotisation proche, deux contrats peuvent offrir des protections très inégales.
      </TipBox>

      <h2>Comment choisir le bon contrat ?</h2>
      <p>
        Comparez à garanties équivalentes : périmètre (titulaire + équipe), plafonds,
        franchises, prise en charge de la défense, et articulation avec la protection
        juridique. Un courtier spécialisé met les offres en concurrence pour vous —
        vous pouvez lancer une première{" "}
        <a href="/comparateur" className="text-blue-600 font-semibold underline">
          comparaison en ligne
        </a>{" "}
        puis affiner avec un conseiller. Si vous préparez une installation, voyez aussi
        notre guide sur les{" "}
        <a href="/blog/assurance-installation-reprise-pharmacie-officine" className="text-blue-600 font-semibold underline">
          assurances pour la reprise d&apos;une officine
        </a>
        .
      </p>

      <h2>HT Assurance, courtier des pharmaciens</h2>
      <p>
        Nous aidons les pharmaciens titulaires à sécuriser leur responsabilité et celle de
        leur équipe, avec des contrats spécialisés et un accompagnement en cas de sinistre.
        Découvrez notre offre d&apos;
        <a href="/assurance-pharmacien" className="text-blue-600 font-semibold underline">
          assurance pharmacien
        </a>
        . Nous intervenons à Nice, Cannes, Antibes et dans toute la France.
      </p>
    </>
  );
}
