// ─── App modes ────────────────────────────────────────────────────────────────
export type AppMode = "comparison" | "assistant";

export type ConversationPhase =
  | "greeting"
  | "insurance_type"
  | "profile"
  | "details"
  | "estimation"
  | "lead_capture"
  | "lead_done"
  | "assistant_idle";

// ─── Messages ─────────────────────────────────────────────────────────────────
export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  estimation?: Estimation | null;
  showLeadForm?: boolean;
  phase?: ConversationPhase;
};

// ─── AI structured response ───────────────────────────────────────────────────
export type AiActions = {
  quickReplies: string[];
  phase: ConversationPhase;
  estimation: Estimation | null;
  showLeadForm: boolean;
  collectedData?: Partial<CollectedData>;
};

// ─── Estimation ───────────────────────────────────────────────────────────────
export type Estimation = {
  insurers: InsurerEstimate[];
  disclaimer: string;
};

export type InsurerEstimate = {
  name: string;
  priceMin: number;
  priceMax: number;
  unit: "an" | "mois";
  highlight?: string;
};

// ─── Collected user data ──────────────────────────────────────────────────────
export type CollectedData = {
  insuranceType: string;
  profile: "particulier" | "professionnel";
  activity?: string;
  ca?: string;
  employees?: string;
  seniority?: string;
  sinisters?: string;
  location?: string;
  guarantees?: string[];
  loanAmount?: number;
  vehicleType?: string;
};

// ─── Lead ─────────────────────────────────────────────────────────────────────
export type Lead = {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  entreprise?: string;
  siret?: string;
  insuranceType?: string;
  profile?: string;
  conversationSummary?: string;
  source: "comparateur-ht";
  createdAt: string;
};

// ─── SIRET / Data.gouv ────────────────────────────────────────────────────────
export type SiretData = {
  siret: string;
  nom: string;
  adresse: string;
  codeNaf: string;
  activite: string;
  dateCreation: string;
  effectif?: string;
};

// ─── Chat API request/response ────────────────────────────────────────────────
export type ChatRequest = {
  messages: { role: MessageRole; content: string }[];
  mode: AppMode;
};

export type ChatResponse = {
  content: string;
  actions: AiActions;
};
