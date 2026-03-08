"use client";

import { useState } from "react";
import type { Lead } from "../_lib/types";

type Props = {
  onClose: () => void;
  onSubmit: (lead: Lead) => void;
  insuranceType?: string;
  profile?: string;
  leadSummary?: string;
  fourchette?: string;
};

export default function LeadFormModal({ onClose, onSubmit, insuranceType, profile, leadSummary, fourchette }: Props) {
  const [form, setForm] = useState({ prenom: "", nom: "", telephone: "", email: "", entreprise: "", siret: "" });
  const [loading, setLoading] = useState(false);
  const [siretLookup, setSiretLookup] = useState<string | null>(null);
  const [siretLoading, setSiretLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPro = profile === "Professionnel / Entreprise" || profile === "professionnel";

  function set(key: keyof typeof form, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function lookupSiret(siret: string) {
    const clean = siret.replace(/\s/g, "");
    if (clean.length !== 14) return;
    setSiretLoading(true);
    setSiretLookup(null);
    try {
      const res = await fetch(`/comparateur/api/siret?siret=${clean}`);
      const data = await res.json();
      if (data.data) {
        setForm((f) => ({ ...f, entreprise: data.data.nom, siret: clean }));
        setSiretLookup(`✓ ${data.data.nom} — ${data.data.activite}`);
      } else {
        setSiretLookup("⚠️ Entreprise non trouvée");
      }
    } catch {
      setSiretLookup("⚠️ Impossible de récupérer les données");
    } finally {
      setSiretLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const lead: Lead = {
      nom: `${form.prenom} ${form.nom}`.trim(),
      prenom: form.prenom,
      telephone: form.telephone,
      email: form.email,
      entreprise: form.entreprise || undefined,
      siret: form.siret || undefined,
      insuranceType,
      profile,
      source: "comparateur-ht",
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("/comparateur/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error();
      onSubmit(lead);
    } catch {
      setError("Une erreur est survenue. Appelez-nous directement au 09 86 11 32 57.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all"
    + " bg-[#0D1B3E] border border-[#1A3570] text-[#e8edf5] placeholder-[#8090A8] focus:ring-[#C9A84C] focus:border-transparent";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
          style={{ background: "#0D2456", border: "1px solid #1A3570" }}>
        <div className="px-6 py-5 flex items-start justify-between"
          style={{ background: "#0D1B3E", borderBottom: "1px solid #C9A84C" }}>
          <div>
            <h2 className="font-bold text-lg" style={{ color: "#C9A84C" }}>Obtenir mon devis</h2>
            {fourchette ? (
              <p className="text-sm mt-0.5" style={{ color: "#8090A8" }}>
                Fourchette estimée : <strong style={{ color: "#e8edf5" }}>{fourchette}</strong>
              </p>
            ) : (
              <p className="text-sm mt-0.5" style={{ color: "#8090A8" }}>Talel te rappelle sous 24h</p>
            )}
            {leadSummary && (
              <p className="text-xs mt-1" style={{ color: "#8090A8" }}>{leadSummary}</p>
            )}
          </div>
          <button onClick={onClose} className="transition-colors hover:opacity-80" style={{ color: "#8090A8" }}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8090A8" }}>Prénom *</label>
              <input type="text" required value={form.prenom} onChange={(e) => set("prenom", e.target.value)} placeholder="Votre prénom" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8090A8" }}>Nom *</label>
              <input type="text" required value={form.nom} onChange={(e) => set("nom", e.target.value)} placeholder="Votre nom" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8090A8" }}>Téléphone *</label>
            <input type="tel" required value={form.telephone} onChange={(e) => set("telephone", e.target.value)} placeholder="06 XX XX XX XX" className={inputClass} />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8090A8" }}>Email *</label>
            <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="votre@email.fr" className={inputClass} />
          </div>

          {isPro && (
            <>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8090A8" }}>SIRET</label>
                <div className="relative">
                  <input type="text" value={form.siret} onChange={(e) => set("siret", e.target.value)} onBlur={(e) => lookupSiret(e.target.value)} placeholder="14 chiffres" maxLength={14} className={inputClass} />
                  {siretLoading && (
                    <div className="absolute right-3 top-3">
                      <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {siretLookup && <p className={`text-xs mt-1.5 ${siretLookup.startsWith("✓") ? "text-emerald-600" : "text-amber-600"}`}>{siretLookup}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#8090A8" }}>Entreprise</label>
                <input type="text" value={form.entreprise} onChange={(e) => set("entreprise", e.target.value)} placeholder="Nom de votre entreprise" className={inputClass} />
              </div>
            </>
          )}

          {error && (
            <div className="rounded-xl px-4 py-3 text-sm" style={{ background: "#2A0D0D", border: "1px solid #D94F3D", color: "#D94F3D" }}>
              {error}
            </div>
          )}

          <p className="text-[11px] leading-relaxed" style={{ color: "#8090A8" }}>
            Données utilisées uniquement pour te contacter · RGPD · Non revendues · ORIAS 16004865
          </p>

          <button type="submit" disabled={loading}
            className="w-full font-bold py-3.5 rounded-2xl transition-all disabled:opacity-60 text-sm active:scale-[0.98]"
            style={{ background: "#C9A84C", color: "#0D1B3E" }}>
            {loading ? "Envoi en cours…" : "Envoyer ma demande →"}
          </button>
        </form>
      </div>
    </div>
  );
}
