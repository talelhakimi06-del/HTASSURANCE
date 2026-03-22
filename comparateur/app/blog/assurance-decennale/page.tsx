import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance Décennale 2026 : Prix, Garanties & Comparateur | HT Assurance Nice",
  description:
    "Tout savoir sur l'assurance décennale : obligation légale, garanties couvertes, prix selon le corps de métier, et comment comparer les offres. Guide complet du courtier HT Assurance à Nice.",
  alternates: { canonical: `${BASE}/blog/assurance-decennale` },
  openGraph: {
    title: "Assurance Décennale 2026 : Guide Complet",
    description:
      "Obligation légale, garanties, prix et comparateur. Tout sur l'assurance décennale par votre courtier à Nice.",
    url: `${BASE}/blog/assurance-decennale`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "L'assurance décennale est-elle obligatoire pour un auto-entrepreneur ?",
    answer:
      "Oui, sans exception. Dès lors qu'un auto-entrepreneur exerce une activité relevant du secteur du bâtiment (maçon, électricien, plombier, carreleur, etc.), il est tenu de souscrire une assurance décennale avant le début de tout chantier. L'absence de cette garantie est passible de 6 mois d'emprisonnement et 75 000 € d'amende.",
  },
  {
    question: "Quel est le prix d'une assurance décennale ?",
    answer:
      "Le tarif varie selon le corps de métier, le chiffre d'affaires et l'expérience professionnelle. En moyenne : gros œuvre (maçon, béton) entre 1 500 € et 4 000 €/an ; second œuvre (plombier, électricien) entre 500 € et 1 500 €/an ; finitions (peintre, carreleur) entre 300 € et 800 €/an. Un courtier comme HT Assurance peut obtenir des tarifs 20 à 30 % moins chers qu'en direct.",
  },
  {
    question: "Que couvre exactement la garantie décennale ?",
    answer:
      "Elle couvre les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination, survenus dans les 10 ans suivant la réception des travaux. Exemples : fissures importantes dans les murs porteurs, infiltrations par la toiture, affaissement de plancher, défaut d'étanchéité.",
  },
  {
    question: "Quelle est la différence entre garantie décennale et RC Pro ?",
    answer:
      "La garantie décennale couvre les dommages graves sur l'ouvrage après livraison (pendant 10 ans). La RC Pro (responsabilité civile professionnelle) couvre les dommages causés à des tiers pendant l'exécution des travaux (dégât des eaux chez un voisin, blessure d'un passant, etc.). Les deux sont complémentaires.",
  },
  {
    question: "Peut-on changer d'assureur décennale en cours d'année ?",
    answer:
      "Oui, depuis la loi Hamon (2014) appliquée aux professionnels, il est possible de résilier son contrat décennale à tout moment après la première année, avec un préavis d'un mois. Attention : les chantiers déjà livrés restent couverts par l'ancien contrat pendant 10 ans.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance Décennale 2026 : Prix, Garanties & Guide Complet",
  description:
    "Guide complet sur l'assurance décennale : obligation légale, garanties couvertes, prix selon le métier, comparatif des offres.",
  url: `${BASE}/blog/assurance-decennale`,
  datePublished: "2026-03-18",
  dateModified: "2026-03-18",
  author: {
    "@type": "Organization",
    name: "HT Assurance",
    url: BASE,
  },
  publisher: {
    "@type": "Organization",
    name: "HT Assurance",
    url: BASE,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function AssuranceDecennale() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Assurance Décennale</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">BTP & Construction</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance Décennale : tout ce que vous devez savoir en 2026
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Obligatoire pour tous les professionnels du bâtiment, la garantie décennale protège vos clients pendant 10 ans après la réception des travaux. Prix, garanties couvertes, obligations légales : voici le guide complet rédigé par votre courtier HT Assurance à Nice.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis à jour le 18 mars 2026</span>
            <span>·</span>
            <span>7 min de lecture</span>
          </div>
        </header>

        {/* CTA Box */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre assurance décennale maintenant</p>
            <p className="text-blue-100 text-sm mt-1">Réponse en 2 minutes · Courtier indépendant · Meilleurs tarifs</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Obtenir un devis →
          </Link>
        </div>

        {/* Sommaire */}
        <div className="border border-slate-100 rounded-xl p-5 mb-10 text-sm">
          <p className="font-semibold text-slate-700 mb-3">Sommaire</p>
          <ol className="space-y-1 text-slate-500">
            <li><a href="#definition" className="hover:text-blue-600">1. Qu&apos;est-ce que l&apos;assurance décennale ?</a></li>
            <li><a href="#obligation" className="hover:text-blue-600">2. Qui est obligé de souscrire ?</a></li>
            <li><a href="#garanties" className="hover:text-blue-600">3. Quelles sont les garanties couvertes ?</a></li>
            <li><a href="#prix" className="hover:text-blue-600">4. Quel est le prix en 2026 ?</a></li>
            <li><a href="#choisir" className="hover:text-blue-600">5. Comment bien choisir son contrat ?</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ — Questions fréquentes</a></li>
          </ol>
        </div>

        {/* Contenu */}
        <div className="prose prose-slate max-w-none">

          <h2 id="definition" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Qu&apos;est-ce que l&apos;assurance décennale ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;assurance décennale, également appelée <strong>garantie décennale</strong> ou <strong>assurance construction</strong>, est une assurance de responsabilité civile professionnelle imposée par la loi Spinetta du 4 janvier 1978. Elle oblige tout constructeur (entrepreneur, architecte, bureau d&apos;études, artisan) à garantir la solidité des ouvrages qu&apos;il réalise pendant <strong>10 ans après la réception des travaux</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            En cas de sinistre, c&apos;est l&apos;assurance décennale du constructeur qui prend en charge les réparations, sans que le client ait à prouver une faute. Ce système protège à la fois le maître d&apos;ouvrage (le client) et le professionnel du bâtiment, qui n&apos;a pas à assumer seul des réparations potentiellement très coûteuses.
          </p>

          <h2 id="obligation" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Qui est obligé de souscrire une assurance décennale ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La loi impose la souscription d&apos;une assurance décennale à toute personne physique ou morale dont l&apos;activité relève de la construction, y compris :
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Maçons, carreleurs, couvreurs, zingueurs",
              "Plombiers, électriciens, chauffagistes",
              "Menuisiers, charpentiers, serruriers",
              "Peintres en bâtiment, plaquistes",
              "Architectes et bureaux d'études",
              "Auto-entrepreneurs du BTP",
              "Sociétés de promotion immobilière (VEFA)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-600 leading-relaxed mb-4">
            <strong>Important :</strong> le professionnel doit remettre une attestation d&apos;assurance décennale valide à son client avant l&apos;ouverture de chaque chantier. Sans cette attestation, le contrat peut être annulé et des poursuites pénales engagées.
          </p>

          <h2 id="garanties" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Quelles sont les garanties couvertes ?</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Dommages couverts</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Selon l&apos;article 1792 du Code civil, la garantie décennale couvre tout dommage qui :
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Compromet la solidité de l'ouvrage (fissures structurelles, affaissement de fondations)",
              "Rend l'ouvrage impropre à sa destination (infiltrations importantes, défaut d'étanchéité de toiture)",
              "Affecte la solidité des éléments d'équipement indissociables (escaliers, balcons, canalisations encastrées)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Dommages exclus</h3>
          <ul className="space-y-2 mb-6">
            {[
              "Usure normale et vieillissement",
              "Défaut d'entretien par le propriétaire",
              "Dommages causés par un tiers ou cas de force majeure",
              "Éléments d'équipement dissociables (radiateurs, appareils électroménagers)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties complémentaires recommandées</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            En complément de la décennale, plusieurs garanties sont fortement conseillées :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "RC Pro", desc: "Dommages causés pendant l'exécution des travaux" },
              { name: "Garantie de bon fonctionnement", desc: "Équipements dissociables (2 ans)" },
              { name: "Garantie de parfait achèvement", desc: "Désordres signalés à la réception (1 an)" },
              { name: "Protection juridique", desc: "Défense en cas de litige avec un client" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Quel est le prix d&apos;une assurance décennale en 2026 ?</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            La cotisation annuelle dépend principalement du <strong>corps de métier</strong>, du <strong>chiffre d&apos;affaires</strong> et de l&apos;<strong>expérience professionnelle</strong>. Voici les fourchettes constatées sur le marché en 2026 :
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Corps de métier</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Fourchette annuelle</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Niveau de risque</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metier: "Gros œuvre (maçon, béton armé)", prix: "1 500 € – 4 000 €", risque: "Élevé" },
                  { metier: "Couvreur / Zingueur", prix: "1 000 € – 2 500 €", risque: "Élevé" },
                  { metier: "Plombier / Chauffagiste", prix: "600 € – 1 500 €", risque: "Moyen" },
                  { metier: "Électricien", prix: "400 € – 1 200 €", risque: "Moyen" },
                  { metier: "Menuisier / Charpentier", prix: "500 € – 1 400 €", risque: "Moyen" },
                  { metier: "Peintre / Plaquiste", prix: "300 € – 800 €", risque: "Faible" },
                  { metier: "Carreleur", prix: "350 € – 900 €", risque: "Faible" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.metier}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.prix}</td>
                    <td className="p-3 text-slate-500 border-b border-slate-100">{row.risque}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">
            * Tarifs indicatifs pour un auto-entrepreneur avec un CA inférieur à 150 000 €/an et sans sinistre. Un courtier indépendant peut obtenir des tarifs 20 à 30 % inférieurs aux offres en direct.
          </p>

          <h2 id="choisir" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Comment bien choisir son assurance décennale ?</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.1 Vérifier l&apos;étendue des garanties</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Ne vous arrêtez pas au prix. Comparez notamment : le montant des plafonds de garantie (idéalement 10 fois votre CA annuel), les sous-limites par sinistre, les franchises, et les exclusions spécifiques à votre métier. Un contrat bradé avec des franchises élevées peut vous laisser sans couverture réelle.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.2 Choisir un assureur solide</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;assurance décennale vous couvre pendant 10 ans. Assurez-vous que l&apos;assureur est bien établi en France et noté par les agences de notation (Fitch, Moody&apos;s, S&P). Certains assureurs low-cost ont disparu, laissant leurs clients sans couverture.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">5.3 Passer par un courtier indépendant</h3>
          <p className="text-slate-600 leading-relaxed mb-4">
            Un courtier comme HT Assurance compare pour vous les offres de plusieurs assureurs (AXA, Allianz, Generali, Swiss Life, Abeille…) et négocie les tarifs. Ce service est gratuit pour vous : le courtier est rémunéré par les assureurs. Vous économisez du temps et souvent entre 20 et 30 % sur votre prime annuelle.
          </p>

          <div className="bg-slate-50 rounded-2xl p-6 my-8">
            <p className="font-semibold text-slate-800 mb-2">💡 Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ne souscrivez jamais une décennale sans avoir comparé au moins 3 offres. Les écarts de tarifs pour un même profil peuvent aller du simple au triple. Notre comparateur analyse votre profil en 2 minutes et vous propose les meilleures offres du marché.
            </p>
          </div>
        </div>

        {/* CTA milieu */}
        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis décennale en 2 minutes</p>
            <p className="text-blue-100 text-sm mt-1">Comparaison gratuite · Courtier indépendant · Sans engagement</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Comparer maintenant →
          </Link>
        </div>

        {/* FAQ */}
        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions fréquentes sur l&apos;assurance décennale</h2>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-xl p-5">
                <h3 className="font-semibold text-slate-800 mb-2">{item.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Retour blog */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">← Retour au blog</Link>
        </div>
      </article>
    </>
  );
}
