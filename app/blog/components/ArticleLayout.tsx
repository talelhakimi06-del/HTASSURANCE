import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "../lib/types";

const PHONE = "09 86 11 32 57";
const PHONE_HREF = "tel:+33986113257";
const WA_HREF =
  "https://wa.me/33986113257?text=Bonjour%2C%20j%27ai%20lu%20un%20article%20sur%20votre%20site%20et%20je%20souhaite%20un%20conseil%20en%20assurance.%20Pouvez-vous%20me%20recontacter%20%3F";

const CATEGORY_COLORS: Record<string, string> = {
  "Décennale": "bg-orange-100 text-orange-700",
  "Assurance VTC": "bg-violet-100 text-violet-700",
  "RC Pro": "bg-blue-100 text-blue-700",
  "Assurance emprunteur": "bg-emerald-100 text-emerald-700",
  "Habitation": "bg-amber-100 text-amber-700",
};

export function InlineCta({ text = "Un courtier expert répond à votre question sous 24 h." }: { text?: string }) {
  return (
    <div className="my-8 bg-slate-900 text-white rounded-2xl p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
      <div className="flex-1">
        <p className="font-bold text-lg mb-1">Besoin d&apos;un conseil personnalisé ?</p>
        <p className="text-slate-300 text-sm">{text}</p>
      </div>
      <a
        href="/#contact"
        className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6 py-3 text-sm transition-colors"
      >
        Demander mon audit gratuit →
      </a>
    </div>
  );
}

export function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
        Bon à savoir
      </p>
      <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">
        Attention
      </p>
      <div className="text-slate-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export default function ArticleLayout({
  meta,
  children,
}: {
  meta: PostMeta;
  children: React.ReactNode;
}) {
  const catColor = CATEGORY_COLORS[meta.category] ?? "bg-slate-100 text-slate-600";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Navbar mini ── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-base font-bold text-slate-900 tracking-tight">
            HT<span className="text-blue-600"> Assurance</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              ← Blog
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

      {/* ── Article header ── */}
      <header className="bg-white border-b border-slate-100 py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 ${catColor}`}>
              {meta.category}
            </span>
            <span className="text-xs text-slate-400">{meta.readTime} de lecture</span>
            <span className="text-xs text-slate-400">{meta.date}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-5">
            {meta.title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">{meta.description}</p>
        </div>
      </header>

      {/* ── Cover image ── */}
      <div className="bg-white px-6 pb-0 pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden shadow-md">
            <Image
              src={meta.image.src}
              alt={meta.image.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-xs text-slate-400 mt-2 italic">{meta.image.alt}</p>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="article-content">{children}</div>

          {/* ── Final CTA block ── */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
              HT Assurance · Nice
            </p>
            <h2 className="text-2xl font-bold mb-3">
              Vous avez une question ou besoin d&apos;un devis ?
            </h2>
            <p className="text-slate-300 leading-relaxed mb-8">
              Courtier indépendant basé à Nice, HT Assurance compare les meilleures
              compagnies pour vous et gère les dossiers complexes. Audit de vos
              contrats 100 % gratuit et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-7 py-3.5 transition-colors"
              >
                Demander mon audit gratuit
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl px-7 py-3.5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {PHONE}
              </a>
              <a
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl px-7 py-3.5 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* ── Back to blog ── */}
          <div className="mt-10 text-center">
            <Link href="/blog" className="text-sm text-slate-400 hover:text-slate-700 transition-colors underline underline-offset-2">
              ← Retour au blog
            </Link>
          </div>
        </div>
      </main>

      {/* ── Floating WhatsApp ── */}
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg flex items-center justify-center transition-all hover:scale-110"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
