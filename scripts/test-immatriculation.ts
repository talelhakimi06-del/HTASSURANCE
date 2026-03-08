/**
 * Script de test — API Immatriculation
 * Utilise la plaque GRATUITE Eg258ma (ne consomme aucun crédit)
 *
 * Usage : npx tsx scripts/test-immatriculation.ts
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import {
  lookupVehicleFrance,
  getCreditsBalance,
  toVehicleSummary,
} from "../lib/services/immatriculationService";

async function main() {
  console.log("=".repeat(60));
  console.log("  TEST API IMMATRICULATION — HT Assurance");
  console.log("=".repeat(60));

  // 1. Vérifier le solde
  console.log("\n📊 Vérification du solde de crédits...");
  try {
    const credits = await getCreditsBalance();
    console.log(`   Crédits disponibles : ${credits}`);
    if (credits < 10) {
      console.warn("   ⚠️  Solde faible ! Recharger le compte htassurance.");
    }
  } catch (err) {
    console.error("   Impossible de vérifier le solde :", err);
  }

  // 2. Test avec la plaque GRATUITE (ne consomme pas de crédit)
  const TEST_PLATE = "Eg258ma";
  console.log(`\n🚗 Lookup plaque de test GRATUITE : ${TEST_PLATE}`);

  try {
    const raw = await lookupVehicleFrance(TEST_PLATE);
    const v = toVehicleSummary(raw, TEST_PLATE);

    console.log("\n─── Données brutes ───────────────────────────────────");
    console.log("Description    :", raw.Description);
    console.log("Marque         :", raw.CarMake?.CurrentTextValue);
    console.log("Modèle         :", raw.CarModel?.CurrentTextValue);
    console.log("Année          :", raw.RegistrationYear);
    console.log("Carburant      :", raw.FuelType?.CurrentTextValue);
    console.log("Carrosserie    :", raw.BodyStyle?.CurrentTextValue);
    console.log("Cylindrée      :", raw.ExtendedData?.EngineCC, "cc");
    console.log("Puissance      :", raw.ExtendedData?.puissanceDyn, "ch");
    console.log("CO2            :", raw.ExtendedData?.Co2, "g/km");
    console.log("Boîte          :", raw.ExtendedData?.boiteDeVitesse);
    console.log("VIN            :", raw.ExtendedData?.numSerieMoteur);
    console.log("1ère immat     :", raw.ExtendedData?.datePremiereMiseCirculation);
    console.log("Finition       :", raw.ExtendedData?.libVersion);
    console.log("Image          :", raw.ImageUrl);
    console.log("Électrique     :", raw.ExtendedData?.electrique);

    console.log("\n─── Résumé formaté (VehicleSummary) ─────────────────");
    console.log("resume         :", v.resume);
    console.log("contextIA      :\n" + v.contextIA);

    console.log("\n✅ Test réussi — API opérationnelle");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("\n❌ Erreur :", msg);
    process.exit(1);
  }

  console.log("\n" + "=".repeat(60));
}

main();
