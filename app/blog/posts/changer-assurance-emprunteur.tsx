import { InlineCta, TipBox } from "../components/ArticleLayout";
import type { PostMeta } from "../lib/types";

export const meta: PostMeta = {
  slug: "changer-assurance-emprunteur",
  title: "Changer d'assurance emprunteur : comment économiser grâce à la loi Lemoine",
  seoTitle: "Changer Assurance Emprunteur 2025 : Loi Lemoine, Économies et Démarches",
  description:
    "Depuis 2022, la loi Lemoine vous permet de changer d'assurance emprunteur à tout moment. Découvrez comment en profiter pour économiser jusqu'à 50 % sur votre prime.",
  category: "Assurance emprunteur",
  date: "Mars 2025",
  readTime: "8 min",
  image: {
    src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    alt: "Signature d'un prêt immobilier — changer d'assurance emprunteur grâce à la loi Lemoine",
  },
};

export default function Content() {
  return (
    <>
      <p>
        Vous remboursez un crédit immobilier et vous payez l&apos;assurance emprunteur proposée
        par votre banque ? Vous payez probablement trop cher. Depuis l&apos;entrée en vigueur de
        la loi Lemoine en 2022, changer d&apos;assurance emprunteur est devenu simple, rapide
        et possible à tout moment — sans pénalités. Voici comment en profiter concrètement.
      </p>

      <h2>La loi Lemoine : ce qui a changé pour les emprunteurs</h2>
      <p>
        Adoptée en 2022, la loi Lemoine a profondément modifié les règles de l&apos;assurance
        emprunteur en France :
      </p>
      <ul>
        <li><strong>Résiliation à tout moment</strong> : vous pouvez résilier votre
        contrat d&apos;assurance emprunteur à n&apos;importe quelle date, sans attendre
        la date anniversaire (depuis le 1er septembre 2022 pour tous les crédits).</li>
        <li><strong>Suppression du questionnaire médical</strong> : pour les prêts
        immobiliers inférieurs à 200 000 € dont la dernière échéance intervient
        avant vos 60 ans, plus aucune question médicale n&apos;est nécessaire.</li>
        <li><strong>Droit à l&apos;oubli renforcé</strong> : les personnes guéries
        d&apos;un cancer depuis plus de 5 ans (ou 2 ans pour les cancers diagnostiqués
        avant 21 ans) ne sont plus obligées de le déclarer.</li>
      </ul>

      <TipBox>
        Avant la loi Lemoine, vous ne pouviez résilier qu&apos;à la date anniversaire de votre
        contrat, après un préavis de 2 mois. Aujourd&apos;hui, vous pouvez changer votre
        assurance demain matin.
      </TipBox>

      <h2>Combien peut-on vraiment économiser ?</h2>
      <p>
        L&apos;écart de prix entre l&apos;assurance groupe proposée par la banque et une assurance
        individuelle peut être considérable :
      </p>
      <ul>
        <li>Un emprunteur de <strong>35 ans en bonne santé</strong> peut économiser
        30 à 50 % sur sa prime annuelle</li>
        <li>Sur un prêt de 200 000 € sur 20 ans, l&apos;économie totale peut atteindre
        <strong>5 000 à 15 000 €</strong></li>
        <li>Les profils de moins de 45 ans sans problème de santé bénéficient des
        plus grandes réductions</li>
      </ul>

      <InlineCta text="HT Assurance compare les meilleures assurances emprunteur et gère le changement pour vous, sans frais." />

      <h2>Comment procéder pour changer d&apos;assurance emprunteur ?</h2>
      <p>
        Les étapes sont simples :
      </p>
      <ul>
        <li><strong>Étape 1</strong> : comparez les offres du marché via un courtier
        ou directement. Identifiez un contrat qui offre au minimum les mêmes garanties
        que votre contrat actuel (principe d&apos;équivalence des garanties).</li>
        <li><strong>Étape 2</strong> : souscrivez le nouveau contrat (sous conditions).</li>
        <li><strong>Étape 3</strong> : envoyez une demande de substitution à votre
        banque par courrier recommandé avec le nouveau contrat en pièce jointe.</li>
        <li><strong>Étape 4</strong> : votre banque dispose de 10 jours ouvrés pour
        accepter ou refuser. Elle ne peut refuser que si les garanties sont inférieures.</li>
        <li><strong>Étape 5</strong> : en cas d&apos;acceptation, votre banque procède
        à la substitution et rembourse le trop-perçu.</li>
      </ul>

      <h2>Le principe d&apos;équivalence des garanties</h2>
      <p>
        Votre banque ne peut pas refuser votre nouveau contrat si les garanties sont
        équivalentes. Elle doit vous motiver tout refus par écrit en listant les
        garanties manquantes. Les principales garanties à vérifier :
      </p>
      <ul>
        <li>Décès et Perte Totale et Irréversible d&apos;Autonomie (PTIA)</li>
        <li>Invalidité Permanente Totale (IPT) et Partielle (IPP)</li>
        <li>Incapacité Temporaire de Travail (ITT)</li>
        <li>Perte d&apos;emploi (optionnelle selon votre banque)</li>
      </ul>

      <h2>Quand est-il particulièrement intéressant de changer ?</h2>
      <ul>
        <li>Si vous avez souscrit votre prêt avant 2022 et n&apos;avez jamais changé</li>
        <li>Si votre état de santé s&apos;est amélioré depuis la souscription</li>
        <li>Si vous êtes non-fumeur et que vous étiez fumeur à la souscription</li>
        <li>Si vous êtes maintenant dans une profession moins risquée</li>
        <li>Si votre âge vous place dans une meilleure tranche tarifaire</li>
      </ul>

      <h2>HT Assurance, votre courtier emprunteur à Nice</h2>
      <p>
        HT Assurance gère pour vous toutes les démarches de changement d&apos;assurance
        emprunteur : comparaison, souscription, rédaction de la lettre de substitution,
        suivi auprès de votre banque. Notre service est gratuit — nous sommes rémunérés
        par la compagnie d&apos;assurance que vous choisissez.
      </p>
    </>
  );
}
