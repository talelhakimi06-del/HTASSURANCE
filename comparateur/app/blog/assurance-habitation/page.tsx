import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance Habitation 2026 : Garanties, Prix & Conseils | HT Assurance Nice",
  description:
    "Guide complet de l'assurance habitation : obligations locataire et propriétaire, garanties essentielles, prix moyens en 2026, spécificités Nice et PACA. Courtier HT Assurance à Nice.",
  alternates: { canonical: `${BASE}/blog/assurance-habitation` },
  openGraph: {
    title: "Assurance Habitation 2026 : Guide Complet Locataire & Propriétaire",
    description:
      "Tout savoir sur l'assurance habitation : obligations, garanties MRH, prix selon votre profil et spécificités Nice et PACA.",
    url: `${BASE}/blog/assurance-habitation`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "L'assurance habitation est-elle obligatoire pour un locataire à Nice ?",
    answer:
      "Oui. Tout locataire d'un logement non meublé est tenu par la loi (loi du 6 juillet 1989) de souscrire au minimum une assurance couvrant les risques locatifs (incendie, dégât des eaux, explosion). Le propriétaire peut exiger une attestation d'assurance chaque année. Pour un meublé, l'obligation dépend du bail, mais elle reste très fortement recommandée.",
  },
  {
    question: "Quelle est la différence entre assurance habitation et assurance MRH ?",
    answer:
      "L'assurance MRH (Multirisque Habitation) est la forme la plus courante d'assurance habitation. Elle regroupe en un seul contrat les garanties essentielles : responsabilité civile vie privée, incendie, dégât des eaux, vol, catastrophe naturelle et bris de glace. C'est le contrat standard proposé par la majorité des assureurs en France.",
  },
  {
    question: "Combien coûte une assurance habitation à Nice en 2026 ?",
    answer:
      "Le tarif dépend du type de logement, de la surface et du statut (locataire ou propriétaire). En 2026, comptez entre 90 et 180 euros par an pour un studio en location, entre 200 et 450 euros pour un T2-T3, et entre 350 et 900 euros pour une maison. À Nice et en PACA, une surprime de 10 à 20 % s'applique souvent en raison des zones inondables.",
  },
  {
    question: "Mon logement est en zone inondable à Nice : quelles conséquences sur l'assurance ?",
    answer:
      "Les logements situés en zone inondable (notamment dans les vallées du Var et du Paillon) subissent généralement une surprime de 10 à 20 % sur leur assurance habitation. Certains assureurs peuvent aussi appliquer des franchises plus élevées pour les sinistres liés aux catastrophes naturelles. Un courtier peut vous aider à trouver un assureur compétitif malgré cette contrainte.",
  },
  {
    question: "Peut-on changer d'assurance habitation à tout moment ?",
    answer:
      "Oui, grâce à la loi Hamon (2015), vous pouvez résilier votre assurance habitation à tout moment après la première année de contrat, sans frais ni pénalité. Votre nouvel assureur se charge des démarches de résiliation. C'est l'occasion de comparer les offres et de réaliser des économies chaque année.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance Habitation 2026 : Guide Complet Locataire & Propriétaire",
  description: "Tout savoir sur l'assurance habitation : obligations, garanties MRH, prix et spécificités Nice et PACA.",
  url: `${BASE}/blog/assurance-habitation`,
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

export default function AssuranceHabitation() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Assurance Habitation</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Habitation</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance habitation 2026 : guide complet pour locataires et propri&eacute;taires
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Obligation l&eacute;gale, garanties MRH essentielles, prix moyens selon votre profil et sp&eacute;cificit&eacute;s de la r&eacute;gion Nice et PACA. Tout ce qu&apos;il faut savoir pour bien assurer votre logement en 2026.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis &agrave; jour le 19 mars 2026</span>
            <span>&middot;</span>
            <span>7 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre assurance habitation maintenant</p>
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
            <li><a href="#obligation" className="hover:text-blue-600">1. Assurance habitation : obligatoire ou pas ?</a></li>
            <li><a href="#garanties" className="hover:text-blue-600">2. Les garanties essentielles d&apos;une MRH</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de l&apos;assurance habitation en 2026</a></li>
            <li><a href="#locataire-proprietaire" className="hover:text-blue-600">4. Locataire vs propri&eacute;taire : quelles diff&eacute;rences ?</a></li>
            <li><a href="#nice-paca" className="hover:text-blue-600">5. Sp&eacute;cificit&eacute;s Nice et PACA</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          <h2 id="obligation" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Assurance habitation : obligatoire ou pas ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La r&eacute;ponse d&eacute;pend de votre statut. En France, l&apos;<strong>assurance habitation</strong> n&apos;est pas trait&eacute;e de la m&ecirc;me fa&ccedil;on selon que vous &ecirc;tes locataire ou propri&eacute;taire.
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Locataire (logement non meubl\u00e9) : obligation l\u00e9gale de souscrire au minimum une assurance risques locatifs (loi du 6 juillet 1989)",
              "Locataire (meubl\u00e9) : pas d\u2019obligation l\u00e9gale stricte, mais le bail peut l\u2019exiger et c\u2019est tr\u00e8s fortement recommand\u00e9",
              "Propri\u00e9taire occupant : aucune obligation l\u00e9gale, mais vivement recommand\u00e9 pour prot\u00e9ger son patrimoine",
              "Copropri\u00e9taire : obligation de souscrire au minimum une assurance responsabilit\u00e9 civile (loi ALUR, 2014)",
              "Propri\u00e9taire non-occupant (bailleur) : pas d\u2019obligation l\u00e9gale, mais indispensable pour couvrir les risques non couverts par le locataire",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">{"\u2713"}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">{"\u26A0\uFE0F"} Attention locataires</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Sans attestation d&apos;assurance habitation, votre propri&eacute;taire peut r&eacute;silier le bail apr&egrave;s mise en demeure rest&eacute;e sans effet pendant un mois. Ne prenez pas ce risque.
            </p>
          </div>

          <h2 id="garanties" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Les garanties essentielles d&apos;une assurance habitation (MRH)</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties de base</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Incendie, explosion, fum\u00e9e", desc: "Couvre les dommages caus\u00e9s par un incendie, une explosion ou la fum\u00e9e dans votre logement" },
              { name: "D\u00e9g\u00e2t des eaux", desc: "Fuite, rupture de canalisation, d\u00e9bordement : dommages \u00e0 vos biens et au logement" },
              { name: "Catastrophe naturelle", desc: "Inondation, s\u00e9cheresse, s\u00e9isme : indemnisation selon arr\u00eat\u00e9 interminist\u00e9riel" },
              { name: "Responsabilit\u00e9 civile vie priv\u00e9e", desc: "Couvre les dommages que vous causez involontairement \u00e0 des tiers dans votre vie quotidienne" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Garanties recommand&eacute;es</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Vol et vandalisme", desc: "Indemnisation de vos biens en cas de cambriolage ou de vandalisme \u00e0 votre domicile" },
              { name: "Bris de glace", desc: "Remplacement des vitres, baies vitr\u00e9es et miroirs fix\u00e9s au mur" },
              { name: "Protection juridique", desc: "Prise en charge des frais de justice en cas de litige li\u00e9 au logement" },
              { name: "Garantie objets de valeur", desc: "Couverture renforc\u00e9e pour bijoux, \u0153uvres d\u2019art et \u00e9quipements high-tech" },
              { name: "D\u00e9pendances et jardin", desc: "Extension de couverture au garage, cave, piscine et am\u00e9nagements ext\u00e9rieurs" },
              { name: "Remplacement \u00e0 neuf", desc: "Indemnisation en valeur \u00e0 neuf au lieu de la valeur d\u2019usage (v\u00e9tust\u00e9 d\u00e9duite)" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de l&apos;assurance habitation en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le co&ucirc;t de votre <strong>assurance habitation</strong> d&eacute;pend du type de logement, de sa surface, de votre statut (locataire ou propri&eacute;taire) et de votre localisation. Voici les fourchettes constat&eacute;es en 2026 :
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Type de logement</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Locataire</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Propri&eacute;taire</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Studio / T1", locataire: "90 \u20AC \u2013 180 \u20AC / an", proprietaire: "120 \u20AC \u2013 220 \u20AC / an" },
                  { type: "T2 / T3", locataire: "150 \u20AC \u2013 300 \u20AC / an", proprietaire: "200 \u20AC \u2013 450 \u20AC / an" },
                  { type: "T4 et plus", locataire: "250 \u20AC \u2013 450 \u20AC / an", proprietaire: "350 \u20AC \u2013 650 \u20AC / an" },
                  { type: "Maison individuelle", locataire: "300 \u20AC \u2013 550 \u20AC / an", proprietaire: "400 \u20AC \u2013 900 \u20AC / an" },
                  { type: "Zone PACA inondable", locataire: "+10 \u00e0 +20 %", proprietaire: "+10 \u00e0 +20 %" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.type}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.locataire}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.proprietaire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-6">* Tarifs indicatifs pour la r&eacute;gion Nice / PACA. Un courtier peut obtenir des conditions plus avantageuses gr&acirc;ce &agrave; ses accords avec les assureurs.</p>

          <h2 id="locataire-proprietaire" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Locataire vs propri&eacute;taire : quelles diff&eacute;rences ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Les besoins en assurance habitation diff&egrave;rent sensiblement selon votre statut. Voici les principales diff&eacute;rences &agrave; conna&icirc;tre :
          </p>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Obligation l\u00e9gale", detail: "Le locataire doit obligatoirement s\u2019assurer (risques locatifs minimum). Le propri\u00e9taire occupant n\u2019a aucune obligation l\u00e9gale, sauf en copropri\u00e9t\u00e9 (RC minimum)." },
              { titre: "P\u00e9rim\u00e8tre de couverture", detail: "Le locataire assure ses biens personnels et sa responsabilit\u00e9 envers le propri\u00e9taire. Le propri\u00e9taire assure en plus la structure du b\u00e2timent (murs, toiture, canalisations)." },
              { titre: "Co\u00fbt moyen", detail: "L\u2019assurance propri\u00e9taire co\u00fbte 30 \u00e0 50 % de plus que celle du locataire, car elle couvre aussi le b\u00e2ti et les \u00e9quipements fixes." },
              { titre: "Propri\u00e9taire non-occupant (PNO)", detail: "Si vous louez votre bien, une assurance PNO est indispensable pour couvrir les risques non pris en charge par l\u2019assurance du locataire (vacance locative, vices de construction)." },
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

          <h2 id="nice-paca" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Sp&eacute;cificit&eacute;s Nice et PACA</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La r&eacute;gion <strong>Nice et PACA</strong> pr&eacute;sente des risques naturels et climatiques sp&eacute;cifiques qui influencent directement le tarif et les conditions de votre <strong>assurance habitation</strong>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Zones inondables (Var, Paillon)", desc: "Surprime de 10 \u00e0 20 %. Franchises cat\u00e9gorie naturelle plus \u00e9lev\u00e9es. V\u00e9rifiez le PPRi de votre commune." },
              { name: "S\u00e9cheresse et retrait-gonflement", desc: "Les sols argileux de l\u2019arri\u00e8re-pays ni\u00e7ois provoquent des fissures. Cette garantie est incluse dans la cat nat." },
              { name: "Risque sismique (zone 4)", desc: "Nice est class\u00e9e en zone de sismicit\u00e9 moyenne. Les dommages sismiques sont couverts au titre des catastrophes naturelles." },
              { name: "Vol en zone touristique", desc: "Nice figure parmi les villes les plus expos\u00e9es au cambriolage. Renforcez la garantie vol et les mesures de s\u00e9curit\u00e9 (serrure A2P, alarme)." },
            ].map((g) => (
              <div key={g.name} className="border border-amber-100 bg-amber-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 my-8">
            <p className="font-semibold text-slate-800 mb-2">{"\uD83D\uDCA1"} Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              En tant que courtier &agrave; Nice sp&eacute;cialis&eacute; dans l&apos;assurance habitation en r&eacute;gion PACA, nous connaissons les assureurs qui acceptent les zones &agrave; risque sans surprime excessive. Notre assistant IA vous guide en 2 minutes pour trouver la meilleure offre MRH adapt&eacute;e &agrave; votre situation.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Obtenez votre devis assurance habitation en 2 minutes</p>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ &mdash; Questions fr&eacute;quentes sur l&apos;assurance habitation</h2>
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
