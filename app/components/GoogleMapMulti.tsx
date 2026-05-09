"use client";

import { useState } from "react";
import GoogleMap from "./GoogleMap";

/* ─────────────────────────────────────────────────────────────────────
   Affiche les 2 bureaux HT Assurance sur la même surface.
   - ≥ md : grille 2 colonnes côte à côte
   - < md : onglets (le visiteur switch entre Trachel et Suède)
───────────────────────────────────────────────────────────────────── */

export type Office = {
  id: string;
  name: string;
  address: string;
  placeId: string;
};

const DEFAULT_OFFICES: Office[] = [
  {
    id: "trachel",
    name: "Siège — Trachel",
    address: "25 rue Trachel, 06000 Nice",
    placeId: "ChIJuSypYgbQzRIRqX2X-zuw5ao",
  },
  {
    id: "suede",
    name: "Bureau Suède",
    address: "1 avenue de Suède, 06000 Nice",
    placeId: "ChIJQ2lcfaDazRIRKNPg1zZn180",
  },
];

export default function GoogleMapMulti({
  offices = DEFAULT_OFFICES,
  height = "420px",
}: {
  offices?: Office[];
  height?: string;
}) {
  const [active, setActive] = useState(offices[0]?.id ?? "");

  return (
    <div className="w-full">
      {/* Onglets — visibles seulement < md */}
      <div className="md:hidden flex gap-2 mb-4" role="tablist" aria-label="Bureaux HT Assurance">
        {offices.map((o) => {
          const selected = active === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${o.id}`}
              onClick={() => setActive(o.id)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                selected
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {o.name}
            </button>
          );
        })}
      </div>

      {/* Mobile — un seul iframe à la fois */}
      <div className="md:hidden">
        {offices.map((o) =>
          o.id === active ? (
            <div
              key={o.id}
              id={`panel-${o.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${o.id}`}
            >
              <p className="text-sm text-slate-500 mb-2">{o.address}</p>
              <GoogleMap
                placeId={o.placeId}
                height={height}
                title={`Carte Google Maps — ${o.name}`}
              />
            </div>
          ) : null
        )}
      </div>

      {/* Desktop — grille 2 colonnes */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {offices.map((o) => (
          <div key={o.id} className="flex flex-col">
            <div className="mb-3">
              <p className="font-bold text-slate-900">{o.name}</p>
              <p className="text-sm text-slate-500">{o.address}</p>
            </div>
            <GoogleMap
              placeId={o.placeId}
              height={height}
              title={`Carte Google Maps — ${o.name}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
