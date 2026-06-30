import GoogleReviewCard from "./GoogleReviewCard";
import { getReviewsForDisplay } from "@/lib/googleReviews";

const PLACE_ID_DEFAULT = "ChIJuSypYgbQzRIRqX2X-zuw5ao";

/* ─────────────────────────────────────────────────────────────────────
   Server Component — lit Google Places via la lib DIRECTEMENT (plus de
   self-fetch HTTP de notre propre route, qui figeait les avis au build
   avec les données de la version précédente). Cache 6h côté lib.
───────────────────────────────────────────────────────────────────── */

export default async function GoogleReviews() {
  const data = await getReviewsForDisplay();
  if (!data || data.reviews.length === 0) return null;

  const placeId = process.env.GOOGLE_PLACE_ID ?? PLACE_ID_DEFAULT;
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  const top = data.reviews.filter((r) => r.rating >= 4).slice(0, 6);
  if (top.length === 0) return null;

  // Schema.org AggregateRating pour rich snippets
  const aggregateSchema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: data.displayName || "HT Assurance",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.rating.toFixed(1),
      reviewCount: data.count,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <section
      id="avis"
      aria-labelledby="avis-title"
      className="py-24 px-6 bg-slate-50 scroll-mt-20"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateSchema) }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
            Avis clients
          </span>
          <h2
            id="avis-title"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-5"
          >
            Ce que disent nos clients
          </h2>

          <BigRating rating={data.rating} count={data.count} />

          <p className="text-slate-500 max-w-xl mx-auto mt-4 text-sm">
            Avis vérifiés sur Google Business — mis à jour automatiquement
            chaque jour.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {top.map((r, i) => (
            <GoogleReviewCard key={`${r.publishTime}-${i}`} review={r} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl px-6 py-3 text-sm transition-colors shadow-sm"
          >
            <GoogleGIcon className="w-5 h-5" />
            Voir les {data.count} avis sur Google
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function BigRating({ rating, count }: { rating: number; count: number }) {
  const filled = Math.floor(rating);
  const half = rating - filled >= 0.4 && rating - filled < 0.9;
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-none">
        {rating.toFixed(1)}
      </span>
      <span className="text-2xl text-slate-300">/&nbsp;5</span>
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < filled || (i === filled && half);
          return (
            <svg
              key={i}
              viewBox="0 0 20 20"
              className={`w-6 h-6 ${
                isFilled ? "text-amber-400" : "text-slate-200"
              }`}
              fill="currentColor"
            >
              <path d="M10 1.5l2.6 5.4 5.9.86-4.25 4.13 1 5.86L10 14.95l-5.25 2.8 1-5.86L1.5 7.76l5.9-.86L10 1.5z" />
            </svg>
          );
        })}
      </div>
      <span className="text-slate-500 font-medium ml-1">
        ({count} avis Google)
      </span>
    </div>
  );
}

function GoogleGIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.83z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z"
        fill="#EA4335"
      />
    </svg>
  );
}
