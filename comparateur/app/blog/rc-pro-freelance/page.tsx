import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "RC Pro Freelance 2026 : Prix, Obligations & Comparatif | HT Assurance Nice",
  description:
    "Guide complet de la RC Pro freelance : obligation selon votre activité, couvertures, prix 2026 par métier et chiffre d'affaires, et comment bien choisir. Courtier HT Assurance à Nice.",
  alternates: { canonical: `${BASE}/blog/rc-pro-freelance` },
  openGraph: {
    title: "RC Pro Freelance 2026 : Guide Complet pour les Indépendants",
    description:
      "Tout ce qu'un freelance doit savoir sur l'assurance responsabilité civile professionnelle : obligations, garanties, prix et comparateur.",
    url: `${BASE}/blog/rc-pro-freelance`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "La RC Pro est-elle obligatoire pour un micro-entrepreneur ?",
    answer:
      "La RC Pro n'est pas obligatoire pour tous les micro-entrepreneurs. Elle l'est uniquement si votre activité fait partie des professions réglementées (BTP, santé, conseil juridique, expertise comptable, agents immobiliers, etc.). Pour les autres métiers (développeur web, graphiste, consultant marketing…), elle reste fortement recommandée car un seul sinistre peut mettre en péril votre activité.",
  },
  {
    question: "Quel est le prix moyen d'une RC Pro pour un développeur web freelance ?",
    answer:
      "En 2026, un développeur web freelance avec un chiffre d'affaires inférieur à 50 000 € peut trouver une RC Pro à partir de 200 € par an chez des assureurs comme Hiscox ou Orus. Pour un CA entre 50 000 € et 150 000 €, comptez entre 350 € et 600 € par an selon le plafond de garantie choisi et les options (cyber-risques, couverture monde entier).",
  },
  {
    question: "Que faire en cas de sinistre couvert par ma RC Pro ?",
    answer:
      "Dès la survenance d'un sinistre, vous devez le déclarer à votre assureur dans les 5 jours ouvrés (2 jours en cas de vol). Rassemblez toutes les preuves : contrat client, échanges écrits, descriptif du dommage. Ne reconnaissez jamais votre responsabilité par écrit avant d'avoir consulté votre assureur. L'assureur mandatera un expert si nécessaire et gérera la procédure d'indemnisation.",
  },
  {
    question: "Peut-on cumuler RC Pro et assurance décennale ?",
    answer:
      "Oui, et c'est même obligatoire pour les professionnels du BTP. La RC Pro couvre les dommages liés à votre activité courante (erreurs, retards, négligences), tandis que l'assurance décennale couvre spécifiquement les dommages affectant la solidité d'un ouvrage ou le rendant inhabitable pendant 10 ans après la réception des travaux. Ce sont deux garanties complémentaires et distinctes.",
  },
  {
    question: "Puis-je résilier ma RC Pro en cours d'année ?",
    answer:
      "Oui, grâce à la loi Hamon, vous pouvez résilier votre contrat RC Pro à tout moment après la première année de souscription, sans frais ni pénalité, avec un préavis d'un mois. Avant la première année, la résiliation n'est possible qu'à l'échéance annuelle avec un préavis de 2 mois. Certains assureurs comme Orus proposent même des contrats sans engagement résiliables à tout moment.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "RC Pro Freelance 2026 : Guide Complet pour les Indépendants",
  description: "Tout ce qu'un freelance doit savoir sur la RC Pro : obligations, couvertures, prix et comparateur.",
  url: `${BASE}/blog/rc-pro-freelance`,
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

export default function RCProFreelance() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">RC Pro Freelance</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Professionnels</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            RC Pro Freelance 2026 : obligations, prix et comparatif
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Assurance responsabilit&eacute; civile professionnelle pour freelances et auto-entrepreneurs : quand est-elle obligatoire, que couvre-t-elle, combien co&ucirc;te-t-elle en 2026 et comment bien la choisir.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis &agrave; jour le 19 mars 2026</span>
            <span>&middot;</span>
            <span>7 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre RC Pro freelance maintenant</p>
            <p className="text-blue-100 text-sm mt-1">R&eacute;ponse en 2 minutes &middot; Courtier ind&eacute;pendant &middot; Meilleurs tarifs</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Obtenir un devis &rarr;
          </Link>
        </div>

        <div className="border border-slate-100 rounded-xl p-5 mb-10 text-sm">
          <p className="font-semibold text-slate-700 mb-3">Sommaire</p>
          <ol className="space-y-1 text-slate-500">
            <li><a href="#obligatoire" className="hover:text-blue-600">1. La RC Pro est-elle obligatoire ?</a></li>
            <li><a href="#couverture" className="hover:text-blue-600">2. Que couvre la RC Pro ?</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de la RC Pro en 2026</a></li>
            <li><a href="#decennale" className="hover:text-blue-600">4. RC Pro vs assurance d&eacute;cennale : ne pas confondre</a></li>
            <li><a href="#choisir" className="hover:text-blue-600">5. Comment choisir sa RC Pro</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          <h2 id="obligatoire" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. La RC Pro est-elle obligatoire pour un freelance ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La <strong>RC Pro freelance</strong> (assurance responsabilit&eacute; civile professionnelle) n&apos;est pas obligatoire pour tous les ind&eacute;pendants. En revanche, elle l&apos;est imp&eacute;rativement pour les <strong>professions r&eacute;glement&eacute;es</strong> :
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Professionnels du BTP (ma\u00e7ons, \u00e9lectriciens, architectes, bureaux d'\u00e9tudes)",
              "Professionnels de sant\u00e9 (m\u00e9decins, kin\u00e9s, infirmiers lib\u00e9raux)",
              "Professions juridiques (avocats, notaires, huissiers)",
              "Experts-comptables et commissaires aux comptes",
              "Agents immobiliers et administrateurs de biens",
              "Agents d\u2019assurance et courtiers",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">{"\u2713"}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">{"\u26A0\uFE0F"} M&ecirc;me si vous n&apos;&ecirc;tes pas concern&eacute; par l&apos;obligation</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Pour les m&eacute;tiers non r&eacute;glement&eacute;s (d&eacute;veloppeur, graphiste, consultant marketing, r&eacute;dacteur, community manager&hellip;), la <strong>RC Pro auto-entrepreneur</strong> reste fortement recommand&eacute;e. Un simple bug, une erreur de conseil ou un retard de livraison peut entra&icirc;ner une r&eacute;clamation client de plusieurs dizaines de milliers d&apos;euros.
            </p>
          </div>

          <h2 id="couverture" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Que couvre la RC Pro ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;<strong>assurance responsabilit&eacute; civile professionnelle</strong> prot&egrave;ge le freelance contre les cons&eacute;quences financi&egrave;res des dommages caus&eacute;s &agrave; des tiers (clients, partenaires, fournisseurs) dans le cadre de son activit&eacute;.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Dommages couverts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Erreurs et fautes professionnelles", desc: "Mauvais conseil, erreur de conception, bug logiciel, calcul erron\u00e9" },
              { name: "Omissions et oublis", desc: "Oubli d\u2019une clause contractuelle, d\u2019une d\u00e9claration ou d\u2019une \u00e9ch\u00e9ance" },
              { name: "Retards de livraison", desc: "Pr\u00e9judice financier subi par le client suite \u00e0 un retard imputable au freelance" },
              { name: "N\u00e9gligences", desc: "Manque de diligence ayant entra\u00een\u00e9 un dommage pour le client" },
              { name: "Perte ou fuite de donn\u00e9es", desc: "Perte de fichiers clients, violation de donn\u00e9es personnelles (RGPD)" },
              { name: "Dommages mat\u00e9riels", desc: "D\u00e9gradation de mat\u00e9riel chez un client lors d\u2019une intervention" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Ce que la RC Pro ne couvre g&eacute;n&eacute;ralement pas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Faute intentionnelle", desc: "Dommages caus\u00e9s volontairement ou par fraude" },
              { name: "Amendes et p\u00e9nalit\u00e9s", desc: "Sanctions p\u00e9nales, amendes administratives" },
              { name: "Garantie d\u00e9cennale", desc: "Dommages affectant la solidit\u00e9 d\u2019un ouvrage (contrat s\u00e9par\u00e9)" },
              { name: "Usure normale", desc: "D\u00e9t\u00e9rioration li\u00e9e \u00e0 l\u2019usage normal du livrable" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de la RC Pro en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le tarif de la <strong>RC Pro freelance</strong> d&eacute;pend principalement de votre m&eacute;tier, de votre chiffre d&apos;affaires et du plafond de garantie. Voici les fourchettes constat&eacute;es en 2026 :
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">M&eacute;tier</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">CA &lt; 50 k&euro;</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">CA 50-150 k&euro;</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">CA 150-300 k&euro;</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metier: "D\u00e9veloppeur / IT", ca1: "200 \u20AC \u2013 400 \u20AC", ca2: "350 \u20AC \u2013 600 \u20AC", ca3: "550 \u20AC \u2013 900 \u20AC" },
                  { metier: "Consultant / conseil", ca1: "250 \u20AC \u2013 450 \u20AC", ca2: "400 \u20AC \u2013 700 \u20AC", ca3: "600 \u20AC \u2013 1 100 \u20AC" },
                  { metier: "Graphiste / designer", ca1: "180 \u20AC \u2013 350 \u20AC", ca2: "300 \u20AC \u2013 550 \u20AC", ca3: "500 \u20AC \u2013 850 \u20AC" },
                  { metier: "Architecte", ca1: "500 \u20AC \u2013 900 \u20AC", ca2: "800 \u20AC \u2013 1 500 \u20AC", ca3: "1 200 \u20AC \u2013 2 500 \u20AC" },
                  { metier: "Expert-comptable", ca1: "600 \u20AC \u2013 1 000 \u20AC", ca2: "900 \u20AC \u2013 1 800 \u20AC", ca3: "1 500 \u20AC \u2013 3 000 \u20AC" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.metier}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.ca1}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.ca2}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.ca3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Principaux assureurs RC Pro pour freelances</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Hiscox", desc: "Sp\u00e9cialiste des freelances et TPE. Souscription 100 % en ligne, tarifs comp\u00e9titifs pour les m\u00e9tiers du num\u00e9rique." },
              { name: "AXA", desc: "Assureur g\u00e9n\u00e9raliste avec une offre RC Pro compl\u00e8te. R\u00e9seau d\u2019agences pour un suivi en pr\u00e9sentiel." },
              { name: "Allianz", desc: "Plafonds de garantie \u00e9lev\u00e9s, adapt\u00e9 aux professions r\u00e9glement\u00e9es (architectes, comptables)." },
              { name: "Orus", desc: "Assurtech 100 % en ligne, contrats sans engagement, id\u00e9al pour les auto-entrepreneurs." },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Tarifs indicatifs. Un courtier peut obtenir des conditions plus avantageuses gr&acirc;ce &agrave; ses accords avec les assureurs.</p>

          <h2 id="decennale" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. RC Pro vs assurance d&eacute;cennale : ne pas confondre</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Beaucoup de freelances confondent la <strong>RC Pro</strong> et l&apos;<strong>assurance d&eacute;cennale</strong>. Ce sont pourtant deux contrats tr&egrave;s diff&eacute;rents :
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Crit&egrave;re</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">RC Pro</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">D&eacute;cennale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { critere: "Objet", rcpro: "Erreurs, fautes, n\u00e9gligences dans l\u2019exercice professionnel", decennale: "Dommages compromettant la solidit\u00e9 d\u2019un ouvrage" },
                  { critere: "Dur\u00e9e de couverture", rcpro: "Pendant l\u2019ex\u00e9cution de la mission", decennale: "10 ans apr\u00e8s r\u00e9ception des travaux" },
                  { critere: "Qui est concern\u00e9 ?", rcpro: "Tous les professionnels", decennale: "Uniquement les m\u00e9tiers du BTP" },
                  { critere: "Obligatoire ?", rcpro: "Professions r\u00e9glement\u00e9es uniquement", decennale: "Oui, pour tout constructeur (loi Spinetta)" },
                  { critere: "Prix moyen", rcpro: "200 \u20AC \u2013 3 000 \u20AC/an", decennale: "1 500 \u20AC \u2013 8 000 \u20AC/an" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 font-medium text-slate-700 border-b border-slate-100">{row.critere}</td>
                    <td className="p-3 text-slate-600 border-b border-slate-100">{row.rcpro}</td>
                    <td className="p-3 text-slate-600 border-b border-slate-100">{row.decennale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">{"\u26A0\uFE0F"} Attention si vous travaillez dans le BTP</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Si vous &ecirc;tes artisan, architecte ou bureau d&apos;&eacute;tudes intervenant sur des chantiers de construction, vous devez souscrire <strong>les deux contrats</strong> : une RC Pro pour vos erreurs courantes et une d&eacute;cennale pour les dommages li&eacute;s &agrave; la solidit&eacute; des ouvrages. L&apos;absence de d&eacute;cennale est une infraction p&eacute;nale.
            </p>
          </div>

          <h2 id="choisir" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Comment choisir sa RC Pro</h2>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "V\u00e9rifier le plafond de garantie", detail: "Choisissez un plafond adapt\u00e9 \u00e0 vos contrats. Un d\u00e9veloppeur travaillant sur un projet \u00e0 100 000 \u20AC doit avoir au moins 200 000 \u20AC de plafond. R\u00e8gle d\u2019usage : plafond = 2\u00D7 votre plus gros contrat." },
              { titre: "Comparer les franchises", detail: "La franchise est le montant restant \u00e0 votre charge en cas de sinistre. Une franchise basse (500 \u20AC) co\u00FBte plus cher en prime mais vous prot\u00E8ge mieux. \u00C9valuez votre capacit\u00e9 \u00e0 absorber un sinistre." },
              { titre: "Exiger une couverture monde entier", detail: "Si vous avez des clients \u00e0 l\u2019\u00e9tranger, v\u00e9rifiez que votre contrat couvre les missions hors de France. Attention : les \u00C9tats-Unis et le Canada n\u00e9cessitent souvent une extension sp\u00e9cifique." },
              { titre: "Int\u00e9grer la garantie cyber", detail: "En 2026, les cyber-risques (ransomware, fuite de donn\u00e9es) sont le premier risque pour les freelances IT. Certaines RC Pro incluent une garantie cyber, d\u2019autres la proposent en option (50 \u00e0 150 \u20AC/an suppl\u00e9mentaires)." },
              { titre: "Passer par un courtier ind\u00e9pendant", detail: "Un courtier compare les offres de plusieurs assureurs et n\u00e9gocie les tarifs. \u00C9conomies moyennes de 15 \u00e0 25 % par rapport \u00e0 une souscription directe." },
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
            <p className="font-semibold text-slate-800 mb-2">{"\uD83D\uDCA1"} Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En tant que courtier &agrave; Nice sp&eacute;cialis&eacute; dans l&apos;<strong>assurance freelance</strong>, nous accompagnons chaque jour des d&eacute;veloppeurs, consultants et cr&eacute;atifs dans le choix de leur RC Pro. Notre assistant IA analyse votre profil et vous propose les meilleures offres en 2 minutes.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis RC Pro en 2 minutes</p>
            <p className="text-blue-100 text-sm mt-1">Comparaison gratuite &middot; Sans engagement &middot; R&eacute;ponse imm&eacute;diate</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Comparer maintenant &rarr;
          </Link>
        </div>

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ &mdash; Questions fr&eacute;quentes sur la RC Pro freelance</h2>
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
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">&larr; Retour au blog</Link>
        </div>
      </article>
    </>
  );
}
