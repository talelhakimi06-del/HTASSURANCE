"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Message, AppMode, Lead, ConversationPhase } from "@/lib/types";
import { genId } from "@/lib/utils";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import LeadFormModal from "./LeadFormModal";
import ModeToggle from "./ModeToggle";

const PHONE = "0986113257";
const WHATSAPP = "https://wa.me/33986113257?text=Bonjour%2C%20je%20souhaite%20un%20devis%20assurance";

const GREETING_COMPARISON = `Bonjour 👋 Je suis votre assistant HT Assurance.

Je vais vous poser quelques questions pour vous proposer les meilleures offres d'assurance adaptées à votre profil.

Quel type d'assurance recherchez-vous ?`;

const GREETING_ASSISTANT = `Bonjour 👋 Bienvenue dans votre espace personnel HT Assurance.

Je suis là pour répondre à toutes vos questions sur vos contrats : garanties, exclusions, sinistres, démarches…

Comment puis-je vous aider aujourd'hui ?`;

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

export default function ChatContainer() {
  const [mode, setMode] = useState<AppMode>("comparison");
  const [messages, setMessages] = useState<Message[]>([makeGreetingMessage("comparison")]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<ConversationPhase>("insurance_type");
  const [collectedProfile, setCollectedProfile] = useState<string | undefined>();
  const [collectedInsuranceType, setCollectedInsuranceType] = useState<string | undefined>();

  const bottomRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (isLoading) return;

      // Add user message
      const userMsg: Message = {
        id: genId(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      // Track WhatsApp intent
      if (text.toLowerCase().includes("whatsapp")) {
        window.open(WHATSAPP, "_blank");
      }

      // Build history for API
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/chat", {
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

        // Detect profile from messages
        if (text.toLowerCase().includes("professionnel") || text.toLowerCase().includes("entreprise")) {
          setCollectedProfile("professionnel");
        } else if (text.toLowerCase().includes("particulier")) {
          setCollectedProfile("particulier");
        }

        // Detect insurance type
        if (!collectedInsuranceType) {
          const types = ["auto", "habitation", "rc pro", "décennale", "vtc", "emprunteur"];
          const found = types.find((t) => text.toLowerCase().includes(t));
          if (found) setCollectedInsuranceType(found);
        }

        setCurrentPhase(actions.phase ?? currentPhase);

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

        if (actions.showLeadForm) {
          setTimeout(() => setShowLeadForm(true), 600);
        }
      } catch (err: unknown) {
        const errorContent =
          err instanceof Error && err.message.includes("OpenAI")
            ? "⚠️ La clé OpenAI n'est pas configurée. Ajoutez OPENAI_API_KEY dans votre fichier .env.local"
            : "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter directement au " + PHONE;

        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            role: "assistant",
            content: errorContent,
            timestamp: new Date(),
            quickReplies: ["Nous appeler", "WhatsApp"],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, mode, isLoading, currentPhase, collectedInsuranceType]
  );

  function handleModeChange(newMode: AppMode) {
    setMode(newMode);
    setMessages([makeGreetingMessage(newMode)]);
    setCurrentPhase(newMode === "comparison" ? "insurance_type" : "assistant_idle");
    setLeadSubmitted(false);
  }

  function handleLeadSubmitted(lead: Lead) {
    setShowLeadForm(false);
    setLeadSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        id: genId(),
        role: "assistant",
        content: `Merci ${lead.prenom} ! ✅\n\nVotre demande a bien été enregistrée. Un courtier HT Assurance vous contactera dans les 24 heures au ${lead.telephone}.\n\nEn attendant, n'hésitez pas à nous joindre directement :`,
        timestamp: new Date(),
        quickReplies: ["📞 Appeler le 09 86 11 32 57", "💬 WhatsApp"],
        phase: "lead_done",
      },
    ]);
  }

  const lastAssistantIdx = [...messages].reverse().findIndex((m) => m.role === "assistant");
  const lastAssistantId = lastAssistantIdx >= 0 ? messages[messages.length - 1 - lastAssistantIdx].id : null;

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* ── Header ── */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 px-4 py-3 flex items-center justify-between shadow-lg flex-shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">HT Assurance</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 text-[11px]">Assistant disponible</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ModeToggle mode={mode} onChange={handleModeChange} />
          <a
            href={`tel:${PHONE}`}
            className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-white text-xs transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            09 86 11 32 57
          </a>
        </div>
      </header>

      {/* ── Mode banner ── */}
      {mode === "assistant" && !leadSubmitted && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center flex-shrink-0">
          <p className="text-amber-700 text-xs font-medium">
            Mode <strong>Mon contrat</strong> — Posez vos questions sur vos garanties, sinistres et démarches
          </p>
        </div>
      )}

      {/* ── Chat area ── */}
      <div ref={chatAreaRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-5">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onQuickReply={sendMessage}
            isLast={msg.id === lastAssistantId}
            isLoading={isLoading}
          />
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* ── Action buttons (when estimation shown) ── */}
      {currentPhase === "estimation" && !showLeadForm && !leadSubmitted && (
        <div className="flex-shrink-0 px-4 pb-3 flex gap-2 flex-wrap">
          <button
            onClick={() => setShowLeadForm(true)}
            className="flex-1 min-w-[140px] bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-2xl transition-all active:scale-[0.98]"
          >
            Recevoir un devis
          </button>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[140px] bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-3 rounded-2xl transition-all text-center active:scale-[0.98]"
          >
            💬 WhatsApp
          </a>
        </div>
      )}

      {/* ── Input bar ── */}
      <div className="flex-shrink-0 px-4 pb-4 pt-2 bg-slate-50 border-t border-slate-100">
        <ChatInput
          onSend={sendMessage}
          disabled={isLoading}
          placeholder={
            mode === "comparison"
              ? "Répondez ou posez une question…"
              : "Posez une question sur votre contrat…"
          }
        />
        <p className="text-center text-[10px] text-slate-400 mt-2">
          Propulsé par HT Assurance · Nice ·{" "}
          <a href="tel:0986113257" className="hover:text-slate-600 transition-colors">
            09 86 11 32 57
          </a>
        </p>
      </div>

      {/* ── Lead form modal ── */}
      {showLeadForm && (
        <LeadFormModal
          onClose={() => setShowLeadForm(false)}
          onSubmit={handleLeadSubmitted}
          insuranceType={collectedInsuranceType}
          profile={collectedProfile}
        />
      )}
    </div>
  );
}
