import Image from "next/image";
import ContactForm from "./components/ContactForm";

/* ─────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────── */

const PHONE_DISPLAY = "09 86 11 32 57";
const PHONE_HREF = "tel:+33986113257";
/*
 * WhatsApp : Remplacez le numéro ci-dessous par le vrai numéro WhatsApp
 * au format international sans le + ni les espaces (ex : 33612345678).
 * Le numéro ci-dessous correspond au 09 86 11 32 57 — vérifiez qu'il est
 * bien enregistré sur WhatsApp avant de le mettre en production.
 */
const WHATSAPP_NUMBER = "33986113257";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour, je souhaite être rappelé(e) pour un besoin en assurance. Pouvez-vous me recontacter ? Merci."
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* ─────────────────────────────────────────────────────────────────────────
   ICONS — inline SVG, aucune dépendance externe
───────────────────────────────────────────────────────────────────────── */

function Icon({
  d,
  className,
  filled = false,
}: {
  d: string | string[];
  className?: string;
  filled?: boolean;
}) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      className={className}
      fill={filled ? "currentColor" : "none"}
      viewBox="0 0 24 24"
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
    >
      {paths.map((p, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={p} />
      ))}
    </svg>
  );
}

const ICONS = {
  hardhat:
    "M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z",
  key: "M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z",
  shield:
    "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
  briefcase:
    "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
  home: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  car: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
  phone:
    "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z",
  mapPin: [
    "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z",
    "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z",
  ],
  clock:
    "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  check:
    "M4.5 12.75l6 6 9-13.5",
  users:
    "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  star: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
  chartBar:
    "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  lightning:
    "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  building: [
    "M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z",
  ],
};

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */

const trustItems = [
  { icon: ICONS.shield, label: "Courtier indépendant" },
  { icon: ICONS.users, label: "Accompagnement personnalisé" },
  { icon: ICONS.building, label: "Dossiers complexes acceptés" },
  { icon: ICONS.chartBar, label: "Comparaison de plusieurs compagnies" },
];

const services = [
  {
    icon: ICONS.hardhat,
    title: "Assurance décennale",
    description:
      "Obligatoire pour les professionnels du bâtiment, nous trouvons la couverture décennale adaptée à votre activité, même pour les profils complexes ou les assureurs difficiles.",
    badge: "Prioritaire",
  },
  {
    icon: ICONS.key,
    title: "Assurance emprunteur",
    description:
      "Économisez jusqu'à 50 % sur votre assurance de prêt immobilier grâce à la délégation d'assurance. Nous comparons les meilleures offres du marché pour votre profil.",
    badge: null,
  },
  {
    icon: ICONS.shield,
    title: "RC Pro",
    description:
      "Responsabilité civile professionnelle indispensable pour les consultants, artisans et indépendants. Nous sélectionnons la formule juste pour votre secteur.",
    badge: null,
  },
  {
    icon: ICONS.briefcase,
    title: "Multirisque professionnelle",
    description:
      "Protection complète de vos locaux, équipements et activité en une seule couverture. Idéale pour les TPE, PME et commerces.",
    badge: null,
  },
  {
    icon: ICONS.home,
    title: "Assurance habitation",
    description:
      "Protection optimale de votre logement et de vos biens. Nous comparons les offres pour vous proposer la formule la mieux adaptée à votre situation.",
    badge: null,
  },
  {
    icon: ICONS.car,
    title: "Assurance auto",
    description:
      "Tous risques, au tiers ou intermédiaire : trouvez la couverture automobile adaptée à votre usage. Flotte professionnelle également disponible.",
    badge: null,
  },
];

const whyItems = [
  {
    icon: ICONS.shield,
    title: "Indépendance totale",
    description:
      "Aucun lien avec un assureur. Nous comparons librement le marché et ne défendons que vos intérêts.",
  },
  {
    icon: ICONS.users,
    title: "Accompagnement humain",
    description:
      "Un interlocuteur dédié, de l'analyse de vos besoins jusqu'au règlement du sinistre. Vous n'êtes jamais seul.",
  },
  {
    icon: ICONS.chartBar,
    title: "Audit gratuit des contrats",
    description:
      "Analyse complète de vos contrats existants pour identifier les doublons, les manques et les économies possibles.",
  },
  {
    icon: ICONS.lightning,
    title: "Optimisation des cotisations",
    description:
      "Nos clients réalisent en moyenne des économies significatives tout en améliorant leurs garanties et leur niveau de protection.",
  },
  {
    icon: ICONS.building,
    title: "Dossiers complexes bienvenus",
    description:
      "Résiliations, antécédents, profils atypiques : nous trouvons des solutions là où d'autres refusent.",
  },
];

const partners = [
  { name: "AXA",                src: "/logos/axa.png",        w: 100, h: 48 },
  { name: "Allianz",            src: "/logos/allianz.png",    w: 130, h: 48 },
  { name: "Abeille Assurances", src: "/logos/abeille.png",   w: 130, h: 48 },
  { name: "Generali",           src: "/logos/generali.png",   w: 130, h: 48 },
  { name: "Groupama",           src: "/logos/groupama.png",   w: 130, h: 48 },
  { name: "Swiss Life",         src: "/logos/swisslife.svg",  w: 130, h: 48 },
];

/*
 * AVIS CLIENTS — PLACEHOLDERS
 * Ces cartes sont structurées pour accueillir de vrais avis Google.
 * Pour intégrer de vrais avis :
 *   1. Récupérez les avis depuis votre Google Business Profile
 *   2. Remplacez le tableau `reviews` ci-dessous par les vraies données
 *   3. Mettez à jour les champs name, location, text et date
 */
const reviews: {
  name: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}[] = [
  /* PLACEHOLDER — remplacer par un vrai avis Google */
  {
    name: "Avis client",
    location: "Nice",
    text: "Cet espace est réservé à un témoignage client réel. Contactez HT Assurance pour obtenir vos premiers avis Google et les intégrer ici.",
    rating: 5,
    date: "À venir",
  },
  /* PLACEHOLDER — remplacer par un vrai avis Google */
  {
    name: "Avis client",
    location: "Nice",
    text: "Cet espace est réservé à un témoignage client réel. Contactez HT Assurance pour obtenir vos premiers avis Google et les intégrer ici.",
    rating: 5,
    date: "À venir",
  },
  /* PLACEHOLDER — remplacer par un vrai avis Google */
  {
    name: "Avis client",
    location: "Nice",
    text: "Cet espace est réservé à un témoignage client réel. Contactez HT Assurance pour obtenir vos premiers avis Google et les intégrer ici.",
    rating: 5,
    date: "À venir",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   SMALL REUSABLE COMPONENTS
───────────────────────────────────────────────────────────────────────── */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          d={ICONS.star}
          filled
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ══ NAVBAR ══════════════════════════════════════════════════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-lg font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
            <a href="#pourquoi" className="hover:text-slate-900 transition-colors">Pourquoi nous</a>
            <a href="#zone" className="hover:text-slate-900 transition-colors">Zone d&apos;intervention</a>
            <a href="/blog" className="hover:text-slate-900 transition-colors">Blog</a>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Icon d={ICONS.phone} className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
            {/* Comparateur — bouton distinct avec badge IA */}
            <a
              href="/comparateur"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold rounded-xl px-4 py-2 shadow-sm shadow-blue-200 transition-all hover:shadow-md hover:-translate-y-px"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Comparateur IA
            </a>
            <a
              href="#contact"
              className="bg-blue-600 text-white rounded-xl px-5 py-2 hover:bg-blue-700 transition-colors"
            >
              Audit gratuit
            </a>
          </div>

          {/* Mobile — 2 boutons visibles */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="/comparateur"
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg px-3 py-2 text-sm font-semibold shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Comparer
            </a>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-1.5 bg-slate-800 text-white rounded-lg px-3 py-2 text-sm font-semibold"
            >
              <Icon d={ICONS.phone} className="w-3.5 h-3.5" />
              Appeler
            </a>
          </div>
        </div>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
            alt="Courtier en assurance à Nice"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-900/30" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-28 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-400/40 text-blue-300 text-xs font-semibold tracking-widest uppercase rounded-full px-4 py-1.5 mb-8">
              <Icon d={ICONS.mapPin} className="w-3.5 h-3.5" />
              Courtier indépendant · Nice, Côte d&apos;Azur
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.15] tracking-tight mb-7">
              Le courtier qui vous accompagne vraiment,{" "}
              <span className="text-blue-400">
                surtout quand l&apos;assurance devient compliquée
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
              HT Assurance compare pour vous les meilleures compagnies, défend
              vos intérêts et vous accompagne à chaque étape — pour les
              particuliers et les professionnels, à Nice et partout en France.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {/* Comparateur IA — CTA principal */}
              <a
                href="/comparateur"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white font-bold rounded-xl px-8 py-4 transition-all shadow-lg shadow-violet-900/40 hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                Comparer mes assurances IA
                <span className="text-violet-200 text-xs font-normal">2 min</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl px-8 py-4 transition-colors backdrop-blur-sm"
              >
                Demander un audit gratuit
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold rounded-xl px-8 py-4 transition-colors backdrop-blur-sm"
              >
                <Icon d={ICONS.phone} className="w-5 h-5" />
                Être rappelé
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["bg-blue-400", "bg-blue-500", "bg-blue-600"].map((c, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${c} border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {["P", "A", "C"][i]}
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm">
                <span className="text-white font-semibold">Particuliers & professionnels</span>{" "}
                accompagnés à Nice et en France
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST BAR ═══════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-100 py-8 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon d={item.icon} className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-slate-800 text-sm leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <main>
        {/* ══ SERVICES ════════════════════════════════════════════════ */}
        <section id="services" className="py-24 px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>Nos solutions</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Des assurances pensées pour vous
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Particuliers ou professionnels, nous couvrons l&apos;ensemble de vos
                besoins en comparant les offres de plusieurs compagnies — en toute
                indépendance.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="group relative bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {service.badge && (
                    <span className="absolute top-5 right-5 bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-1">
                      {service.badge}
                    </span>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center mb-5 transition-colors duration-200">
                    <Icon
                      d={service.icon}
                      className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors"
                    />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 group-hover:gap-2 transition-all gap-1"
                  >
                    Demander un devis
                    <span className="text-base leading-none">→</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY HT ASSURANCE ════════════════════════════════════════ */}
        <section
          id="pourquoi"
          className="py-24 px-6 bg-slate-900 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>Notre différence</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Pourquoi choisir HT Assurance ?
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Nous ne sommes pas un comparateur en ligne. Nous sommes un vrai
                courtier, disponible, humain et capable de gérer les situations
                les plus complexes.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
              {whyItems.map((item) => (
                <div
                  key={item.title}
                  className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800 hover:border-blue-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 group-hover:bg-blue-600/25 flex items-center justify-center mb-4 transition-colors">
                    <Icon d={item.icon} className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-4 transition-colors"
              >
                Demander mon audit gratuit
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors"
              >
                <Icon d={ICONS.phone} className="w-5 h-5" />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        {/* ══ REVIEWS ══════════════════════════════════════════════════
            NOTE: Ces avis sont des placeholders.
            Pour intégrer de vrais avis Google :
            1. Récupérez les avis sur votre fiche Google Business Profile
            2. Remplacez le tableau `reviews` en haut de ce fichier
        ════════════════════════════════════════════════════════════════ */}
        <section id="avis" className="py-24 px-6 bg-slate-50 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>Avis clients</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Ce que disent nos clients
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                La confiance de nos clients est notre meilleure récompense.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col gap-4"
                >
                  <div className="flex items-center justify-between">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed italic flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {review.name}
                      </p>
                      <p className="text-xs text-slate-400">{review.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="https://www.google.com/search?q=HT+Assurance+Nice+avis"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 underline underline-offset-2 transition-colors"
              >
                Voir tous les avis sur Google
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ══ PARTNERS ════════════════════════════════════════════════ */}
        <section className="py-14 px-6 bg-slate-50 border-y border-slate-200">
          <div className="max-w-5xl mx-auto">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-slate-400 mb-10">
              Nos compagnies partenaires
            </p>

            {/*
             * Grille responsive — 2 colonnes mobile, 3 tablette, 6 desktop.
             * Chaque logo est rendu avec ses dimensions intrinsèques et
             * contraint en hauteur via CSS pour un alignement homogène.
             * unoptimized est activé pour le SVG Swiss Life.
             */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-8 items-center justify-items-center">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="group flex items-center justify-center"
                  title={partner.name}
                >
                  {/*
                   * Conteneur identique pour tous : 120 × 52 px.
                   * object-contain préserve les proportions de chaque logo
                   * à l'intérieur de ce rectangle commun.
                   */}
                  <div
                    className="relative"
                    style={{ width: 120, height: 52 }}
                  >
                    <Image
                      src={partner.src}
                      alt={`Logo ${partner.name}`}
                      fill
                      unoptimized={partner.src.endsWith(".svg")}
                      sizes="120px"
                      className="object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LOCAL SEO ═══════════════════════════════════════════════ */}
        <section id="zone" className="py-24 px-6 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=900&q=80"
                  alt="Nice Côte d'Azur - HT Assurance"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-bold rounded-lg px-3 py-1.5">
                    Nice &amp; Côte d&apos;Azur
                  </span>
                </div>
              </div>

              <div>
                <SectionLabel>Zone d&apos;intervention</SectionLabel>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Votre courtier en assurance à Nice, sur la Côte d&apos;Azur et
                  partout en France
                </h2>
                <p className="text-slate-600 leading-relaxed mb-5">
                  HT Assurance est un cabinet de courtage indépendant implanté au
                  cœur de{" "}
                  <strong className="text-slate-800">Nice</strong>. Nous
                  accompagnons les particuliers et les professionnels dans la
                  gestion, l&apos;optimisation et la défense de leurs contrats
                  d&apos;assurance.
                </p>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Notre ancrage local nous permet d&apos;intervenir efficacement à{" "}
                  <strong className="text-slate-800">Nice</strong>,{" "}
                  <strong className="text-slate-800">Cannes</strong>,{" "}
                  <strong className="text-slate-800">Antibes</strong>,{" "}
                  <strong className="text-slate-800">Monaco</strong> et dans
                  toute la région PACA. Nous accompagnons également nos clients{" "}
                  <strong className="text-slate-800">partout en France</strong>{" "}
                  grâce aux rendez-vous en visioconférence.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Rendez-vous en cabinet (25 rue Trachel ou 1 av. de Suède)",
                    "Déplacement à domicile ou en entreprise",
                    "Conseil en visioconférence pour toute la France",
                    "Réactivité et disponibilité : 10h – 19h",
                  ].map((text) => (
                    <li
                      key={text}
                      className="flex items-start gap-3 text-slate-700 text-sm"
                    >
                      <Icon
                        d={ICONS.check}
                        className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"
                      />
                      {text}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-7 py-3.5 transition-colors"
                >
                  Prendre rendez-vous
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══════════════════════════════════════════════════ */}
        <section
          id="contact"
          className="py-24 px-6 bg-slate-100 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <SectionLabel>Nous contacter</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Obtenez votre audit gratuit
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Remplissez le formulaire ou appelez-nous directement. Un conseiller
                vous répond sous 24 h, sans engagement.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">
              {/* Info block */}
              <div className="lg:col-span-2 space-y-5">
                <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-7">
                  <div>
                    <p className="text-xl font-bold mb-1">HT Assurance</p>
                    <p className="text-slate-400 text-sm">
                      Cabinet de courtage en assurance
                    </p>
                  </div>

                  <div className="space-y-5 text-sm">
                    <div className="flex gap-3">
                      <Icon
                        d={ICONS.phone}
                        className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="font-medium mb-0.5">Téléphone</p>
                        <a
                          href={PHONE_HREF}
                          className="text-slate-300 hover:text-white transition-colors font-semibold text-base"
                        >
                          {PHONE_DISPLAY}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Icon
                        d={ICONS.mapPin}
                        className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="font-medium mb-1">Adresses</p>
                        <p className="text-slate-400">
                          25 rue Trachel, 06000 Nice
                        </p>
                        <p className="text-slate-400 mt-1">
                          1 avenue de Suède, 06000 Nice
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Icon
                        d={ICONS.clock}
                        className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                      />
                      <div>
                        <p className="font-medium mb-0.5">Horaires</p>
                        <p className="text-slate-400">Lun – Ven : 10h – 19h</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp card */}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-5 transition-colors group"
                >
                  <WhatsAppIcon className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <p className="font-bold">Nous écrire sur WhatsApp</p>
                    <p className="text-emerald-100 text-sm">
                      Réponse rapide, sans attente
                    </p>
                  </div>
                  <span className="ml-auto text-emerald-200 group-hover:translate-x-1 transition-transform text-xl">
                    →
                  </span>
                </a>
              </div>

              {/* Form */}
              <div className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
      <footer className="bg-slate-900 text-slate-400 pt-14 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-slate-800">
            <div>
              <p className="text-white font-bold text-lg mb-3">
                HT<span className="text-blue-400"> Assurance</span>
              </p>
              <p className="text-sm leading-relaxed">
                Courtier en assurance indépendant à Nice. Nous comparons, conseillons et défendons vos intérêts.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Nos agences
              </p>
              <div className="space-y-2 text-sm">
                <p>25 rue Trachel, 06000 Nice</p>
                <p>1 avenue de Suède, 06000 Nice</p>
                <p className="mt-3">
                  <a href={PHONE_HREF} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </p>
                <p className="text-xs">Lun – Ven : 10h – 19h</p>
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Navigation
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Nos services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    Blog &amp; Guides assurance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <p>© {new Date().getFullYear()} HT Assurance — Tous droits réservés</p>
            <p>Cabinet de courtage en assurance · Nice, Côte d&apos;Azur · France</p>
          </div>
        </div>
      </footer>

      {/* ══ FLOATING WHATSAPP BUTTON (desktop) ════════════════════════════ */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactez-nous sur WhatsApp"
        className="hidden md:flex fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-900/30 items-center justify-center transition-all hover:scale-110"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>

      {/* ══ BARRE STICKY MOBILE ══════════════════════════════════════════ */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="/comparateur"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl py-3 text-sm shadow-md"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
          Comparateur IA
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-500 text-white font-semibold rounded-xl py-3 px-4 text-sm"
        >
          <WhatsAppIcon className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href={PHONE_HREF}
          className="flex items-center justify-center bg-slate-100 text-slate-700 rounded-xl py-3 px-4"
          aria-label="Appeler"
        >
          <Icon d={ICONS.phone} className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   WHATSAPP ICON
───────────────────────────────────────────────────────────────────────── */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
