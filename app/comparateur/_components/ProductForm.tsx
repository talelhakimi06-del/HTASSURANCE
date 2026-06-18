"use client";

import { useState, useEffect, useRef } from "react";
import type { ProductForm, FormField } from "../_lib/forms";

/* ─────────────────────────────────────────────────────────────────────
   Wizard interactif — affiche UNE question à la fois.

   - Pour les selects : cartes cliquables qui auto-avancent.
   - Pour les inputs text : champ + bouton "Suivant".
   - Aucun appel IA pendant le wizard (transitions instantanées).
   - À la dernière étape : "Calculer mon estimation" déclenche onSubmit()
     → le parent fait UN SEUL appel IA avec toutes les valeurs.
───────────────────────────────────────────────────────────────────── */

export default function ProductFormCard({
  form,
  onSubmit,
  onCancel,
  loading,
}: {
  form: ProductForm;
  onSubmit: (values: Record<string, string>) => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(form.fields.map((f) => [f.name, ""]))
  );
  const [touched, setTouched] = useState(false);
  const total = form.fields.length;
  const field = form.fields[step];
  const isLast = step === total - 1;
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-focus de l'input text quand on arrive sur une question text */
  useEffect(() => {
    if (field?.type !== "select" && inputRef.current) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [step, field?.type]);

  /* Reset touched à chaque changement de question */
  useEffect(() => {
    setTouched(false);
  }, [step]);

  function selectOption(option: string) {
    const next = { ...values, [field.name]: option };
    setValues(next);
    if (isLast) {
      onSubmit(next);
    } else {
      setStep(step + 1);
    }
  }

  function submitTextStep() {
    const value = values[field.name]?.trim();
    if (field.required && !value) {
      setTouched(true);
      inputRef.current?.focus();
      return;
    }
    if (isLast) {
      onSubmit(values);
    } else {
      setStep(step + 1);
    }
  }

  function goBack() {
    if (step === 0) {
      onCancel();
    } else {
      setStep(step - 1);
    }
  }

  const isInvalid = touched && field.required && !values[field.name]?.trim();
  const progress = ((step + 1) / total) * 100;

  return (
    <div
      style={{ background: "#0D2456", border: "1px solid #C9A84C" }}
      className="rounded-2xl p-5 mx-4 my-2 animate-fade-in"
    >
      {/* Header — titre + progress */}
      <header className="mb-4">
        <div className="flex items-center justify-between gap-2">
          <p
            style={{ color: "#C9A84C" }}
            className="text-xs font-bold tracking-widest uppercase"
          >
            ⚡ {form.emoji} {form.title}
          </p>
          <span style={{ color: "#8090A8" }} className="text-[11px] font-medium tabular-nums">
            {step + 1} / {total}
          </span>
        </div>
        {/* Progress bar */}
        <div
          style={{ background: "#1A3570" }}
          className="h-1 rounded-full mt-2 overflow-hidden"
        >
          <div
            style={{
              background: "#C9A84C",
              width: `${progress}%`,
              transition: "width 250ms ease",
            }}
            className="h-full rounded-full"
          />
        </div>
      </header>

      {/* Question + champ */}
      <div key={step} className="space-y-3 animate-fade-in">
        <p
          style={{ color: "#e8edf5" }}
          className="text-base font-semibold leading-snug"
        >
          {field.label}
          {field.required && (
            <span style={{ color: "#C9A84C" }} className="ml-1">*</span>
          )}
        </p>
        {field.helper && (
          <p style={{ color: "#8090A8" }} className="text-xs leading-relaxed">
            {field.helper}
          </p>
        )}

        {field.type === "select" ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {field.options?.map((opt) => {
              const selected = values[field.name] === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => selectOption(opt)}
                  disabled={loading}
                  style={{
                    background: selected ? "#C9A84C" : "#0D1B3E",
                    color: selected ? "#0D1B3E" : "#e8edf5",
                    border: `1px solid ${selected ? "#C9A84C" : "#1A3570"}`,
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <input
              ref={inputRef}
              type={field.type}
              value={values[field.name] || ""}
              onChange={(e) =>
                setValues((v) => ({ ...v, [field.name]: e.target.value }))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitTextStep();
                }
              }}
              placeholder={field.placeholder}
              pattern={field.pattern}
              disabled={loading}
              style={{
                background: "#0D1B3E",
                color: "#e8edf5",
                border: `1px solid ${isInvalid ? "#D94F3D" : "#1A3570"}`,
              }}
              className="w-full rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 disabled:opacity-60"
            />
            {isInvalid && (
              <p style={{ color: "#D94F3D" }} className="text-[11px] mt-1">
                Ce champ est obligatoire.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer — boutons */}
      <div className="flex items-center justify-between gap-3 mt-5 pt-4" style={{ borderTop: "1px solid #1A3570" }}>
        <button
          type="button"
          onClick={goBack}
          disabled={loading}
          style={{ color: "#8090A8" }}
          className="text-xs font-medium hover:text-white transition-colors disabled:opacity-50"
        >
          {step === 0 ? "× Annuler" : "← Précédent"}
        </button>

        {field.type !== "select" && (
          <button
            type="button"
            onClick={submitTextStep}
            disabled={loading}
            style={{ background: "#C9A84C", color: "#0D1B3E" }}
            className="px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Spinner /> Calcul…
              </>
            ) : isLast ? (
              <>Calculer mon estimation →</>
            ) : (
              <>Suivant →</>
            )}
          </button>
        )}
      </div>

      {/* Indicateur de fin si dernière question + select sans choix encore */}
      {isLast && field.type === "select" && !values[field.name] && (
        <p
          style={{ color: "#8090A8" }}
          className="text-[11px] mt-3 text-center"
        >
          Dernière question — clique sur une option pour recevoir ton estimation
        </p>
      )}

      {loading && (
        <div className="flex items-center justify-center gap-2 mt-4" style={{ color: "#C9A84C" }}>
          <Spinner />
          <span className="text-xs font-medium">ELIA calcule ton estimation…</span>
        </div>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M4 12a8 8 0 018-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
