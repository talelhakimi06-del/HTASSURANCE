import { NextRequest, NextResponse } from "next/server";
import {
  lookupVehicleFrance,
  toVehicleSummary,
  isFrenchPlate,
} from "../../../../lib/services/immatriculationService";

export const maxDuration = 15;

export { isFrenchPlate };

export async function GET(req: NextRequest) {
  const plaque = req.nextUrl.searchParams.get("plaque");

  if (!plaque) {
    return NextResponse.json({ error: "Paramètre 'plaque' requis" }, { status: 400 });
  }

  const clean = plaque.toUpperCase().replace(/[\s\-\.]/g, "");

  if (!isFrenchPlate(clean)) {
    return NextResponse.json(
      { error: `Format de plaque non reconnu : ${plaque}` },
      { status: 400 }
    );
  }

  try {
    const raw = await lookupVehicleFrance(clean);
    const data = toVehicleSummary(raw, clean);
    return NextResponse.json({ ok: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/comparateur/api/immat]", message);

    if (message.includes("non trouvé")) {
      return NextResponse.json({ error: message }, { status: 404 });
    }
    if (message.includes("Crédits")) {
      return NextResponse.json({ error: message }, { status: 402 });
    }
    if (message.includes("Username") || message.includes("username")) {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json(
      { error: `Erreur lookup plaque : ${message.slice(0, 120)}` },
      { status: 502 }
    );
  }
}
