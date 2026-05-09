"use client";

import dynamic from "next/dynamic";
import type { GoogleMapIframeProps } from "./GoogleMapIframe";

/* ─────────────────────────────────────────────────────────────────────
   Wrapper public — charge l'iframe Maps Embed côté client uniquement
   (ssr:false) avec un skeleton pendant le download du chunk.
   Évite les hydration mismatches et rend l'iframe "lazy" naturellement.
───────────────────────────────────────────────────────────────────── */

const Iframe = dynamic(() => import("./GoogleMapIframe"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="animate-pulse bg-slate-100 rounded-2xl border border-slate-200"
      style={{ height: "360px" }}
    />
  ),
});

export default function GoogleMap(props: GoogleMapIframeProps) {
  return <Iframe {...props} />;
}
