import type { Metadata } from "next";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Landing SEO — Assurance pharmacien / officine.
   Le contenu (SEO) vit ici ; le devis (vrais tarifs) tourne sur
   l'outil +Simple en marque blanche de HT Assurance.
───────────────────────────────────────────────────────────── */

const PHONE_DISPLAY = "09 86 11 32 57";
const PHONE_HREF = "tel:+33986113257";
const WHATSAPP_HREF =
  "https://wa.me/33986113257?text=" +
  encodeURIComponent("Bonjour, je suis pharmacien et je souhaite un devis pour mon officine. Pouvez-vous me recontacter ? Merci.");
const SITE = "https://www.htassurance.fr";
// URL DIRECTE du tarificateur officine (app.plussimple.fr) : se charge à froid (200) et
// affiche directement la 1re question du devis. Les pages /fr/assurances/mrp-officine (SSR)
// renvoient une 500 en accès direct → on shunte en pointant sur le tarificateur lui-même.
const DEVIS_URL = "https://app.plussimple.fr/fr-FR/souscription/672e7a6e-3f97-4235-9ced-ec362a065993/entreprise";
const URL = `${SITE}/assurance-pharmacien`;

export const metadata: Metadata = {
  title: "Assurance pharmacien & officine — Devis en ligne | HT Assurance",
  description:
    "Courtier spécialiste de l'assurance des pharmaciens : multirisque officine, RC professionnelle, prévoyance et santé. Devis en ligne au meilleur tarif du marché en quelques minutes.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Assurance pharmacien & officine — HT Assurance",
    description: "Multirisque officine, RC pro, prévoyance : comparez et obtenez le meilleur tarif. Devis en ligne.",
    url: URL,
    siteName: "HT Assurance",
    locale: "fr_FR",
    type: "website",
  },
};

const GARANTIES = [
  { t: "Multirisque officine", d: "Locaux, stock de médicaments, matériel, vol, incendie, dégât des eaux, bris de glace et perte d'exploitation." },
  { t: "Responsabilité civile pro", d: "RC professionnelle et exploitation : erreur de délivrance, conseil, dommages causés aux tiers." },
  { t: "Prévoyance du titulaire", d: "Arrêt de travail, invalidité, décès : protégez vos revenus et votre famille." },
  { t: "Complémentaire santé", d: "Mutuelle du pharmacien titulaire et de ses salariés, au juste niveau de garantie." },
  { t: "Protection juridique", d: "Litiges avec l'ARS, l'URSSAF, fournisseurs ou salariés : vous êtes défendu." },
  { t: "Cyber & informatique", d: "Logiciel de gestion, données patients, télétransmission : couverture des risques cyber." },
];

const FAQ = [
  {
    q: "Quelle assurance est obligatoire pour une pharmacie d'officine ?",
    a: "La responsabilité civile professionnelle est indispensable, et la multirisque officine est fortement recommandée (locaux, stock, perte d'exploitation). En tant que titulaire, la prévoyance protège vos revenus en cas d'arrêt. Nous auditons votre situation gratuitement.",
  },
  {
    q: "Comment obtenir le meilleur tarif pour assurer mon officine ?",
    a: `Notre outil de devis en ligne compare les offres et vous propose le meilleur tarif du marché en quelques questions. Vous pouvez aussi nous appeler au ${PHONE_DISPLAY} pour un accompagnement personnalisé.`,
  },
  {
    q: "Le devis en ligne est-il gratuit et sans engagement ?",
    a: "Oui, totalement gratuit et sans engagement. Vous obtenez votre tarif immédiatement et décidez ensuite si vous souhaitez souscrire ou en discuter avec nous.",
  },
  {
    q: "Couvrez-vous les pharmacies hors de Nice ?",
    a: "Oui. HT Assurance accompagne les pharmaciens à Nice, Cannes, Antibes, Cagnes-sur-Mer et partout en France grâce au devis en ligne.",
  },
];

export default function AssurancePharmacienPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${URL}#service`,
        name: "Assurance pharmacien et pharmacie d'officine",
        serviceType: "Assurance professionnelle pour pharmaciens",
        provider: { "@type": "InsuranceAgency", name: "HT Assurance", telephone: "+33986113257", url: SITE },
        areaServed: { "@type": "Country", name: "France" },
        description: "Multirisque officine, RC professionnelle, prévoyance et santé du pharmacien. Devis en ligne au meilleur tarif.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: "Assurance pharmacien", item: URL },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900">HT<span className="text-blue-600"> Assurance</span></Link>
          <div className="flex items-center gap-2">
            <a href={DEVIS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold px-4 py-2">Devis en ligne</a>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2">WhatsApp</a>
            <a href={PHONE_HREF} className="hidden sm:inline-flex text-slate-700 text-sm font-semibold px-3 py-2">{PHONE_DISPLAY}</a>
          </div>
        </div>
      </header>

      <main className="pt-16 text-slate-800">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="inline-block text-xs font-semibold tracking-wider uppercase text-emerald-300 border border-emerald-400/40 rounded-full px-3 py-1 mb-5">Assurance des pharmaciens · Officine</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">Assurance pharmacien &amp; pharmacie d&apos;officine</h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
              Multirisque officine, responsabilité civile professionnelle, prévoyance et santé : HT Assurance, votre courtier, compare le marché et vous obtient le <strong className="text-white">meilleur tarif</strong>. Devis en ligne en quelques minutes.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={DEVIS_URL} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-7 py-3.5 text-lg shadow-lg">⚡ Obtenir mon devis en ligne</a>
              <a href={PHONE_HREF} className="bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl px-6 py-3.5">Être rappelé</a>
            </div>
            <p className="text-slate-400 text-sm mt-4">Gratuit, sans engagement · Meilleur tarif du marché</p>
          </div>
        </section>

        {/* Garanties */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Tout ce qui protège votre officine</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">Une gamme complète pensée pour les pharmaciens titulaires et leurs équipes.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GARANTIES.map((g) => (
              <div key={g.t} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 mb-2">{g.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{g.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Devis en ligne */}
        <section className="bg-emerald-50 px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Votre devis en quelques questions</h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Répondez à quelques questions sur votre officine (statut, chiffre d&apos;affaires, surface, garanties souhaitées) et obtenez immédiatement le <strong>meilleur tarif du marché</strong>. 100 % en ligne, gratuit et sans engagement.
            </p>
            <a href={DEVIS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-8 py-4 text-lg shadow-lg">
              ⚡ Faire mon devis pharmacien en ligne
            </a>
            <p className="text-slate-500 text-sm mt-4">Vous arrivez <strong>directement sur votre devis officine</strong> — tarif personnalisé en quelques questions. Outil de tarification HT Assurance · powered by +Simple.</p>
          </div>
        </section>

        {/* Pourquoi HT Assurance */}
        <section className="px-6 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Pourquoi passer par HT Assurance ?</h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex gap-3"><span className="text-emerald-600 font-bold">✓</span> Courtier <strong>indépendant</strong> : on compare plusieurs assureurs, pas une seule compagnie.</li>
            <li className="flex gap-3"><span className="text-emerald-600 font-bold">✓</span> <strong>Spécialiste des sinistres</strong> : si un sinistre est refusé, on conteste et on vous défend.</li>
            <li className="flex gap-3"><span className="text-emerald-600 font-bold">✓</span> <strong>Accompagnement humain</strong> : un interlocuteur dédié, par téléphone ou WhatsApp.</li>
            <li className="flex gap-3"><span className="text-emerald-600 font-bold">✓</span> <strong>Meilleur tarif</strong> grâce à notre outil de comparaison en ligne.</li>
          </ul>
          <p className="text-slate-600 mt-6">
            Un sinistre déjà refusé sur votre officine ? <Link href="/sinistres" className="text-blue-600 font-semibold hover:underline">Découvrez comment nous contestons les refus d&apos;assurance.</Link>
          </p>
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Questions fréquentes — assurance pharmacien</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5">
                  <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">{f.q}<span className="text-emerald-600 group-open:rotate-180 transition-transform">▾</span></summary>
                  <p className="text-slate-600 leading-relaxed mt-3 text-sm">{f.a}</p>
                </details>
              ))}
            </div>
            <div className="text-center mt-10">
              <a href={DEVIS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-8 py-4 shadow-lg">⚡ Obtenir mon devis en ligne</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-white font-bold text-lg mb-2">HT<span className="text-blue-400"> Assurance</span></p>
            <p className="leading-relaxed">Courtier en assurance indépendant à Nice. Spécialiste des pharmaciens et des professionnels.</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 uppercase tracking-wider text-xs">Contact</p>
            <p>25 rue Trachel, 06000 Nice</p>
            <p className="mt-1"><a href={PHONE_HREF} className="text-blue-400 hover:text-blue-300 font-semibold">{PHONE_DISPLAY}</a></p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 uppercase tracking-wider text-xs">Liens</p>
            <ul className="space-y-1.5">
              <li><a href={DEVIS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Devis pharmacien en ligne</a></li>
              <li><Link href="/sinistres" className="hover:text-white">Sinistre refusé</Link></li>
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-800 text-xs text-slate-600">© {new Date().getFullYear()} HT Assurance — Courtier en assurance, Nice</div>
      </footer>
    </>
  );
}
