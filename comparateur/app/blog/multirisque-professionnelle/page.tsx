import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance Multirisque Professionnelle 2026 : Garanties, Prix & Comparatif | HT Assurance Nice",
  description:
    "Guide complet de l'assurance multirisque professionnelle (MRP) : garanties incluses, prix par activité, obligations et conseils pour bien choisir. Courtier HT Assurance à Nice.",
  alternates: { canonical: `${BASE}/blog/multirisque-professionnelle` },
  openGraph: {
    title: "Assurance Multirisque Professionnelle 2026 : Guide Complet",
    description:
      "Tout savoir sur l'assurance multirisque professionnelle : protection des locaux, matériel, marchandises, RC exploitation. Prix et comparatif 2026.",
    url: `${BASE}/blog/multirisque-professionnelle`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "La multirisque professionnelle est-elle obligatoire ?",
    answer:
      "L'assurance multirisque professionnelle n'est pas légalement obligatoire pour tous les professionnels, mais elle est imposée de fait aux locataires de locaux commerciaux par le bailleur (obligation de garantie des risques locatifs). De plus, certaines professions réglementées doivent souscrire une RC professionnelle, souvent incluse dans la MRP. Dans tous les cas, elle est très fortement recommandée pour protéger votre activité.",
  },
  {
    question: "Quelle est la différence entre RC Pro et multirisque professionnelle ?",
    answer:
      "La RC Pro (responsabilité civile professionnelle) couvre uniquement les dommages causés aux tiers dans le cadre de votre activité. La multirisque professionnelle (MRP) est un contrat plus large qui inclut la RC Pro, mais aussi la protection de vos locaux, de votre matériel, de vos marchandises, ainsi que des garanties complémentaires comme la perte d'exploitation ou la protection juridique.",
  },
  {
    question: "Combien coûte une assurance multirisque professionnelle en 2026 ?",
    answer:
      "Le prix dépend de votre activité, de la surface de vos locaux, de la valeur de votre stock et de votre chiffre d'affaires. Pour un bureau ou cabinet de moins de 100 m², comptez entre 250 et 600 euros par an. Pour un commerce de détail, entre 500 et 1 200 euros par an. Pour un restaurant ou bar, entre 800 et 2 000 euros par an en raison des risques spécifiques (incendie, responsabilité accrue).",
  },
  {
    question: "Que couvre la garantie perte d'exploitation ?",
    answer:
      "La garantie perte d'exploitation compense la baisse de chiffre d'affaires consécutive à un sinistre couvert par le contrat (incendie, dégât des eaux, etc.). Elle prend en charge les charges fixes (loyer, salaires, emprunts) pendant la période de remise en état de vos locaux, généralement sur une durée maximale de 12 à 24 mois selon les contrats.",
  },
  {
    question: "Comment résilier ou changer de multirisque professionnelle ?",
    answer:
      "Depuis la loi Hamon, vous pouvez résilier votre contrat multirisque professionnelle à tout moment après la première année, sans frais ni pénalités. Il suffit d'envoyer une lettre recommandée à votre assureur actuel. Votre nouveau courtier ou assureur peut se charger de la démarche. La résiliation prend effet un mois après la notification.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance Multirisque Professionnelle 2026 : Guide Complet",
  description: "Tout savoir sur l'assurance multirisque professionnelle : garanties, prix par activité, obligations et conseils pour bien choisir sa MRP.",
  url: `${BASE}/blog/multirisque-professionnelle`,
  datePublished: "2026-03-19",
  dateModified: "2026-03-19",
  author: { "@type": "Organization", name: "HT Assurance", url: BASE },
  publisher: { "@type": "Organization", name: "HT Assurance", url: BASE },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function MultirisqueProfessionnelle() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Multirisque Professionnelle</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Professionnels</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance Multirisque Professionnelle 2026 : garanties, prix et comparatif
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Protection des locaux, du matériel et des marchandises, responsabilité civile exploitation, perte d&apos;exploitation : tout comprendre sur l&apos;assurance multirisque professionnelle (MRP) pour protéger votre commerce ou votre activité.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis à jour le 19 mars 2026</span>
            <span>·</span>
            <span>7 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre multirisque professionnelle</p>
            <p className="text-blue-100 text-sm mt-1">Réponse en 2 minutes · Courtier indépendant · Meilleurs tarifs</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Obtenir un devis →
          </Link>
        </div>

        <div className="border border-slate-100 rounded-xl p-5 mb-10 text-sm">
          <p className="font-semibold text-slate-700 mb-3">Sommaire</p>
          <ol className="space-y-1 text-slate-500">
            <li><a href="#definition" className="hover:text-blue-600">1. Qu&apos;est-ce que la multirisque professionnelle ?</a></li>
            <li><a href="#garanties" className="hover:text-blue-600">2. Les garanties incluses dans une MRP</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de la multirisque pro en 2026</a></li>
            <li><a href="#obligation" className="hover:text-blue-600">4. Qui doit souscrire une multirisque professionnelle ?</a></li>
            <li><a href="#choisir" className="hover:text-blue-600">5. Comment bien choisir sa MRP</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          <h2 id="definition" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Qu&apos;est-ce que la multirisque professionnelle ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;<strong>assurance multirisque professionnelle</strong> (MRP) est un contrat qui regroupe en une seule police l&apos;ensemble des garanties essentielles pour protéger votre activité. Elle couvre à la fois vos <strong>locaux professionnels</strong>, votre matériel, vos marchandises et votre responsabilité civile exploitation.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            C&apos;est le contrat socle de toute entreprise disposant de locaux : que vous soyez artisan, commerçant, professionnel libéral ou gérant de restaurant. Elle fonctionne sur le même principe que l&apos;assurance multirisque habitation, mais adaptée aux spécificités de l&apos;activité professionnelle.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Protection des locaux professionnels (murs, aménagements, vitrines) contre les sinistres",
              "Couverture du matériel professionnel (mobilier, informatique, outillage, machines)",
              "Garantie des marchandises et stocks entreposés dans vos locaux",
              "Responsabilité civile exploitation : dommages causés aux tiers dans le cadre de votre activité",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 id="garanties" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Les garanties incluses dans une MRP</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties de base</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Incendie & explosion", desc: "Dommages causés par le feu, la foudre, les explosions et la fumée à vos locaux et contenus" },
              { name: "Dégât des eaux", desc: "Fuites, infiltrations, ruptures de canalisations et débordements dans vos locaux professionnels" },
              { name: "Vol & vandalisme", desc: "Vol par effraction ou agression, tentative de vol, détérioration volontaire des locaux et biens" },
              { name: "Bris de glace", desc: "Remplacement des vitrines, baies vitrées, enseignes lumineuses et cloisons vitrées" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties complémentaires essentielles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Perte d'exploitation", desc: "Compense la baisse de chiffre d'affaires et les charges fixes pendant la remise en état après sinistre" },
              { name: "RC exploitation", desc: "Couvre les dommages corporels ou matériels causés aux clients, fournisseurs ou passants dans vos locaux" },
              { name: "Protection juridique", desc: "Prise en charge des frais d'avocat et de procédure en cas de litige lié à votre activité" },
              { name: "Catastrophes naturelles", desc: "Indemnisation en cas d'inondation, tempête, grêle, séisme ou mouvement de terrain" },
              { name: "Dommages électriques", desc: "Court-circuits, surtensions et pannes affectant vos équipements électriques et électroniques" },
              { name: "Risques informatiques", desc: "Perte de données, cyber-attaque, panne serveur — de plus en plus indispensable" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de la multirisque professionnelle en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le tarif d&apos;une <strong>assurance multirisque professionnelle</strong> varie selon la nature de l&apos;activité, la surface des locaux, la valeur du stock et le niveau de garanties choisi. Voici un comparatif des prix moyens constatés en 2026 :
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Type d&apos;activité</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">AXA</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Allianz</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">MMA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { activite: "Bureau / cabinet < 100 m²", axa: "280 € – 550 €", allianz: "250 € – 500 €", mma: "300 € – 600 €" },
                  { activite: "Commerce de détail", axa: "550 € – 1 100 €", allianz: "500 € – 1 050 €", mma: "600 € – 1 200 €" },
                  { activite: "Restaurant / bar", axa: "900 € – 1 800 €", allianz: "850 € – 1 700 €", mma: "950 € – 2 000 €" },
                  { activite: "Entrepôt / stockage", axa: "700 € – 1 500 €", allianz: "650 € – 1 400 €", mma: "750 € – 1 600 €" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.activite}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.axa}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.allianz}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.mma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Tarifs annuels indicatifs TTC. Un courtier peut obtenir des conditions plus avantageuses grâce à ses accords avec les assureurs.</p>

          <h2 id="obligation" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Qui doit souscrire une multirisque professionnelle ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La <strong>multirisque professionnelle</strong> concerne tout professionnel disposant de locaux pour exercer son activité. Voici les cas de figure :
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">Obligation pour les locataires</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Si vous êtes <strong>locataire d&apos;un local commercial</strong>, le bail impose systématiquement la souscription d&apos;une assurance couvrant les risques locatifs (incendie, dégât des eaux, explosion). La multirisque professionnelle remplit cette obligation tout en vous offrant une protection bien plus large.
            </p>
          </div>
          <ul className="space-y-2 mb-6">
            {[
              "Locataire d'un local commercial ou professionnel : assurance risques locatifs obligatoire (imposée par le bail)",
              "Propriétaire exploitant : fortement recommandée pour protéger le bâtiment, le contenu et l'activité",
              "Professions libérales en cabinet : protection du matériel, des dossiers clients et RC exploitation",
              "Commerçants et artisans : couverture du stock, des vitrines et de la responsabilité envers les clients",
              "Restaurateurs et hôteliers : risques spécifiques (incendie cuisine, intoxication alimentaire, bris de matériel)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 id="choisir" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Comment bien choisir sa multirisque professionnelle</h2>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Évaluer précisément la valeur de votre stock", detail: "Sous-estimer la valeur de vos marchandises entraîne une indemnisation partielle en cas de sinistre (règle proportionnelle). Faites un inventaire détaillé et actualisez-le chaque année." },
              { titre: "Adapter les garanties à la surface de vos locaux", detail: "Un petit bureau de 30 m² n'a pas les mêmes besoins qu'un entrepôt de 500 m². Vérifiez que les plafonds d'indemnisation correspondent à la valeur réelle de vos locaux et aménagements." },
              { titre: "Déclarer précisément votre activité", detail: "Une activité à risque (restauration, travail du bois, produits chimiques) implique des tarifs et garanties spécifiques. Une fausse déclaration peut entraîner la nullité du contrat." },
              { titre: "Vérifier les franchises", detail: "Comparez les montants de franchise par type de sinistre. Une franchise trop élevée sur le vol peut s'avérer problématique si votre stock a une forte valeur. Négociez les franchises avec votre courtier." },
              { titre: "Ne pas négliger la perte d'exploitation", detail: "C'est souvent la garantie qui sauve une entreprise après un sinistre majeur. Sans elle, vous continuez de payer loyer et salaires sans chiffre d'affaires pendant la remise en état." },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600 border border-slate-100 rounded-xl p-4">
                <span className="text-blue-500 font-bold text-lg leading-none mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.titre}</p>
                  <p className="text-sm mt-1">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 rounded-2xl p-6 my-8">
            <p className="font-semibold text-slate-800 mb-2">Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En tant que courtier à Nice, nous accompagnons de nombreux commerçants et professionnels de la région PACA dans le choix de leur <strong>assurance local professionnel</strong>. Chaque activité a ses risques propres — notre assistant IA vous pose les bonnes questions en 2 minutes pour vous proposer les meilleures offres du marché.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis multirisque pro en 2 minutes</p>
            <p className="text-blue-100 text-sm mt-1">Comparaison gratuite · Sans engagement · Réponse immédiate</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Comparer maintenant →
          </Link>
        </div>

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions fréquentes sur la multirisque professionnelle</h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-2">{item.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">← Retour au blog</Link>
        </div>
      </article>
    </>
  );
}
