import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "assurance-installation-reprise-pharmacie-officine",
  title: "Reprise d'une pharmacie : quelles assurances avant de s'installer ?",
  seoTitle: "Assurance Reprise d'Officine 2026 : Le Guide du Pharmacien",
  description:
    "Vous reprenez ou vous installez dans une officine ? Multirisque, RC pro, prévoyance, assurance du prêt d'acquisition : le guide des assurances à mettre en place avant l'ouverture.",
  category: "Pharmacien",
  date: "Juillet 2026",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    alt: "Pharmacien signant la reprise de son officine — mise en place des assurances",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Reprendre une officine, c&apos;est souvent l&apos;investissement d&apos;une vie :
        plusieurs centaines de milliers d&apos;euros, un emprunt conséquent, des salariés et
        un fonds à protéger dès le premier jour. Or les assurances font partie des sujets
        qu&apos;on traite dans la précipitation, entre le compromis et la signature. Voici
        celles à mettre en place <strong>avant l&apos;ouverture</strong>, et l&apos;ordre
        dans lequel s&apos;y prendre.
      </p>

      <h2>Pourquoi l&apos;assurance est un sujet à traiter tôt ?</h2>
      <p>
        Deux raisons. D&apos;abord, votre banque conditionne le déblocage du prêt
        d&apos;acquisition à la souscription de certaines garanties (assurance emprunteur,
        parfois assurance homme-clé). Ensuite, vous ne pouvez pas exploiter une officine non
        assurée : dès la remise des clés, le stock, le matériel et votre responsabilité sont
        engagés. Anticiper évite de subir les tarifs et les conditions imposés dans
        l&apos;urgence.
      </p>

      <TipBox>
        Comptez au moins 3 à 4 semaines entre les premières demandes et la mise en place des
        contrats. Lancez les comparaisons dès la signature du compromis, pas la veille de
        l&apos;ouverture.
      </TipBox>

      <h2>L&apos;assurance du prêt d&apos;acquisition</h2>
      <p>
        Pour financer la reprise, la banque exige une <strong>assurance emprunteur</strong>
        {" "}couvrant décès, invalidité et souvent incapacité de travail. Bonne nouvelle :
        vous n&apos;êtes pas obligé de prendre le contrat de la banque. La délégation
        d&apos;assurance permet de choisir un contrat externe, souvent bien moins cher à
        garanties égales. C&apos;est l&apos;un des premiers postes d&apos;économie sur une
        reprise — voir notre guide pour{" "}
        <a href="/blog/assurance-emprunteur-moins-chere" className="text-blue-600 font-semibold underline">
          obtenir une assurance emprunteur moins chère
        </a>
        .
      </p>

      <h2>La multirisque officine, dès la remise des clés</h2>
      <p>
        C&apos;est le socle de protection du fonds : locaux, stock de médicaments, matériel,
        agencement, avec les garanties incendie, dégât des eaux, vol, bris de glace et
        surtout <strong>perte d&apos;exploitation</strong>. Sur une reprise, veillez à faire
        évaluer correctement la valeur réelle du stock et du matériel : une sous-évaluation
        vous expose à une indemnisation réduite le jour d&apos;un sinistre. Nous détaillons
        chaque garantie dans notre guide des{" "}
        <a href="/blog/assurance-pharmacie-officine-garanties" className="text-blue-600 font-semibold underline">
          garanties de l&apos;assurance officine
        </a>
        .
      </p>

      <InlineCta text="Vous reprenez une officine ? HT Assurance met en place toutes vos assurances (prêt, multirisque, RC pro, prévoyance) et les coordonne avec votre banque." />

      <h2>La RC pro, indissociable de l&apos;activité</h2>
      <p>
        Dès la première ordonnance délivrée, votre responsabilité de professionnel de santé
        est engagée. La <strong>responsabilité civile professionnelle</strong> couvre les
        conséquences d&apos;une erreur de délivrance, d&apos;un défaut de conseil ou d&apos;un
        problème sur une préparation, pour vous comme pour vos préparateurs. Nous y consacrons
        un guide dédié :{" "}
        <a href="/blog/rc-pro-pharmacien-responsabilite-titulaire" className="text-blue-600 font-semibold underline">
          la RC pro du pharmacien
        </a>
        .
      </p>

      <h2>La prévoyance et l&apos;assurance homme-clé</h2>
      <p>
        Sur une officine récemment reprise, l&apos;équilibre financier est tendu : l&apos;emprunt
        court, la trésorerie est fragile. Si le titulaire s&apos;arrête, tout vacille. Deux
        garanties répondent à ce risque :
      </p>
      <ul>
        <li>
          <strong>La prévoyance du titulaire</strong> : indemnités journalières, capital
          ou rente en cas d&apos;arrêt, d&apos;invalidité ou de décès.
        </li>
        <li>
          <strong>L&apos;assurance homme-clé</strong> : parfois exigée par la banque, elle
          verse un capital à l&apos;entreprise si le dirigeant est empêché, pour rembourser
          l&apos;emprunt ou financer la continuité.
        </li>
      </ul>

      <WarningBox>
        Ne calquez pas la prévoyance du cédant sur la vôtre. Vos revenus, votre âge, votre
        situation familiale et votre niveau d&apos;emprunt sont différents : la couverture
        doit être recalibrée pour votre situation réelle.
      </WarningBox>

      <h2>La protection juridique</h2>
      <p>
        Litige avec un fournisseur, contrôle URSSAF, désaccord avec l&apos;ARS, conflit
        avec un salarié repris : une <strong>protection juridique</strong> prend en charge
        les frais de conseil et de procédure. Sur une reprise, où l&apos;on hérite de
        contrats et de personnel existants, elle est particulièrement utile.
      </p>

      <h2>Combien prévoir au budget ?</h2>
      <p>
        Pour une officine de taille moyenne, l&apos;ensemble multirisque + RC pro se situe
        généralement entre <strong>1 500 et 4 000 € par an</strong>, auxquels s&apos;ajoutent
        la prévoyance et l&apos;assurance du prêt (variables selon l&apos;âge et le montant
        emprunté). Les écarts entre assureurs sont réels : mieux vaut{" "}
        <a href="/comparateur" className="text-blue-600 font-semibold underline">
          comparer les offres
        </a>{" "}
        que d&apos;accepter le package proposé par défaut.
      </p>

      <h2>HT Assurance, votre courtier pour la reprise d&apos;officine</h2>
      <p>
        Nous accompagnons les pharmaciens qui s&apos;installent ou reprennent une officine :
        mise en place coordonnée de toutes les assurances, dialogue avec votre banque, et
        optimisation du budget global. Découvrez notre offre dédiée à l&apos;
        <a href="/assurance-pharmacien" className="text-blue-600 font-semibold underline">
          assurance pharmacien
        </a>
        , avec un devis en ligne en quelques questions. Nous intervenons à Nice, Cannes,
        Antibes, Cagnes-sur-Mer et dans toute la France.
      </p>
    </>
  );
}
