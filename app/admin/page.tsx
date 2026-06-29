"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────
   PALETTE
───────────────────────────────────────────────────────────── */
const NAVY = "#0f1f3d";
const AMBER = "#d4832a";

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Metrics = {
  leadsToday: number;
  leadsDelta: number;
  articlesTotal: number;
  articlesNewToday: number;
  emailsProcessed: number;
  avgResponseTime: string;
  dossiersAPrendre: number;
  scoreMoyen: number;
};

type Agent = { name: string; status: "ok" | "warning" | "error"; lastRun: string; actionsToday: number };
type Lead = { id: string; nom: string; email: string; telephone: string; type: string; motif?: string; score?: number; verdict?: string; enjeu?: string; date: string };
type Email = { from: string; subject: string; status: "traite" | "ignore" | "urgent"; date: string };
type Article = { title: string; slug: string; date: string };
type Log = { time: string; level: "ok" | "warning" | "info"; message: string };

type DashboardData = {
  metrics: Metrics;
  agents: Agent[];
  leads: Lead[];
  emails: Email[];
  articles: Article[];
  logs: Log[];
};

/* ─────────────────────────────────────────────────────────────
   LOGIN SCREEN
───────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: (pwd: string) => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pwd.trim()) { setError(true); return; }
    onLogin(pwd);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: NAVY, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <form onSubmit={handleSubmit} style={{ background: "white", borderRadius: 20, padding: "48px 40px", width: 380, boxShadow: "0 8px 40px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🛡️</div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: NAVY, margin: 0 }}>BackOffice ELIA</h1>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 6 }}>HT Assurance — Admin</p>
        </div>
        <input
          type="password"
          value={pwd}
          onChange={(e) => { setPwd(e.target.value); setError(false); }}
          placeholder="Mot de passe admin"
          style={{
            width: "100%", padding: "14px 16px", borderRadius: 12,
            border: error ? "2px solid #ef4444" : "2px solid #e2e8f0",
            fontSize: 15, outline: "none", boxSizing: "border-box",
          }}
        />
        {error && <p style={{ color: "#ef4444", fontSize: 13, margin: "8px 0 0" }}>Mot de passe requis</p>}
        <button
          type="submit"
          style={{
            width: "100%", marginTop: 16, padding: "14px",
            background: NAVY, color: "white", border: "none",
            borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer",
          }}
        >
          Connexion
        </button>
      </form>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────── */
function MetricCard({ label, value, delta, suffix }: { label: string; value: number | string; delta?: number; suffix?: string }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px 20px", border: "1px solid #e8e4de", flex: "1 1 220px" }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>{label}</p>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 8 }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: NAVY }}>{value}</span>
        {suffix && <span style={{ fontSize: 14, color: "#64748b" }}>{suffix}</span>}
        {delta !== undefined && (
          <span style={{ fontSize: 13, fontWeight: 700, color: delta >= 0 ? "#22c55e" : "#ef4444", marginLeft: 4 }}>
            {delta >= 0 ? "+" : ""}{delta}
          </span>
        )}
      </div>
    </div>
  );
}

function AgentDot({ status }: { status: string }) {
  const color = status === "ok" ? "#22c55e" : status === "warning" ? AMBER : "#ef4444";
  return <span style={{ display: "inline-block", width: 10, height: 10, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 7 ? "#22c55e" : score >= 5 ? AMBER : "#ef4444";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: 10, background: color + "18", color, fontWeight: 800, fontSize: 15 }}>
      {score}
    </span>
  );
}

function VerdictBadge({ verdict }: { verdict: string }) {
  const v = verdict.toLowerCase();
  const color = v.includes("prendre") ? "#22c55e" : v.includes("etudier") ? AMBER : "#ef4444";
  const bg = color + "15";
  return <span style={{ padding: "4px 10px", borderRadius: 8, background: bg, color, fontSize: 12, fontWeight: 700 }}>{verdict}</span>;
}

function EmailStatus({ status }: { status: string }) {
  const map: Record<string, { color: string; label: string }> = {
    traite: { color: "#22c55e", label: "Traite" },
    urgent: { color: "#ef4444", label: "Urgent" },
    ignore: { color: "#94a3b8", label: "Ignore" },
  };
  const s = map[status] ?? map.ignore;
  return <span style={{ padding: "4px 10px", borderRadius: 8, background: s.color + "15", color: s.color, fontSize: 12, fontWeight: 700 }}>{s.label}</span>;
}

function LogLine({ log }: { log: Log }) {
  const color = log.level === "ok" ? "#22c55e" : log.level === "warning" ? AMBER : "#94a3b8";
  const time = new Date(log.time).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace", flexShrink: 0, marginTop: 2 }}>{time}</span>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 5 }} />
      <span style={{ color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 }}>{log.message}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY, margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>{children}</h2>;
}

/* ─────────────────────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────────────────────── */
function Dashboard({ password }: { password: string }) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin?pwd=${encodeURIComponent(password)}`);
      if (res.status === 401) { setError("Mot de passe incorrect"); return; }
      if (!res.ok) throw new Error("Erreur API");
      const json = await res.json();
      setData(json);
      setError(null);
      setLastRefresh(new Date());
    } catch {
      setError("Impossible de charger les donnees");
    }
  }, [password]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (error === "Mot de passe incorrect") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fef2f2" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 48 }}>🔒</p>
          <p style={{ color: "#ef4444", fontWeight: 700, fontSize: 18 }}>Mot de passe incorrect</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: 16, padding: "10px 24px", background: NAVY, color: "white", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 600 }}>
            Reessayer
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f0e8" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: `3px solid ${NAVY}`, borderTopColor: AMBER, borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: NAVY, fontWeight: 600 }}>Chargement du dashboard...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    );
  }

  const m = data.metrics;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0e8", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* ── Header ── */}
      <header style={{ background: NAVY, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>🛡️</span>
          <div>
            <h1 style={{ color: "white", fontSize: 16, fontWeight: 800, margin: 0 }}>BackOffice ELIA</h1>
            <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>HT Assurance — Dashboard</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "#64748b", fontSize: 12 }}>
            Maj: {lastRefresh.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" }} />
          <Link href="/" style={{ color: "#64748b", fontSize: 13, textDecoration: "none" }}>← Site</Link>
          <style>{`@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }`}</style>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px" }}>
        {/* ── 1. METRICS ── */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
          <MetricCard label="Leads aujourd'hui" value={m.leadsToday} delta={m.leadsDelta} />
          <MetricCard label="Articles publies" value={m.articlesTotal} delta={m.articlesNewToday} suffix="total" />
          <MetricCard label="Emails traites" value={m.emailsProcessed} suffix={`moy. ${m.avgResponseTime}`} />
          <MetricCard label="Dossiers a prendre" value={m.dossiersAPrendre} suffix={`score ${m.scoreMoyen}/10`} />
        </div>

        {/* ── 2. AGENTS ── */}
        <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #e8e4de", marginBottom: 28 }}>
          <SectionTitle>🤖 Statut des agents</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {data.agents.map((a) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "#f8fafc", borderRadius: 12, border: "1px solid #f1f5f9" }}>
                <AgentDot status={a.status} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</p>
                  <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{a.actionsToday} actions</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
          {/* ── 3. LEADS ── */}
          <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #e8e4de", gridColumn: window.innerWidth < 768 ? "1 / -1" : undefined }}>
            <SectionTitle>📋 Derniers leads qualifies</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {data.leads.map((l) => (
                <div key={l.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f8fafc", borderRadius: 12, border: "1px solid #f1f5f9" }}>
                  <ScoreBadge score={l.score ?? 0} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, margin: 0 }}>{l.nom}</p>
                    <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 0" }}>
                      {l.type} {l.motif ? `— ${l.motif}` : ""} {l.enjeu ? `— ${l.enjeu}` : ""}
                    </p>
                  </div>
                  <VerdictBadge verdict={l.verdict ?? "?"} />
                </div>
              ))}
            </div>
          </div>

          {/* ── 4. EMAILS ── */}
          <div style={{ background: "white", borderRadius: 16, padding: 24, border: "1px solid #e8e4de" }}>
            <SectionTitle>📧 Emails traites</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.emails.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#f8fafc", borderRadius: 12, border: "1px solid #f1f5f9" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.from}</p>
                    <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{e.subject}</p>
                  </div>
                  <EmailStatus status={e.status} />
                </div>
              ))}
            </div>

            {/* ── 5. ARTICLES ── */}
            <div style={{ marginTop: 24 }}>
              <SectionTitle>📝 Articles recents</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {data.articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#f8fafc", borderRadius: 10, border: "1px solid #f1f5f9", textDecoration: "none", fontSize: 13 }}
                  >
                    <span style={{ color: NAVY, fontWeight: 600, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</span>
                    <span style={{ color: "#94a3b8", fontSize: 11, flexShrink: 0, marginLeft: 8 }}>{a.date}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 6. JOURNAL ── */}
        <div style={{ background: NAVY, borderRadius: 16, padding: 24, marginBottom: 40 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "white", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
            📜 Journal d&apos;activite
          </h2>
          <div>
            {data.logs.map((log, i) => (
              <LogLine key={i} log={log} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);

  if (!password) return <LoginScreen onLogin={setPassword} />;
  return <Dashboard password={password} />;
}
