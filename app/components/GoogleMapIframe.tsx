"use client";

/* ─────────────────────────────────────────────────────────────────────
   Composant interne — l'iframe Maps Embed.
   Importé dynamiquement par GoogleMap.tsx avec ssr:false pour éviter
   tout hydration mismatch et différer le chargement après le mount.
───────────────────────────────────────────────────────────────────── */

export type GoogleMapIframeProps = {
  placeId: string;
  height?: string;
  className?: string;
  title?: string;
  /** Zoom Maps (défaut 16). Optionnel. */
  zoom?: number;
};

const EMBED_URL = "https://www.google.com/maps/embed/v1/place";

export default function GoogleMapIframe({
  placeId,
  height = "360px",
  className = "",
  title = "Carte Google Maps de l'agence HT Assurance",
  zoom,
}: GoogleMapIframeProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;

  if (!apiKey) {
    return (
      <div
        role="img"
        aria-label="Carte indisponible"
        className={`flex items-center justify-center bg-slate-100 text-slate-400 text-sm rounded-2xl border border-slate-200 ${className}`}
        style={{ height }}
      >
        Carte temporairement indisponible
      </div>
    );
  }

  const params = new URLSearchParams({
    key: apiKey,
    q: `place_id:${placeId}`,
  });
  if (zoom) params.set("zoom", String(zoom));

  const src = `${EMBED_URL}?${params.toString()}`;

  return (
    <iframe
      src={src}
      title={title}
      width="100%"
      height={height}
      style={{ border: 0, display: "block" }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`rounded-2xl shadow-sm ${className}`}
    />
  );
}
