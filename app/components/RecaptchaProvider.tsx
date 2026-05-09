"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

/* ─────────────────────────────────────────────────────────────────────
   Wrapper Client Component pour la racine de l'app (Layout server).
   - useRecaptchaNet : utilise recaptcha.net plutôt que google.com
     (CNIL/RGPD : réduit le tracking croisé Google).
   - scriptProps async/defer/head : non bloquant, chargé tard.
   - Si la site key est absente, on ne charge pas le provider —
     les composants qui appellent useGoogleReCaptcha auront un
     executeRecaptcha undefined et ne tenteront pas la vérif.
───────────────────────────────────────────────────────────────────── */

export default function RecaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return <>{children}</>;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      useRecaptchaNet
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "head",
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
