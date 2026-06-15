"use client";

import { useState } from "react";
import type { ProductForm, FormField } from "../_lib/forms";

/* ─────────────────────────────────────────────────────────────────────
   Carte formulaire affichée DANS le chat ELIA — affiche tous les champs
   du produit d'un coup et délègue la soumission au parent.
───────────────────────────────────────────────────────────────────── */

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%238090A8' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E\")";

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
  const initial = Object.fromEntries(form.fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function update(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched: Record<string, boolean> = {};
    form.fields.forEach((f) => (allTouched[f.name] = true));
    setTouched(allTouched);

    const missing = form.fields.find(
      (f) => f.required && !values[f.name]?.trim()
    );
    if (missing) {
      const el = document.getElementById(`pf-${missing.name}`);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    onSubmit(values);
  }

  return (
    <div
      style={{ background: "#0D2456", border: "1px solid #C9A84C" }}
      className="rounded-2xl p-5 mx-4 my-2 animate-fade-in"
    >
      <header className="mb-4">
        <p
          style={{ color: "#C9A84C" }}
          className="text-xs font-bold tracking-widest uppercase"
        >
          ⚡ Mode rapide — {form.emoji} {form.title}
        </p>
        <p style={{ color: "#8090A8" }} className="text-sm mt-1.5">
          {form.subtitle}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {form.fields.map((field) => (
          <FieldRow
            key={field.name}
            field={field}
            value={values[field.name]}
            touched={touched[field.name]}
            onChange={(v) => update(field.name, v)}
          />
        ))}

        <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            style={{ background: "#1A3570", color: "#8090A8" }}
            className="sm:flex-shrink-0 py-2.5 px-5 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{ background: "#C9A84C", color: "#0D1B3E" }}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Spinner /> Calcul de mon estimation…
              </>
            ) : (
              <>Calculer mon estimation →</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function FieldRow({
  field,
  value,
  touched,
  onChange,
}: {
  field: FormField;
  value: string;
  touched: boolean;
  onChange: (v: string) => void;
}) {
  const id = `pf-${field.name}`;
  const isInvalid = touched && field.required && !value?.trim();

  const baseClass =
    "w-full rounded-xl px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2";
  const fieldStyle = {
    background: "#0D1B3E",
    color: "#e8edf5",
    border: `1px solid ${isInvalid ? "#D94F3D" : "#1A3570"}`,
  };

  return (
    <div>
      <label
        htmlFor={id}
        style={{ color: "#e8edf5" }}
        className="block text-xs font-semibold mb-1.5"
      >
        {field.label}
        {field.required && (
          <span style={{ color: "#C9A84C" }} className="ml-1">
            *
          </span>
        )}
      </label>

      {field.type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
          style={{
            ...fieldStyle,
            backgroundImage: SELECT_CHEVRON,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 12px center",
            backgroundSize: "16px 16px",
            appearance: "none",
            paddingRight: "36px",
          }}
          className={baseClass}
        >
          <option value="" disabled>
            Sélectionne…
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          required={field.required}
          pattern={field.pattern}
          style={fieldStyle}
          className={baseClass}
        />
      )}

      {field.helper && (
        <p style={{ color: "#8090A8" }} className="text-[11px] mt-1 leading-relaxed">
          {field.helper}
        </p>
      )}
      {isInvalid && (
        <p style={{ color: "#D94F3D" }} className="text-[11px] mt-1">
          Ce champ est obligatoire.
        </p>
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
