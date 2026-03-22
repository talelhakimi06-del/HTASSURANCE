"use client";

import { useState } from "react";
import type { Lead } from "@/lib/types";

type Props = {
  onClose: () => void;
  onSubmit: (lead: Lead) => void;
  insuranceType?: string;
  profile?: string;
  prefillSiret?: string;
  prefillCompany?: string;
};

export default function LeadFormModal({ onClose, onSubmit, insuranceType, profile, prefillSiret, prefillCompany }: Props) {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    entreprise: prefillCompany ?? "",
    siret: prefillSiret ?? "",
  });
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
      const res = await fetch(`/api/siret?siret=${clean}`);
      const data = await res.json();
      if (data.data) {
        setForm((f) => ({
          ...f,
          entreprise: data.data.nom,
          siret: clean,
        }));
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
    alert("DEBUG: formulaire soumis — envoi en cours…");
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
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      const resData = await res.json().catch(() => null);
      alert("DEBUG: réponse API = " + JSON.stringify(resData));
      if (!res.ok) throw new Error(resData?.error ?? "Erreur lors de l'envoi");
      if (resData && !resData.emailSent) {
        console.warn("[LeadForm] Lead enregistré mais email NON envoyé (RESEND_API_KEY manquante ?)");
      }

      // ── Tracking conversion ───────────────────────────────
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = typeof window !== "undefined" ? (window as Record<string, any>) : null;
      if (w) {
        if (typeof w.gtag === "function") {
          w.gtag("event", "generate_lead", {
            event_category: "lead",
            event_label: insuranceType ?? "assurance",
            value: 1,
          });
        }
        if (typeof w.fbq === "function") {
          w.fbq("track", "Lead", {
            content_name: insuranceType ?? "assurance",
          });
        }
      }

      onSubmit(lead);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer ou nous contacter directement.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">Obtenir mon devis</h2>
              <p className="text-blue-200 text-sm mt-0.5">Un courtier vous rappelle sous 24h</p>
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Prénom *</label>
              <input
                type="text"
                required
                value={form.prenom}
                onChange={(e) => set("prenom", e.target.value)}
                placeholder="Votre prénom"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nom *</label>
              <input
                type="text"
                required
                value={form.nom}
                onChange={(e) => set("nom", e.target.value)}
                placeholder="Votre nom"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Téléphone *</label>
            <input
              type="tel"
              required
              value={form.telephone}
              onChange={(e) => set("telephone", e.target.value)}
              placeholder="06 XX XX XX XX"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="votre@email.fr"
              className={inputClass}
            />
          </div>

          {isPro && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">SIRET</label>
                <div className="relative">
                  <input
                    type="text"
                    value={form.siret}
                    onChange={(e) => set("siret", e.target.value)}
                    onBlur={(e) => lookupSiret(e.target.value)}
                    placeholder="12345678901234"
                    maxLength={14}
                    className={inputClass}
                  />
                  {siretLoading && (
                    <div className="absolute right-3 top-3">
                      <svg className="w-4 h-4 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    </div>
                  )}
                </div>
                {siretLookup && (
                  <p className={`text-xs mt-1.5 ${siretLookup.startsWith("✓") ? "text-emerald-600" : "text-amber-600"}`}>
                    {siretLookup}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Entreprise</label>
                <input
                  type="text"
                  value={form.entreprise}
                  onChange={(e) => set("entreprise", e.target.value)}
                  placeholder="Nom de votre entreprise"
                  className={inputClass}
                />
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* RGPD */}
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Vos données sont utilisées uniquement pour vous contacter. Conformément au RGPD, vous pouvez exercer vos droits à{" "}
            <a href="mailto:contact@ht-assurance.fr" className="underline">contact@ht-assurance.fr</a>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-all disabled:opacity-60 disabled:cursor-not-allowed text-sm active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Envoi en cours…
              </span>
            ) : (
              "Envoyer ma demande →"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
