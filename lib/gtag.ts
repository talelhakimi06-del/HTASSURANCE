/* ─────────────────────────────────────────────────────────────────────
   Helper events GA4 — appellable depuis n'importe quel Client Component.

   Ne fait rien si :
   - on est côté serveur (typeof window === undefined)
   - gtag n'est pas chargé (pas de consentement, ou Measurement ID absent)

   Events conventionnels documentés dans /docs/cookies-et-analytics.md.
───────────────────────────────────────────────────────────────────── */

type GtagFn = (
  command: "event" | "config" | "set",
  ...args: unknown[]
) => void;

export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: GtagFn };
  if (typeof w.gtag !== "function") return;
  w.gtag("event", name, params);
}

/* Helpers nominatifs */

export const trackFormSubmit = (formName: string, extra: Record<string, unknown> = {}) =>
  trackEvent("form_submit", { form_name: formName, ...extra });

export const trackPhoneClick = (location?: string) =>
  trackEvent("phone_click", { location });

export const trackWhatsAppClick = (location?: string) =>
  trackEvent("whatsapp_click", { location });

export const trackProductPageView = (productName: string) =>
  trackEvent("product_page_view", { product: productName });

export const trackReviewClick = () =>
  trackEvent("review_click", { destination: "google_business" });
