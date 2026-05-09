"use client";

import { useEffect, useState } from "react";
import type { FormattedReview } from "@/app/api/google-reviews/route";

const TRUNCATE_AT = 200;

export default function GoogleReviewCard({ review }: { review: FormattedReview }) {
  const [open, setOpen] = useState(false);
  const isLong = review.text.length > TRUNCATE_AT;
  const excerpt = isLong ? review.text.slice(0, TRUNCATE_AT).trimEnd() + "…" : review.text;

  // Fermer au touche Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100 flex flex-col gap-4">
        <header className="flex items-center justify-between">
          <Stars rating={review.rating} />
          <span className="text-xs text-slate-400">{review.time}</span>
        </header>

        <p className="text-slate-600 text-sm leading-relaxed italic flex-1">
          &ldquo;{excerpt}&rdquo;
          {isLong && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="ml-1.5 not-italic font-semibold text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline"
              aria-label={`Lire l'avis complet de ${review.author}`}
            >
              Lire la suite
            </button>
          )}
        </p>

        <footer className="flex items-center gap-3 pt-2 border-t border-slate-100">
          {review.profilePhotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.profilePhotoUrl}
              alt={review.author}
              className="w-9 h-9 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm">
              {review.author[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-slate-700">{review.author}</p>
            <p className="text-xs text-slate-400">Avis Google</p>
          </div>
        </footer>
      </article>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`review-title-${review.publishTime}`}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-7 sm:p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  {review.profilePhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.profilePhotoUrl}
                      alt={review.author}
                      className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold flex-shrink-0">
                      {review.author[0]?.toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p
                      id={`review-title-${review.publishTime}`}
                      className="font-bold text-slate-900 truncate"
                    >
                      {review.author}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Stars rating={review.rating} />
                      <span className="text-xs text-slate-400">{review.time}</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                  aria-label="Fermer"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                {review.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.4 5.9.86-4.25 4.13 1 5.86L10 14.95l-5.25 2.8 1-5.86L1.5 7.76l5.9-.86L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}
