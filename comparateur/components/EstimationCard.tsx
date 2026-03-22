import type { Estimation } from "@/lib/types";
import { formatEstimateRange } from "@/lib/utils";

const INSURER_COLORS: Record<string, string> = {
  AXA: "bg-[#00008F] text-white",
  Allianz: "bg-[#003781] text-white",
  Generali: "bg-[#C5281C] text-white",
  GAN: "bg-[#E4002B] text-white",
  Groupama: "bg-[#006633] text-white",
  MMA: "bg-[#EF7F1A] text-white",
  "Swiss Life": "bg-[#CC0000] text-white",
  Abeille: "bg-[#F7A600] text-slate-900",
  April: "bg-[#6B21A8] text-white",
  Wakam: "bg-[#0EA5E9] text-white",
  "Malakoff Humanis": "bg-[#005EB8] text-white",
  Cardif: "bg-[#009169] text-white",
  CNP: "bg-[#004B87] text-white",
  Covéa: "bg-[#1D4ED8] text-white",
  MAAF: "bg-[#D97706] text-white",
  Matmut: "bg-[#065F46] text-white",
};

const INSURER_LOGO_FALLBACK: Record<string, string> = {
  AXA: "AXA",
  Allianz: "ALZ",
  Generali: "GEN",
  GAN: "GAN",
  Groupama: "GRP",
  MMA: "MMA",
  "Swiss Life": "SWL",
  Abeille: "ABL",
  April: "APR",
  Wakam: "WKM",
  "Malakoff Humanis": "MLK",
  Cardif: "CDF",
  CNP: "CNP",
  Covéa: "COV",
  MAAF: "MAF",
  Matmut: "MTM",
};

type Props = {
  estimation: Estimation;
};

export default function EstimationCard({ estimation }: Props) {
  return (
    <div className="mt-3 ml-11 animate-slide-up">
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-5 shadow-xl max-w-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 rounded-full bg-emerald-400 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <p className="text-white font-semibold text-sm">
            Estimation personnalisée
          </p>
        </div>

        <div className="space-y-3">
          {estimation.insurers.map((ins, i) => {
            const colorClass =
              INSURER_COLORS[ins.name] ?? "bg-slate-600 text-white";
            const shortLabel =
              INSURER_LOGO_FALLBACK[ins.name] ?? ins.name.slice(0, 3).toUpperCase();

            return (
              <div
                key={ins.name}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${colorClass}`}
                      title={ins.name}
                    >
                      {ins.name.length > 8 ? shortLabel : ins.name}
                    </span>
                    {i === 0 && (
                      <span className="text-[9px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Top
                      </span>
                    )}
                  </div>
                  <p className="text-white font-bold text-sm whitespace-nowrap">
                    {formatEstimateRange(ins)}
                  </p>
                </div>
                {ins.highlight && (
                  <p className="text-slate-400 text-xs mt-1.5">{ins.highlight}</p>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-slate-400 text-[11px] mt-4 leading-relaxed">
          ⚠️ {estimation.disclaimer}
        </p>
      </div>
    </div>
  );
}
