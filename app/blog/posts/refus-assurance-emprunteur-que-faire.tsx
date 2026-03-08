import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "refus-assurance-emprunteur-que-faire",
  title: "Refus assurance emprunteur : quelles solutions pour obtenir votre prêt ?",
  seoTitle: "Refus Assurance Emprunteur : Solutions et Droits pour Obtenir Son Prêt",
  description:
    "Votre assurance emprunteur a été refusée à cause de votre état de santé ? Découvrez vos droits, la convention AERAS et les solutions pour finaliser votre prêt.",
  category: "Assurance emprunteur",
  date: "Mars 2025",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    alt: "Personne face à un refus d'assurance emprunteur — solutions avec convention AERAS",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Un refus d&apos;assurance emprunteur est une situation stressante qui peut bloquer
        tout un projet immobilier. Pourtant, un refus n&apos;est pas une fatalité. Il existe
        des mécanismes légaux, des assureurs spécialisés et des professionnels capables
        de vous aider à trouver une solution — même dans les situations médicales les
        plus complexes.
      </p>

      <h2>Pourquoi une assurance emprunteur peut-elle être refusée ?</h2>
      <p>
        Les principales causes de refus sont liées à l&apos;état de santé du candidat :
      </p>
      <ul>
        <li>Antécédents de cancer ou de maladie grave</li>
        <li>Maladies chroniques (diabète, insuffisance cardiaque, sclérose en plaques...)</li>
        <li>Obésité importante (IMC très élevé)</li>
        <li>Antécédents psychiatriques (dépression sévère, tentatives de suicide)</li>
        <li>Profession ou sport à risque élevé</li>
        <li>Résidence à l&apos;étranger dans certains pays</li>
      </ul>
      <p>
        Un refus peut également venir d&apos;une <strong>surprime jugée trop élevée</strong> :
        l&apos;assureur accepte de vous couvrir mais à un tarif qui ne correspond pas à votre
        capacité d&apos;emprunt.
      </p>

      <WarningBox>
        Ne laissez pas un refus vous décourager. La loi prévoit des dispositifs spécifiques
        pour les personnes présentant un risque aggravé de santé. Vous avez des droits.
      </WarningBox>

      <h2>La convention AERAS : votre principal recours</h2>
      <p>
        La convention AERAS (s&apos;Assurer et Emprunter avec un Risque Aggravé de Santé) est
        un accord signé entre l&apos;État, les assureurs et les banques. Elle vise à faciliter
        l&apos;accès au crédit immobilier pour les personnes présentant des problèmes de santé.
      </p>
      <p>
        Son fonctionnement repose sur <strong>trois niveaux d&apos;examen</strong> :
      </p>
      <ul>
        <li><strong>Niveau 1</strong> : examen standard par l&apos;assureur habituel</li>
        <li><strong>Niveau 2</strong> : en cas de refus, dossier transmis à un pool
        d&apos;assureurs spécialisés en risques aggravés</li>
        <li><strong>Niveau 3</strong> : en cas de refus au niveau 2, la convention
        prévoit des mécanismes de mutualisation pour certains profils</li>
      </ul>

      <TipBox>
        La convention AERAS s&apos;applique automatiquement si vous avez essuyé un refus.
        Vous n&apos;avez pas à la demander explicitement : l&apos;assureur est obligé de
        transmettre votre dossier aux niveaux supérieurs d&apos;analyse.
      </TipBox>

      <h2>Le droit à l&apos;oubli : une protection importante</h2>
      <p>
        Grâce au droit à l&apos;oubli, renforcé par la loi Lemoine en 2022, vous n&apos;êtes plus
        obligé de déclarer certains antécédents médicaux :
      </p>
      <ul>
        <li>Cancer diagnostiqué avant vos 21 ans : après 5 ans sans rechute depuis la
        fin du traitement</li>
        <li>Cancer diagnostiqué après 21 ans : après 5 ans sans rechute depuis la fin
        du traitement</li>
        <li>Hépatite C guérie : sans délai de carence</li>
      </ul>

      <InlineCta text="HT Assurance est spécialisé dans les dossiers emprunteur complexes et les profils médicaux difficiles." />

      <h2>Les autres solutions en cas de refus</h2>
      <h3>Les assureurs spécialisés risques aggravés</h3>
      <p>
        Certains assureurs se sont positionnés sur le marché des risques de santé
        aggravés. Ils acceptent des profils refusés par les assureurs classiques,
        parfois avec des exclusions ciblées ou des franchises adaptées. Ces acteurs
        ne sont pas référencés sur les comparateurs habituels — un courtier est
        nécessaire pour y accéder.
      </p>
      <h3>L&apos;exclusion de garantie partielle</h3>
      <p>
        En cas de pathologie spécifique, l&apos;assureur peut accepter de vous couvrir
        en excluant la garantie liée à cette pathologie (ITT pour le dos si vous
        avez des problèmes vertébraux, par exemple). Votre prêt reste assurable.
      </p>
      <h3>La garantie hypothécaire</h3>
      <p>
        Dans certains cas, si vous ne parvenez pas à obtenir une assurance emprunteur,
        votre banque peut accepter une garantie hypothécaire en remplacement. Cette
        solution est moins protectrice pour votre famille mais peut débloquer
        un projet immobilier.
      </p>

      <h2>HT Assurance, spécialiste des dossiers emprunteur difficiles</h2>
      <p>
        Chez HT Assurance, nous accompagnons les emprunteurs en situation de refus
        ou de surprime excessive. Nous connaissons les assureurs spécialisés en
        risques aggravés et savons comment présenter votre dossier pour maximiser
        vos chances d&apos;obtenir une couverture.
      </p>
      <p>
        Notre expertise s&apos;étend à Nice, Cannes, Antibes, Monaco et à toute la France.
        Contactez-nous pour une analyse confidentielle et gratuite de votre situation.
      </p>
    </>
  );
}
