"use client";

import { useCallback, useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
   Hook RGPD/CNIL — gère le consentement cookies stocké en localStorage.

   - Bannière re-affichée au bout de 13 mois (recommandation CNIL)
   - Émet un événement custom 'ht-consent-change' à chaque mise à jour
     pour que d'autres composants (ex: GoogleAnalytics) réagissent sans
     polling.
───────────────────────────────────────────────────────────────────── */

export const STORAGE_KEY = "ht-cookie-consent";
export const CONSENT_VERSION = "1.0";
const TTL_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 mois

export type Consent = {
  analytics: boolean;
  marketing: boolean;
  timestamp: string; // ISO
  version: string;
};

const DEFAULT_CONSENT: Consent = {
  analytics: false,
  marketing: false,
  timestamp: "",
  version: CONSENT_VERSION,
};

function readStored(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Consent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (parsed.timestamp) {
      const age = Date.now() - new Date(parsed.timestamp).getTime();
      if (age > TTL_MS) return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(consent: Consent) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(
    new CustomEvent<Consent>("ht-consent-change", { detail: consent })
  );
}

/** Consentement courant. Retourne null tant qu'aucun choix n'a été fait. */
export function useCookieConsent() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Lecture initiale au mount (évite hydration mismatch)
  useEffect(() => {
    setConsent(readStored());
    setHydrated(true);

    const onChange = (e: Event) => {
      const ev = e as CustomEvent<Consent>;
      setConsent(ev.detail);
    };
    window.addEventListener("ht-consent-change", onChange);
    return () => window.removeEventListener("ht-consent-change", onChange);
  }, []);

  const update = useCallback((patch: Partial<Pick<Consent, "analytics" | "marketing">>) => {
    const next: Consent = {
      ...DEFAULT_CONSENT,
      ...consent,
      ...patch,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION,
    };
    writeStored(next);
    setConsent(next);
  }, [consent]);

  const acceptAll = useCallback(() => update({ analytics: true, marketing: true }), [update]);
  const rejectAll = useCallback(() => update({ analytics: false, marketing: false }), [update]);

  /** Réouvre la bannière (sans réinitialiser les choix) — pour le bouton
      "Gérer mes cookies" du footer. */
  const reopen = useCallback(() => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("ht-consent-reopen"));
  }, []);

  return {
    consent,
    hydrated,
    hasChosen: hydrated && consent !== null,
    acceptAll,
    rejectAll,
    update,
    reopen,
  };
}
