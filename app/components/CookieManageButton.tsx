"use client";

import { useCookieConsent } from "../hooks/useCookieConsent";

/* Bouton persistant à mettre dans le footer — permet à l'utilisateur de
   modifier son choix à tout moment. */
export default function CookieManageButton({
  className = "",
}: {
  className?: string;
}) {
  const { reopen } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={reopen}
      className={`text-xs hover:text-white transition-colors underline-offset-2 hover:underline ${className}`}
    >
      Gérer mes cookies
    </button>
  );
}
