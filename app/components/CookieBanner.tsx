"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";

export default function CookieBanner() {
  const { consent, hydrated, hasChosen, acceptAll, rejectAll, update } =
    useCookieConsent();
  const [forceOpen, setForceOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [tempAnalytics, setTempAnalytics] = useState(false);
  const [tempMarketing, setTempMarketing] = useState(false);

  // Bouton "Gérer mes cookies" du footer émet un event qu'on écoute ici
  useEffect(() => {
    const onReopen = () => {
      setTempAnalytics(consent?.analytics ?? false);
      setTempMarketing(consent?.marketing ?? false);
      setShowCustomize(true);
      setForceOpen(true);
    };
    window.addEventListener("ht-consent-reopen", onReopen);
    return () => window.removeEventListener("ht-consent-reopen", onReopen);
  }, [consent]);

  if (!hydrated) return null;
  if (hasChosen && !forceOpen) return null;

  const closeAll = () => {
    setShowCustomize(false);
    setForceOpen(false);
  };

  return (
    <>
      {/* Bandeau principal — caché si on a ouvert le modal Personnaliser */}
      {!showCustomize && (
        <div
          role="dialog"
          aria-label="Préférences cookies"
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:max-w-md z-[80] bg-white rounded-2xl shadow-2xl border border-slate-200 p-5"
        >
          <h2 className="font-bold text-slate-900 mb-2">
            🍪 Vos préférences cookies
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Nous utilisons des cookies strictement nécessaires au fonctionnement
            du site. Avec votre accord, nous utilisons aussi des cookies pour
            mesurer l&apos;audience (Google Analytics).{" "}
            <a
              href="/cookies"
              className="underline text-slate-700 hover:text-slate-900"
            >
              En savoir plus
            </a>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => {
                acceptAll();
                closeAll();
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
            >
              Tout accepter
            </button>
            <button
              type="button"
              onClick={() => {
                rejectAll();
                closeAll();
              }}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
            >
              Tout refuser
            </button>
            <button
              type="button"
              onClick={() => {
                setTempAnalytics(consent?.analytics ?? false);
                setTempMarketing(consent?.marketing ?? false);
                setShowCustomize(true);
              }}
              className="text-slate-600 hover:text-slate-900 font-medium rounded-xl px-3 py-2.5 text-sm underline underline-offset-2"
            >
              Personnaliser
            </button>
          </div>
        </div>
      )}

      {/* Modal Personnaliser */}
      {showCustomize && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Personnaliser les cookies"
          className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
          onClick={closeAll}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4 mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  Préférences cookies
                </h2>
                <button
                  type="button"
                  onClick={closeAll}
                  aria-label="Fermer"
                  className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <CategoryRow
                title="Strictement nécessaires"
                description="Indispensables au fonctionnement du site (navigation, sécurité, formulaire). Toujours actifs."
                value={true}
                disabled
                onChange={() => {}}
              />
              <CategoryRow
                title="Mesure d'audience"
                description="Google Analytics 4 — comprendre comment les visiteurs utilisent le site (anonymisé)."
                value={tempAnalytics}
                onChange={setTempAnalytics}
              />
              <CategoryRow
                title="Marketing"
                description="Cookies publicitaires (réservés à de futures campagnes). Aucun actif aujourd'hui."
                value={tempMarketing}
                onChange={setTempMarketing}
              />

              <div className="flex flex-col sm:flex-row gap-2 mt-7 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    update({ analytics: tempAnalytics, marketing: tempMarketing });
                    closeAll();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
                >
                  Enregistrer mes choix
                </button>
                <button
                  type="button"
                  onClick={() => {
                    acceptAll();
                    closeAll();
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl px-4 py-2.5 text-sm transition-colors"
                >
                  Tout accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CategoryRow({
  title,
  description,
  value,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  value: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="py-4 border-b border-slate-100 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 mb-1">{title}</p>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={value}
          aria-label={title}
          disabled={disabled}
          onClick={() => onChange(!value)}
          className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors ${
            value ? "bg-blue-600" : "bg-slate-300"
          } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              value ? "translate-x-5" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}
