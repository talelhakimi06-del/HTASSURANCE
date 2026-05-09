import type { Metadata } from "next";
import Link from "next/link";
import CookieManageButton from "../components/CookieManageButton";

export const metadata: Metadata = {
  title: "Gestion des cookies | HT Assurance",
  description:
    "Liste exhaustive des cookies déposés par htassurance.fr : finalité, durée, éditeur. Gérez vos préférences à tout moment.",
  alternates: { canonical: "https://www.htassurance.fr/cookies" },
  robots: { index: true, follow: true },
};

const cookies = [
  {
    name: "ht-cookie-consent",
    type: "localStorage",
    category: "Strictement nécessaire",
    duration: "13 mois",
    publisher: "HT Assurance",
    purpose: "Mémoriser votre choix de consentement aux cookies.",
  },
  {
    name: "_ga",
    type: "Cookie HTTP",
    category: "Mesure d'audience (opt-in)",
    duration: "24 mois",
    publisher: "Google LLC",
    purpose: "Identifier un visiteur unique pour Google Analytics 4.",
  },
  {
    name: "_ga_<MEASUREMENT_ID>",
    type: "Cookie HTTP",
    category: "Mesure d'audience (opt-in)",
    duration: "24 mois",
    publisher: "Google LLC",
    purpose: "Maintenir l'état de session GA4 (durée, pages vues).",
  },
  {
    name: "Cookies reCAPTCHA",
    type: "Cookies tiers",
    category: "Strictement nécessaire (anti-spam)",
    duration: "Session à 6 mois",
    publisher: "Google LLC",
    purpose: "Empêcher l'envoi automatisé de formulaires (analyse comportementale).",
  },
  {
    name: "Cookies Google Maps",
    type: "Cookies tiers",
    category: "Tiers fonctionnel",
    duration: "Variable",
    publisher: "Google LLC",
    purpose: "Affichage des cartes interactives sur les pages contact et plan d'accès.",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
            ← Retour
          </Link>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Cookies et traceurs
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <p className="text-slate-700 leading-relaxed mb-3">
            Cette page liste l&apos;intégralité des cookies et traceurs déposés par
            le site htassurance.fr.
          </p>
          <p className="text-slate-700 leading-relaxed mb-8">
            Vous pouvez à tout moment modifier votre consentement :{" "}
            <span className="inline-flex bg-slate-900 text-white text-sm rounded-lg px-3 py-1.5">
              <CookieManageButton className="text-white" />
            </span>
          </p>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-3 py-3 text-left font-bold text-slate-900">Nom</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-900">Catégorie</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-900">Durée</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-900">Éditeur</th>
                  <th className="px-3 py-3 text-left font-bold text-slate-900">Finalité</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((c) => (
                  <tr key={c.name} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-3 font-mono text-xs text-slate-900 align-top">{c.name}</td>
                    <td className="px-3 py-3 text-slate-700 align-top whitespace-nowrap">{c.category}</td>
                    <td className="px-3 py-3 text-slate-700 align-top whitespace-nowrap">{c.duration}</td>
                    <td className="px-3 py-3 text-slate-700 align-top">{c.publisher}</td>
                    <td className="px-3 py-3 text-slate-600 align-top">{c.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-12 mb-3">
            Comment vos préférences sont enregistrées
          </h2>
          <p className="text-slate-700 leading-relaxed mb-3">
            Vos choix sont stockés en localStorage de votre navigateur,
            uniquement sur ce site. Aucun choix n&apos;est partagé avec
            d&apos;autres sites ni transmis à des tiers.
          </p>
          <p className="text-slate-700 leading-relaxed mb-3">
            Si vous changez de navigateur ou supprimez les données du site,
            la bannière de consentement s&apos;affichera à nouveau lors de votre
            prochaine visite.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Au-delà de 13 mois (recommandation CNIL), votre choix expire
            automatiquement et la bannière s&apos;affiche à nouveau.
          </p>

          <h2 className="text-xl font-bold text-slate-900 mt-10 mb-3">
            Liens utiles
          </h2>
          <ul className="list-disc pl-6 text-slate-700 space-y-1.5">
            <li>
              <Link href="/politique-confidentialite" className="text-blue-600 underline">
                Politique de confidentialité complète
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="text-blue-600 underline">
                Mentions légales
              </Link>
            </li>
            <li>
              <a
                href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                CNIL — Cookies et traceurs : ce que dit la loi
              </a>
            </li>
          </ul>
        </article>
      </main>
    </div>
  );
}
