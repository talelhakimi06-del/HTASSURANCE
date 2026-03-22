"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { Message, AppMode, Lead, ConversationPhase, InsurerEstimate } from "@/lib/types";
import { genId, parseAiResponse } from "@/lib/utils";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import LeadFormModal from "./LeadFormModal";
import ModeToggle from "./ModeToggle";

const PHONE = "0986113257";
const WHATSAPP = "https://wa.me/33986113257?text=Bonjour%2C%20je%20souhaite%20un%20devis%20assurance";

const GREETING_COMPARISON = `Bonjour 👋 Je suis ELIA, l'assistante HT Assurance.

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
  const [apiHealthy, setApiHealthy] = useState<boolean | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Vérification santé API au chargement (anticipe les erreurs de config)
  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => setApiHealthy(data.ok))
      .catch(() => setApiHealthy(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (isLoading) return;

      const textLower = text.toLowerCase();

      // Contact intents : ouvrir directement sans appeler l'API
      if (textLower.includes("nous appeler") || textLower.includes("appeler le")) {
        window.location.href = `tel:${PHONE}`;
        return;
      }
      if (textLower.includes("whatsapp")) {
        window.open(WHATSAPP, "_blank");
        return;
      }
      // Lead form intents : ouvrir le formulaire directement
      if (textLower.includes("devis") || textLower.includes("rappelé") || textLower.includes("rappeler") || textLower.includes("être contacté") || textLower.includes("formulaire")) {
        setShowLeadForm(true);
        return;
      }

      // Add user message
      const userMsg: Message = {
        id: genId(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

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
          signal: AbortSignal.timeout(35000),
        });

        if (!res.ok) {
          let errMsg = "Erreur API";
          try {
            const err = await res.json();
            errMsg = err.error ?? errMsg;
          } catch {
            // réponse non-JSON (page d'erreur Vercel, etc.)
          }
          throw new Error(errMsg);
        }

        // ── Lire le stream SSE ──────────────────────────────────
        const reader = res.body?.getReader();
        if (!reader) throw new Error("Stream non disponible");

        const decoder = new TextDecoder();
        let fullText = "";
        const streamMsgId = genId();

        // Ajouter le message assistant vide pour le remplir progressivement
        setMessages((prev) => [
          ...prev,
          {
            id: streamMsgId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
            quickReplies: [],
          },
        ]);

        let done = false;
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          if (readerDone) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);
            if (data === "[DONE]") {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.error) throw new Error(parsed.error);
              if (parsed.text) {
                fullText += parsed.text;
                // Mettre à jour le message en temps réel (affiche le texte brut sans le bloc <actions>)
                const visibleText = fullText.replace(/<actions>[\s\S]*$/, "").trim();
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === streamMsgId ? { ...m, content: visibleText } : m
                  )
                );
              }
            } catch {
              // ignore malformed chunks
            }
          }
        }

        // ── Parse final : extraire actions + estimation ─────────
        const { content, actions } = parseAiResponse(fullText);

        // Detect profile from messages
        if (textLower.includes("professionnel") || textLower.includes("entreprise")) {
          setCollectedProfile("professionnel");
        } else if (textLower.includes("particulier")) {
          setCollectedProfile("particulier");
        }

        // Detect insurance type
        if (!collectedInsuranceType) {
          const types = ["auto", "habitation", "rc pro", "décennale", "vtc", "emprunteur"];
          const found = types.find((t) => textLower.includes(t));
          if (found) setCollectedInsuranceType(found);
        }

        // Valider l'estimation
        const validEstimation =
          actions.estimation?.insurers?.length &&
          actions.estimation.insurers.every(
            (i: InsurerEstimate) => typeof i?.priceMin === "number" && typeof i?.priceMax === "number"
          )
            ? actions.estimation
            : null;

        const hasEstimation = !!validEstimation;
        setCurrentPhase(hasEstimation ? "estimation" : (actions.phase ?? currentPhase));

        // Mettre à jour le message final avec le contenu parsé + quickReplies + estimation
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamMsgId
              ? {
                  ...m,
                  content,
                  quickReplies: hasEstimation
                    ? ["📄 Recevoir un devis détaillé", "📞 Être rappelé", "💬 WhatsApp direct"]
                    : (actions.quickReplies ?? []),
                  estimation: validEstimation,
                  showLeadForm: actions.showLeadForm ?? false,
                  phase: actions.phase,
                }
              : m
          )
        );

        if (actions.showLeadForm) {
          setTimeout(() => setShowLeadForm(true), 600);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "";
        const isTimeout = msg.includes("TimeoutError") || msg.includes("timeout") || msg.includes("AbortError");
        const isApiKey = msg.includes("Clé API") || msg.includes("ANTHROPIC");
        const errorContent = isApiKey
          ? "⚠️ La clé API n'est pas configurée. Appelez-nous directement au " + PHONE
          : isTimeout
          ? "La réponse a pris trop de temps. Réessayez ou contactez-nous au " + PHONE
          : "Désolé, une erreur est survenue. Réessayez ou contactez-nous au " + PHONE;

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
            <h1 className="text-white font-bold text-sm leading-tight">ELIA — HT Assurance</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 text-[11px]">Assistante disponible</span>
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

      {/* ── Bannière config manquante (anticipation erreur déploiement) ── */}
      {apiHealthy === false && (
        <div className="bg-amber-100 border-b border-amber-300 px-4 py-2.5 flex items-center justify-between gap-3 flex-shrink-0">
          <p className="text-amber-800 text-xs font-medium">
            L&apos;assistant est temporairement indisponible. Contactez-nous directement :
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={`tel:${PHONE}`}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              Appeler
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

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
        {/* Bouton devis toujours visible */}
        {!leadSubmitted && !showLeadForm && (
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setShowLeadForm(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2.5 rounded-xl transition-all active:scale-[0.98]"
            >
              📄 Demander un devis gratuit
            </button>
            <a
              href={`tel:${PHONE}`}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl transition-all text-center active:scale-[0.98]"
            >
              📞
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all text-center active:scale-[0.98]"
            >
              💬
            </a>
          </div>
        )}
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
