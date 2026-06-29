"use client";

import Link from "next/link";

const NAVY = "#0f1f3d";
const AMBER = "#d4832a";
const CREAM = "#f5f0e8";
const WA = "https://wa.me/33986113257?text=Bonjour%2C%20je%20viens%20du%20comparateur%20ChatGPT%20ELIA.";
const GPT_URL = "https://chatgpt.com/g/g-69c09c28d0088191a66cd4f392010a7f";

const features = [
  { icon: "🏠", title: "Habitation", desc: "Locataire, propriétaire, copropriétaire — comparez les meilleures offres MRH en 30 secondes." },
  { icon: "🚗", title: "Auto", desc: "Tiers, intermédiaire, tous risques — trouvez la formule idéale pour votre véhicule et votre budget." },
  { icon: "🏥", title: "Santé", desc: "Mutuelle individuelle, famille, TNS Madelin — comparez les remboursements poste par poste." },
];

const steps = [
  { num: "1", title: "Posez votre question", desc: "Dites à ELIA ce que vous cherchez : type d'assurance, profil, budget." },
  { num: "2", title: "ELIA analyse le marché", desc: "En quelques secondes, ELIA compare les offres de 10+ assureurs français et génère un tableau comparatif." },
  { num: "3", title: "Obtenez votre devis", desc: "Talel, votre courtier indépendant, affine l'offre et négocie pour vous. Rappel sous 24h." },
];

export default function GptComparateurPage() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, background: CREAM }}>
        {/* Nav */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ fontSize: 18, fontWeight: 800, color: NAVY, textDecoration: "none" }}>
              HT<span style={{ color: "#2563eb" }}> Assurance</span>
            </Link>
            <div style={{ display: "flex", gap: 12 }}>
              <Link href="/sinistres" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>Sinistres</Link>
              <Link href="/blog" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>Blog</Link>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={{ background: "#22c55e", color: "white", padding: "8px 16px", borderRadius: 10, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>💬 WhatsApp</a>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ paddingTop: 140, paddingBottom: 80, background: `linear-gradient(135deg, ${NAVY} 0%, #1a2d52 100%)`, textAlign: "center" }}>
          <div style={{ width: 60, height: 4, background: AMBER, borderRadius: 999, margin: "0 auto 24px" }} />
          <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "white", lineHeight: 1.15, maxWidth: 750, margin: "0 auto 20px", padding: "0 24px" }}>
            ELIA sur <span style={{ color: AMBER }}>ChatGPT</span> — Comparez vos assurances en 2 minutes
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#94a3b8", maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.7, padding: "0 24px" }}>
            Le premier comparateur d&apos;assurances français directement dans ChatGPT. Propulsé par HT Assurance, courtier indépendant à Nice.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", padding: "0 24px" }}>
            <a href={GPT_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: "white", padding: "16px 32px", borderRadius: 14, fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 4px 20px rgba(212,131,42,0.4)" }}>
              🚀 Accéder au comparateur ChatGPT
            </a>
            <Link href="/comparateur" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "white", padding: "16px 32px", borderRadius: 14, fontWeight: 600, fontSize: 16, textDecoration: "none", border: "1px solid rgba(255,255,255,0.2)" }}>
              Comparer sur le site →
            </Link>
          </div>
        </section>

        {/* 3 blocs */}
        <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>Comparez tout</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              3 types d&apos;assurance, 10+ assureurs, 1 seule conversation
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} style={{ background: "white", borderRadius: 16, padding: 32, border: "1px solid #e8e4de", textAlign: "center" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: NAVY, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comment ça marche */}
        <section style={{ padding: "80px 24px", background: NAVY }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>Comment ça marche</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "white", marginTop: 12 }}>
                3 étapes, 2 minutes, 0 engagement
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
              {steps.map((s) => (
                <div key={s.num} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 32, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: AMBER, fontFamily: "'Playfair Display', serif", marginBottom: 12 }}>{s.num}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section style={{ padding: "80px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: NAVY, marginBottom: 16 }}>
              Prêt à <span style={{ color: AMBER }}>comparer</span> ?
            </h2>
            <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              Ouvrez ChatGPT, posez votre question à ELIA, et obtenez un comparatif personnalisé en quelques secondes.
            </p>
            <a href={GPT_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: AMBER, color: "white", padding: "18px 36px", borderRadius: 14, fontWeight: 700, fontSize: 17, textDecoration: "none", boxShadow: "0 4px 20px rgba(212,131,42,0.4)" }}>
              🚀 Lancer ELIA sur ChatGPT
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: "#0a1628", padding: "40px 24px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            © {new Date().getFullYear()} HT Assurance — Cabinet de courtage — Nice, France
          </p>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>
            <Link href="/" style={{ color: "#475569", textDecoration: "none" }}>Accueil</Link>
            {" · "}
            <Link href="/sinistres" style={{ color: "#475569", textDecoration: "none" }}>Sinistres</Link>
            {" · "}
            <Link href="/blog" style={{ color: "#475569", textDecoration: "none" }}>Blog</Link>
            {" · "}
            <Link href="/comparateur" style={{ color: "#475569", textDecoration: "none" }}>Comparateur</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
