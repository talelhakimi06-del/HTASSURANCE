"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";

/* ─────────────────────────────────────────────────────────────────────
   GA4 conditionnel — ne charge le script QU'APRÈS consentement explicite
   "analytics: true". Conforme RGPD/CNIL.

   Anonymisation systématique :
   - anonymize_ip: true (option historique conservée par GA4)
   - allow_google_signals: false (pas de signaux pub)
   - allow_ad_personalization_signals: false

   Pas de Consent Mode v2 ici par souci de simplicité — si besoin de
   conserver des conversions sans cookie côté Google Ads, basculer
   vers gtag('consent', 'default', {…}) avec ad_storage='denied' par
   défaut, puis update au consentement.
───────────────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const { consent, hydrated } = useCookieConsent();
  const [loaded, setLoaded] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  // Reset l'état "chargé" si l'utilisateur retire son consentement
  useEffect(() => {
    if (consent?.analytics === false && loaded) {
      // GA4 ne propose pas d'unload propre ; le mieux est qu'au prochain
      // refresh la page ne charge plus le script. On peut aussi clear
      // les cookies _ga* manuellement ici si on veut être strict.
      try {
        document.cookie.split(";").forEach((c) => {
          const name = c.split("=")[0].trim();
          if (name.startsWith("_ga")) {
            document.cookie = `${name}=; Max-Age=0; path=/; domain=.${location.hostname.replace(/^www\./, "")}`;
          }
        });
      } catch {
        /* noop */
      }
    }
  }, [consent?.analytics, loaded]);

  if (!hydrated) return null;
  if (!measurementId) return null;
  if (!consent?.analytics) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false,
              cookie_flags: 'SameSite=Lax;Secure'
            });
          `,
        }}
      />
    </>
  );
}
