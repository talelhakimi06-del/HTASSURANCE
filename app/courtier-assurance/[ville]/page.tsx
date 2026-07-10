import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "../../components/ContactForm";

/* ─────────────────────────────────────────────────────────────
   Pages locales par ville — SEO local (courtier assurance + ville).
   Contenu UNIQUE par ville (pas de duplication) + schema
   InsuranceAgency (areaServed) + BreadcrumbList + FAQPage.
───────────────────────────────────────────────────────────── */

const PHONE_DISPLAY = "09 86 11 32 57";
const PHONE_HREF = "tel:+33986113257";
const WHATSAPP_HREF =
  "https://wa.me/33986113257?text=" +
  encodeURIComponent("Bonjour, je souhaite être rappelé(e) pour un besoin en assurance. Pouvez-vous me recontacter ? Merci.");
const SITE = "https://www.htassurance.fr";

type City = {
  slug: string;
  name: string;        // "Nice"
  prep: string;        // "à Nice"
  postal: string;
  geo: { lat: number; lng: number };
  intro: string;       // paragraphe unique
  quartiers: string[];
  angle: string;       // spécificité locale (unique)
  nearby: { slug: string; name: string }[];
};

const CITIES: Record<string, City> = {
  nice: {
    slug: "nice",
    name: "Nice",
    prep: "à Nice",
    postal: "06000",
    geo: { lat: 43.7009, lng: 7.2683 },
    intro:
      "HT Assurance est votre courtier en assurance indépendant à Nice. Depuis nos agences du quartier Trachel et de l'avenue de Suède, nous accompagnons particuliers et professionnels niçois : comparaison des contrats, négociation des tarifs et surtout défense de vos intérêts en cas de sinistre refusé.",
    quartiers: ["Trachel / Gare Thiers", "Libération", "Carré d'Or", "Cimiez", "Vieux-Nice", "Riquier", "Fabron", "Saint-Roch"],
    angle:
      "Entre appartements anciens du centre, copropriétés et commerces, les refus d'indemnisation pour dégât des eaux et défaut d'entretien sont fréquents à Nice. Nous contestons ces refus et obtenons l'indemnisation due.",
    nearby: [
      { slug: "cannes", name: "Cannes" },
      { slug: "cagnes-sur-mer", name: "Cagnes-sur-Mer" },
      { slug: "antibes", name: "Antibes" },
    ],
  },
  cannes: {
    slug: "cannes",
    name: "Cannes",
    prep: "à Cannes",
    postal: "06400",
    geo: { lat: 43.5528, lng: 7.0174 },
    intro:
      "Courtier en assurance indépendant intervenant à Cannes, HT Assurance conseille les propriétaires, commerçants et professionnels cannois. Nous comparons les meilleures compagnies et défendons vos droits face aux refus de sinistre.",
    quartiers: ["La Croisette", "Le Suquet", "La Bocca", "Carnot", "Prado-République", "Petit-Juas"],
    angle:
      "À Cannes, locations saisonnières, copropriétés de standing et commerces de la Croisette ont des besoins spécifiques (multirisque, perte d'exploitation, PNO). Nous sécurisons vos garanties et contestons les refus d'indemnisation.",
    nearby: [
      { slug: "antibes", name: "Antibes" },
      { slug: "nice", name: "Nice" },
      { slug: "cagnes-sur-mer", name: "Cagnes-sur-Mer" },
    ],
  },
  "cagnes-sur-mer": {
    slug: "cagnes-sur-mer",
    name: "Cagnes-sur-Mer",
    prep: "à Cagnes-sur-Mer",
    postal: "06800",
    geo: { lat: 43.6644, lng: 7.1489 },
    intro:
      "HT Assurance accompagne les habitants et entreprises de Cagnes-sur-Mer en tant que courtier indépendant. De l'assurance habitation à la décennale des artisans, nous comparons, conseillons et défendons vos intérêts en cas de litige.",
    quartiers: ["Cros-de-Cagnes", "Haut-de-Cagnes", "Le Val Fleuri", "Les Vespins", "Centre-ville"],
    angle:
      "Zone pavillonnaire et bord de mer, Cagnes-sur-Mer est concernée par les risques d'inondation et de catastrophe naturelle. Nous vérifions vos garanties CatNat et contestons les refus après sécheresse, fissures ou dégâts des eaux.",
    nearby: [
      { slug: "nice", name: "Nice" },
      { slug: "antibes", name: "Antibes" },
      { slug: "cannes", name: "Cannes" },
    ],
  },
  antibes: {
    slug: "antibes",
    name: "Antibes",
    prep: "à Antibes",
    postal: "06600",
    geo: { lat: 43.5808, lng: 7.1239 },
    intro:
      "Votre courtier en assurance indépendant à Antibes – Juan-les-Pins. HT Assurance compare les contrats des grandes compagnies pour les particuliers et professionnels antibois, et vous épaule lorsqu'un sinistre est refusé.",
    quartiers: ["Juan-les-Pins", "Vieil Antibes", "Cap d'Antibes", "La Fontonne", "Les Semboules"],
    angle:
      "Résidences secondaires, plaisance et copropriétés de bord de mer : à Antibes, les contrats habitation et les garanties annexes méritent un audit attentif. Nous identifions les manques et contestons les indemnisations insuffisantes.",
    nearby: [
      { slug: "cannes", name: "Cannes" },
      { slug: "cagnes-sur-mer", name: "Cagnes-sur-Mer" },
      { slug: "nice", name: "Nice" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(CITIES).map((ville) => ({ ville }));
}

export async function generateMetadata({ params }: { params: Promise<{ ville: string }> }): Promise<Metadata> {
  const { ville } = await params;
  const c = CITIES[ville];
  if (!c) return {};
  const url = `${SITE}/courtier-assurance/${c.slug}`;
  return {
    title: `Courtier en assurance ${c.prep} | Sinistre refusé, devis — HT Assurance`,
    description: `Courtier en assurance indépendant ${c.prep} (${c.postal}) : audit gratuit, comparaison des contrats et contestation des refus de sinistre. Particuliers et professionnels. ☎ ${PHONE_DISPLAY}.`,
    alternates: { canonical: url },
    openGraph: {
      title: `Courtier en assurance ${c.prep} — HT Assurance`,
      description: `Audit gratuit, comparaison et défense de vos sinistres ${c.prep}. Particuliers et professionnels.`,
      url,
      siteName: "HT Assurance",
      locale: "fr_FR",
      type: "website",
    },
  };
}

const SERVICES = [
  { t: "Sinistre refusé", d: "Contestation des refus d'indemnisation : dégât des eaux, incendie, vol, fissures, catastrophe naturelle." },
  { t: "Habitation & PNO", d: "Multirisque habitation, propriétaire non-occupant, copropriété — au juste tarif." },
  { t: "Auto & VTC", d: "Auto, malus, résiliés, flotte et assurance VTC obligatoire." },
  { t: "Pro : RC Pro & Décennale", d: "Responsabilité civile professionnelle et garantie décennale des artisans et indépendants." },
  { t: "Assurance emprunteur", d: "Changez d'assurance de prêt et économisez, à garanties équivalentes." },
  { t: "Santé & Prévoyance", d: "Mutuelle et prévoyance adaptées aux particuliers, TNS et entreprises." },
];

export default async function VillePage({ params }: { params: Promise<{ ville: string }> }) {
  const { ville } = await params;
  const c = CITIES[ville];
  if (!c) notFound();

  const url = `${SITE}/courtier-assurance/${c.slug}`;
  const faq = [
    {
      q: `Pourquoi faire appel à un courtier en assurance ${c.prep} ?`,
      a: `Un courtier indépendant ${c.prep} compare pour vous les offres de nombreuses compagnies, négocie les tarifs et vous défend en cas de litige. Chez HT Assurance, l'audit de vos contrats est gratuit et sans engagement.`,
    },
    {
      q: `Mon assurance a refusé mon sinistre ${c.prep}, que faire ?`,
      a: `Ne restez pas seul face au refus. Nous analysons votre contrat et la lettre de refus, identifions les motifs contestables et engageons un recours (expertise contradictoire, médiation) pour obtenir votre indemnisation.`,
    },
    {
      q: `Le devis et l'audit sont-ils gratuits ${c.prep} ?`,
      a: `Oui. L'audit de vos contrats et le devis sont 100 % gratuits et sans engagement. Contactez-nous par téléphone ou WhatsApp au ${PHONE_DISPLAY}.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "InsuranceAgency",
        "@id": `${url}#business`,
        name: `HT Assurance — Courtier ${c.prep}`,
        url,
        telephone: "+33986113257",
        image: `${SITE}/opengraph-image.png`,
        priceRange: "€€",
        address: { "@type": "PostalAddress", streetAddress: "25 rue Trachel", addressLocality: "Nice", postalCode: "06000", addressCountry: "FR" },
        areaServed: { "@type": "City", name: c.name },
        geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
          { "@type": "ListItem", position: 2, name: `Courtier en assurance ${c.prep}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Header simple */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg text-slate-900">HT<span className="text-blue-600"> Assurance</span></Link>
          <div className="flex items-center gap-2">
            <Link href="/comparateur" className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold px-4 py-2">Comparer</Link>
            <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2">WhatsApp</a>
            <a href={PHONE_HREF} className="hidden sm:inline-flex text-slate-700 text-sm font-semibold px-3 py-2">{PHONE_DISPLAY}</a>
          </div>
        </div>
      </header>

      <main className="pt-16 text-slate-800">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <p className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-300 border border-blue-400/40 rounded-full px-3 py-1 mb-5">Courtier indépendant · {c.name} ({c.postal})</p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">Courtier en assurance {c.prep}</h1>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">{c.intro}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3">Recevoir mon audit gratuit</a>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-6 py-3">Écrire sur WhatsApp</a>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Nos assurances {c.prep}</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">Particuliers comme professionnels : nous comparons les meilleures compagnies et défendons vos intérêts.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.t} className="rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-900 mb-2">{s.t}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Spécificité locale + zone desservie */}
        <section className="bg-slate-50 px-6 py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Un courtier qui connaît {c.name}</h2>
              <p className="text-slate-600 leading-relaxed mb-4">{c.angle}</p>
              <p className="text-slate-600 leading-relaxed">
                Sinistre refusé&nbsp;? <Link href="/sinistres" className="text-blue-600 font-semibold hover:underline">Découvrez comment nous contestons les refus d&apos;assurance</Link>, ou comparez vos contrats avec notre <Link href="/comparateur" className="text-blue-600 font-semibold hover:underline">comparateur intelligent</Link>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Quartiers desservis {c.prep}</h3>
              <ul className="flex flex-wrap gap-2">
                {c.quartiers.map((q) => (
                  <li key={q} className="text-sm bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-700">{q}</li>
                ))}
              </ul>
              <p className="text-sm text-slate-500 mt-6">Nous intervenons aussi à{" "}
                {c.nearby.map((n, i) => (
                  <span key={n.slug}>
                    <Link href={`/courtier-assurance/${n.slug}`} className="text-blue-600 hover:underline">{n.name}</Link>
                    {i < c.nearby.length - 1 ? ", " : ""}
                  </span>
                ))}{" "}et partout dans les Alpes-Maritimes.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Questions fréquentes {c.prep}</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-slate-200 p-5">
                <summary className="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center">{f.q}<span className="text-blue-600 group-open:rotate-180 transition-transform">▾</span></summary>
                <p className="text-slate-600 leading-relaxed mt-3 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Guides & conseils — maillage interne vers le blog */}
        <section className="px-6 pb-16 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Guides &amp; conseils</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: "/blog/assurance-refuse-sinistre-que-faire", t: "Sinistre refusé : quels recours ?" },
              { href: "/blog/degat-des-eaux-assurance-refuse", t: "Dégât des eaux refusé par l'assurance" },
              { href: "/blog/contre-expertise-assurance-comment-faire", t: "Contre-expertise : comment la demander" },
              { href: "/blog/motifs-refus-assurance-habitation", t: "Les motifs de refus en assurance habitation" },
              { href: "/blog/changer-assurance-emprunteur", t: "Changer d'assurance emprunteur (loi Lemoine)" },
              { href: "/blog/prix-assurance-decennale-artisan", t: "Prix d'une assurance décennale artisan" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="block rounded-2xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="text-blue-600 text-sm font-semibold">Guide →</span>
                <p className="text-slate-900 font-semibold mt-1 leading-snug">{a.t}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-slate-50 px-6 py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 text-center">Votre audit gratuit {c.prep}</h2>
            <p className="text-slate-600 mb-8 text-center">Réponse sous 24h. Sans engagement.</p>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="text-white font-bold text-lg mb-2">HT<span className="text-blue-400"> Assurance</span></p>
            <p className="leading-relaxed">Courtier en assurance indépendant à Nice, intervenant {c.prep} et dans toutes les Alpes-Maritimes.</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 uppercase tracking-wider text-xs">Contact</p>
            <p>25 rue Trachel, 06000 Nice</p>
            <p className="mt-1"><a href={PHONE_HREF} className="text-blue-400 hover:text-blue-300 font-semibold">{PHONE_DISPLAY}</a></p>
            <p className="text-xs mt-1">Lun – Ven : 10h – 19h</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3 uppercase tracking-wider text-xs">Liens</p>
            <ul className="space-y-1.5">
              <li><Link href="/sinistres" className="hover:text-white">Sinistre refusé</Link></li>
              <li><Link href="/comparateur" className="hover:text-white">Comparateur</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog &amp; guides</Link></li>
              <li><Link href="/" className="hover:text-white">Accueil</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-slate-800 text-xs text-slate-600">© {new Date().getFullYear()} HT Assurance — Courtier en assurance, Nice, Côte d&apos;Azur</div>
      </footer>
    </>
  );
}
