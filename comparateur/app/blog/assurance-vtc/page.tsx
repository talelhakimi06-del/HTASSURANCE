import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance VTC 2026 : Obligatoire, Garanties & Meilleurs Prix | HT Assurance Nice",
  description:
    "Guide complet de l'assurance VTC : obligations légales, garanties indispensables, prix moyens par profil, et comment payer moins cher. Courtier HT Assurance à Nice.",
  alternates: { canonical: `${BASE}/blog/assurance-vtc` },
  openGraph: {
    title: "Assurance VTC 2026 : Guide Complet pour les Chauffeurs",
    description:
      "Tout ce qu'un chauffeur VTC doit savoir : obligations, garanties, prix et comparateur d'assurance.",
    url: `${BASE}/blog/assurance-vtc`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "Quelle assurance est obligatoire pour exercer en VTC ?",
    answer:
      "Tout chauffeur VTC doit obligatoirement souscrire une assurance automobile avec une garantie 'transport de personnes à titre onéreux' (TPTO). La garantie responsabilité civile est le minimum légal, mais la plupart des plateformes (Uber, Bolt, Heetch) exigent une couverture plus complète incluant protection du conducteur et passagers.",
  },
  {
    question: "Mon assurance auto personnelle couvre-t-elle mon activité VTC ?",
    answer:
      "Non. Une assurance auto classique exclut explicitement l'usage professionnel et le transport de personnes contre rémunération. Si vous exercez en VTC avec votre assurance personnelle, vous risquez l'annulation du contrat et le refus d'indemnisation en cas de sinistre. Il est impératif de souscrire une assurance spécifique VTC.",
  },
  {
    question: "Quel est le prix d'une assurance VTC en 2026 ?",
    answer:
      "Le tarif varie selon l'âge du conducteur, le véhicule, la zone géographique et l'antécédent d'accidents. En moyenne : jeune conducteur (moins de 3 ans de permis) entre 2 500 € et 4 500 €/an ; conducteur expérimenté entre 1 200 € et 2 800 €/an. À Paris et en région PACA, les tarifs sont généralement 20 à 40 % plus élevés qu'en province.",
  },
  {
    question: "Peut-on être couvert pendant et hors mission VTC avec le même contrat ?",
    answer:
      "Oui, la plupart des contrats VTC proposent une couverture 'omnium' qui protège le conducteur en permanence : pendant les missions, lors des trajets de repositionnement (sans client), et lors des trajets personnels. C'est la formule la plus pratique pour éviter les zones grises.",
  },
  {
    question: "Comment réduire le coût de son assurance VTC ?",
    answer:
      "Plusieurs leviers permettent de réduire la prime : installer une dashcam (certains assureurs accordent -5 à -10 %), augmenter la franchise, rouler avec un véhicule moins puissant, travailler via une plateforme qui propose une assurance mutualisée, et surtout comparer les offres via un courtier indépendant qui accède à des tarifs négociés non disponibles au grand public.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance VTC 2026 : Guide Complet pour les Chauffeurs",
  description: "Tout ce qu'un chauffeur VTC doit savoir sur son assurance : obligations, garanties, prix.",
  url: `${BASE}/blog/assurance-vtc`,
  datePublished: "2026-03-18",
  dateModified: "2026-03-18",
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

export default function AssuranceVTC() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Assurance VTC</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Transport</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance VTC 2026 : le guide complet pour les chauffeurs
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Assurance obligatoire, garanties indispensables, prix selon votre profil et astuces pour payer moins cher. Tout ce qu&apos;un chauffeur VTC (Uber, Bolt, Heetch…) doit savoir avant de prendre la route.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis à jour le 18 mars 2026</span>
            <span>·</span>
            <span>6 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre assurance VTC maintenant</p>
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
            <li><a href="#obligation" className="hover:text-blue-600">1. Quelle assurance est obligatoire pour les VTC ?</a></li>
            <li><a href="#garanties" className="hover:text-blue-600">2. Les garanties indispensables</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de l&apos;assurance VTC en 2026</a></li>
            <li><a href="#plateformes" className="hover:text-blue-600">4. Uber, Bolt, Heetch : ce que couvrent les plateformes</a></li>
            <li><a href="#economiser" className="hover:text-blue-600">5. Comment payer moins cher</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          <h2 id="obligation" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Quelle assurance est obligatoire pour exercer en VTC ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            En France, tout chauffeur exerçant une activité de <strong>Voiture de Transport avec Chauffeur (VTC)</strong> doit obligatoirement souscrire une assurance automobile adaptée à cet usage professionnel. La simple assurance auto personnelle est insuffisante et invalide pour cette activité.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            Le cadre légal est défini par la loi Thévenoud (2014) et ses décrets d&apos;application. Voici les points essentiels :
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Responsabilité civile obligatoire couvrant le transport de personnes à titre onéreux (TPTO)",
              "Garantie passagers : prise en charge des dommages corporels des clients transportés",
              "Couverture valable pendant toute la durée de la mission (du départ à la destination)",
              "Attestation d'assurance à présenter lors des contrôles et à la plateforme",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h2 id="garanties" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Les garanties indispensables pour un chauffeur VTC</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties obligatoires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "RC Transport de personnes (TPTO)", desc: "Couvre les dommages causés aux passagers et tiers lors des missions" },
              { name: "Responsabilité civile étendue", desc: "Dommages causés à des tiers en dehors des missions" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties fortement recommandées</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Protection du conducteur", desc: "Indemnise vos propres blessures en cas d'accident responsable" },
              { name: "Tous risques / omnium", desc: "Couvre les dommages à votre véhicule même sans tiers identifié" },
              { name: "Perte d'exploitation", desc: "Compense la perte de revenus pendant l'immobilisation du véhicule" },
              { name: "Protection juridique", desc: "Défense en cas de litige avec un client ou une plateforme" },
              { name: "Bris de glace", desc: "Remplacement pare-brise sans franchise dans les meilleures formules" },
              { name: "Vol & incendie", desc: "Indispensable si votre véhicule est votre outil de travail principal" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de l&apos;assurance VTC en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le tarif d&apos;une assurance VTC est plus élevé qu&apos;une assurance auto classique car le véhicule roule beaucoup plus et transporte des passagers. Voici les fourchettes constatées en 2026 :
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Profil</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">RC seule</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Tous risques</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { profil: "Conducteur expérimenté, 25+ ans, bonus 0.50", rc: "800 € – 1 400 €", tr: "1 200 € – 2 200 €" },
                  { profil: "Conducteur expérimenté, malus ou sinistre récent", rc: "1 200 € – 2 000 €", tr: "1 800 € – 3 200 €" },
                  { profil: "Jeune conducteur (- 3 ans permis)", rc: "1 800 € – 2 800 €", tr: "2 500 € – 4 500 €" },
                  { profil: "Paris / IDF / région PACA", rc: "+20 à +40 %", tr: "+20 à +40 %" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.profil}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.rc}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.tr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Tarifs indicatifs. Un courtier peut obtenir des conditions plus avantageuses grâce à ses accords avec les assureurs.</p>

          <h2 id="plateformes" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Uber, Bolt, Heetch : ce que couvrent les plateformes</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Attention : l&apos;assurance proposée par les plateformes de mise en relation (Uber, Bolt, Heetch) est <strong>complémentaire et non substitutive</strong> à votre propre assurance. Elle ne couvre en général que pendant la durée de la course active.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">⚠️ Zone grise : entre deux courses</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              La majorité des accidents de chauffeurs VTC surviennent lors des trajets de repositionnement (sans client). Or les plateformes ne couvrent généralement pas cette période. Votre propre assurance VTC doit couvrir ces moments. Vérifiez bien ce point lors de la souscription.
            </p>
          </div>

          <h2 id="economiser" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Comment payer moins cher son assurance VTC</h2>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Comparer via un courtier indépendant", detail: "Un courtier accède à des tarifs négociés et compare en une seule démarche. Économies moyennes de 20 à 30 %." },
              { titre: "Installer une dashcam homologuée", detail: "Certains assureurs accordent une réduction de 5 à 10 % avec une dashcam, qui prouve votre comportement prudent." },
              { titre: "Opter pour une franchise plus élevée", detail: "Augmenter sa franchise de 500 € à 1 000 € peut réduire la prime annuelle de 10 à 15 %." },
              { titre: "Régler annuellement (pas mensuellement)", detail: "Le paiement mensuel coûte en moyenne 8 % de plus sur l'année en frais de fractionnement." },
              { titre: "Regrouper assurance auto + RC Pro", detail: "Certains assureurs proposent des remises pour la souscription de plusieurs contrats professionnels." },
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
            <p className="font-semibold text-slate-800 mb-2">💡 Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En tant que courtier à Nice travaillant avec de nombreux chauffeurs VTC de la région PACA, nous connaissons les assureurs les plus compétitifs pour ce profil. N&apos;hésitez pas à nous soumettre votre demande — notre assistant IA vous guide en 2 minutes.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis assurance VTC en 2 minutes</p>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions fréquentes sur l&apos;assurance VTC</h2>
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
