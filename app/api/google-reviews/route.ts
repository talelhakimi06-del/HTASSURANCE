import { NextResponse } from "next/server";

/* ─────────────────────────────────────────────────────────────────────
   Route serveur — appelle Place Details (New) côté serveur uniquement.
   La clé GOOGLE_PLACES_API_KEY n'est JAMAIS exposée au client.

   Cache : Next.js ISR via `next: { revalidate: 86400 }` (24h).
   La réponse de la route est aussi marquée "max-age=0, s-maxage=86400"
   pour que le CDN Vercel cache les réponses publiques 24h.
───────────────────────────────────────────────────────────────────── */

export const revalidate = 86400; // 24h

const PLACE_ID_DEFAULT = "ChIJuSypYgbQzRIRqX2X-zuw5ao"; // Nice 25 rue Trachel

type ApiReview = {
  authorAttribution?: { displayName?: string; photoUri?: string };
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  relativePublishTimeDescription?: string;
  publishTime?: string;
};

export type FormattedReview = {
  author: string;
  rating: number;
  text: string;
  time: string;
  publishTime: string;
  profilePhotoUrl: string | null;
};

export type ReviewsResponse = {
  rating: number;
  count: number;
  displayName: string;
  reviews: FormattedReview[];
};

const EMPTY: ReviewsResponse = {
  rating: 0,
  count: 0,
  displayName: "HT Assurance",
  reviews: [],
};

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID ?? PLACE_ID_DEFAULT;

  if (!apiKey) {
    return NextResponse.json(EMPTY, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=86400" },
    });
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "displayName,rating,userRatingCount,reviews",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      console.error("[google-reviews]", res.status, await res.text());
      return NextResponse.json(EMPTY, {
        status: 200,
        headers: { "Cache-Control": "public, max-age=0, s-maxage=300" },
      });
    }

    const data = (await res.json()) as {
      displayName?: { text?: string };
      rating?: number;
      userRatingCount?: number;
      reviews?: ApiReview[];
    };

    const reviews: FormattedReview[] = (data.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? "Client",
      rating: r.rating ?? 5,
      text: r.text?.text ?? r.originalText?.text ?? "",
      time: r.relativePublishTimeDescription ?? "",
      publishTime: r.publishTime ?? "",
      profilePhotoUrl: r.authorAttribution?.photoUri ?? null,
    }));

    const payload: ReviewsResponse = {
      rating: typeof data.rating === "number" ? data.rating : 0,
      count: typeof data.userRatingCount === "number" ? data.userRatingCount : 0,
      displayName: data.displayName?.text ?? "HT Assurance",
      reviews,
    };

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, max-age=0, s-maxage=86400" },
    });
  } catch (err) {
    console.error("[google-reviews] fetch error:", err);
    return NextResponse.json(EMPTY, {
      status: 200,
      headers: { "Cache-Control": "public, max-age=0, s-maxage=60" },
    });
  }
}
