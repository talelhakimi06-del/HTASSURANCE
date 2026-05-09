/* ─────────────────────────────────────────────────────────────────────
   Intégration Google Places API (New) — fetch des avis côté serveur.

   Variables d'env requises (à configurer dans Vercel) :
     GOOGLE_PLACES_API_KEY  — clé Places API (New)
     GOOGLE_PLACE_ID        — Place ID de la fiche principale

   Sans ces variables, la fonction retourne {reviews: [], …} → la section
   avis reste masquée sur le site (voir conditional render dans page.tsx).

   Cache : Next.js revalidate 24h (1 fetch/jour, gratuit dans le quota
   Google de 200$/mois ≈ 0.001$/jour).
───────────────────────────────────────────────────────────────────── */

const PLACE_ID_DEFAULT = "ChIJuSypYgbQzRIRqX2X-zuw5ao"; // Nice 25 Rue Trachel

export type GoogleReview = {
  authorName: string;
  authorPhoto?: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
};

export type GoogleReviewsData = {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
};

const EMPTY: GoogleReviewsData = { reviews: [], rating: 0, totalReviews: 0 };

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID ?? PLACE_ID_DEFAULT;

  if (!apiKey) {
    return EMPTY;
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error("[googleReviews]", res.status, await res.text());
      return EMPTY;
    }

    const data = await res.json();
    type ApiReview = {
      authorAttribution?: { displayName?: string; photoUri?: string };
      rating?: number;
      text?: { text?: string };
      originalText?: { text?: string };
      relativePublishTimeDescription?: string;
      publishTime?: string;
    };

    const reviews: GoogleReview[] = (data.reviews ?? []).map(
      (r: ApiReview) => ({
        authorName: r.authorAttribution?.displayName ?? "Client",
        authorPhoto: r.authorAttribution?.photoUri,
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        relativeTime: r.relativePublishTimeDescription ?? "",
        publishTime: r.publishTime ?? "",
      })
    );

    return {
      reviews,
      rating: typeof data.rating === "number" ? data.rating : 0,
      totalReviews:
        typeof data.userRatingCount === "number" ? data.userRatingCount : 0,
    };
  } catch (err) {
    console.error("[googleReviews] fetch failed:", err);
    return EMPTY;
  }
}

/** Filtre les avis ≥ minRating et limite le nombre. */
export function filterReviews(
  reviews: GoogleReview[],
  minRating = 4,
  max = 6
): GoogleReview[] {
  return reviews.filter((r) => r.rating >= minRating).slice(0, max);
}
