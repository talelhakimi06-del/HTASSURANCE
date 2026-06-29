import { NextRequest, NextResponse } from "next/server";
import { checkGptAuth, unauthorized, logToKv, CTA } from "../_lib";

export const maxDuration = 30;

type Body = {
  statut: "locataire" | "proprietaire" | "coproprio";
  surface: number;
  ville: string;
  code_postal: string;
  valeur_mobilier: number;
  nb_pieces: number;
  options: string[];
};

export async function POST(req: NextRequest) {
  if (!checkGptAuth(req)) return unauthorized();

  const body: Body = await req.json();
  await logToKv("compare-habitation", body);

  const isPaca = body.code_postal?.startsWith("06") || body.code_postal?.startsWith("13") || body.code_postal?.startsWith("83");
  const zoneMultiplier = isPaca ? 1.1 : 1;
  const isProprio = body.statut === "proprietaire";
  const surfaceMultiplier = body.surface > 100 ? 1.4 : body.surface > 60 ? 1.15 : 1;

  const base = isProprio ? 22 : 13;
  const calc = (factor: number) => Math.round(base * surfaceMultiplier * zoneMultiplier * factor);

  const offres = [
    { assureur: "Luko by Allianz", factor: 0.85, note: 8.8, ideal: "Meilleur rapport qualité/prix, souscription 100% en ligne", forts: ["Remboursement 2x plus rapide", "0€ de franchise optionnelle", "Appli mobile 5 étoiles"], garanties: ["RC vie privée", "Dégât des eaux", "Incendie", "Vol", "Bris de glace", "Catastrophes naturelles"] },
    { assureur: "AXA", factor: 1.1, note: 8.5, ideal: "Couverture premium, réseau d'experts le plus large", forts: ["Réseau 5 000 experts", "Assistance 24h/24", "Garantie rééquipement à neuf"], garanties: ["RC vie privée", "Dégât des eaux", "Incendie", "Vol", "Bris de glace", "Catastrophes naturelles", "Protection juridique"] },
    { assureur: "Direct Assurance", factor: 0.75, note: 7.5, ideal: "Budget serré, couverture essentielle", forts: ["Prix le plus bas du marché", "Souscription en 5 min", "Sans engagement"], garanties: ["RC vie privée", "Dégât des eaux", "Incendie", "Catastrophes naturelles"] },
    { assureur: "MAAF", factor: 0.95, note: 8.2, ideal: "Familles, bon équilibre garanties/prix", forts: ["Indemnisation rapide", "Conseiller dédié", "Multi-contrats -15%"], garanties: ["RC vie privée", "Dégât des eaux", "Incendie", "Vol", "Bris de glace", "Catastrophes naturelles"] },
    { assureur: "Groupama", factor: 1.0, note: 8.0, ideal: "Propriétaires en zone rurale ou PACA", forts: ["Fort réseau local PACA", "Garantie jardins/dépendances", "Protection sécheresse"], garanties: ["RC vie privée", "Dégât des eaux", "Incendie", "Vol", "Catastrophes naturelles", "Jardin/dépendances"] },
  ];

  const sorted = offres.sort((a, b) => calc(a.factor) - calc(b.factor));
  const best = sorted[0];

  return NextResponse.json({
    meilleure_offre: {
      assureur: best.assureur,
      prix_mensuel: calc(best.factor),
      prix_annuel: calc(best.factor) * 12,
      points_forts: best.forts,
      garanties: best.garanties,
    },
    comparatif: sorted.map((o) => ({
      assureur: o.assureur,
      prix_mensuel: calc(o.factor),
      note: o.note,
      ideal_pour: o.ideal,
    })),
    conseil_talel: `Pour un ${body.statut} de ${body.surface}m² à ${body.ville}${isPaca ? " (zone PACA, +10% vol/inondation)" : ""}, je recommande ${best.assureur} pour le meilleur rapport qualité/prix. ${isProprio ? "En tant que propriétaire, vérifiez bien la garantie dommages au bâtiment et la valeur de reconstruction." : "Vérifiez que la garantie recours des voisins est bien incluse."} HT Assurance négocie pour vous les meilleures conditions.`,
    cta: CTA,
  });
}
