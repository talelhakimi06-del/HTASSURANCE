import { headers } from "next/headers";
import type { ReviewsResponse } from "@/app/api/google-reviews/route";

const PLACE_ID_DEFAULT = "ChIJuSypYgbQzRIRqX2X-zuw5ao";

async function fetchReviews(): Promise<ReviewsResponse | null> {
  try {
    const h = await headers();
    const host =
      h.get("x-forwarded-host") ?? h.get("host") ?? "www.htassurance.fr";
    const proto = h.get("x-forwarded-proto") ?? "https";
    const res = await fetch(`${proto}://${host}/api/google-reviews`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ReviewsResponse;
  } catch {
    return null;
  }
}

/* ─────────────────────────────────────────────────────────────────────
   Badge compact : ★ 4.1 (31)  → lien vers la fiche Google.
   À placer dans la navbar et le footer pour signal de confiance permanent.

   Variantes :
   - "light" : pour fond clair (texte sombre)
   - "dark"  : pour fond sombre (texte clair) — utilisé dans le footer
───────────────────────────────────────────────────────────────────── */

export default async function GoogleRatingBadge({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const data = await fetchReviews();
  if (!data || data.count === 0 || data.rating === 0) return null;

  const placeId = process.env.GOOGLE_PLACE_ID ?? PLACE_ID_DEFAULT;
  const url = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

  const palette =
    variant === "dark"
      ? "bg-white/10 hover:bg-white/15 text-slate-100 border-white/15"
      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Note Google : ${data.rating.toFixed(1)} sur 5, basée sur ${data.count} avis`}
      className={`inline-flex items-center gap-1.5 border rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${palette} ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        className="w-3.5 h-3.5 text-amber-400"
        fill="currentColor"
        aria-hidden
      >
        <path d="M10 1.5l2.6 5.4 5.9.86-4.25 4.13 1 5.86L10 14.95l-5.25 2.8 1-5.86L1.5 7.76l5.9-.86L10 1.5z" />
      </svg>
      <span className="tabular-nums">{data.rating.toFixed(1)}</span>
      <span className={variant === "dark" ? "text-slate-400" : "text-slate-400"}>
        ({data.count})
      </span>
      <span className="hidden sm:inline">Google</span>
    </a>
  );
}
