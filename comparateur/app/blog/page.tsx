import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog Assurance — Conseils & Guides | HT Assurance Nice",
  description:
    "Guides pratiques sur l'assurance auto, habitation, VTC, décennale, RC Pro, emprunteur, mutuelle santé et plus encore. Conseils d'experts de votre courtier à Nice.",
  alternates: { canonical: "https://comparateur.horstaxeassurance.fr/blog" },
};

const articles = [
  {
    slug: "assurance-auto",
    title: "Assurance Auto 2026 : guide complet et meilleurs prix",
    description:
      "Tiers, tous risques, bonus-malus, prix par profil et astuces pour payer moins cher. Tout ce qu'il faut savoir sur l'assurance auto en 2026.",
    category: "Automobile",
    readTime: "6 min",
  },
  {
    slug: "assurance-vtc",
    title: "Assurance VTC : guide complet pour les chauffeurs",
    description:
      "Assurance VTC obligatoire, garanties indispensables, prix moyens et comment économiser. Tout ce qu'un chauffeur doit savoir avant de démarrer.",
    category: "Transport",
    readTime: "6 min",
  },
  {
    slug: "assurance-habitation",
    title: "Assurance Habitation 2026 : locataire ou propriétaire, tout savoir",
    description:
      "Garanties, obligations, prix par type de logement et spécificités Nice/PACA. Le guide complet de l'assurance habitation.",
    category: "Habitation",
    readTime: "6 min",
  },
  {
    slug: "assurance-decennale",
    title: "Assurance Décennale : tout ce que vous devez savoir",
    description:
      "Obligatoire pour tous les professionnels du bâtiment, la garantie décennale protège vos clients pendant 10 ans. Prix, garanties, comment choisir.",
    category: "BTP & Construction",
    readTime: "7 min",
  },
  {
    slug: "rc-pro-freelance",
    title: "RC Pro Freelance 2026 : obligations, prix et comparatif",
    description:
      "La responsabilité civile professionnelle est-elle obligatoire ? Combien ça coûte ? Quel assureur choisir ? Guide complet pour freelances et indépendants.",
    category: "Professionnels",
    readTime: "6 min",
  },
  {
    slug: "assurance-emprunteur",
    title: "Assurance Emprunteur 2026 : économisez jusqu'à 15 000 €",
    description:
      "Délégation vs contrat groupe, loi Lemoine, prix par âge et comment changer d'assurance emprunteur pour économiser gros.",
    category: "Crédit immobilier",
    readTime: "7 min",
  },
  {
    slug: "mutuelle-sante",
    title: "Mutuelle Santé 2026 : prix, garanties et avantage Madelin",
    description:
      "Complémentaire santé pour salariés, TNS et indépendants. Prix par profil, garanties essentielles et avantage fiscal Madelin.",
    category: "Santé",
    readTime: "6 min",
  },
  {
    slug: "assurance-pharmacien",
    title: "Assurance Pharmacien : RC Pro et protection de l'officine",
    description:
      "RC Pro, protection juridique, assurance des locaux… Quelles assurances sont obligatoires pour un pharmacien titulaire ? Le guide complet.",
    category: "Professions de santé",
    readTime: "6 min",
  },
  {
    slug: "multirisque-professionnelle",
    title: "Multirisque Professionnelle 2026 : protégez vos locaux et votre activité",
    description:
      "Assurance des locaux, matériel, marchandises et responsabilité civile exploitation. Prix par activité et guide pour bien choisir.",
    category: "Professionnels",
    readTime: "6 min",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <div className="mb-12">
        <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">Blog HT Assurance</span>
        <h1 className="text-4xl font-bold text-slate-900 mt-2 mb-4">Guides & Conseils Assurance</h1>
        <p className="text-slate-500 text-lg">
          Nos experts décryptent les assurances pour que vous fassiez les bons choix — particuliers comme professionnels.
        </p>
      </div>

      <div className="space-y-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block group border border-slate-100 rounded-2xl p-7 hover:border-blue-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                {article.category}
              </span>
              <span className="text-xs text-slate-400">{article.readTime} de lecture</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
              {article.title}
            </h2>
            <p className="text-slate-500 leading-relaxed">{article.description}</p>
            <span className="inline-block mt-4 text-blue-600 text-sm font-medium group-hover:underline">
              Lire l&apos;article →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Besoin d&apos;un devis personnalisé ?</h2>
        <p className="text-slate-500 mb-5">Notre assistant IA compare les meilleures offres en 2 minutes.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Lancer le comparateur →
        </Link>
      </div>
    </div>
  );
}
