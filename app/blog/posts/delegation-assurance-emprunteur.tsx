import { InlineCta, TipBox, WarningBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "delegation-assurance-emprunteur",
  title: "Délégation d'assurance emprunteur : payer moins que la banque",
  seoTitle: "Délégation d'Assurance Emprunteur 2026 : Économies et Démarche",
  description:
    "La délégation d'assurance vous permet de refuser le contrat groupe de la banque pour un contrat externe souvent bien moins cher. Fonctionnement, économies et démarche, expliqués simplement.",
  category: "Assurance emprunteur",
  date: "Juillet 2026",
  readTime: "7 min",
  image: {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80",
    alt: "Calcul des économies sur une assurance de prêt immobilier",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Sur un crédit immobilier, l&apos;assurance emprunteur peut représenter jusqu&apos;à
        un tiers du coût total. Pourtant, la plupart des emprunteurs signent sans réfléchir
        le contrat proposé par leur banque. La <strong>délégation d&apos;assurance</strong>
        {" "}consiste à lui préférer un contrat externe, souvent bien moins cher à garanties
        équivalentes. Voici comment ça marche.
      </p>

      <h2>Qu&apos;est-ce que la délégation d&apos;assurance ?</h2>
      <p>
        C&apos;est votre droit de choisir <strong>librement</strong> l&apos;assureur de votre
        prêt, au lieu d&apos;accepter le <strong>contrat groupe</strong> de la banque. La
        banque ne peut pas vous l&apos;imposer : elle doit accepter tout contrat externe
        offrant un niveau de garanties <strong>équivalent</strong> au sien. C&apos;est le
        principe de l&apos;équivalence des garanties.
      </p>

      <h2>Pourquoi c&apos;est (souvent) beaucoup moins cher ?</h2>
      <p>
        Le contrat groupe de la banque mutualise le risque sur l&apos;ensemble de ses
        clients : un emprunteur jeune et en bonne santé paie donc pour les profils plus
        risqués. Un contrat individuel, lui, est <strong>tarifé selon votre profil réel</strong>
        {" "}(âge, état de santé, profession). Pour un bon profil, l&apos;économie sur la
        durée du prêt se chiffre fréquemment en <strong>milliers d&apos;euros</strong>.
      </p>

      <TipBox>
        L&apos;écart est d&apos;autant plus marqué que vous êtes jeune, non-fumeur et sans
        antécédent de santé. Mais même un profil &laquo; moyen &raquo; a presque toujours
        intérêt à faire jouer la concurrence.
      </TipBox>

      <InlineCta text="Vous montez un dossier de prêt ? HT Assurance compare les contrats de délégation et vous garantit l'équivalence des garanties exigée par la banque." />

      <h2>Peut-on déléguer à tout moment ?</h2>
      <p>
        Oui — c&apos;est l&apos;une des grandes avancées de la <strong>loi Lemoine</strong>.
        Vous pouvez déléguer <strong>au moment de la souscription</strong> du prêt, mais
        aussi <strong>en cours de crédit, à tout moment et sans frais</strong>. Si vous avez
        déjà un prêt en cours, il n&apos;est donc jamais trop tard : voir notre guide pour{" "}
        <a href="/blog/changer-assurance-emprunteur" className="text-blue-600 font-semibold underline">
          changer d&apos;assurance emprunteur
        </a>
        .
      </p>

      <h2>La démarche, étape par étape</h2>
      <ul>
        <li>Obtenez la <strong>Fiche Standardisée d&apos;Information</strong> (FSI) de la banque : elle liste les garanties exigées.</li>
        <li>Faites établir un ou plusieurs devis de contrats individuels au moins équivalents.</li>
        <li>Envoyez le contrat retenu à la banque pour <strong>substitution</strong>.</li>
        <li>La banque dispose de <strong>10 jours ouvrés</strong> pour répondre ; un refus doit être motivé.</li>
      </ul>

      <WarningBox>
        Un refus de la banque n&apos;est légitime que si les garanties du contrat externe
        sont <strong>inférieures</strong> aux siennes. Un refus fondé sur un autre motif est
        abusif — et se conteste.
      </WarningBox>

      <h2>L&apos;équivalence des garanties, le point technique</h2>
      <p>
        C&apos;est là que se joue la validité de la délégation. La banque définit un socle de
        garanties (décès, PTIA, invalidité, incapacité, parfois perte d&apos;emploi) via un
        système de critères. Votre contrat externe doit couvrir <strong>au moins</strong> ce
        socle. Un courtier sécurise ce point pour éviter tout rejet — et vous évite de perdre
        du temps.
      </p>

      <h2>Combien peut-on réellement économiser ?</h2>
      <p>
        Sur un prêt de 200 000 € sur 20 ans, l&apos;économie via la délégation atteint
        couramment <strong>5 000 à 15 000 €</strong> selon le profil, à garanties égales.
        C&apos;est l&apos;un des leviers les plus rentables d&apos;un dossier immobilier.
        Comparez votre situation avec notre guide pour{" "}
        <a href="/blog/assurance-emprunteur-moins-chere" className="text-blue-600 font-semibold underline">
          une assurance emprunteur moins chère
        </a>{" "}
        ou lancez une{" "}
        <a href="/comparateur" className="text-blue-600 font-semibold underline">
          comparaison en ligne
        </a>
        .
      </p>

      <h2>HT Assurance, votre courtier en assurance de prêt</h2>
      <p>
        Nous comparons les contrats de délégation des principaux assureurs, garantissons
        l&apos;équivalence des garanties et gérons la substitution avec votre banque. Audit
        gratuit à Nice, Cannes, Antibes et dans toute la France.
      </p>
    </>
  );
}
