import type { Metadata } from "next";
import Link from "next/link";
import GoogleMapMulti from "../components/GoogleMapMulti";

const PHONE_DISPLAY = "09 86 11 32 57";
const PHONE_HREF = "tel:+33986113257";
const WA_HREF =
  "https://wa.me/33986113257?text=Bonjour%2C%20je%20souhaite%20me%20rendre%20%C3%A0%20vos%20bureaux.%20Pouvez-vous%20me%20confirmer%20vos%20horaires%20%3F";

const BASE = "https://www.htassurance.fr";

export const metadata: Metadata = {
  title: "Plan d'accès — HT Assurance Nice (Trachel & Suède)",
  description:
    "Comment venir aux bureaux HT Assurance à Nice : adresses, horaires, parking, tramway, train. Siège 25 rue Trachel et bureau 1 avenue de Suède, 06000 Nice.",
  keywords:
    "HT Assurance plan accès, courtier assurance Nice adresse, agence assurance Trachel, bureau assurance Suède, courtier Nice gare",
  alternates: { canonical: `${BASE}/plan-acces` },
  openGraph: {
    title: "Plan d'accès — HT Assurance Nice",
    description:
      "Adresses, horaires, accès en tramway, train et voiture vers nos 2 bureaux à Nice.",
    url: `${BASE}/plan-acces`,
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const offices = [
  {
    name: "Siège — Trachel",
    address: "25 rue Trachel, 06000 Nice",
    placeId: "ChIJuSypYgbQzRIRqX2X-zuw5ao",
    phone: PHONE_DISPLAY,
    schedule: "Lundi au vendredi : 10h – 19h",
    transports: [
      { mode: "Train", label: "Gare Nice-Ville", detail: "à 5 min à pied" },
      { mode: "Tramway", label: "Ligne 1 — arrêt Libération", detail: "à 6 min à pied" },
      { mode: "Bus", label: "Lignes 23, 75", detail: "arrêt Trachel" },
      { mode: "Voiture", label: "Parking Auber / Gare Thiers", detail: "à 3 min à pied (payant)" },
    ],
  },
  {
    name: "Bureau Suède",
    address: "1 avenue de Suède, 06000 Nice",
    placeId: "ChIJQ2lcfaDazRIRKNPg1zZn180",
    phone: PHONE_DISPLAY,
    schedule: "Sur rendez-vous uniquement",
    transports: [
      { mode: "Tramway", label: "Ligne 1 — arrêt Massena", detail: "à 4 min à pied" },
      { mode: "Bus", label: "Lignes 8, 11, 12", detail: "arrêt Verdun" },
      { mode: "Voiture", label: "Parking Massena (souterrain)", detail: "à 2 min à pied (payant)" },
      { mode: "À pied", label: "Promenade des Anglais", detail: "à 5 min à pied" },
    ],
  },
];

export default function PlanAccesPage() {
  // Schema.org Place pour les rich snippets locaux
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: offices.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "InsuranceAgency",
        name: `HT Assurance — ${o.name}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: o.address.split(",")[0].trim(),
          addressLocality: "Nice",
          postalCode: "06000",
          addressCountry: "FR",
        },
        telephone: "+33986113257",
        url: `${BASE}/plan-acces`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <a href={PHONE_HREF} className="hidden sm:block text-slate-700 hover:text-slate-900 font-semibold">
              {PHONE_DISPLAY}
            </a>
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              ← Accueil
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-blue-600 text-xs font-bold tracking-widest uppercase mb-3">
              Nos bureaux à Nice
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Plan d&apos;accès
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Deux adresses au cœur de Nice pour vous recevoir.
              Sur rendez-vous, sans attente, en toute discrétion.
            </p>
          </div>

          {/* Cartes */}
          <section aria-labelledby="cartes" className="mb-16">
            <h2 id="cartes" className="sr-only">
              Cartes interactives des deux bureaux
            </h2>
            <GoogleMapMulti />
          </section>

          {/* Détails par bureau */}
          <section
            aria-label="Informations détaillées par bureau"
            className="grid md:grid-cols-2 gap-8"
          >
            {offices.map((o) => (
              <article
                key={o.placeId}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 sm:p-9"
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {o.name}
                </h3>
                <p className="text-slate-500 text-sm mb-6">{o.address}</p>

                <div className="space-y-4 text-sm mb-7">
                  <div className="flex gap-3">
                    <span className="text-blue-600 font-bold w-20 flex-shrink-0">Horaires</span>
                    <span className="text-slate-700">{o.schedule}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-blue-600 font-bold w-20 flex-shrink-0">Téléphone</span>
                    <a
                      href={PHONE_HREF}
                      className="text-slate-900 font-semibold hover:text-blue-600 transition-colors"
                    >
                      {o.phone}
                    </a>
                  </div>
                </div>

                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                  Comment venir
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {o.transports.map((t) => (
                    <li key={t.label} className="flex items-start gap-3">
                      <span className="inline-block bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">
                        {t.mode}
                      </span>
                      <span className="text-slate-700">
                        <span className="font-medium">{t.label}</span>
                        <span className="text-slate-500"> — {t.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 mt-7 pt-6 border-t border-slate-100">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=place_id:${o.placeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors"
                  >
                    Itinéraire Google Maps
                  </a>
                  <a
                    href={WA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl px-5 py-2.5 transition-colors"
                  >
                    Confirmer un RDV WhatsApp
                  </a>
                </div>
              </article>
            ))}
          </section>

          {/* Bandeau aide */}
          <section className="mt-16 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Vous préférez un appel d&apos;abord&nbsp;?
            </h2>
            <p className="text-slate-300 mb-6 max-w-lg mx-auto">
              Avant de vous déplacer, on peut faire le point au téléphone
              ou en visio. Plus rapide, plus efficace.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                Appeler {PHONE_DISPLAY}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
              >
                Recevoir mon audit gratuit
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
