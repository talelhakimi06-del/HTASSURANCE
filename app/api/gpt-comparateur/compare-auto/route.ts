import { NextRequest, NextResponse } from "next/server";
import { checkGptAuth, unauthorized, logToKv, CTA } from "../_lib";

export const maxDuration = 30;

type Body = {
  marque: string;
  modele: string;
  annee: number;
  usage: "perso" | "pro" | "mixte";
  km_annuels: number;
  bonus_malus: number;
  formule: "tiers" | "intermediaire" | "tous_risques";
  profil_conducteur: string;
};

export async function POST(req: NextRequest) {
  if (!checkGptAuth(req)) return unauthorized();

  const body: Body = await req.json();
  await logToKv("compare-auto", body);

  const age = new Date().getFullYear() - (body.annee || 2020);
  const bm = body.bonus_malus ?? 1;
  const formuleMult = body.formule === "tous_risques" ? 1.8 : body.formule === "intermediaire" ? 1.3 : 1;
  const ageMult = age > 10 ? 0.8 : age > 5 ? 1 : 1.2;
  const base = 45 * bm * formuleMult * ageMult;

  const offres = [
    { assureur: "Direct Assurance", factor: 0.78, note: 7.8, ideal: "Prix le plus bas, souscription en ligne", forts: ["Tarif agressif -20%", "0 papier", "Résiliation facile"], garanties: ["RC obligatoire", "Défense pénale", "Protection conducteur"] },
    { assureur: "AXA", factor: 1.1, note: 8.6, ideal: "Couverture complète, assistance premium", forts: ["Véhicule de remplacement J1", "0km d'assistance", "Bris de glace sans franchise"], garanties: ["RC", "Vol", "Incendie", "Bris de glace", "Tous dommages", "Assistance 0km"] },
    { assureur: "Allianz", factor: 1.05, note: 8.4, ideal: "Conducteurs expérimentés, bonus élevé", forts: ["Bonus protégé", "Capital équipements inclus", "Valeur majorée 1 an"], garanties: ["RC", "Vol", "Incendie", "Bris de glace", "Catastrophes naturelles", "Protection juridique"] },
    { assureur: "MAAF", factor: 0.9, note: 8.1, ideal: "Familles, multi-véhicules", forts: ["-15% multi-contrats", "Conducteur occasionnel gratuit", "Bonne gestion sinistres"], garanties: ["RC", "Vol", "Incendie", "Bris de glace", "Assistance panne"] },
    { assureur: "Matmut", factor: 0.88, note: 8.0, ideal: "Budget maîtrisé sans sacrifier les garanties", forts: ["Tarif compétitif", "Réseau 600 agences", "Pas de franchise en cas de tempête"], garanties: ["RC", "Vol", "Incendie", "Bris de glace", "Catastrophes naturelles"] },
  ];

  const calc = (f: number) => Math.round(base * f);
  const sorted = offres.sort((a, b) => calc(a.factor) - calc(b.factor));
  const best = sorted[0];
  const mostExpensive = sorted[sorted.length - 1];

  return NextResponse.json({
    meilleure_offre: {
      assureur: best.assureur,
      prix_mensuel: calc(best.factor),
      prix_annuel: calc(best.factor) * 12,
      points_forts: best.forts,
      garanties: body.formule === "tiers" ? best.garanties.slice(0, 3) : best.garanties,
    },
    comparatif: sorted.map((o) => ({
      assureur: o.assureur,
      prix_mensuel: calc(o.factor),
      note: o.note,
      ideal_pour: o.ideal,
    })),
    economies_possibles: (calc(mostExpensive.factor) - calc(best.factor)) * 12,
    conseil_talel: `Pour votre ${body.marque} ${body.modele} (${body.annee}), formule ${body.formule}, avec un bonus-malus de ${bm} : ${best.assureur} offre le meilleur tarif à ${calc(best.factor)}€/mois. ${bm > 1 ? "Avec un malus, HT Assurance peut trouver des solutions même pour les profils difficiles — c'est notre spécialité." : `Vous pouvez économiser jusqu'à ${(calc(mostExpensive.factor) - calc(best.factor)) * 12}€/an en changeant d'assureur.`}`,
    cta: CTA,
  });
}
