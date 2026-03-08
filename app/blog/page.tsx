import type { Metadata } from "next";
import Link from "next/link";
import { getAllMeta } from "./lib/posts";
import PostCard from "./components/PostCard";
import type { Category } from "./lib/types";

export const metadata: Metadata = {
  title: "Blog Assurance — Conseils et Guides par HT Assurance Nice",
  description:
    "Décennale, VTC, RC Pro, emprunteur, habitation : retrouvez tous nos guides pratiques pour comprendre et optimiser vos assurances. Conseils d'experts à Nice.",
};

const CATEGORIES: Category[] = [
  "Décennale",
  "Assurance VTC",
  "RC Pro",
  "Assurance emprunteur",
  "Habitation",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Décennale": "bg-orange-100 text-orange-700 hover:bg-orange-200",
  "Assurance VTC": "bg-violet-100 text-violet-700 hover:bg-violet-200",
  "RC Pro": "bg-blue-100 text-blue-700 hover:bg-blue-200",
  "Assurance emprunteur": "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
  "Habitation": "bg-amber-100 text-amber-700 hover:bg-amber-200",
};

export default function BlogPage() {
  const allPosts = getAllMeta();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-base font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              ← Accueil
            </Link>
            <a
              href="/#contact"
              className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
            >
              Audit gratuit
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
            Blog &amp; Guides pratiques
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Comprendre et optimiser vos assurances
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-lg">
            Nos experts vous expliquent tout — décennale, VTC, RC Pro, emprunteur,
            habitation — pour que vous fassiez les bons choix.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-14">
        {/* Category filters (visual only, static) */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="text-sm font-medium text-slate-500 mr-2 self-center">
            Catégories :
          </span>
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className={`text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1.5 transition-colors cursor-default ${CATEGORY_COLORS[cat]}`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Articles grouped by category */}
        {CATEGORIES.map((cat) => {
          const catPosts = allPosts.filter((p) => p.category === cat);
          if (catPosts.length === 0) return null;
          return (
            <section key={cat} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 ${CATEGORY_COLORS[cat]}`}>
                  {cat}
                </span>
                <span className="text-xs text-slate-400">{catPosts.length} article{catPosts.length > 1 ? "s" : ""}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {catPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA bottom */}
        <div className="mt-6 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="text-slate-500 mb-6 max-w-md mx-auto">
            Contactez un conseiller HT Assurance directement. Nous répondons à toutes
            vos questions en assurance sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
            >
              Demander mon audit gratuit
            </a>
            <a
              href="tel:+33986113257"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-600 font-semibold rounded-xl px-6 py-3 transition-colors"
            >
              09 86 11 32 57
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 px-6 mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-white font-bold">
            HT<span className="text-blue-400"> Assurance</span>
            <span className="font-normal text-slate-400 ml-2">— Courtier en assurance à Nice</span>
          </p>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
