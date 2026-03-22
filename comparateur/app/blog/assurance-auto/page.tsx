import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance Auto 2026 : Garanties, Prix & Comparateur | HT Assurance Nice",
  description:
    "Guide complet assurance auto 2026 : garanties obligatoires, bonus-malus, prix par profil et véhicule, spécificités Nice & PACA. Comparateur assurance auto gratuit. Devis assurance voiture en 2 minutes.",
  alternates: { canonical: `${BASE}/blog/assurance-auto` },
  openGraph: {
    title: "Assurance Auto 2026 : Garanties, Prix & Comparateur",
    description:
      "Tout savoir sur l'assurance auto : tiers, tous risques, bonus-malus, prix moyens et astuces pour payer moins cher à Nice et en PACA.",
    url: `${BASE}/blog/assurance-auto`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "L'assurance auto est-elle obligatoire en France ?",
    answer:
      "Oui, l'assurance auto est obligatoire pour tout véhicule terrestre à moteur, même s'il ne roule pas (article L211-1 du Code des assurances). Au minimum, vous devez souscrire une garantie responsabilité civile (assurance au tiers) qui couvre les dommages que vous pourriez causer à autrui. Rouler sans assurance est un délit passible de 3 750 € d'amende, de la suspension du permis et de la confiscation du véhicule.",
  },
  {
    question: "Comment choisir entre assurance au tiers et tous risques ?",
    answer:
      "Le choix dépend de la valeur de votre véhicule et de votre budget. Pour un véhicule de moins de 5 ans ou d'une valeur supérieure à 10 000 €, le tous risques est recommandé car il couvre aussi vos propres dommages, même en tort. Pour un véhicule ancien de faible valeur, le tiers ou tiers confort (avec vol, incendie et bris de glace) est souvent plus judicieux économiquement.",
  },
  {
    question: "Quel est le prix moyen d'une assurance auto pour un jeune conducteur en 2026 ?",
    answer:
      "En 2026, un jeune conducteur (moins de 3 ans de permis) paie en moyenne entre 1 200 € et 2 500 € par an selon le véhicule et la formule choisie. La surprime jeune conducteur peut atteindre 100 % la première année, puis diminue progressivement : 50 % la deuxième année, 25 % la troisième. En région PACA, comptez 5 à 10 % de plus que la moyenne nationale.",
  },
  {
    question: "Comment résilier mon assurance auto ?",
    answer:
      "Depuis la loi Hamon (2015), vous pouvez résilier votre assurance auto à tout moment après la première année de contrat, sans frais ni pénalité. Il suffit d'envoyer une lettre recommandée ou de laisser votre nouvel assureur s'en charger. La résiliation prend effet 1 mois après la notification. Vous pouvez aussi résilier à l'échéance annuelle avec un préavis de 2 mois.",
  },
  {
    question: "Un véhicule électrique est-il moins cher à assurer ?",
    answer:
      "En général, oui. Les assureurs proposent des tarifs 15 à 25 % inférieurs pour les véhicules électriques, car leurs conducteurs ont statistiquement moins de sinistres et les motorisations électriques sont jugées plus fiables. Cependant, le coût de réparation de la batterie en cas de choc peut être très élevé, ce qui pousse certains assureurs à appliquer des franchises spécifiques. Comparer les offres reste essentiel.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance Auto 2026 : Garanties, Prix & Comparateur",
  description: "Guide complet assurance auto : garanties obligatoires et optionnelles, bonus-malus, prix moyens, spécificités Nice et PACA.",
  url: `${BASE}/blog/assurance-auto`,
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

export default function AssuranceAuto() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Assurance Auto</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Automobile</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance Auto 2026 : garanties, prix et comparateur
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Garanties obligatoires et optionnelles, fonctionnement du bonus-malus, prix moyens selon votre profil et votre véhicule, et conseils pour réduire votre prime. Le guide complet pour bien choisir votre <strong>assurance auto à Nice</strong> et en région PACA.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis à jour le 19 mars 2026</span>
            <span>·</span>
            <span>7 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre assurance auto maintenant</p>
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
            <li><a href="#garanties" className="hover:text-blue-600">1. Les garanties obligatoires et optionnelles</a></li>
            <li><a href="#bonus-malus" className="hover:text-blue-600">2. Comment fonctionne le bonus-malus</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de l&apos;assurance auto en 2026</a></li>
            <li><a href="#reduire" className="hover:text-blue-600">4. Comment réduire sa prime</a></li>
            <li><a href="#paca" className="hover:text-blue-600">5. Spécificités PACA / Nice</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          {/* Section 1 */}
          <h2 id="garanties" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Les garanties obligatoires et optionnelles</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            En France, la seule garantie légalement obligatoire est la <strong>responsabilité civile</strong> (assurance au tiers). Elle couvre les dommages corporels et matériels que vous causez à autrui lors d&apos;un accident. Mais pour une protection complète, plusieurs niveaux de couverture existent.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Assurance au tiers (minimum légal)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Responsabilité civile", desc: "Couvre les dommages causés aux tiers (corporels et matériels)" },
              { name: "Défense pénale & recours", desc: "Prise en charge juridique en cas de litige après un accident" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Tiers confort (intermédiaire)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Vol & tentative de vol", desc: "Indemnisation en cas de vol du véhicule ou de ses éléments" },
              { name: "Incendie & événements climatiques", desc: "Couverture des dégâts liés au feu, tempêtes, grêle, inondations" },
              { name: "Bris de glace", desc: "Réparation ou remplacement du pare-brise, vitres latérales et lunette arrière" },
              { name: "Protection du conducteur", desc: "Indemnise vos propres blessures même en cas d'accident responsable" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Tous risques (couverture maximale)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Dommages tous accidents", desc: "Couvre les dégâts à votre véhicule même si vous êtes responsable ou sans tiers identifié" },
              { name: "Vandalisme & catastrophes naturelles", desc: "Prise en charge des dégradations volontaires et événements exceptionnels" },
              { name: "Véhicule de remplacement", desc: "Mise à disposition d'un véhicule pendant la durée de réparation" },
              { name: "Assistance 0 km", desc: "Dépannage à domicile, remorquage et rapatriement inclus" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          {/* Section 2 */}
          <h2 id="bonus-malus" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Comment fonctionne le bonus-malus</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Le <strong>coefficient de réduction-majoration (CRM)</strong>, communément appelé bonus-malus, est un système qui récompense les bons conducteurs et pénalise les sinistres responsables. Il a un impact direct et significatif sur le montant de votre prime d&apos;assurance auto.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">Comment se calcule le coefficient ?</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Chaque année sans sinistre responsable, votre coefficient est multiplié par 0,95 (soit -5 %). Après un sinistre responsable, il est multiplié par 1,25 (+25 %). Le coefficient varie entre <strong>0,50</strong> (bonus maximum, atteint après 13 ans sans sinistre) et <strong>3,50</strong> (malus maximum).
            </p>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Situation</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Coefficient</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Impact sur la prime</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { situation: "Bonus maximum (13+ ans sans sinistre)", coef: "0,50", impact: "Vous payez 50 % de la prime de référence" },
                  { situation: "Débutant (1re année)", coef: "1,00", impact: "Vous payez 100 % de la prime de référence" },
                  { situation: "1 sinistre responsable la 1re année", coef: "1,25", impact: "Vous payez 125 % de la prime de référence" },
                  { situation: "2 sinistres responsables cumulés", coef: "1,56", impact: "Vous payez 156 % de la prime de référence" },
                  { situation: "Malus maximum", coef: "3,50", impact: "Vous payez 350 % de la prime de référence" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.situation}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.coef}</td>
                    <td className="p-3 text-slate-600 border-b border-slate-100">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Après 2 ans consécutifs sans sinistre en malus, le coefficient redescend automatiquement à 1,00.</p>

          {/* Section 3 */}
          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de l&apos;assurance auto en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le tarif d&apos;une <strong>assurance auto</strong> dépend du type de véhicule, de la formule choisie, de votre profil de conducteur et de votre zone géographique. Voici les fourchettes de prix constatées en 2026 pour un conducteur avec un bonus de 0,50 :
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Par type de véhicule (conducteur expérimenté, bonus 0,50)</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Type de véhicule</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Tiers</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Tous risques</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Citadine (Clio, 208, C3)", tiers: "250 € – 400 €", tr: "450 € – 700 €" },
                  { type: "Berline (308, Mégane, Golf)", tiers: "350 € – 550 €", tr: "600 € – 950 €" },
                  { type: "SUV (3008, Tucson, Tiguan)", tiers: "400 € – 650 €", tr: "700 € – 1 200 €" },
                  { type: "Électrique (Tesla 3, e-208, Zoé)", tiers: "200 € – 380 €", tr: "400 € – 750 €" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.type}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.tiers}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.tr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Par profil de conducteur</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Profil</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Tiers</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Tous risques</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { profil: "Conducteur expérimenté (bonus 0,50)", tiers: "250 € – 500 €", tr: "450 € – 900 €" },
                  { profil: "Jeune conducteur (- 3 ans permis)", tiers: "800 € – 1 500 €", tr: "1 200 € – 2 500 €" },
                  { profil: "Conducteur avec malus", tiers: "600 € – 1 200 €", tr: "1 000 € – 2 000 €" },
                  { profil: "Zone PACA / Nice", tiers: "+5 à +10 %", tr: "+5 à +10 %" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.profil}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.tiers}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.tr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Tarifs indicatifs constatés en 2026. Un courtier indépendant peut obtenir des conditions plus avantageuses grâce à ses accords avec les assureurs.</p>

          {/* Section 4 */}
          <h2 id="reduire" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Comment réduire sa prime d&apos;assurance auto</h2>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Cultiver son bonus", detail: "Chaque année sans sinistre réduit votre coefficient de 5 %. Après 13 ans, vous atteignez le bonus maximum de 0,50 et payez moitié prix." },
              { titre: "Choisir un véhicule raisonnable", detail: "Les citadines et véhicules de faible puissance sont nettement moins chers à assurer. Évitez les modèles sportifs ou fréquemment volés." },
              { titre: "Passer par un courtier indépendant", detail: "Un courtier compare les offres de dizaines d'assureurs et négocie des tarifs inaccessibles en direct. Économies moyennes de 15 à 25 %." },
              { titre: "Utiliser un comparateur d'assurance auto", detail: "Comparez en quelques minutes les offres adaptées à votre profil. Notre outil en ligne vous donne une estimation immédiate et gratuite." },
              { titre: "Opter pour une franchise plus élevée", detail: "Augmenter votre franchise de 300 € à 600 € peut réduire la prime annuelle de 10 à 15 %. Intéressant si vous avez peu de sinistres." },
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

          {/* Section 5 */}
          <h2 id="paca" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Spécificités PACA / Nice</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La région <strong>Provence-Alpes-Côte d&apos;Azur</strong> et la ville de <strong>Nice</strong> en particulier présentent des spécificités qui influencent directement le tarif de votre <strong>assurance auto</strong>.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Zone à risque vol : Nice et Marseille figurent parmi les villes les plus touchées par le vol de véhicules en France, ce qui augmente les primes de 5 à 10 %",
              "Stationnement extérieur : l'absence de garage ou de parking sécurisé est un facteur aggravant pour les assureurs, notamment pour la garantie vol",
              "Densité de circulation élevée : les Alpes-Maritimes connaissent un trafic dense, augmentant la fréquence des accrochages et sinistres matériels",
              "Risques climatiques : grêle, inondations méditerranéennes et tempêtes peuvent entraîner des sinistres catastrophes naturelles plus fréquents",
              "Tarifs majorés de +5 à +10 % par rapport à la moyenne nationale pour les mêmes profils et véhicules",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 rounded-2xl p-6 my-8">
            <p className="font-semibold text-slate-800 mb-2">Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En tant que courtier basé à Nice, nous connaissons parfaitement les assureurs les plus compétitifs pour les conducteurs de la région PACA. Nos accords nous permettent de compenser la majoration géographique et d&apos;obtenir des tarifs souvent plus bas que ceux affichés en ligne. Soumettez votre demande via notre <strong>comparateur assurance auto</strong> — réponse en 2 minutes.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis assurance voiture en 2 minutes</p>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions fréquentes sur l&apos;assurance auto</h2>
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
