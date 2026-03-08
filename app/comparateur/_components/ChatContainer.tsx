"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Message, AppMode, Lead, ConversationPhase, LeadReady, SiretData } from "../_lib/types";
import { genId } from "../_lib/utils";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import LeadFormModal from "./LeadFormModal";
import ModeToggle from "./ModeToggle";

const PHONE = "0986113257";
const WHATSAPP = "https://wa.me/33986113257?text=Bonjour%2C%20je%20souhaite%20un%20devis%20assurance";
const SIRET_RE = /\b(\d{14}|\d{9})\b/;
// Plaque SIV AA-123-BB (avec ou sans tirets) ou ancien format 123AB75
const PLATE_RE = /\b([A-Za-z]{2}[-\s]?\d{3}[-\s]?[A-Za-z]{2}|\d{1,4}[A-Za-z]{2,3}\d{2})\b/i;

const GREETING_COMPARISON = `Bonjour 👋 Je suis ELIA, l'assistant IA de HT Assurance.

Je vais te poser quelques questions pour te proposer les meilleures offres adaptées à ton profil.

Quel type d'assurance recherches-tu ?`;

const GREETING_ASSISTANT = `Bonjour 👋 Bienvenue dans ton espace HT Assurance.

Je suis là pour répondre à toutes tes questions sur tes contrats : garanties, exclusions, sinistres…

Comment puis-je t'aider ?`;

function makeGreetingMessage(mode: AppMode): Message {
  const isComparison = mode === "comparison";
  return {
    id: genId(),
    role: "assistant",
    content: isComparison ? GREETING_COMPARISON : GREETING_ASSISTANT,
    timestamp: new Date(),
    quickReplies: isComparison
      ? ["Assurance auto", "Assurance habitation", "RC Pro / Freelance", "Décennale BTP", "Assurance VTC", "Assurance emprunteur", "Autre"]
      : ["Mes garanties", "Déclarer un sinistre", "Contacter mon courtier"],
    phase: isComparison ? "insurance_type" : "assistant_idle",
  };
}

/* ── AutoFillCard SIRET ───────────────────────────────────────────────────── */
function AutoFillCard({ data, onConfirm, onDismiss }: {
  data: SiretData;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  const anciennete = data.dateCreation
    ? new Date().getFullYear() - new Date(data.dateCreation).getFullYear()
    : null;

  return (
    <div style={{ background: "#0D2456", border: "1px solid #C9A84C" }}
      className="rounded-2xl p-4 mx-4 my-2 animate-fade-in">
      <span style={{ color: "#C9A84C" }} className="text-xs font-bold tracking-widest uppercase">
        ✦ Entreprise identifiée
      </span>
      <p className="text-white font-bold text-base mt-2">{data.nom}</p>
      <p style={{ color: "#8090A8" }} className="text-sm mt-0.5">{data.activite}</p>
      {anciennete !== null && (
        <p style={{ color: "#8090A8" }} className="text-xs mt-1">
          {anciennete} an{anciennete > 1 ? "s" : ""} d'activité · SIRET {data.siret}
        </p>
      )}
      <div className="flex gap-2 mt-3">
        <button type="button" onClick={onConfirm}
          style={{ background: "#C9A84C", color: "#0D1B3E" }}
          className="flex-1 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          C'est bien ça ✓
        </button>
        <button type="button" onClick={onDismiss}
          style={{ background: "#1A3570", color: "#8090A8" }}
          className="px-4 py-2 rounded-xl text-sm font-medium">
          Corriger
        </button>
      </div>
    </div>
  );
}

/* ── Type données véhicule ───────────────────────────────────────────────── */
type VehicleData = {
  plate: string;
  marque: string;
  modele: string;
  description: string;
  annee: string;
  carburant: string;
  carrosserie: string;
  puissance: string;
  boite: string;
  imageUrl: string;
  resume: string;
  contextIA: string;
};

/* ── AutoFillCard Véhicule ───────────────────────────────────────────────── */
function VehicleAutoFillCard({ data, onConfirm, onDismiss }: {
  data: VehicleData;
  onConfirm: () => void;
  onDismiss: () => void;
}) {
  return (
    <div style={{ background: "#0D2456", border: "1px solid #C9A84C" }}
      className="rounded-2xl p-4 mx-4 my-2 animate-fade-in">
      <span style={{ color: "#C9A84C" }} className="text-xs font-bold tracking-widest uppercase">
        🚗 Véhicule identifié
      </span>
      <div className="flex items-start gap-3 mt-2">
        {data.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.imageUrl} alt={data.description}
            className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        )}
        <div className="min-w-0">
          <p className="text-white font-bold text-base leading-tight">
            {data.marque} {data.modele}
          </p>
          {data.annee && (
            <p style={{ color: "#8090A8" }} className="text-sm mt-0.5">{data.annee} · {data.carburant}</p>
          )}
          {data.carrosserie && (
            <p style={{ color: "#8090A8" }} className="text-xs mt-0.5">{data.carrosserie}{data.boite ? ` · ${data.boite}` : ""}</p>
          )}
          <p style={{ color: "#8090A8" }} className="text-xs mt-1 font-mono">
            {data.plate}
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button type="button" onClick={onConfirm}
          style={{ background: "#C9A84C", color: "#0D1B3E" }}
          className="flex-1 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
          C'est bien ça ✓
        </button>
        <button type="button" onClick={onDismiss}
          style={{ background: "#1A3570", color: "#8090A8" }}
          className="px-4 py-2 rounded-xl text-sm font-medium">
          Corriger
        </button>
      </div>
    </div>
  );
}

/* ── LeadReadyCard ───────────────────────────────────────────────────────── */
function LeadReadyCard({ data, onContact }: {
  data: LeadReady;
  onContact: () => void;
}) {
  const profilColor = data.profil === "difficile"
    ? "#D94F3D"
    : data.profil === "aggravé"
    ? "#E8A427"
    : "#1A7A4A";

  return (
    <div style={{ background: "#0D2456", border: "1px solid #1A3570" }}
      className="rounded-2xl p-5 mx-4 my-2 animate-fade-in">
      <p style={{ color: "#C9A84C" }} className="text-xs font-bold tracking-widest uppercase mb-3">
        ✦ Profil complété — {data.produit}
      </p>
      <div className="text-center mb-4">
        <p style={{ color: "#8090A8" }} className="text-xs mb-1">Fourchette estimée</p>
        <p className="text-white font-bold text-2xl">{data.fourchette}</p>
      </div>
      <p style={{ color: "#8090A8" }} className="text-xs mb-3">{data.resume}</p>
      <div className="flex items-center gap-2 mb-4">
        <span style={{ background: profilColor }} className="w-2 h-2 rounded-full" />
        <span style={{ color: profilColor }} className="text-xs font-semibold capitalize">
          Profil {data.profil}
        </span>
      </div>
      <button
        type="button"
        onClick={onContact}
        style={{ background: "#C9A84C", color: "#0D1B3E" }}
        className="w-full py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
      >
        📞 Être rappelé par Talel
      </button>
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        style={{ background: "#1A4A2A", color: "#4ADE80" }}
        className="w-full py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity mt-2 flex items-center justify-center"
      >
        💬 WhatsApp direct
      </a>
      <p style={{ color: "#8090A8" }} className="text-[10px] text-center mt-2">
        Données non revendues · ORIAS 16004865
      </p>
    </div>
  );
}

/* ── Main ChatContainer ──────────────────────────────────────────────────── */
export default function ChatContainer() {
  const [mode, setMode] = useState<AppMode>("comparison");
  const [messages, setMessages] = useState<Message[]>([makeGreetingMessage("comparison")]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<ConversationPhase>("insurance_type");
  const [collectedProfile, setCollectedProfile] = useState<string | undefined>();
  const [collectedInsuranceType, setCollectedInsuranceType] = useState<string | undefined>();
  const [leadReadyData, setLeadReadyData] = useState<LeadReady | null>(null);
  const [autoFill, setAutoFill] = useState<{ data: SiretData; pendingText: string } | null>(null);
  const [vehicleFill, setVehicleFill] = useState<{ data: VehicleData; pendingText: string } | null>(null);
  const [siretContext, setSiretContext] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, autoFill, leadReadyData]);

  /* Lookup plaque → VehicleAutoFillCard */
  const tryEnrichPlate = useCallback(async (text: string): Promise<boolean> => {
    const match = text.match(PLATE_RE);
    if (!match) return false;
    const plaque = match[1];
    try {
      const res = await fetch(`/comparateur/api/immat?plaque=${encodeURIComponent(plaque)}`);
      const json = await res.json();
      if (json.ok && json.data) {
        setVehicleFill({ data: json.data as VehicleData, pendingText: text });
        return true;
      }
    } catch {}
    return false;
  }, []);

  /* Lookup SIRET côté client puis affiche l'AutoFillCard */
  const tryEnrichSiret = useCallback(async (text: string): Promise<boolean> => {
    const match = text.match(SIRET_RE);
    if (!match) return false;
    const siret = match[1];
    try {
      const res = await fetch(`/comparateur/api/siret?siret=${siret.padEnd(14, "0").slice(0, 14)}`);
      const json = await res.json();
      if (json.data) {
        setAutoFill({ data: json.data, pendingText: text });
        return true;
      }
    } catch {}
    return false;
  }, []);

  const sendMessage = useCallback(async (text: string, overrideContext?: string) => {
    if (isLoading) return;

    if (text.toLowerCase().includes("whatsapp")) {
      window.open(WHATSAPP, "_blank");
    }

    /* Vérifie plaque d'abord (avant SIRET) — seulement si pas de contexte déjà passé */
    if (!overrideContext) {
      const hasPlate = await tryEnrichPlate(text);
      if (hasPlate) return;

      /* Vérifier si le texte contient un SIRET → AutoFillCard d'abord */
      const hasSiret = await tryEnrichSiret(text);
      if (hasSiret) return; /* attend confirmation utilisateur */
    }

    /* Ajouter le message utilisateur */
    const userMsg: Message = { id: genId(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    if (text.toLowerCase().includes("professionnel") || text.toLowerCase().includes("entreprise")) {
      setCollectedProfile("professionnel");
    } else if (text.toLowerCase().includes("particulier")) {
      setCollectedProfile("particulier");
    }
    if (!collectedInsuranceType) {
      const types = ["auto", "habitation", "rc pro", "décennale", "vtc", "emprunteur"];
      const found = types.find((t) => text.toLowerCase().includes(t));
      if (found) setCollectedInsuranceType(found);
    }

    /* Construire l'historique et injecter le contexte enrichi dans le premier message user.
     * On utilise overrideContext en priorité (fix timing React) puis siretContext.
     * Le contexte est préfixé au premier message user pour rester dans la structure
     * user/assistant alternée attendue par l'API Anthropic. */
    const effectiveContext = overrideContext ?? siretContext;
    const historyBase = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
    let history = historyBase;
    if (effectiveContext) {
      const firstUserIdx = historyBase.findIndex((m) => m.role === "user");
      if (firstUserIdx >= 0) {
        history = historyBase.map((m, i) =>
          i === firstUserIdx
            ? { ...m, content: `${effectiveContext}\n\n${m.content}` }
            : m
        );
      }
    }

    try {
      const res = await fetch("/comparateur/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, mode }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Erreur API");
      }

      const data = await res.json();
      const { content, actions } = data;

      setCurrentPhase(actions.phase ?? currentPhase);

      if (actions.leadReady) {
        setLeadReadyData(actions.leadReady);
      }

      const assistantMsg: Message = {
        id: genId(),
        role: "assistant",
        content,
        timestamp: new Date(),
        quickReplies: actions.quickReplies ?? [],
        estimation: actions.estimation ?? null,
        showLeadForm: actions.showLeadForm ?? false,
        phase: actions.phase,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (actions.showLeadForm) setTimeout(() => setShowLeadForm(true), 600);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Erreur inconnue";
      setMessages((prev) => [
        ...prev,
        {
          id: genId(),
          role: "assistant",
          content: `Désolé, une erreur est survenue.\n\n${errMsg}\n\nContacte-nous au ${PHONE}.`,
          timestamp: new Date(),
          quickReplies: ["📞 Appeler", "💬 WhatsApp"],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, mode, isLoading, currentPhase, collectedInsuranceType, siretContext, tryEnrichSiret]);

  /* Confirmer AutoFillCard → injecter données SIRET dans le contexte */
  function handleAutoFillConfirm() {
    if (!autoFill) return;
    const { data, pendingText } = autoFill;
    const anciennete = data.dateCreation
      ? new Date().getFullYear() - new Date(data.dateCreation).getFullYear()
      : null;
    const context = `[Données auto-récupérées via SIRET ${data.siret}]\nEntreprise : ${data.nom}\nActivité : ${data.activite} (NAF ${data.codeNaf})\nAncienneté : ${anciennete ?? "N/A"} an(s)\nAdresse : ${data.adresse}\nStatut : actif`;
    setSiretContext(context);
    setAutoFill(null);
    /* Passer le contexte directement (même fix timing que pour le véhicule) */
    sendMessage(pendingText + ` [SIRET confirmé: ${data.siret}]`, context);
  }

  function handleAutoFillDismiss() {
    if (!autoFill) return;
    const text = autoFill.pendingText;
    setAutoFill(null);
    /* Envoyer sans enrichissement */
    const userMsg: Message = { id: genId(), role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    fetch("/comparateur/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content })), mode }),
    })
      .then((r) => r.json())
      .then(({ content, actions }) => {
        setCurrentPhase(actions.phase ?? currentPhase);
        if (actions.leadReady) setLeadReadyData(actions.leadReady);
        setMessages((prev) => [...prev, {
          id: genId(), role: "assistant", content, timestamp: new Date(),
          quickReplies: actions.quickReplies ?? [], estimation: actions.estimation ?? null,
          showLeadForm: actions.showLeadForm ?? false, phase: actions.phase,
        }]);
        if (actions.showLeadForm) setTimeout(() => setShowLeadForm(true), 600);
      })
      .catch(() => {
        setMessages((prev) => [...prev, {
          id: genId(), role: "assistant",
          content: `Une erreur est survenue. Contacte-nous au ${PHONE}.`,
          timestamp: new Date(), quickReplies: ["📞 Appeler", "💬 WhatsApp"],
        }]);
      })
      .finally(() => setIsLoading(false));
  }

  /* Confirmer VehicleAutoFillCard → fetch autonome (pas de useCallback stale) */
  function handleVehicleConfirm() {
    if (!vehicleFill) return;
    const { data, pendingText } = vehicleFill;

    const ctx = data.contextIA;
    const userText = pendingText + ` [Plaque confirmée: ${data.plate} — ${data.marque} ${data.modele} ${data.annee}]`;
    const userMsg: Message = { id: genId(), role: "user", content: userText, timestamp: new Date() };

    setSiretContext(ctx);
    setVehicleFill(null);
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    /* Injecter le contexte dans le premier message user de l'historique */
    const historyBase = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
    const firstUserIdx = historyBase.findIndex((m) => m.role === "user");
    const history =
      firstUserIdx >= 0
        ? historyBase.map((m, i) =>
            i === firstUserIdx ? { ...m, content: `${ctx}\n\n${m.content}` } : m
          )
        : historyBase;

    fetch("/comparateur/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, mode }),
    })
      .then((r) => r.json())
      .then(({ content, actions }) => {
        setCurrentPhase(actions.phase ?? currentPhase);
        if (actions.leadReady) setLeadReadyData(actions.leadReady);
        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            role: "assistant",
            content,
            timestamp: new Date(),
            quickReplies: actions.quickReplies ?? [],
            estimation: actions.estimation ?? null,
            showLeadForm: actions.showLeadForm ?? false,
            phase: actions.phase,
          },
        ]);
        if (actions.showLeadForm) setTimeout(() => setShowLeadForm(true), 600);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            role: "assistant",
            content: `Une erreur est survenue. Contacte-nous au ${PHONE}.`,
            timestamp: new Date(),
            quickReplies: ["📞 Appeler", "💬 WhatsApp"],
          },
        ]);
      })
      .finally(() => setIsLoading(false));
  }

  /* Corriger → renvoyer le texte original sans enrichissement */
  function handleVehicleDismiss() {
    if (!vehicleFill) return;
    const { pendingText } = vehicleFill;
    setVehicleFill(null);
    sendMessage(pendingText);
  }

  function handleModeChange(newMode: AppMode) {
    setMode(newMode);
    setMessages([makeGreetingMessage(newMode)]);
    setCurrentPhase(newMode === "comparison" ? "insurance_type" : "assistant_idle");
    setLeadSubmitted(false);
    setLeadReadyData(null);
    setVehicleFill(null);
    setSiretContext("");
  }

  function handleLeadSubmitted(lead: Lead) {
    setShowLeadForm(false);
    setLeadSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        id: genId(),
        role: "assistant",
        content: `Merci ${lead.prenom} ! ✅\n\nTa demande a bien été enregistrée. Talel te contactera sous 24h au ${lead.telephone}.\n\nEn attendant, n'hésite pas à nous joindre directement :`,
        timestamp: new Date(),
        quickReplies: ["📞 09 86 11 32 57", "💬 WhatsApp"],
        phase: "lead_done",
      },
    ]);
  }

  const lastAssistantIdx = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const lastAssistantId = lastAssistantIdx >= 0 ? messages[messages.length - 1 - lastAssistantIdx].id : null;

  return (
    <div className="flex flex-col h-screen" style={{ background: "#080f24" }}>

      {/* ── Header ── */}
      <header style={{ background: "#0D1B3E", borderBottom: "1px solid #1A3570" }}
        className="px-4 py-3 flex items-center justify-between flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1A3570, #0D2456)", border: "1px solid #C9A84C" }}>
            <svg className="w-5 h-5" style={{ color: "#C9A84C" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-sm leading-tight" style={{ color: "#e8edf5" }}>
              ELIA <span style={{ color: "#C9A84C" }}>·</span> HT Assurance
            </h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#1A7A4A" }} />
              <span className="text-[11px]" style={{ color: "#8090A8" }}>Assistant disponible</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle mode={mode} onChange={handleModeChange} />
          <a href={`tel:${PHONE}`} className="hidden sm:flex items-center gap-1.5 text-xs transition-colors hover:opacity-80" style={{ color: "#8090A8" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            09 86 11 32 57
          </a>
        </div>
      </header>

      {/* ── Bandeau logos partenaires ── */}
      <div style={{ background: "#0D1B3E", borderBottom: "1px solid #1A3570" }}
        className="px-4 py-2 flex items-center justify-center gap-4 flex-shrink-0 overflow-x-auto">
        {["AXA", "Allianz", "Abeille", "Generali", "Groupama", "Swiss Life"].map((name) => (
          <span key={name} className="text-[10px] font-semibold whitespace-nowrap flex-shrink-0"
            style={{ color: "#8090A8" }}>{name}</span>
        ))}
      </div>

      {/* ── Zone chat ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onQuickReply={sendMessage}
            isLast={msg.id === lastAssistantId}
            isLoading={isLoading}
          />
        ))}

        {/* AutoFillCard SIRET */}
        {autoFill && (
          <AutoFillCard
            data={autoFill.data}
            onConfirm={handleAutoFillConfirm}
            onDismiss={handleAutoFillDismiss}
          />
        )}

        {/* AutoFillCard Véhicule */}
        {vehicleFill && (
          <VehicleAutoFillCard
            data={vehicleFill.data}
            onConfirm={handleVehicleConfirm}
            onDismiss={handleVehicleDismiss}
          />
        )}

        {isLoading && <TypingIndicator />}

        {/* LeadReadyCard */}
        {leadReadyData && !showLeadForm && !leadSubmitted && (
          <LeadReadyCard
            data={leadReadyData}
            onContact={() => setShowLeadForm(true)}
          />
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2 border-t" style={{ background: "#0D1B3E", borderColor: "#1A3570" }}>
        <ChatInput onSend={sendMessage} disabled={isLoading || !!autoFill || !!vehicleFill}
          placeholder={mode === "comparison" ? "Réponds ou pose une question…" : "Pose une question sur ton contrat…"} />
        <p className="text-center text-[10px] mt-2" style={{ color: "#8090A8" }}>
          ELIA · HT Assurance · Nice ·{" "}
          <a href="tel:0986113257" className="hover:opacity-80 transition-opacity">09 86 11 32 57</a>
          {" "}·{" "}
          <a href="/" className="hover:opacity-80 transition-opacity">← Site principal</a>
          {" "}· ORIAS 16004865
        </p>
      </div>

      {/* ── WhatsApp flotant ── */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-13 h-13 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ background: "#1A7A4A", width: 52, height: 52 }}>
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Lead form modal */}
      {showLeadForm && (
        <LeadFormModal
          onClose={() => setShowLeadForm(false)}
          onSubmit={handleLeadSubmitted}
          insuranceType={collectedInsuranceType ?? leadReadyData?.produit}
          profile={collectedProfile}
          leadSummary={leadReadyData?.resume}
          fourchette={leadReadyData?.fourchette}
        />
      )}
    </div>
  );
}
