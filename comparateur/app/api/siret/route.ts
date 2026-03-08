import { NextRequest, NextResponse } from "next/server";
import type { SiretData } from "@/lib/types";

export async function GET(req: NextRequest) {
  const siret = req.nextUrl.searchParams.get("siret");

  if (!siret) {
    return NextResponse.json({ error: "SIRET requis" }, { status: 400 });
  }

  const clean = siret.replace(/\s/g, "");
  if (clean.length !== 14 || !/^\d+$/.test(clean)) {
    return NextResponse.json({ error: "Format SIRET invalide (14 chiffres attendus)" }, { status: 400 });
  }

  try {
    // API recherche-entreprises (data.gouv.fr) — pas de clé API nécessaire
    const url = `https://recherche-entreprises.api.gouv.fr/search?q=${clean}&page=1&per_page=1`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // Cache 1h
    });

    if (!res.ok) {
      throw new Error(`API data.gouv status: ${res.status}`);
    }

    const data = await res.json();
    const result = data?.results?.[0];

    if (!result) {
      return NextResponse.json({ error: "Entreprise non trouvée pour ce SIRET" }, { status: 404 });
    }

    // Trouver l'établissement correspondant au SIRET exact
    const etablissement = result.matching_etablissements?.[0] ?? result.siege;

    const siretData: SiretData = {
      siret: clean,
      nom: result.nom_raison_sociale ?? result.nom_complet ?? "Nom inconnu",
      adresse: [
        etablissement?.numero_voie,
        etablissement?.type_voie,
        etablissement?.libelle_voie,
        etablissement?.code_postal,
        etablissement?.libelle_commune,
      ]
        .filter(Boolean)
        .join(" "),
      codeNaf: result.activite_principale ?? "N/A",
      activite: result.libelle_activite_principale ?? "Activité non renseignée",
      dateCreation: result.date_creation ?? "",
      effectif: result.tranche_effectif_salarie ?? undefined,
    };

    return NextResponse.json({ data: siretData });
  } catch (err) {
    console.error("[/api/siret] Erreur:", err);
    return NextResponse.json(
      { error: "Impossible de récupérer les informations de l'entreprise" },
      { status: 502 }
    );
  }
}
