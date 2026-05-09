"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import type { Period, SeoStats, Row } from "@/lib/searchConsole";

type SortKey = "clicks" | "impressions" | "ctr" | "position";

const NUMBER_FR = new Intl.NumberFormat("fr-FR");

function fmt(n: number) {
  return NUMBER_FR.format(Math.round(n));
}
function fmtPct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}
function fmtPos(n: number) {
  return n > 0 ? n.toFixed(1) : "—";
}

const PERIODS: { value: Period; label: string }[] = [
  { value: "7d", label: "7 jours" },
  { value: "30d", label: "30 jours" },
  { value: "90d", label: "90 jours" },
];

export default function SeoDashboard({
  initialStats,
  initialPeriod,
}: {
  initialStats: SeoStats;
  initialPeriod: Period;
}) {
  const router = useRouter();
  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [sortQ, setSortQ] = useState<SortKey>("clicks");
  const [sortP, setSortP] = useState<SortKey>("clicks");

  const queries = useMemo(
    () => [...initialStats.topQueries].sort((a, b) => b[sortQ] - a[sortQ]).slice(0, 20),
    [initialStats.topQueries, sortQ]
  );
  const pages = useMemo(
    () => [...initialStats.topPages].sort((a, b) => b[sortP] - a[sortP]).slice(0, 20),
    [initialStats.topPages, sortP]
  );

  function handlePeriod(next: Period) {
    setPeriod(next);
    router.push(`/admin/seo?period=${next}`);
  }

  function logout() {
    fetch("/api/admin/login", { method: "DELETE" }).then(() => router.push("/"));
  }

  function exportCsv() {
    const rows = [
      ["Type", "Clé", "Clics", "Impressions", "CTR", "Position"],
      ...queries.map((r) => ["Requête", r.key, r.clicks, r.impressions, fmtPct(r.ctr), fmtPos(r.position)]),
      ...pages.map((r) => ["Page", r.key, r.clicks, r.impressions, fmtPct(r.ctr), fmtPos(r.position)]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `seo-stats-${period}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  if (initialStats.error) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Dashboard SEO</h1>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
            <p className="font-bold mb-2">Search Console API non configurée</p>
            <p className="leading-relaxed">{initialStats.error}</p>
            <p className="mt-3">
              Voir <a href="/docs/setup-search-console-api.md" className="underline">docs/setup-search-console-api.md</a> pour
              activer l&apos;API et configurer la variable <code className="bg-amber-100 px-1.5 py-0.5 rounded">GOOGLE_SERVICE_ACCOUNT_JSON</code>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold text-slate-900">
            Dashboard SEO <span className="text-slate-400 font-normal">— Search Console</span>
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={exportCsv} className="text-sm text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline">
              Exporter CSV
            </button>
            <button onClick={logout} className="text-sm text-slate-600 hover:text-slate-900 underline-offset-2 hover:underline">
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Filtres */}
        <div className="flex items-center gap-2">
          {PERIODS.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePeriod(p.value)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                period === p.value
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {p.label}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-3">
            Données mises à jour {new Date(initialStats.fetchedAt).toLocaleString("fr-FR")}
          </span>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Clics totaux" value={fmt(initialStats.totals.clicks)} />
          <Kpi label="Impressions" value={fmt(initialStats.totals.impressions)} />
          <Kpi label="CTR moyen" value={fmtPct(initialStats.totals.ctr)} />
          <Kpi label="Position moyenne" value={fmtPos(initialStats.totals.position)} />
        </div>

        {/* Graphique */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">
            Évolution
          </h2>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <LineChart data={initialStats.evolution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  name="Clics"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="impressions"
                  name="Impressions"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Top queries + Top pages */}
        <div className="grid lg:grid-cols-2 gap-6">
          <DataTable
            title="Top 20 requêtes"
            rows={queries}
            sortBy={sortQ}
            onSort={setSortQ}
          />
          <DataTable
            title="Top 20 pages"
            rows={pages}
            sortBy={sortP}
            onSort={setSortP}
          />
        </div>
      </main>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        {label}
      </p>
      <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">{value}</p>
    </div>
  );
}

function DataTable({
  title,
  rows,
  sortBy,
  onSort,
}: {
  title: string;
  rows: Row[];
  sortBy: SortKey;
  onSort: (k: SortKey) => void;
}) {
  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">{title}</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 bg-slate-50">
              <th className="px-4 py-2 text-left font-semibold">Clé</th>
              <Th label="Clics" k="clicks" sortBy={sortBy} onSort={onSort} />
              <Th label="Impr." k="impressions" sortBy={sortBy} onSort={onSort} />
              <Th label="CTR" k="ctr" sortBy={sortBy} onSort={onSort} />
              <Th label="Pos." k="position" sortBy={sortBy} onSort={onSort} />
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-400">
                  Aucune donnée pour cette période.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.key} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-2 max-w-xs truncate text-slate-700" title={r.key}>
                    {r.key}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums font-semibold text-slate-900">{fmt(r.clicks)}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-slate-600">{fmt(r.impressions)}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-slate-600">{fmtPct(r.ctr)}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-slate-600">{fmtPos(r.position)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({
  label,
  k,
  sortBy,
  onSort,
}: {
  label: string;
  k: SortKey;
  sortBy: SortKey;
  onSort: (k: SortKey) => void;
}) {
  const active = sortBy === k;
  return (
    <th className="px-4 py-2 text-right font-semibold">
      <button
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-1 ${active ? "text-slate-900" : "hover:text-slate-700"}`}
      >
        {label}
        {active && <span aria-hidden>↓</span>}
      </button>
    </th>
  );
}
