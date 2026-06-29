import { NextRequest, NextResponse } from "next/server";
import { checkGptAuth, unauthorized, logToKv, CTA } from "../_lib";

export const maxDuration = 30;

type Body = {
  age: number;
  situation: "celibataire" | "couple" | "famille";
  nb_enfants: number;
  besoins: string[];
  budget_mensuel: number;
  regime: "general" | "TNS" | "agricole";
};

export async function POST(req: NextRequest) {
  if (!checkGptAuth(req)) return unauthorized();

  const body: Body = await req.json();
  await logToKv("compare-sante", body);

  const ageMult = body.age > 55 ? 2.2 : body.age > 45 ? 1.6 : body.age > 35 ? 1.2 : 1;
  const famMult = body.situation === "famille" ? 2.5 + (body.nb_enfants || 0) * 0.3 : body.situation === "couple" ? 1.8 : 1;
  const base = 32 * ageMult * famMult;

  const offres = [
    { assureur: "April", factor: 0.85, note: 8.5, ideal: "TNS/indépendants, déduction Madelin", forts: ["Madelin déductible", "Tiers payant généralisé", "Médecines douces incluses"], optique: "200-400€/an", dentaire: "300-500€/an", hospi: "Chambre seule 100%" },
    { assureur: "Swiss Life", factor: 1.05, note: 8.7, ideal: "Couverture haut de gamme, familles", forts: ["Plafonds élevés", "Réseau de soins -40%", "Prévoyance combinée"], optique: "300-600€/an", dentaire: "400-800€/an", hospi: "Chambre seule + accompagnant" },
    { assureur: "AXA", factor: 1.1, note: 8.3, ideal: "Couverture complète tous profils", forts: ["Réseau mondial", "Téléconsultation 24/7", "Capital décès inclus"], optique: "250-500€/an", dentaire: "350-700€/an", hospi: "Chambre seule 100%" },
    { assureur: "Malakoff Humanis", factor: 0.95, note: 8.0, ideal: "Salariés, bon rapport qualité/prix", forts: ["Tarifs négociés en réseau", "Pas de délai de carence", "Appli santé"], optique: "200-350€/an", dentaire: "250-450€/an", hospi: "80-100% BR" },
    { assureur: "Alan", factor: 0.9, note: 8.4, ideal: "Digital native, jeunes actifs", forts: ["100% digital", "Remboursement en 24h", "Interface la plus claire du marché"], optique: "200-400€/an", dentaire: "300-500€/an", hospi: "Chambre seule 100%" },
  ];

  const calc = (f: number) => Math.round(base * f);
  const sorted = offres.sort((a, b) => calc(a.factor) - calc(b.factor));
  const best = sorted[0];

  const madelinNote = body.regime === "TNS" ? ` En tant que TNS, vos cotisations sont déductibles via la loi Madelin — pour ${calc(best.factor)}€/mois avec une TMI de 30%, le coût réel est seulement ${Math.round(calc(best.factor) * 0.7)}€/mois.` : "";

  return NextResponse.json({
    meilleure_offre: {
      assureur: best.assureur,
      prix_mensuel: calc(best.factor),
      prix_annuel: calc(best.factor) * 12,
      points_forts: best.forts,
      garanties: [`Optique: ${best.optique}`, `Dentaire: ${best.dentaire}`, `Hospitalisation: ${best.hospi}`],
    },
    comparatif: sorted.map((o) => ({
      assureur: o.assureur,
      prix_mensuel: calc(o.factor),
      note: o.note,
      ideal_pour: o.ideal,
    })),
    remboursements_cles: {
      optique: best.optique,
      dentaire: best.dentaire,
      hospitalisation: best.hospi,
    },
    conseil_talel: `Pour un profil ${body.situation} de ${body.age} ans (régime ${body.regime}), ${best.assureur} offre le meilleur rapport couverture/prix à ${calc(best.factor)}€/mois.${madelinNote} HT Assurance compare les garanties poste par poste pour trouver la mutuelle qui couvre vraiment vos besoins.`,
    cta: CTA,
  });
}
