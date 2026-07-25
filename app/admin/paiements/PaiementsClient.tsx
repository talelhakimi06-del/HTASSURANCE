"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   Outil staff : créer une facture Stripe (envoyée par email au
   client) ou générer un lien de paiement pour un montant libre.

   Accès protégé par le middleware (cookie ht-admin-auth). Les appels
   API partent en same-origin, le cookie est donc transmis
   automatiquement.
───────────────────────────────────────────────────────────── */

const NAVY = "#0f1f3d";
const AMBER = "#d4832a";

type Tab = "facture" | "lien";

type InvoiceResult = {
  success: true;
  number: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  sent: boolean;
};

type LinkResult = { success: true; url: string; description: string };

export default function PaiementsClient() {
  const [tab, setTab] = useState<Tab>("facture");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f0e8",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}
    >
      <header
        style={{
          background: NAVY,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>💳</span>
          <div>
            <h1 style={{ color: "white", fontSize: 16, fontWeight: 800, margin: 0 }}>
              Paiements &amp; Factures
            </h1>
            <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>
              HT Assurance — Stripe
            </p>
          </div>
        </div>
        <Link href="/admin/seo" style={{ color: "#94a3b8", fontSize: 13, textDecoration: "none" }}>
          ← Admin
        </Link>
      </header>

      <main style={{ maxWidth: 620, margin: "0 auto", padding: "28px 20px" }}>
        {/* Onglets */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <TabButton active={tab === "facture"} onClick={() => setTab("facture")}>
            🧾 Facture
          </TabButton>
          <TabButton active={tab === "lien"} onClick={() => setTab("lien")}>
            🔗 Lien de paiement
          </TabButton>
        </div>

        {tab === "facture" ? <InvoiceForm /> : <LinkForm />}
      </main>
    </div>
  );
}

/* ── Onglet ────────────────────────────────────────────────── */
function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: 12,
        border: active ? `2px solid ${NAVY}` : "2px solid #e2e8f0",
        background: active ? NAVY : "white",
        color: active ? "white" : "#64748b",
        fontSize: 14,
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* ── Champs réutilisables ──────────────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "2px solid #e2e8f0",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: NAVY,
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};
const cardStyle: React.CSSProperties = {
  background: "white",
  borderRadius: 16,
  padding: 24,
  border: "1px solid #e8e4de",
};

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{
        width: "100%",
        marginTop: 8,
        padding: "14px",
        background: loading ? "#94a3b8" : AMBER,
        color: "white",
        border: "none",
        borderRadius: 12,
        fontSize: 15,
        fontWeight: 700,
        cursor: loading ? "default" : "pointer",
      }}
    >
      {loading ? "En cours…" : label}
    </button>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return (
    <div
      style={{
        marginTop: 16,
        background: "#fef2f2",
        border: "1px solid #fecaca",
        borderRadius: 12,
        padding: "12px 14px",
        color: "#b91c1c",
        fontSize: 13,
      }}
    >
      {msg}
    </div>
  );
}

function CopyLink({ url, label }: { url: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: NAVY,
          fontWeight: 700,
          fontSize: 13,
          wordBreak: "break-all",
          flex: 1,
          minWidth: 200,
        }}
      >
        {label}
      </a>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        style={{
          padding: "8px 14px",
          borderRadius: 10,
          border: `1px solid ${NAVY}`,
          background: copied ? "#dcfce7" : "white",
          color: NAVY,
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {copied ? "Copié ✓" : "Copier"}
      </button>
    </div>
  );
}

/* ── Formulaire Facture ────────────────────────────────────── */
function InvoiceForm() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [amountEuros, setAmountEuros] = useState("");
  const [tvaRate, setTvaRate] = useState("0");
  const [dueDays, setDueDays] = useState("30");
  const [sendNow, setSendNow] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvoiceResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/stripe/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientEmail,
          description,
          amountEuros,
          tvaRate: Number(tvaRate),
          dueDays: Number(dueDays),
          sendNow,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Erreur");
      setResult(json as InvoiceResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px" }}>
          <label style={labelStyle}>Nom du client</label>
          <input
            style={inputStyle}
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Dupont SARL"
          />
        </div>
        <div style={{ flex: "1 1 240px" }}>
          <label style={labelStyle}>Email client *</label>
          <input
            style={inputStyle}
            type="email"
            required
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="client@exemple.fr"
          />
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <label style={labelStyle}>Description *</label>
        <input
          style={inputStyle}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Frais de dossier — contrat auto"
        />
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
        <div style={{ flex: "1 1 140px" }}>
          <label style={labelStyle}>Montant HT (€) *</label>
          <input
            style={inputStyle}
            required
            inputMode="decimal"
            value={amountEuros}
            onChange={(e) => setAmountEuros(e.target.value)}
            placeholder="150"
          />
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <label style={labelStyle}>TVA</label>
          <select
            style={inputStyle}
            value={tvaRate}
            onChange={(e) => setTvaRate(e.target.value)}
          >
            <option value="0">Exonérée (assurance)</option>
            <option value="20">20 %</option>
            <option value="10">10 %</option>
            <option value="5.5">5,5 %</option>
          </select>
        </div>
        <div style={{ flex: "1 1 120px" }}>
          <label style={labelStyle}>Échéance (jours)</label>
          <input
            style={inputStyle}
            inputMode="numeric"
            value={dueDays}
            onChange={(e) => setDueDays(e.target.value)}
            placeholder="30"
          />
        </div>
      </div>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: 16,
          fontSize: 13,
          color: NAVY,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={sendNow}
          onChange={(e) => setSendNow(e.target.checked)}
        />
        Envoyer la facture par email immédiatement
      </label>

      <SubmitButton loading={loading} label="Créer la facture" />

      {error && <ErrorBox msg={error} />}

      {result && (
        <div
          style={{
            marginTop: 16,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#166534", fontSize: 14 }}>
            ✓ Facture {result.number ?? ""} créée{result.sent ? " et envoyée" : ""}
          </p>
          {result.hostedInvoiceUrl && (
            <div style={{ marginBottom: 8 }}>
              <CopyLink url={result.hostedInvoiceUrl} label="Page de paiement (client)" />
            </div>
          )}
          {result.invoicePdf && (
            <a
              href={result.invoicePdf}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: NAVY, fontWeight: 700, fontSize: 13 }}
            >
              📄 Télécharger le PDF
            </a>
          )}
        </div>
      )}
    </form>
  );
}

/* ── Formulaire Lien de paiement ───────────────────────────── */
function LinkForm() {
  const [description, setDescription] = useState("");
  const [amountEuros, setAmountEuros] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LinkResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/stripe/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, amountEuros }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Erreur");
      setResult(json as LinkResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={cardStyle}>
      <div>
        <label style={labelStyle}>Description *</label>
        <input
          style={inputStyle}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Frais de dossier — contrat habitation"
        />
      </div>
      <div style={{ marginTop: 14 }}>
        <label style={labelStyle}>Montant (€) *</label>
        <input
          style={inputStyle}
          required
          inputMode="decimal"
          value={amountEuros}
          onChange={(e) => setAmountEuros(e.target.value)}
          placeholder="150"
        />
      </div>

      <SubmitButton loading={loading} label="Générer le lien" />

      {error && <ErrorBox msg={error} />}

      {result && (
        <div
          style={{
            marginTop: 16,
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            padding: 16,
          }}
        >
          <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#166534", fontSize: 14 }}>
            ✓ Lien de paiement prêt — à envoyer au client
          </p>
          <CopyLink url={result.url} label={result.url} />
        </div>
      )}
    </form>
  );
}
