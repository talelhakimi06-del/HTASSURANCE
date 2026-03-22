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
  "Autre",
];

export default function ContactForm() {
  const [statut, setStatut] = useState<"particulier" | "professionnel">(
    "particulier"
  );
  const [rgpd, setRgpd] = useState(false);
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
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      telephone: (form.elements.namedItem("telephone") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      statut,
      assurance: (form.elements.namedItem("assurance") as HTMLSelectElement).value,
      siret: (form.elements.namedItem("siret") as HTMLInputElement | null)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
          Demande envoyée !
        </h3>
        <p className="text-slate-500 max-w-sm">
          Nous avons bien reçu votre message. Un conseiller vous recontacte dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
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
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="nom">
            Nom <span className="text-blue-500">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            placeholder="Votre nom"
            required
            className={inputClass}
          />
        </div>
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
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass} htmlFor="statut">
            Vous êtes
          </label>
          <select
            id="statut"
            name="statut"
            value={statut}
            onChange={(e) =>
              setStatut(e.target.value as "particulier" | "professionnel")
            }
            className={inputClass}
          >
            <option value="particulier">Particulier</option>
            <option value="professionnel">Professionnel</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="assurance">
            Type d&apos;assurance
          </label>
          <select id="assurance" name="assurance" className={inputClass}>
            <option value="">Sélectionnez...</option>
            {insuranceTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {statut === "professionnel" && (
        <div>
          <label className={labelClass} htmlFor="siret">
            Numéro SIRET
          </label>
          <input
            id="siret"
            name="siret"
            type="text"
            placeholder="123 456 789 00012"
            maxLength={17}
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Décrivez votre besoin en assurance..."
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
        <input
          id="rgpd"
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer flex-shrink-0"
        />
        <label
          htmlFor="rgpd"
          className="text-xs text-slate-500 leading-relaxed cursor-pointer"
        >
          J&apos;accepte que mes données personnelles soient utilisées pour traiter ma
          demande, conformément à la{" "}
          <a href="#" className="underline hover:text-slate-700">
            politique de confidentialité
          </a>{" "}
          de HT Assurance.
        </label>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!rgpd || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-4 transition-colors shadow-md shadow-blue-100"
      >
        {loading ? "Envoi en cours…" : "Envoyer ma demande"}
      </button>

      <p className="text-center text-slate-400 text-xs">
        Réponse garantie sous 24h — Aucun démarchage commercial.
      </p>
    </form>
  );
}
