import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance Pharmacien 2026 : RC Pro, Officine & Protection Juridique | HT Assurance Nice",
  description:
    "Guide complet de l'assurance pour pharmaciens titulaires et adjoints : RC Pro obligatoire, assurance des locaux, protection juridique, cyber-risques et prix. Par HT Assurance Nice.",
  alternates: { canonical: `${BASE}/blog/assurance-pharmacien` },
  openGraph: {
    title: "Assurance Pharmacien 2026 : Guide Complet",
    description:
      "RC Pro, assurance officine, protection juridique : tout ce que doit savoir un pharmacien titulaire sur ses assurances.",
    url: `${BASE}/blog/assurance-pharmacien`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "L'assurance RC Pro est-elle obligatoire pour un pharmacien ?",
    answer:
      "Oui. La responsabilité civile professionnelle est obligatoire pour tout pharmacien exerçant en France, qu'il soit titulaire, adjoint ou remplaçant. Elle est imposée par le Code de la santé publique et l'Ordre national des pharmaciens. Sans cette assurance, l'inscription à l'Ordre peut être suspendue.",
  },
  {
    question: "Quelle est la différence entre RC Pro et assurance de l'officine ?",
    answer:
      "La RC Pro (responsabilité civile professionnelle) couvre les dommages causés aux patients ou tiers par une erreur professionnelle (mauvais conseil, erreur de délivrance). L'assurance de l'officine couvre les biens matériels : locaux, stocks de médicaments, matériel informatique, contre l'incendie, le vol, le dégât des eaux, etc. Les deux sont complémentaires et souvent regroupées dans un contrat multirisque professionnel.",
  },
  {
    question: "Quel est le prix d'une assurance pharmacien titulaire ?",
    answer:
      "Pour un pharmacien titulaire avec une officine de taille moyenne (CA entre 1 et 3 M€), la RC Pro représente entre 800 € et 2 500 €/an selon les garanties. L'assurance multirisque de l'officine (locaux + stocks + matériel) peut ajouter 1 500 € à 4 000 €/an. Un package complet (RC Pro + multirisque + protection juridique + cyber) coûte généralement entre 3 000 € et 7 000 €/an.",
  },
  {
    question: "Un pharmacien adjoint doit-il avoir sa propre RC Pro ?",
    answer:
      "Oui, même si le titulaire possède une assurance pour l'officine, chaque pharmacien adjoint doit avoir sa propre RC Pro individuelle. En effet, sa responsabilité personnelle peut être engagée indépendamment de celle de l'officine. La cotisation est généralement plus faible pour un adjoint (300 € à 800 €/an).",
  },
  {
    question: "L'assurance couvre-t-elle les médicaments dérobés ou périmés ?",
    answer:
      "Cela dépend du contrat. Certaines assurances multirisque professionnelles couvrent les stocks de médicaments contre le vol, l'incendie et les dégâts des eaux, mais rarement la péremption. Il faut vérifier dans le contrat les plafonds sur les stocks (souvent limités à 20 000 ou 50 000 €) et les éventuelles exclusions sur les produits réfrigérés ou stupéfiants.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance Pharmacien 2026 : RC Pro, Officine & Protection Juridique",
  description:
    "Guide complet des assurances pour pharmaciens titulaires et adjoints : RC Pro, multirisque officine, cyber-risques.",
  url: `${BASE}/blog/assurance-pharmacien`,
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

export default function AssurancePharmacien() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Assurance Pharmacien</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Professions de santé</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance Pharmacien 2026 : RC Pro, Officine et Protection Complète
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Pharmacien titulaire ou adjoint, votre responsabilité est engagée à chaque délivrance. RC Pro obligatoire, assurance de l&apos;officine, cyber-risques, protection juridique : voici le guide complet pour être bien couvert sans surpayer.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis à jour le 18 mars 2026</span>
            <span>·</span>
            <span>6 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre assurance pharmacien maintenant</p>
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
            <li><a href="#obligations" className="hover:text-blue-600">1. Quelles assurances sont obligatoires ?</a></li>
            <li><a href="#rc-pro" className="hover:text-blue-600">2. La RC Pro pharmacien en détail</a></li>
            <li><a href="#multirisque" className="hover:text-blue-600">3. Assurance multirisque de l&apos;officine</a></li>
            <li><a href="#cyber" className="hover:text-blue-600">4. Cyber-risques : la menace oubliée</a></li>
            <li><a href="#prix" className="hover:text-blue-600">5. Prix et comment optimiser</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          <h2 id="obligations" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Quelles assurances sont obligatoires pour un pharmacien ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;exercice de la pharmacie est encadré par le Code de la santé publique qui impose plusieurs assurances :
          </p>
          <ul className="space-y-3 mb-6">
            {[
              {
                titre: "RC Professionnelle (obligatoire)",
                detail: "Couvre les erreurs de délivrance, les mauvais conseils, les fautes professionnelles causant un préjudice au patient. Imposée par l'Ordre des pharmaciens.",
              },
              {
                titre: "RC d'exploitation (fortement recommandée)",
                detail: "Couvre les dommages causés aux tiers dans le cadre de l'exploitation de l'officine : chute d'un client, incident dans les locaux.",
              },
              {
                titre: "Assurance des locaux (obligatoire si propriétaire)",
                detail: "Si vous êtes propriétaire des murs, l'assurance des locaux est obligatoire. Si locataire, vous devez couvrir votre responsabilité locative.",
              },
            ].map((item) => (
              <li key={item.titre} className="flex items-start gap-3 text-slate-600 border border-slate-100 rounded-xl p-4 list-none">
                <span className="text-blue-500 mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{item.titre}</p>
                  <p className="text-sm mt-1">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          <h2 id="rc-pro" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. La RC Pro pharmacien en détail</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La responsabilité civile professionnelle est le pilier de la protection du pharmacien. Elle couvre les conséquences pécuniaires d&apos;une <strong>erreur, omission ou faute professionnelle</strong> commise dans l&apos;exercice de son activité.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Ce que couvre la RC Pro pharmacien</h3>
          <ul className="space-y-2 mb-6">
            {[
              "Erreur de délivrance (mauvais médicament, mauvais dosage)",
              "Erreur de conseil sur un médicament sans ordonnance",
              "Substitution générique avec préjudice pour le patient",
              "Dispensation d'un médicament interdit à une personne à risque",
              "Faute d'un préparateur en pharmacie sous votre responsabilité",
              "Activités de téléconsultation et télépharmacie",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Points de vigilance</h3>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">⚠️ Vérifiez ces points dans votre contrat</p>
            <ul className="space-y-1">
              {[
                "Couverture des activités de parapharmacie et optique (si vous les exercez)",
                "Couverture des actes de vaccination et tests antigéniques",
                "Plafond par sinistre et plafond annuel",
                "Base de déclenchement : fait générateur ou réclamation ? (la base réclamation est plus avantageuse)",
                "Reprise du passé inconnu si changement d'assureur",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-amber-700 text-sm">
                  <span className="mt-0.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <h2 id="multirisque" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Assurance multirisque de l&apos;officine</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;officine représente un investissement important : agencement, matériel informatique, stocks de médicaments, matériel de froid pour les vaccins. Une assurance multirisque professionnelle protège ces biens.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Incendie & dégâts des eaux", desc: "Reconstruction, remplacement des stocks et du matériel" },
              { name: "Vol & vandalisme", desc: "Médicaments, caisse, matériel, effraction" },
              { name: "Bris de glace & bris de machine", desc: "Vitrines, écrans, automates de délivrance" },
              { name: "Perte d'exploitation", desc: "Compense la perte de CA pendant la fermeture forcée" },
              { name: "Stocks réfrigérés", desc: "Indispensable pour les vaccins et médicaments thermosensibles" },
              { name: "Responsabilité locative", desc: "Dommages causés au bâtiment si vous êtes locataire" },
            ].map((g) => (
              <div key={g.name} className="border border-slate-100 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h2 id="cyber" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Cyber-risques : la menace oubliée des pharmaciens</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Les officines sont des cibles croissantes pour les cyberattaques. Données patients, ordonnances électroniques, logiciels de gestion connectés à la Caisse d&apos;Assurance Maladie (CNAM)… Une attaque par ransomware peut paralyser une officine pendant plusieurs jours.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-red-800 text-sm mb-2">🔒 Chiffres clés sur la cybersécurité des pharmacies</p>
            <ul className="space-y-1">
              {[
                "Les officines figurent parmi les 5 cibles prioritaires des ransomwares en France",
                "Coût moyen d'un incident cyber pour une PME : 50 000 à 200 000 €",
                "Les assurances traditionnelles ne couvrent pas les cyber-incidents par défaut",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-red-700 text-sm">
                  <span className="mt-0.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed mb-4">
            Une <strong>assurance cyber</strong> spécifique couvre : les frais de remédiation informatique, la notification CNIL (obligatoire en cas de fuite de données patients), la perte d&apos;exploitation et la responsabilité vis-à-vis des patients impactés. Budget : 500 € à 1 500 €/an selon le niveau de CA.
          </p>

          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Prix et comment optimiser son budget assurance</h2>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Couverture</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Adjoint</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Titulaire (CA 1-3 M€)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { couv: "RC Pro seule", adjoint: "300 € – 800 €", titulaire: "800 € – 2 500 €" },
                  { couv: "Multirisque officine", adjoint: "—", titulaire: "1 500 € – 4 000 €" },
                  { couv: "Protection juridique", adjoint: "150 € – 350 €", titulaire: "300 € – 700 €" },
                  { couv: "Assurance cyber", adjoint: "—", titulaire: "500 € – 1 500 €" },
                  { couv: "Package complet", adjoint: "500 € – 1 200 €", titulaire: "3 000 € – 7 000 €" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.couv}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.adjoint}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.titulaire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Conseils pour optimiser son budget</h3>
          <ul className="space-y-2 mb-6">
            {[
              "Regrouper RC Pro + multirisque + cyber chez le même assureur pour obtenir des remises de 10 à 15 %",
              "Comparer via un courtier spécialisé professions de santé (accès à des contrats non disponibles en direct)",
              "Réviser annuellement les capitaux assurés (stocks, matériel) pour éviter de payer sur-estimé",
              "Vérifier la clause de renonciation à recours entre assureurs si vous possédez plusieurs officines",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 rounded-2xl p-6 my-8">
            <p className="font-semibold text-slate-800 mb-2">💡 Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              L&apos;assurance des professions de santé est un marché de niche où les écarts de prix sont importants. HT Assurance travaille avec des assureurs spécialisés (Allianz, Abeille Assurances, Generali Professions de Santé) qui proposent des contrats adaptés aux pharmaciens. Soumettez votre profil et obtenez une comparaison complète en 2 minutes.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Devis assurance pharmacien personnalisé</p>
            <p className="text-blue-100 text-sm mt-1">RC Pro + officine + cyber · Comparaison gratuite · Sans engagement</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Comparer maintenant →
          </Link>
        </div>

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions fréquentes sur l&apos;assurance pharmacien</h2>
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
