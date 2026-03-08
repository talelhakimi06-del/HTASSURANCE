import axios from "axios";
import { parseStringPromise } from "xml2js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VehicleData {
  Description: string;
  RegistrationYear: string;
  CarMake: { CurrentTextValue: string };
  CarModel: { CurrentTextValue: string };
  EngineSize: { CurrentTextValue: string };
  FuelType: { CurrentTextValue: string };
  MakeDescription: { CurrentTextValue: string };
  ModelDescription: { CurrentTextValue: string };
  BodyStyle?: { CurrentTextValue: string };
  RegistrationDate?: string;
  ImageUrl?: string;
  ExtendedData?: {
    anneeSortie?: string;
    boiteDeVitesse?: string;
    libVersion?: string;
    libelleModele?: string;
    nbPlace?: string;
    datePremiereMiseCirculation?: string;
    numSerieMoteur?: string;
    puissanceDyn?: string;
    Co2?: string;
    EngineCC?: string;
    Cylinders?: string;
    CNIT?: string;
    KtypeId?: string;
    electrique?: string;
    niveauRisqueVol?: string;
    valeurANeufSRA?: string;
  };
  rawVehicleJson?: string;
}

// ─── Résumé formaté pour le chat ELIA ────────────────────────────────────────

export interface VehicleSummary {
  plate: string;
  marque: string;
  modele: string;
  description: string;
  annee: string;
  carburant: string;
  carrosserie: string;
  puissance: string;
  boite: string;
  cylindree: string;
  co2: string;
  vin: string;
  places: string;
  imageUrl: string;
  electrique: boolean;
  // Résumé texte court pour affichage dans la card
  resume: string;
  // Contexte injecté dans le prompt ELIA
  contextIA: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[\s\-\.]/g, "");
}

// Garde l'alias interne
const normalizeplate = normalizePlate;

// ─── Validation format plaque française ──────────────────────────────────────

export function isFrenchPlate(raw: string): boolean {
  const clean = normalizePlate(raw);
  // SIV : 2 lettres + 3 chiffres + 2 lettres (ex: AB123CD)
  if (/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(clean)) return true;
  // Ancien format : 1-4 chiffres + 2-3 lettres + 2 chiffres (ex: 123AB75)
  if (/^\d{1,4}[A-Z]{2,3}\d{2}$/.test(clean)) return true;
  return false;
}

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function formatDate(ddmmyyyy: string): string {
  if (!ddmmyyyy || ddmmyyyy.length < 8) return ddmmyyyy;
  return `${ddmmyyyy.slice(0, 2)}/${ddmmyyyy.slice(2, 4)}/${ddmmyyyy.slice(4)}`;
}

// ─── Convertit VehicleData brute en VehicleSummary utilisable ────────────────

export function toVehicleSummary(data: VehicleData, plate: string): VehicleSummary {
  const ext = data.ExtendedData ?? {};
  const marque = str(data.CarMake?.CurrentTextValue) || str(data.MakeDescription?.CurrentTextValue);
  const modele = str(data.CarModel?.CurrentTextValue) || str(data.ModelDescription?.CurrentTextValue);
  const annee = str(data.RegistrationYear) || str(ext.anneeSortie);
  const carburant = str(data.FuelType?.CurrentTextValue);
  const carrosserie = str(data.BodyStyle?.CurrentTextValue);
  const puissance = str(ext.puissanceDyn) ? `${ext.puissanceDyn} ch` : str(data.EngineSize?.CurrentTextValue);
  const boite = str(ext.boiteDeVitesse);
  const cylindree = str(ext.EngineCC) ? `${ext.EngineCC} cc` : "";
  const co2 = str(ext.Co2) ? `${ext.Co2} g/km` : "";
  const vin = str(ext.numSerieMoteur);
  const places = str(ext.nbPlace);
  const imageUrl = str(data.ImageUrl);
  const electrique = ext.electrique === "O" || carburant.toLowerCase().includes("electr");
  const version = str(ext.libVersion);

  const resume = [marque, modele, annee, carburant, carrosserie]
    .filter(Boolean)
    .join(" · ");

  const contextIA = [
    `[Véhicule identifié via plaque ${normalizeplate(plate)}]`,
    `Marque : ${marque}`,
    `Modèle : ${modele}${version ? ` — ${version}` : ""}`,
    `Année : ${annee}`,
    `Carburant : ${carburant}`,
    carrosserie && `Carrosserie : ${carrosserie}`,
    puissance && `Puissance : ${puissance}`,
    boite && `Boîte : ${boite}`,
    cylindree && `Cylindrée : ${cylindree}`,
    co2 && `CO₂ : ${co2}`,
    places && `Places : ${places}`,
    electrique && `Véhicule électrique : Oui`,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    plate: normalizeplate(plate),
    marque,
    modele,
    description: str(data.Description),
    annee,
    carburant,
    carrosserie,
    puissance,
    boite,
    cylindree,
    co2,
    vin,
    places,
    imageUrl,
    electrique,
    resume,
    contextIA,
  };
}

// ─── Lookup voiture France ────────────────────────────────────────────────────

export async function lookupVehicleFrance(plateNumber: string): Promise<VehicleData> {
  const plate = normalizeplate(plateNumber);
  const username = process.env.IMMATRICULATION_API_USERNAME;
  const baseUrl = process.env.IMMATRICULATION_API_URL ?? "https://www.regcheck.org.uk/api/reg.asmx";

  if (!username) throw new Error("IMMATRICULATION_API_USERNAME manquant dans les variables d'environnement");

  console.log(`[immat] Lookup plaque France : ${plate}`);

  const response = await axios.get(`${baseUrl}/CheckFrance`, {
    params: { RegistrationNumber: plate, username },
    headers: { Accept: "text/xml" },
    timeout: 10000,
  });

  const parsed = await parseStringPromise(response.data, { explicitArray: false });
  const vehicleJsonStr: string = parsed?.Vehicle?.vehicleJson ?? "";

  if (!vehicleJsonStr || vehicleJsonStr.trim() === "") {
    throw new Error(`Véhicule non trouvé pour la plaque : ${plate}`);
  }

  if (vehicleJsonStr.toLowerCase().includes("no credits")) {
    throw new Error("Crédits API épuisés. Recharger le compte htassurance sur regcheck.org.uk.");
  }

  if (vehicleJsonStr.toLowerCase().includes("invalid username") || vehicleJsonStr.toLowerCase().includes("login failed")) {
    throw new Error("Username API invalide. Vérifier IMMATRICULATION_API_USERNAME.");
  }

  const vehicleData: VehicleData = JSON.parse(vehicleJsonStr);
  vehicleData.rawVehicleJson = vehicleJsonStr;
  return vehicleData;
}

// ─── Lookup moto France ───────────────────────────────────────────────────────

export async function lookupMotorbikeFrance(plateNumber: string): Promise<VehicleData> {
  const plate = normalizeplate(plateNumber);
  const username = process.env.IMMATRICULATION_API_USERNAME;

  if (!username) throw new Error("IMMATRICULATION_API_USERNAME manquant dans les variables d'environnement");

  console.log(`[immat] Lookup plaque Moto France : ${plate}`);

  const response = await axios.get(
    "https://www.immatriculationapi.com/api/bespokeapi.asmx/CheckMotorBikeFrance",
    {
      params: { RegistrationNumber: plate, username },
      headers: { Accept: "text/xml" },
      timeout: 10000,
    }
  );

  const parsed = await parseStringPromise(response.data, { explicitArray: false });
  const vehicleJsonStr: string = parsed?.Vehicle?.vehicleJson ?? "";

  if (!vehicleJsonStr || vehicleJsonStr.trim() === "") {
    throw new Error(`Moto non trouvée pour la plaque : ${plate}`);
  }

  if (vehicleJsonStr.toLowerCase().includes("no credits")) {
    throw new Error("Crédits API épuisés. Recharger le compte htassurance sur regcheck.org.uk.");
  }

  const vehicleData: VehicleData = JSON.parse(vehicleJsonStr);
  vehicleData.rawVehicleJson = vehicleJsonStr;
  return vehicleData;
}

// ─── Solde de crédits ─────────────────────────────────────────────────────────

export async function getCreditsBalance(): Promise<number> {
  const username = process.env.IMMATRICULATION_API_USERNAME ?? "htassurance";
  const response = await axios.get(
    `https://www.regcheck.org.uk/ajax/getcredits.aspx?username=${username}`,
    { timeout: 5000 }
  );
  const value = parseInt(String(response.data).trim(), 10);
  return isNaN(value) ? 0 : value;
}
