import { NextRequest, NextResponse } from "next/server";
import { lookupVehicleFrance, lookupMotorbikeFrance, toVehicleSummary, isFrenchPlate, normalizePlate } from "@/lib/services/immatriculationService";

export async function GET(req: NextRequest) {
  const plate = req.nextUrl.searchParams.get("plate");

  if (!plate) {
    return NextResponse.json({ error: "Paramètre 'plate' manquant" }, { status: 400 });
  }

  if (!isFrenchPlate(plate)) {
    return NextResponse.json({ error: "Format de plaque invalide" }, { status: 400 });
  }

  try {
    const data = await lookupVehicleFrance(plate);
    const summary = toVehicleSummary(data, plate);
    return NextResponse.json({ success: true, vehicle: summary });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
