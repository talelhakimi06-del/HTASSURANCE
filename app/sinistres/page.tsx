"use client";

import { useState } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────────────────────────────────── */

const WHATSAPP = "https://wa.me/33986113257?text=Bonjour%2C%20mon%20assurance%20a%20refus%C3%A9%20mon%20sinistre.%20Pouvez-vous%20m%27aider%20%3F";
const PHONE = "tel:+33986113257";

const NAVY = "#0f1f3d";
const AMBER = "#d4832a";
const CREAM = "#f5f0e8";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────── */

const sinistresTypes = [
  { icon: "💧", title: "Dégât des eaux", desc: "Fuite, infiltration, dommages voisins — refus classique sur vétusté ou défaut d'entretien." },
  { icon: "🔥", title: "Incendie", desc: "Sinistre total ou partiel — refus fréquent pour sous-évaluation ou exclusion contractuelle." },
  { icon: "🔒", title: "Vol / Cambriolage", desc: "Vol de véhicule, effraction domicile — contestation des moyens de protection." },
  { icon: "🌊", title: "Catastrophe naturelle", desc: "Inondation, sécheresse, fissures — refus lié à l'arrêté CatNat ou aux franchises." },
  { icon: "🏚️", title: "Fissures / Malfaçons", desc: "Fissures structurelles, désordres post-travaux — litige décennale ou dommages-ouvrage." },
  { icon: "🚗", title: "Accident auto", desc: "Sinistre auto, vol, bris de glace — contestation du taux de responsabilité." },
  { icon: "🏗️", title: "Dommages-ouvrage", desc: "Refus de garantie décennale, délai de réponse dépassé, vice caché." },
  { icon: "💼", title: "RC Professionnelle", desc: "Mise en cause professionnelle, erreur de conseil — refus de prise en charge." },
];

const steps = [
  { num: "01", title: "Soumettez votre dossier", desc: "Envoyez-nous votre lettre de refus, votre contrat et les pièces du sinistre.", color: AMBER },
  { num: "02", title: "Analyse sous 48h", desc: "Notre équipe analyse la légitimité du refus et identifie les failles juridiques.", color: NAVY },
  { num: "03", title: "Verdict clair", desc: "On vous dit franchement si votre dossier est contestable ou non. Pas de faux espoirs.", color: AMBER },
  { num: "04", title: "Accompagnement complet", desc: "Recours amiable, médiation, expertise contradictoire — on gère tout jusqu'au résultat.", color: NAVY },
];

const comparatif = [
  { critere: "Analyse initiale", avocat: "200-500€/h", expert: "500-1500€", ht: "Gratuite" },
  { critere: "Délai d'analyse", avocat: "2-4 semaines", expert: "1-3 semaines", ht: "48 heures" },
  { critere: "Connaissance assurance", avocat: "Variable", expert: "Technique seule", ht: "Expertise métier" },
  { critere: "Négociation assureur", avocat: "Contentieux long", expert: "Non inclus", ht: "Directe & rapide" },
  { critere: "Coût si échec", avocat: "Honoraires dus", expert: "Honoraires dus", ht: "0€" },
];

const diagnosticQuestions = [
  {
    question: "Quel type de sinistre avez-vous subi ?",
    options: ["Dégât des eaux", "Incendie", "Vol", "Catastrophe naturelle", "Fissures/Malfaçons", "Accident auto", "Autre"],
  },
  {
    question: "Quand le sinistre est-il survenu ?",
    options: ["Moins de 6 mois", "6 mois à 1 an", "1 à 2 ans", "Plus de 2 ans"],
  },
  {
    question: "Avez-vous reçu une lettre de refus écrite ?",
    options: ["Oui, par courrier", "Oui, par email", "Non, refus verbal uniquement", "Pas encore de réponse"],
  },
  {
    question: "Le motif de refus invoqué est :",
    options: ["Exclusion contractuelle", "Défaut d'entretien / vétusté", "Déclaration tardive", "Sous-évaluation / franchise", "Je ne comprends pas le motif", "Autre"],
  },
  {
    question: "Avez-vous des preuves (photos, factures, rapports) ?",
    options: ["Oui, dossier complet", "Quelques éléments", "Non, rien du tout"],
  },
];

const faqItems = [
  {
    q: "Mon assurance a refusé mon sinistre. Ai-je un recours ?",
    a: "Oui, dans la grande majorité des cas. Vous disposez d'un délai de 2 ans à compter du refus (article L114-1 du Code des assurances) pour contester. De nombreux refus reposent sur des interprétations abusives des clauses contractuelles.",
  },
  {
    q: "Combien coûte votre analyse de dossier ?",
    a: "L'analyse initiale est 100% gratuite et sans engagement. Nous vous donnons un avis honnête sous 48h. Si nous prenons votre dossier en charge, nos honoraires dépendent du résultat obtenu — si on ne récupère rien, vous ne payez rien.",
  },
  {
    q: "Quelle est la différence avec un avocat ?",
    a: "Un avocat intervient en contentieux, souvent long et coûteux. Nous intervenons en amont : négociation directe avec l'assureur, expertise contradictoire, médiation. 80% des dossiers se règlent sans procédure judiciaire, plus vite et à moindre coût.",
  },
  {
    q: "Quels documents dois-je fournir ?",
    a: "Au minimum : votre contrat d'assurance, la lettre de refus de l'assureur, et les justificatifs du sinistre (photos, factures, constats). Plus votre dossier est complet, plus notre analyse sera précise.",
  },
  {
    q: "Mon sinistre date de plus d'un an, est-il trop tard ?",
    a: "Pas forcément. Le délai légal de prescription est de 2 ans. Même au-delà, certains recours restent possibles selon les circonstances. Soumettez votre dossier, notre analyse vous le dira.",
  },
  {
    q: "Intervenez-vous partout en France ?",
    a: "Oui. Nous sommes basés à Nice mais nous traitons les dossiers de toute la France. L'essentiel se fait à distance : envoi de documents, échanges par téléphone et email.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   DIAGNOSTIC COMPONENT
───────────────────────────────────────────────────────────────────────── */

function DiagnosticWidget() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function handleAnswer(answer: string) {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step < diagnosticQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  }

  function getScore(): { score: number; verdict: string; detail: string } {
    let score = 0;

    // Type de sinistre — tous contestables
    score += 15;

    // Délai
    if (answers[1] === "Moins de 6 mois") score += 25;
    else if (answers[1] === "6 mois à 1 an") score += 20;
    else if (answers[1] === "1 à 2 ans") score += 10;
    else score += 0;

    // Lettre de refus
    if (answers[2]?.includes("courrier") || answers[2]?.includes("email")) score += 20;
    else if (answers[2]?.includes("verbal")) score += 10;
    else score += 15;

    // Motif
    if (answers[3]?.includes("comprends pas") || answers[3]?.includes("Exclusion")) score += 25;
    else if (answers[3]?.includes("Sous-évaluation") || answers[3]?.includes("Autre")) score += 20;
    else score += 15;

    // Preuves
    if (answers[4]?.includes("complet")) score += 15;
    else if (answers[4]?.includes("Quelques")) score += 10;
    else score += 5;

    if (score >= 75) return { score, verdict: "Dossier très contestable", detail: "Votre dossier présente des éléments solides. Nous avons de bonnes chances d'obtenir gain de cause." };
    if (score >= 50) return { score, verdict: "Dossier contestable", detail: "Des leviers existent pour contester ce refus. Une analyse approfondie permettra de confirmer." };
    return { score, verdict: "Analyse nécessaire", detail: "Votre situation nécessite un examen détaillé par nos experts. Soumettez votre dossier pour un diagnostic complet." };
  }

  function reset() {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  }

  if (showResult) {
    const { score, verdict, detail } = getScore();
    const barColor = score >= 75 ? "#22c55e" : score >= 50 ? AMBER : "#ef4444";

    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 48, fontWeight: 800, color: barColor, fontFamily: "'Playfair Display', serif" }}>
            {score}%
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: NAVY, marginTop: 8, fontFamily: "'Playfair Display', serif" }}>
            {verdict}
          </div>
        </div>

        <div style={{ background: "#e5e7eb", borderRadius: 999, height: 12, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ width: `${score}%`, height: "100%", background: barColor, borderRadius: 999, transition: "width 1s ease" }} />
        </div>

        <p style={{ color: "#475569", fontSize: 16, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
          {detail}
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#22c55e", color: "white", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}
          >
            💬 Soumettre mon dossier
          </a>
          <button
            onClick={reset}
            style={{ background: "transparent", border: `2px solid ${NAVY}`, color: NAVY, padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer" }}
          >
            Refaire le diagnostic
          </button>
        </div>
      </div>
    );
  }

  const q = diagnosticQuestions[step];

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {diagnosticQuestions.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 4,
              borderRadius: 999,
              background: i <= step ? AMBER : "#e2e8f0",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
        Question {step + 1} / {diagnosticQuestions.length}
      </p>

      <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 20, fontFamily: "'Playfair Display', serif" }}>
        {q.question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{
              textAlign: "left",
              padding: "14px 18px",
              borderRadius: 12,
              border: "2px solid #e2e8f0",
              background: "white",
              fontSize: 15,
              color: NAVY,
              cursor: "pointer",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = AMBER;
              e.currentTarget.style.background = "#fffbf5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.background = "white";
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────────────────────────────────── */

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {faqItems.map((item, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: 0,
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 600, color: NAVY, paddingRight: 16, lineHeight: 1.5 }}>
              {item.q}
            </span>
            <span
              style={{
                fontSize: 22,
                color: AMBER,
                flexShrink: 0,
                transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
                fontWeight: 300,
              }}
            >
              +
            </span>
          </button>
          <div
            style={{
              maxHeight: open === i ? 300 : 0,
              overflow: "hidden",
              transition: "max-height 0.3s ease",
            }}
          >
            <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.8, paddingBottom: 20 }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */

export default function SinistresPage() {
  return (
    <>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'DM Sans', sans-serif", color: NAVY, background: CREAM }}>

        {/* ══ NAVBAR ══════════════════════════════════════════════════════ */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            background: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ fontSize: 18, fontWeight: 800, color: NAVY, textDecoration: "none" }}>
              HT<span style={{ color: "#2563eb" }}> Assurance</span>
            </Link>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Link href="/" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>
                Accueil
              </Link>
              <Link href="/blog" style={{ fontSize: 14, color: "#64748b", textDecoration: "none", fontWeight: 500 }}>
                Blog
              </Link>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "#22c55e",
                  color: "white",
                  padding: "8px 18px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </nav>

        {/* ══ HERO ══════════════════════════════════════════════════════ */}
        <section
          style={{
            paddingTop: 140,
            paddingBottom: 80,
            background: `linear-gradient(135deg, ${NAVY} 0%, #1a2d52 100%)`,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent line */}
          <div style={{ width: 60, height: 4, background: AMBER, borderRadius: 999, margin: "0 auto 24px" }} />

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              maxWidth: 800,
              margin: "0 auto 20px",
              padding: "0 24px",
            }}
          >
            Votre assurance refuse{" "}
            <span style={{ color: AMBER }}>votre sinistre</span> ?
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#94a3b8",
              maxWidth: 600,
              margin: "0 auto 40px",
              lineHeight: 1.7,
              padding: "0 24px",
            }}
          >
            Ne restez pas seul face à un refus abusif. Notre équipe de courtiers experts analyse
            gratuitement votre dossier et conteste les décisions injustifiées.
          </p>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              flexWrap: "wrap",
              marginBottom: 48,
              padding: "0 24px",
            }}
          >
            {[
              { value: "2 ans", label: "Délai légal pour contester" },
              { value: "0€", label: "Si on ne gagne pas" },
              { value: "48h", label: "Analyse de votre dossier" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: AMBER, fontFamily: "'Playfair Display', serif" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", padding: "0 24px" }}>
            <a
              href="#diagnostic"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: AMBER,
                color: "white",
                padding: "16px 32px",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(212,131,42,0.4)",
              }}
            >
              Diagnostic gratuit →
            </a>
            <a
              href={PHONE}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.1)",
                color: "white",
                padding: "16px 32px",
                borderRadius: 14,
                fontWeight: 600,
                fontSize: 16,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              📞 09 86 11 32 57
            </a>
          </div>
        </section>

        {/* ══ TYPES DE SINISTRES ══════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
              Nos expertises
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              8 types de sinistres que nous contestons
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {sinistresTypes.map((s) => (
              <div
                key={s.title}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: 28,
                  border: "1px solid #e8e4de",
                  transition: "all 0.3s",
                  cursor: "default",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══ PROCESS ══════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", background: NAVY }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
                Comment ça marche
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: "white", marginTop: 12 }}>
                4 étapes vers votre indemnisation
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 24,
              }}
            >
              {steps.map((s) => (
                <div
                  key={s.num}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 16,
                    padding: 32,
                    border: "1px solid rgba(255,255,255,0.1)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: 40,
                      fontWeight: 800,
                      color: s.color,
                      fontFamily: "'Playfair Display', serif",
                      marginBottom: 16,
                      opacity: 0.8,
                    }}
                  >
                    {s.num}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", marginBottom: 8 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPARATIF ══════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
              Comparatif
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              Pourquoi nous plutôt qu&apos;un autre ?
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 15,
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <thead>
                <tr style={{ background: NAVY }}>
                  <th style={{ padding: "16px 20px", textAlign: "left", color: "white", fontWeight: 600 }}>Critère</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", color: "#94a3b8", fontWeight: 600 }}>Avocat</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", color: "#94a3b8", fontWeight: 600 }}>Expert bâtiment</th>
                  <th style={{ padding: "16px 20px", textAlign: "center", color: AMBER, fontWeight: 700 }}>HT Assurance</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, color: NAVY }}>{row.critere}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", color: "#64748b" }}>{row.avocat}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", color: "#64748b" }}>{row.expert}</td>
                    <td style={{ padding: "14px 20px", textAlign: "center", color: AMBER, fontWeight: 700 }}>{row.ht}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══ DIAGNOSTIC ══════════════════════════════════════════════════ */}
        <section
          id="diagnostic"
          style={{
            padding: "80px 24px",
            background: `linear-gradient(135deg, ${NAVY} 0%, #1a2d52 100%)`,
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
                Diagnostic gratuit
              </span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 700, color: "white", marginTop: 12 }}>
                Votre dossier est-il contestable ?
              </h2>
              <p style={{ color: "#94a3b8", marginTop: 12, lineHeight: 1.7 }}>
                Répondez à 5 questions simples — résultat immédiat.
              </p>
            </div>

            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: "36px 32px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
              }}
            >
              <DiagnosticWidget />
            </div>
          </div>
        </section>

        {/* ══ FAQ ══════════════════════════════════════════════════════════ */}
        <section style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: AMBER, textTransform: "uppercase" }}>
              Questions fréquentes
            </span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, color: NAVY, marginTop: 12 }}>
              Tout savoir sur le recours sinistre
            </h2>
          </div>

          <FaqAccordion />
        </section>

        {/* ══ CTA FINAL ═══════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "80px 24px",
            background: NAVY,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(26px, 4vw, 38px)",
                fontWeight: 700,
                color: "white",
                marginBottom: 16,
                lineHeight: 1.25,
              }}
            >
              Ne laissez pas votre assureur{" "}
              <span style={{ color: AMBER }}>gagner</span>
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, marginBottom: 40 }}>
              Chaque jour qui passe réduit vos chances. Contactez-nous maintenant — l&apos;analyse est gratuite.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#22c55e",
                  color: "white",
                  padding: "18px 36px",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: 17,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
                }}
              >
                💬 Envoyer mon dossier sur WhatsApp
              </a>
              <a
                href={PHONE}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  padding: "18px 36px",
                  borderRadius: 14,
                  fontWeight: 600,
                  fontSize: 17,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                📞 Nous appeler
              </a>
            </div>
          </div>
        </section>

        {/* ══ FOOTER ══════════════════════════════════════════════════════ */}
        <footer style={{ background: "#0a1628", padding: "40px 24px", textAlign: "center" }}>
          <p style={{ color: "#64748b", fontSize: 13 }}>
            © {new Date().getFullYear()} HT Assurance — Cabinet de courtage en assurance — Nice, France
          </p>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>
            <Link href="/" style={{ color: "#475569", textDecoration: "none" }}>Accueil</Link>
            {" · "}
            <Link href="/blog" style={{ color: "#475569", textDecoration: "none" }}>Blog</Link>
            {" · "}
            <Link href="/comparateur" style={{ color: "#475569", textDecoration: "none" }}>Comparateur IA</Link>
          </p>
        </footer>
      </div>
    </>
  );
}
