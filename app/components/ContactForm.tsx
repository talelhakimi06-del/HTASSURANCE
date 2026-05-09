"use client";

import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const insuranceTypes = [
  "Assurance décennale",
  "Assurance emprunteur",
  "RC Pro",
  "Multirisque professionnelle",
  "Assurance habitation",
  "Assurance auto",
  "Assurance VTC",
  "Mutuelle santé",
  "Sinistre refusé",
  "Autre",
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      prenom: (form.elements.namedItem("prenom") as HTMLInputElement).value,
      telephone: (form.elements.namedItem("telephone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      assurance: (form.elements.namedItem("assurance") as HTMLSelectElement).value,
      // champs optionnels conservés pour compatibilité backend
      nom: "",
      statut: "particulier",
      siret: "",
      message: "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error ?? "Erreur lors de l'envoi");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue. Appelez-nous au 09 86 11 32 57."
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">
          Demande reçue !
        </h3>
        <p className="text-slate-500 max-w-sm">
          On vous rappelle sous 24h ouvrées. Pour une urgence, appelez le{" "}
          <a href="tel:+33986113257" className="text-blue-600 font-semibold">
            09 86 11 32 57
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass} htmlFor="prenom">
          Prénom <span className="text-blue-500">*</span>
        </label>
        <input
          id="prenom"
          name="prenom"
          type="text"
          placeholder="Votre prénom"
          required
          autoComplete="given-name"
          className={inputClass}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="telephone">
            Téléphone <span className="text-blue-500">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            placeholder="06 XX XX XX XX"
            required
            autoComplete="tel"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-blue-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="votre@email.fr"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="assurance">
          Type d&apos;assurance <span className="text-blue-500">*</span>
        </label>
        <select
          id="assurance"
          name="assurance"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Sélectionnez votre besoin…
          </option>
          {insuranceTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-4 transition-colors shadow-md shadow-blue-100"
      >
        {loading ? "Envoi en cours…" : "Recevoir mon audit gratuit"}
      </button>

      <p className="text-center text-slate-400 text-xs leading-relaxed">
        Réponse sous 24h ouvrées · Aucun démarchage. En soumettant, vous acceptez
        notre{" "}
        <a
          href="/mentions-legales"
          className="underline hover:text-slate-600"
        >
          politique de confidentialité
        </a>
        .
      </p>
    </form>
  );
}
