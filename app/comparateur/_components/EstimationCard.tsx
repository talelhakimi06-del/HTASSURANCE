import type { Estimation } from "../_lib/types";
import { formatEstimateRange } from "../_lib/utils";

type Props = {
  estimation: Estimation;
};

const INSURER_COLORS: Record<string, string> = {
  AXA: "#00008F",
  Allianz: "#003781",
  Generali: "#C5281C",
  Groupama: "#006633",
  "Swiss Life": "#CC0000",
  "Abeille Assurances": "#F7A600",
  Abeille: "#F7A600",
};

export default function EstimationCard({ estimation }: Props) {
  return (
    <div className="mt-3 ml-11 animate-slide-up">
      <div className="rounded-2xl p-5 max-w-sm"
        style={{ background: "#0D1B3E", border: "1px solid #C9A84C" }}>

        <div className="flex items-center gap-2 mb-4">
          <span style={{ color: "#C9A84C" }} className="text-xs font-bold tracking-widest uppercase">
            ✦ Estimation personnalisée
          </span>
        </div>

        <div className="space-y-3">
          {estimation.insurers.map((ins, i) => {
            const badgeColor = INSURER_COLORS[ins.name] ?? "#1A3570";
            return (
              <div key={ins.name} className="rounded-xl p-3.5"
                style={{ background: "#0D2456", border: "1px solid #1A3570" }}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md text-white"
                      style={{ background: badgeColor }}>{ins.name}</span>
                    {i === 0 && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                        style={{ background: "#C9A84C", color: "#0D1B3E" }}>Top</span>
                    )}
                  </div>
                  <p className="font-bold text-sm whitespace-nowrap" style={{ color: "#C9A84C" }}>
                    {formatEstimateRange(ins)}
                  </p>
                </div>
                {ins.highlight && (
                  <p className="text-xs mt-1.5" style={{ color: "#8090A8" }}>{ins.highlight}</p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-[11px] mt-4 leading-relaxed" style={{ color: "#8090A8" }}>
          ⚠️ {estimation.disclaimer}
        </p>
      </div>
    </div>
  );
}
