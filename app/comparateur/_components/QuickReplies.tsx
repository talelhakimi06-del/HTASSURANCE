"use client";

type Props = {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
};

const OPTION_META: Record<string, { icon: string; short?: string }> = {
  "Particulier":                      { icon: "👤" },
  "Professionnel / Entreprise":       { icon: "🏢", short: "Pro / Entreprise" },
  "Assurance auto":                   { icon: "🚗" },
  "Assurance habitation":             { icon: "🏠" },
  "RC Pro / Freelance":               { icon: "💼" },
  "Décennale BTP":                    { icon: "🏗️" },
  "Assurance VTC":                    { icon: "🚕" },
  "Assurance emprunteur":             { icon: "🏦" },
  "Autre":                            { icon: "✦" },
  "Recevoir un devis détaillé":       { icon: "📄", short: "Devis détaillé" },
  "Être rappelé par Talel":           { icon: "📞", short: "Être rappelé" },
  "Être rappelé par un courtier":     { icon: "📞", short: "Être rappelé" },
  "Contacter sur WhatsApp":           { icon: "💬", short: "WhatsApp" },
  "Déclarer un sinistre":             { icon: "🚨" },
  "Mes garanties":                    { icon: "🛡️" },
  "Contacter mon courtier":           { icon: "📞" },
  "Continuer":                        { icon: "→" },
  "Poser une question":               { icon: "❓" },
  "Oui":                              { icon: "✓" },
  "Non":                              { icon: "✗" },
  "Perso":                            { icon: "🏠" },
  "Pro":                              { icon: "💼" },
  "Mixte":                            { icon: "⚡" },
  "Personnel":                        { icon: "🏠" },
  "Professionnel":                    { icon: "💼" },
  "📞 Appeler":                       { icon: "" },
  "📞 09 86 11 32 57":               { icon: "" },
  "💬 WhatsApp":                      { icon: "" },
};

const CARD_SET = new Set(["Particulier", "Professionnel / Entreprise"]);
const INSURANCE_TYPES = new Set(["Assurance auto","Assurance habitation","RC Pro / Freelance","Décennale BTP","Assurance VTC","Assurance emprunteur","Autre"]);

/* Bouton pilule — fond transparent gold, hover plein */
function PillButton({ opt, onSelect, disabled }: { opt: string; onSelect: (o: string) => void; disabled?: boolean }) {
  const meta = OPTION_META[opt];
  const icon = meta?.icon;
  const label = meta?.short ?? opt;

  return (
    <button
      type="button"
      onClick={() => { if (!disabled) onSelect(opt); }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "7px 16px",
        borderRadius: 9999,
        background: "rgba(201,168,76,0.15)",
        color: "#C9A84C",
        border: "1px solid rgba(201,168,76,0.4)",
        fontWeight: 600,
        fontSize: 13,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.15s",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = "#C9A84C";
        el.style.color = "#0D1B3E";
        el.style.borderColor = "#C9A84C";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const el = e.currentTarget as HTMLButtonElement;
        el.style.background = "rgba(201,168,76,0.15)";
        el.style.color = "#C9A84C";
        el.style.borderColor = "rgba(201,168,76,0.4)";
      }}
    >
      {icon && <span style={{ fontSize: 15, lineHeight: 1 }}>{icon}</span>}
      <span>{label}</span>
    </button>
  );
}

export default function QuickReplies({ options, onSelect, disabled }: Props) {
  if (!options.length) return null;

  const isCardLayout = options.length === 2 && options.every((o) => CARD_SET.has(o));
  const isInsuranceGrid = options.length >= 4 && options.every((o) => INSURANCE_TYPES.has(o));

  /* Layout cartes Particulier / Entreprise */
  if (isCardLayout) {
    return (
      <div className="flex gap-3 mt-3 pl-11">
        {options.map((opt) => {
          const meta = OPTION_META[opt];
          const label = meta?.short ?? opt;
          const icon = meta?.icon ?? "◆";
          const isPart = opt === "Particulier";
          return (
            <button
              key={opt}
              type="button"
              onClick={() => { if (!disabled) onSelect(opt); }}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                padding: "16px 12px",
                borderRadius: 16,
                border: "1px solid rgba(201,168,76,0.4)",
                background: "rgba(201,168,76,0.15)",
                color: "#C9A84C",
                fontWeight: 700,
                fontSize: 14,
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.5 : 1,
                transition: "all 0.15s",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                if (disabled) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#C9A84C";
                el.style.color = "#0D1B3E";
                el.style.borderColor = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                if (disabled) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(201,168,76,0.15)";
                el.style.color = "#C9A84C";
                el.style.borderColor = "rgba(201,168,76,0.4)";
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1 }}>{icon}</span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  /* Grid assurances (premier message) */
  if (isInsuranceGrid) {
    return (
      <div className="grid grid-cols-2 gap-2 mt-3 pl-11">
        {options.map((opt) => {
          const meta = OPTION_META[opt];
          const icon = meta?.icon;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => { if (!disabled) onSelect(opt); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                borderRadius: 12,
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.4)",
                color: "#C9A84C",
                fontWeight: 600,
                fontSize: 13,
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.5 : 1,
                textAlign: "left",
                transition: "all 0.15s",
                userSelect: "none",
              }}
              onMouseEnter={(e) => {
                if (disabled) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "#C9A84C";
                el.style.color = "#0D1B3E";
                el.style.borderColor = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                if (disabled) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = "rgba(201,168,76,0.15)";
                el.style.color = "#C9A84C";
                el.style.borderColor = "rgba(201,168,76,0.4)";
              }}
            >
              {icon && <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{icon}</span>}
              <span style={{ lineHeight: 1.2 }}>{opt}</span>
            </button>
          );
        })}
      </div>
    );
  }

  /* Layout pilules — gold par défaut pour toutes les autres réponses */
  return (
    <div className="flex flex-wrap gap-2 mt-3 pl-11">
      {options.map((opt) => (
        <PillButton key={opt} opt={opt} onSelect={onSelect} disabled={disabled} />
      ))}
    </div>
  );
}
