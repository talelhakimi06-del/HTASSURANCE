import type { AiActions, Estimation } from "./types";

// ─── Parse AI response (text + <actions> block) ───────────────────────────────
export function parseAiResponse(raw: string): { content: string; actions: AiActions } {
  const defaultActions: AiActions = {
    quickReplies: [],
    phase: "greeting",
    estimation: null,
    showLeadForm: false,
  };

  const match = raw.match(/<actions>\s*([\s\S]*?)\s*<\/actions>/);
  if (!match) {
    return { content: raw.trim(), actions: defaultActions };
  }

  const content = raw.replace(/<actions>[\s\S]*?<\/actions>/, "").trim();

  try {
    const actions: AiActions = JSON.parse(match[1]);
    return { content, actions: { ...defaultActions, ...actions } };
  } catch {
    return { content, actions: defaultActions };
  }
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
