import type { AppMode } from "../_lib/types";

type Props = {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
};

export default function ModeToggle({ mode, onChange }: Props) {
  return (
    <div className="flex items-center rounded-full p-1 gap-0.5"
      style={{ background: "#080f24" }}>
      <button
        onClick={() => onChange("comparison")}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
        style={mode === "comparison"
          ? { background: "#C9A84C", color: "#0D1B3E" }
          : { color: "#8090A8" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
        Comparateur
      </button>
      <button
        onClick={() => onChange("assistant")}
        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
        style={mode === "assistant"
          ? { background: "#C9A84C", color: "#0D1B3E" }
          : { color: "#8090A8" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
        Mon contrat
      </button>
    </div>
  );
}
