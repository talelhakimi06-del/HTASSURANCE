import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://comparateur.horstaxeassurance.fr";

export const metadata: Metadata = {
  title: "Assurance Emprunteur 2026 : Prix, Loi Lemoine & Economies | HT Assurance Nice",
  description:
    "Guide complet assurance emprunteur 2026 : obligation, delegation assurance pret immobilier, loi Lemoine, prix par age et astuces pour economiser jusqu'a 50 %. Courtier HT Assurance Nice.",
  alternates: { canonical: `${BASE}/blog/assurance-emprunteur` },
  openGraph: {
    title: "Assurance Emprunteur 2026 : Loi Lemoine, Prix & Delegation",
    description:
      "Tout savoir sur l'assurance pret immobilier : obligation, delegation, loi Lemoine, prix par age et comment economiser jusqu'a 50 %.",
    url: `${BASE}/blog/assurance-emprunteur`,
    type: "article",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

const faqItems = [
  {
    question: "Peut-on changer d'assurance emprunteur en cours de pret ?",
    answer:
      "Oui, depuis la loi Lemoine du 28 fevrier 2022, vous pouvez resilier et changer votre assurance emprunteur a tout moment, sans frais et sans attendre la date anniversaire du contrat. Votre banque ne peut pas refuser si le nouveau contrat presente des garanties equivalentes. La procedure prend en moyenne 10 jours ouvrés.",
  },
  {
    question: "Le questionnaire medical est-il toujours obligatoire ?",
    answer:
      "Non. Depuis le 1er juin 2022 (loi Lemoine), aucun questionnaire de sante ne peut etre exige pour les prets immobiliers dont la part assuree est inferieure a 200 000 euros par personne et dont le remboursement intervient avant le 60e anniversaire de l'emprunteur. Au-dela de ce seuil, le questionnaire reste necessaire.",
  },
  {
    question: "Quelle economie moyenne en changeant d'assurance emprunteur ?",
    answer:
      "En passant d'un contrat groupe bancaire a une delegation individuelle, les emprunteurs economisent en moyenne 30 a 50 % sur le cout total de l'assurance. Sur un pret de 200 000 euros sur 20 ans, cela represente une economie de 5 000 a 15 000 euros selon le profil (age, etat de sante, fumeur/non-fumeur).",
  },
  {
    question: "Quelles sont les garanties obligatoires en assurance emprunteur ?",
    answer:
      "Pour un pret immobilier residence principale, les banques exigent au minimum : la garantie Deces (DC), la garantie Perte Totale et Irréversible d'Autonomie (PTIA), la garantie Incapacite Temporaire de Travail (ITT) et la garantie Invalidite Permanente Totale ou Partielle (IPT/IPP). Pour un investissement locatif, seules DC et PTIA sont generalement requises.",
  },
  {
    question: "Quel est le delai pour changer d'assurance emprunteur ?",
    answer:
      "Grace a la loi Lemoine, il n'y a plus de delai a respecter : vous pouvez changer a tout moment. En pratique, envoyez votre demande de substitution a la banque avec le nouveau contrat. La banque dispose de 10 jours ouvrés pour accepter ou refuser (uniquement si les garanties ne sont pas equivalentes). Le changement effectif intervient sous 10 a 30 jours apres acceptation.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Assurance Emprunteur 2026 : Prix, Loi Lemoine & Economies",
  description: "Guide complet sur l'assurance pret immobilier : obligation, delegation, loi Lemoine, prix par age et comment economiser.",
  url: `${BASE}/blog/assurance-emprunteur`,
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

export default function AssuranceEmprunteur() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <article className="max-w-3xl mx-auto px-4 py-14">
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/blog" className="hover:text-slate-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Assurance Emprunteur</span>
        </nav>

        <header className="mb-10">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">Credit immobilier</span>
          <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4 leading-tight">
            Assurance Emprunteur 2026 : prix, loi Lemoine et economies
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Contrat groupe ou delegation individuelle, loi Lemoine, prix par tranche d&apos;age, et comment economiser 30 a 50 % sur votre assurance pret immobilier. Le guide complet pour les emprunteurs.
          </p>
          <div className="flex items-center gap-4 mt-6 text-sm text-slate-400">
            <span>Mis a jour le 19 mars 2026</span>
            <span>·</span>
            <span>8 min de lecture</span>
          </div>
        </header>

        <div className="bg-blue-600 text-white rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Comparez votre assurance emprunteur maintenant</p>
            <p className="text-blue-100 text-sm mt-1">Reponse en 2 minutes · Courtier independant · Economies jusqu&apos;a 50 %</p>
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
            <li><a href="#obligation" className="hover:text-blue-600">1. L&apos;assurance emprunteur est-elle obligatoire ?</a></li>
            <li><a href="#delegation" className="hover:text-blue-600">2. Contrat groupe bancaire vs delegation individuelle</a></li>
            <li><a href="#prix" className="hover:text-blue-600">3. Prix de l&apos;assurance emprunteur en 2026</a></li>
            <li><a href="#loi-lemoine" className="hover:text-blue-600">4. La loi Lemoine : changez d&apos;assurance quand vous voulez</a></li>
            <li><a href="#economiser" className="hover:text-blue-600">5. Comment economiser sur son assurance emprunteur</a></li>
            <li><a href="#faq" className="hover:text-blue-600">6. FAQ</a></li>
          </ol>
        </div>

        <div className="prose prose-slate max-w-none">

          {/* ── Section 1 ── */}
          <h2 id="obligation" className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. L&apos;assurance emprunteur est-elle obligatoire ?</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Juridiquement, aucune loi n&apos;impose la souscription d&apos;une <strong>assurance emprunteur</strong> pour obtenir un <strong>pret immobilier</strong>. En pratique cependant, <strong>100 % des banques l&apos;exigent</strong> comme condition d&apos;octroi du credit. Sans assurance, pas de financement.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            L&apos;assurance pret immobilier protege a la fois la banque et l&apos;emprunteur en cas d&apos;accident de la vie :
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Deces : le capital restant du est rembourse par l'assureur, liberant les heritiers",
              "Invalidite permanente totale (IPT) : prise en charge des mensualites si vous ne pouvez plus travailler",
              "Incapacite temporaire de travail (ITT) : l'assureur rembourse les echeances pendant votre arret",
              "Perte totale et irreversible d'autonomie (PTIA) : remboursement integral du pret",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-slate-600">
                <span className="text-blue-500 mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <p className="font-semibold text-amber-800 text-sm mb-2">A retenir</p>
            <p className="text-amber-700 text-sm leading-relaxed">
              Meme si l&apos;assurance emprunteur n&apos;est pas une obligation legale, la refuser revient a se voir refuser son credit. En revanche, <strong>vous n&apos;etes pas oblige d&apos;accepter le contrat propose par votre banque</strong> — c&apos;est la tout l&apos;interet de la delegation d&apos;assurance.
            </p>
          </div>

          {/* ── Section 2 ── */}
          <h2 id="delegation" className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Contrat groupe bancaire vs delegation individuelle</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Lorsque vous souscrivez un pret immobilier, votre banque vous propose systematiquement son <strong>contrat groupe</strong>. Ce contrat mutualise le risque sur l&apos;ensemble des emprunteurs de la banque, ce qui signifie que les jeunes en bonne sante paient plus cher pour compenser les profils plus risques.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            La <strong>delegation d&apos;assurance emprunteur</strong> consiste a choisir un assureur externe. Ce contrat individuel est adapte a votre profil reel et coute en general <strong>30 a 50 % moins cher</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Contrat groupe bancaire", desc: "Tarif mutualise (plus cher pour les jeunes), cotisation sur le capital initial, garanties standardisees, facilite de souscription aupres de la banque" },
              { name: "Delegation individuelle", desc: "Tarif personnalise (30 a 50 % moins cher), cotisation sur le capital restant du (baissse chaque annee), garanties sur mesure, necessite une demarche de comparaison" },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-slate-600 leading-relaxed mb-4">
            Grace a la <strong>loi Lemoine</strong> (2022), vous pouvez desormais resilier votre contrat groupe bancaire <strong>a tout moment</strong> pour le remplacer par une delegation individuelle moins chere, sans frais et sans penalite.
          </p>

          {/* ── Section 3 ── */}
          <h2 id="prix" className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Prix de l&apos;assurance emprunteur en 2026</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Le cout de l&apos;assurance pret immobilier varie principalement selon l&apos;age, le statut fumeur/non-fumeur et l&apos;etat de sante. Voici les <strong>taux annuels moyens</strong> constates en delegation individuelle en 2026 :
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Age</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Non-fumeur</th>
                  <th className="text-left p-3 font-semibold text-slate-700 border-b border-slate-200">Fumeur</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { age: "25 ans", nf: "0,07 %", f: "0,10 %" },
                  { age: "30 ans", nf: "0,09 %", f: "0,14 %" },
                  { age: "35 ans", nf: "0,12 %", f: "0,19 %" },
                  { age: "40 ans", nf: "0,18 %", f: "0,28 %" },
                  { age: "45 ans", nf: "0,27 %", f: "0,40 %" },
                  { age: "50 ans", nf: "0,38 %", f: "0,55 %" },
                  { age: "55 ans", nf: "0,52 %", f: "0,75 %" },
                  { age: "60 ans", nf: "0,70 %", f: "1,00 %" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-3 text-slate-700 border-b border-slate-100">{row.age}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.nf}</td>
                    <td className="p-3 font-medium text-blue-600 border-b border-slate-100">{row.f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-sm italic mb-4">* Taux annuels moyens en delegation individuelle, garanties DC/PTIA/ITT/IPT. Tarifs indicatifs, variables selon l&apos;assureur et le profil medical.</p>

          <div className="bg-slate-50 rounded-2xl p-6 my-8">
            <p className="font-semibold text-slate-800 mb-2">Exemple concret : pret de 200 000 euros sur 20 ans</p>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Pour un emprunteur de <strong>35 ans non-fumeur</strong> avec un taux d&apos;assurance de 0,12 % :
            </p>
            <ul className="space-y-1 text-slate-600 text-sm">
              <li>Cout annuel : 200 000 x 0,12 % = <strong>240 euros/an</strong> (20 euros/mois)</li>
              <li>Cout total sur 20 ans : <strong>4 800 euros</strong></li>
            </ul>
            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Avec un <strong>contrat groupe bancaire</strong> au taux moyen de 0,34 %, le cout serait de <strong>13 600 euros</strong> sur 20 ans. Soit une economie de <strong>8 800 euros</strong> en choisissant la delegation.
            </p>
          </div>

          {/* ── Section 4 ── */}
          <h2 id="loi-lemoine" className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. La loi Lemoine : changez d&apos;assurance quand vous voulez</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            La <strong>loi Lemoine</strong>, entree en vigueur le 1er juin 2022, a revolutionne le marche de l&apos;assurance emprunteur en introduisant trois avancees majeures :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { name: "Resiliation a tout moment", desc: "Plus besoin d'attendre la date anniversaire du contrat. Vous pouvez changer d'assurance emprunteur quand vous le souhaitez, sans frais." },
              { name: "Fin du questionnaire medical", desc: "Pour les prets dont la part assuree est inferieure a 200 000 euros par personne et rembourses avant 60 ans, aucun questionnaire de sante n'est exige." },
              { name: "Droit a l'oubli renforce", desc: "Les anciens malades du cancer ou de l'hepatite C n'ont plus a declarer leur pathologie 5 ans apres la fin du protocole therapeutique (contre 10 ans auparavant)." },
            ].map((g) => (
              <div key={g.name} className="border border-blue-100 bg-blue-50/50 rounded-xl p-4">
                <p className="font-semibold text-slate-800 text-sm">{g.name}</p>
                <p className="text-slate-500 text-sm mt-1">{g.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">Procedure pour changer d&apos;assurance emprunteur</h3>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Comparer les offres", detail: "Utilisez un courtier ou un comparateur pour trouver un contrat avec des garanties equivalentes a moindre cout." },
              { titre: "Souscrire le nouveau contrat", detail: "Signez le nouveau contrat d'assurance emprunteur aupres de l'assureur choisi." },
              { titre: "Envoyer la demande de substitution", detail: "Transmettez a votre banque le nouveau contrat, les conditions generales et la fiche standardisee d'information (FSI)." },
              { titre: "Attendre la reponse de la banque", detail: "La banque dispose de 10 jours ouvres pour accepter ou motiver un refus (uniquement en cas de non-equivalence des garanties)." },
              { titre: "Finalisation", detail: "En cas d'acceptation, la banque edite un avenant au pret. Le nouveau contrat prend effet a la date convenue." },
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

          {/* ── Section 5 ── */}
          <h2 id="economiser" className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Comment economiser sur son assurance emprunteur</h2>
          <ul className="space-y-3 mb-6">
            {[
              { titre: "Opter pour la delegation d'assurance", detail: "C'est le levier numero un. Passer d'un contrat groupe a une delegation individuelle permet d'economiser 30 a 50 % en moyenne." },
              { titre: "Comparer au moins 3 offres", detail: "Les ecarts de tarifs entre assureurs peuvent atteindre 300 % pour un meme profil. La comparaison est essentielle." },
              { titre: "Renegocier en cours de pret", detail: "Grace a la loi Lemoine, vous pouvez changer a tout moment. Meme si votre pret a plusieurs annees, les economies restent significatives sur la duree restante." },
              { titre: "Passer par un courtier independant", detail: "Un courtier accede a des tarifs negocies avec les assureurs et gere toute la procedure de substitution a votre place. Service souvent gratuit (remunere par l'assureur)." },
              { titre: "Ajuster les quotites", detail: "Pour un couple, repartir les quotites (ex. 50/50 au lieu de 100/100) peut reduire significativement la prime, tout en maintenant une protection adaptee." },
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
            <p className="font-semibold text-slate-800 mb-2">Le conseil HT Assurance</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Que vous soyez en cours de recherche de pret ou deja proprietaire, nous comparons pour vous les meilleures offres d&apos;assurance emprunteur du marche. Notre assistant IA vous guide en 2 minutes pour estimer votre economie potentielle.
            </p>
          </div>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-6 my-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Estimez votre economie sur l&apos;assurance emprunteur</p>
            <p className="text-blue-100 text-sm mt-1">Comparaison gratuite · Sans engagement · Reponse immediate</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-full hover:bg-blue-50 transition-colors text-sm"
          >
            Comparer maintenant →
          </Link>
        </div>

        <section id="faq" className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">6. FAQ — Questions frequentes sur l&apos;assurance emprunteur</h2>
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
