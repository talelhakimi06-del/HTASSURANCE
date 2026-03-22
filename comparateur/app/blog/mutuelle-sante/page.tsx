import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Mutuelle Santé 2026 : Complémentaire, Garanties & Prix | HT Assurance Nice",
  description:
    "Guide complet de la mutuelle santé 2026 : obligations, garanties à vérifier, prix par profil, avantage fiscal Madelin pour TNS et indépendants. Courtier HT Assurance à Nice.",
  alternates: { canonical: `${BASE}/blog/mutuelle-sante` },
  openGraph: {
    title: "Mutuelle Santé 2026 : Guide Complet pour Bien Choisir",
    description:
      "Tout savoir sur la complémentaire santé : obligations, garanties, prix et avantage Madelin pour les TNS et indépendants.",
    url: `${BASE}/blog/mutuelle-sante`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "Quel est le prix moyen d'une mutuelle santé en 2026 ?",
    answer:
      "En 2026, le prix moyen d'une mutuelle santé varie de 30 € à 60 € par mois pour un actif de 30 à 50 ans avec des garanties équilibrées. Pour un jeune de 20 à 30 ans, comptez entre 20 € et 40 € par mois. Les seniors de 50 à 65 ans paient en moyenne entre 60 € et 120 € par mois. Les tarifs varient selon le niveau de garanties, l'âge, la zone géographique et le nombre de bénéficiaires.",
  },
  {
    question: "La mutuelle est-elle obligatoire pour un indépendant ou un TNS ?",
    answer:
      "Non, la mutuelle santé n'est pas obligatoire pour les travailleurs non-salariés (TNS) et les indépendants. Cependant, elle est très fortement recommandée car la Sécurité sociale ne rembourse en moyenne que 70 % des frais médicaux (et bien moins en optique et dentaire). De plus, les TNS peuvent déduire leurs cotisations dans le cadre de la loi Madelin, ce qui réduit significativement le coût réel.",
  },
  {
    question: "Comment fonctionne l'avantage fiscal Madelin pour la mutuelle ?",
    answer:
      "La loi Madelin permet aux travailleurs non-salariés (TNS) de déduire les cotisations de leur mutuelle santé de leur bénéfice imposable, dans la limite d'un plafond fiscal (3,75 % du revenu + 7 % du PASS, soit environ 7 000 € en 2026). Concrètement, si vous êtes dans une tranche marginale d'imposition à 30 %, une mutuelle à 100 €/mois ne vous coûte réellement que 70 €/mois après économie d'impôt.",
  },
  {
    question: "Comment résilier sa mutuelle santé ?",
    answer:
      "Depuis la réforme du 1er décembre 2020, vous pouvez résilier votre mutuelle santé à tout moment après la première année de contrat, sans frais ni justificatif. Il suffit d'envoyer une lettre recommandée ou de demander à votre nouveau assureur de s'en charger. La résiliation prend effet un mois après la réception de la demande. Pour une mutuelle d'entreprise, la résiliation est possible en cas de changement de situation (fin de contrat, démission, etc.).",
  },
  {
    question: "C'est quoi le 100 % Santé ?",
    answer:
      "Le dispositif 100 % Santé (anciennement « reste à charge zéro ») permet d'accéder à des soins en optique, dentaire et audiologie sans aucun reste à charge. Concrètement, toutes les mutuelles responsables doivent proposer un panier de soins intégralement remboursé : lunettes avec monture et verres, couronnes et bridges dentaires, et prothèses auditives. Vous pouvez en bénéficier chez tous les professionnels de santé conventionnés.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Mutuelle Santé 2026 : Guide Complet pour Bien Choisir sa Complémentaire",
  description: "Tout savoir sur la mutuelle santé : obligations, garanties, prix par profil et avantage Madelin pour les TNS et indépendants.",
  url: `${BASE}/blog/mutuelle-sante`,
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

export default function MutuelleSante() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Mutuelle Santé</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-green-50 text-green-600 px-3 py-1 rounded-full">Santé</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Mutuelle Santé 2026 : le guide complet pour bien choisir sa complémentaire
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Mutuelle obligatoire ou pas, garanties essentielles, prix selon votre profil, avantage fiscal Madelin pour les TNS et indépendants. Tout ce qu&apos;il faut savoir pour choisir la bonne complémentaire santé en 2026.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis à jour le 19 mars 2026</span>
            <span>·</span>
            <span>7 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre mutuelle santé maintenant</p>
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
            <li><a href="#obligatoire" className="hover:text-blue-600">1. Mutuelle santé : obligatoire ou pas ?</a></li>
            <li><a href="#garanties" className="hover:text-blue-600">2. Les garanties à vérifier</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de la mutuelle santé en 2026</a></li>
            <li><a href="#madelin" className="hover:text-blue-600">4. TNS et indépendants : l&apos;avantage fiscal Madelin</a></li>
            <li><a href="#choisir" className="hover:text-blue-600">5. Comment bien choisir sa mutuelle</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          <h2 id="obligatoire" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Mutuelle santé : obligatoire ou pas ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La réponse dépend de votre statut. Depuis la loi ANI (Accord National Interprofessionnel) de 2016, tous les <strong>salariés du secteur privé</strong> doivent être couverts par une <strong>complémentaire santé</strong> financée au minimum à 50 % par leur employeur. C&apos;est une obligation légale pour l&apos;entreprise.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            En revanche, pour les <strong>travailleurs non-salariés (TNS)</strong>, les indépendants, les auto-entrepreneurs et les professions libérales, la <strong>mutuelle santé</strong> n&apos;est pas obligatoire mais reste très fortement recommandée. Sans complémentaire, le reste à charge peut atteindre 30 % des frais médicaux courants — et bien plus en optique, dentaire ou hospitalisation.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Salariés : mutuelle obligatoire via l'employeur depuis la loi ANI 2016",
              "TNS / indépendants : pas d'obligation, mais cotisations déductibles via le dispositif Madelin",
              "Auto-entrepreneurs : libre choix, mais aucune couverture employeur",
              "CMU-C (Complémentaire Santé Solidaire) : gratuite ou à moins de 1 €/jour pour les revenus modestes",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 id="garanties" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Les garanties à vérifier dans votre mutuelle santé</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties essentielles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Hospitalisation", desc: "Chambre particulière, forfait journalier, honoraires chirurgicaux, dépassements d'honoraires" },
              { name: "Soins courants", desc: "Consultations généralistes et spécialistes, analyses, médicaments, actes infirmiers" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties à comparer attentivement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Optique", desc: "Montures, verres correcteurs, lentilles. Vérifiez le plafond annuel et le reste à charge hors 100 % Santé" },
              { name: "Dentaire", desc: "Couronnes, implants, orthodontie adulte. Les dépassements sont fréquents, le remboursement Sécu est faible" },
              { name: "Médecines douces", desc: "Ostéopathie, acupuncture, chiropractie. Souvent un forfait annuel de 3 à 6 séances selon les contrats" },
              { name: "Dépassements d'honoraires", desc: "Secteur 2 et non-conventionnés. Crucial si vous consultez des spécialistes en grandes villes" },
              { name: "Pharmacie", desc: "Médicaments non remboursés ou partiellement remboursés par la Sécurité sociale" },
              { name: "Prévention", desc: "Bilans de santé, vaccins non remboursés, sevrage tabagique, dépistages" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de la mutuelle santé en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le tarif d&apos;une <strong>complémentaire santé</strong> dépend principalement de l&apos;âge, du niveau de garanties et du nombre de bénéficiaires. Voici les fourchettes de prix constatées en 2026 pour une personne seule :
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Profil</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Entrée de gamme</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Équilibre</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Confort</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Haut de gamme</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { profil: "Jeune (20-30 ans)", eg: "15 – 25 €", eq: "25 – 40 €", co: "40 – 60 €", hg: "60 – 90 €" },
                  { profil: "Actif (30-50 ans)", eg: "25 – 40 €", eq: "40 – 65 €", co: "65 – 95 €", hg: "95 – 150 €" },
                  { profil: "Senior (50-65 ans)", eg: "45 – 70 €", eq: "70 – 100 €", co: "100 – 150 €", hg: "150 – 250 €" },
                  { profil: "Famille (2 adultes + enfants)", eg: "60 – 100 €", eq: "100 – 160 €", co: "160 – 240 €", hg: "240 – 400 €" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.profil}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.eg}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.eq}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.co}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.hg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Tarifs indicatifs mensuels par personne. Les TNS bénéficiant du dispositif Madelin peuvent déduire ces cotisations de leur revenu imposable (voir section suivante).</p>

          <h2 id="madelin" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. TNS et indépendants : l&apos;avantage fiscal Madelin</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Si vous êtes <strong>travailleur non-salarié (TNS)</strong> — commerçant, artisan, profession libérale, gérant majoritaire — la loi Madelin vous permet de <strong>déduire vos cotisations de mutuelle santé</strong> de votre bénéfice imposable. C&apos;est un avantage fiscal considérable souvent méconnu des <strong>indépendants</strong>.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Le plafond de déduction est fixé à 3,75 % du revenu professionnel + 7 % du Plafond Annuel de la Sécurité Sociale (PASS), soit environ 7 000 € en 2026 pour la plupart des profils.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-green-800 text-sm mb-2">Exemple concret : TMI à 30 %</p>
            <p className="text-green-700 text-sm leading-relaxed">
              Un indépendant souscrit une <strong>mutuelle TNS Madelin</strong> à 100 €/mois (1 200 €/an). Avec une tranche marginale d&apos;imposition (TMI) à 30 %, il économise 360 €/an d&apos;impôt. Sa mutuelle ne lui coûte réellement que <strong>70 €/mois au lieu de 100 €</strong>. Plus la TMI est élevée (41 %, 45 %), plus l&apos;économie est importante.
            </p>
          </div>

          <ul className="space-y-2 mb-6">
            {[
              "Cotisations déductibles du bénéfice imposable (BIC, BNC, BA)",
              "Le contrat doit être « responsable » pour être éligible Madelin",
              "Obligation d'être à jour de ses cotisations sociales (URSSAF)",
              "Peut couvrir le conjoint et les enfants à charge",
              "Compatible avec les contrats de prévoyance et retraite Madelin",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 id="choisir" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Comment bien choisir sa mutuelle santé</h2>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Évaluez vos besoins réels", detail: "Inutile de surpayer pour des garanties que vous n'utilisez jamais. Analysez vos dépenses de santé des 2 dernières années (optique, dentaire, consultations spécialistes) pour cibler le bon niveau." },
              { titre: "Comparez le rapport garantie / prix", detail: "Un contrat à 30 €/mois qui rembourse mal le dentaire peut coûter plus cher qu'un contrat à 50 €/mois avec de bons plafonds. Regardez les remboursements réels, pas seulement la prime." },
              { titre: "Vérifiez les délais de carence", detail: "Certaines mutuelles imposent 3 à 6 mois de carence avant de rembourser les soins coûteux (optique, dentaire, hospitalisation). Préférez les contrats sans carence ou avec des délais courts." },
              { titre: "Choisissez un réseau de soins partenaire", detail: "Les réseaux comme Carte Blanche, Kalivia ou Santéclair permettent de bénéficier de tarifs négociés chez les opticiens, dentistes et audioprothésistes, réduisant votre reste à charge." },
              { titre: "Passez par un courtier indépendant", detail: "Un courtier compare des dizaines de contrats et négocie les meilleures conditions. Il connaît les garanties réellement utiles et les exclusions cachées dans les conditions générales." },
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
              En tant que courtier à Nice, nous accompagnons aussi bien les salariés que les TNS et indépendants dans le choix de leur mutuelle santé. Que vous cherchiez une mutuelle Madelin avantageuse ou une complémentaire familiale, notre assistant IA vous guide en 2 minutes vers les meilleures offres du marché.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis mutuelle santé en 2 minutes</p>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions fréquentes sur la mutuelle santé</h2>
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
