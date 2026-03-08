import type { AiActions, Estimation } from "./types";

// ─── Extrait le premier objet JSON valide d'un texte (gère les ```json fences) ──
function extractJson(raw: string): string {
  // Supprimer les blocs ```json ... ``` ou ``` ... ```
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) return fenced[1].trim();

  // Trouver le premier { et le dernier } correspondant
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return raw.slice(start, end + 1);
  }

  return raw.trim();
}

// ─── Parse AI response (gère JSON pur, ```json fences, et texte parasite) ────
export function parseAiResponse(raw: string): { content: string; actions: AiActions } {
  const defaultActions: AiActions = {
    quickReplies: ["Continuer", "Poser une question", "Être rappelé par Talel"],
    phase: "details",
    estimation: null,
    showLeadForm: false,
    leadReady: null,
  };

  const jsonStr = extractJson(raw);

  try {
    const parsed = JSON.parse(jsonStr);

    // Extraire uniquement le champ "message" pour l'affichage
    const content: string =
      typeof parsed.message === "string" && parsed.message.trim()
        ? parsed.message.trim()
        : typeof parsed.content === "string" && parsed.content.trim()
        ? parsed.content.trim()
        : "Je suis là pour t'aider. Comment puis-je t'aider ?";

    const actions: AiActions = {
      quickReplies:
        Array.isArray(parsed.quickReplies) && parsed.quickReplies.length > 0
          ? parsed.quickReplies
          : defaultActions.quickReplies,
      phase: parsed.phase ?? defaultActions.phase,
      estimation: parsed.estimation ?? null,
      showLeadForm: parsed.showLeadForm === true,
      leadReady: parsed.leadReady ?? null,
    };

    return { content, actions };
  } catch {
    // Dernier recours : si le texte ne contient pas de JSON du tout,
    // afficher le texte brut sans les éventuels blocs de code
    const cleaned = raw
      .replace(/```(?:json)?\s*/g, "")
      .replace(/```/g, "")
      .trim();
    return { content: cleaned || "Une erreur est survenue.", actions: defaultActions };
  }
}

// ─── Extrait le message en cours de streaming depuis le JSON partiel ──────────
// Le JSON arrive dans l'ordre : {"message":"texte...","quickReplies":...}
// On peut donc afficher le texte progressivement dès qu'on voit "message":"
export function extractStreamingMessage(partial: string): string {
  const unescape = (s: string) =>
    s.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\"/g, '"').replace(/\\\\/g, "\\");

  // Message complet trouvé (on a la guillemet fermante)
  const full = partial.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)"/);
  if (full) return unescape(full[1]);

  // Message partiel : pas encore de guillemet fermante
  const partial_ = partial.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)/);
  if (partial_) return unescape(partial_[1]);

  return "";
}

// ─── Format price ──────────────────────────────────────────────────────────────
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

// ─── Format estimation range ──────────────────────────────────────────────────
export function formatEstimateRange(est: Pick<Estimation["insurers"][0], "priceMin" | "priceMax" | "unit">): string {
  return `${formatPrice(est.priceMin)} – ${formatPrice(est.priceMax)} / ${est.unit}`;
}

// ─── Generate a simple ID ─────────────────────────────────────────────────────
export function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Validate SIRET format ────────────────────────────────────────────────────
export function isValidSiret(siret: string): boolean {
  const clean = siret.replace(/\s/g, "");
  if (clean.length !== 14 || !/^\d+$/.test(clean)) return false;
  // Luhn algorithm for SIRET
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    let digit = parseInt(clean[i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}

// ─── Summarize conversation for CRM ──────────────────────────────────────────
export function summarizeConversation(messages: { role: string; content: string }[]): string {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" | ");
  return userMessages.slice(0, 500);
}

// ─── Insurance type labels ────────────────────────────────────────────────────
export const INSURANCE_LABELS: Record<string, string> = {
  auto: "Assurance Auto",
  habitation: "Assurance Habitation",
  rc_pro: "RC Professionnelle",
  decennale: "Décennale BTP",
  vtc: "Assurance VTC",
  emprunteur: "Assurance Emprunteur",
  multirisque_pro: "Multirisque Pro",
  autre: "Autre",
};

// ─── Insurer brand colors ─────────────────────────────────────────────────────
export const INSURER_COLORS: Record<string, { bg: string; text: string }> = {
  AXA: { bg: "#00008F", text: "#fff" },
  Allianz: { bg: "#003781", text: "#fff" },
  Generali: { bg: "#C5281C", text: "#fff" },
  GAN: { bg: "#E4002B", text: "#fff" },
  Groupama: { bg: "#006633", text: "#fff" },
  "Swiss Life": { bg: "#CC0000", text: "#fff" },
  Abeille: { bg: "#F7A600", text: "#fff" },
  MMA: { bg: "#EF7F1A", text: "#fff" },
};
