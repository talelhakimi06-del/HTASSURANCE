import { NextRequest, NextResponse } from "next/server";
import { checkGptAuth, unauthorized, logToKv, CTA } from "../_lib";

export const maxDuration = 30;

type Body = { question: string };

const KNOWLEDGE: Record<string, { explication: string; exemple: string; conseil: string }> = {
  franchise: {
    explication: "La franchise est la somme qui reste à votre charge après un sinistre. C'est la partie que l'assureur ne rembourse pas. Elle existe pour éviter les petites réclamations et permet de réduire le montant de votre prime.",
    exemple: "Vous avez un dégât des eaux de 2 000€ avec une franchise de 150€. L'assureur vous rembourse 1 850€, les 150€ restent à votre charge.",
    conseil: "Comparez les franchises entre assureurs — une prime basse peut cacher une franchise élevée. Pour l'habitation, visez 150€ max. Pour l'auto, 300-500€ est standard en tous risques.",
  },
  tiers: {
    explication: "L'assurance au tiers (RC) est le minimum légal obligatoire. Elle couvre uniquement les dommages que vous causez aux autres (responsabilité civile). Vos propres dommages ne sont PAS couverts. L'assurance tous risques couvre en plus vos propres dommages même si vous êtes responsable.",
    exemple: "Vous percutez un poteau : au tiers, le poteau est remboursé mais pas votre voiture. En tous risques, les deux sont remboursés.",
    conseil: "Pour un véhicule de moins de 5 ans ou valant plus de 10 000€, le tous risques est rentable. Au-delà de 8-10 ans, le tiers confort (tiers + vol + incendie + bris de glace) est souvent le meilleur compromis.",
  },
  bonus: {
    explication: "Le coefficient bonus-malus (CRM) récompense les bons conducteurs. Il démarre à 1.00, descend de 5% par an sans sinistre (minimum 0.50 après 13 ans), et augmente de 25% par sinistre responsable (maximum 3.50).",
    exemple: "Avec un bonus de 0.50 (le maximum), une prime de base de 1 000€ ne vous coûte que 500€. Avec un malus de 2.00 après des sinistres, elle monte à 2 000€.",
    conseil: "Un seul sinistre responsable peut vous coûter 2 à 3 ans de bonus. Avant de déclarer un petit sinistre, calculez si ça vaut le coup par rapport à la perte de bonus. HT Assurance accepte les profils malussés.",
  },
  decennale: {
    explication: "La garantie décennale est une assurance obligatoire pour tous les professionnels du bâtiment. Elle couvre pendant 10 ans les dommages qui compromettent la solidité de l'ouvrage ou le rendent impropre à sa destination. C'est l'article 1792 du Code civil.",
    exemple: "Un maçon construit un mur porteur qui fissure au bout de 3 ans, menaçant la structure. La décennale du maçon prend en charge les réparations, même si l'entreprise a fermé entre-temps.",
    conseil: "Vérifiez TOUJOURS l'attestation décennale avant de confier des travaux. Sans elle, c'est vous qui payez en cas de malfaçon. Les tarifs varient du simple au triple selon le corps de métier.",
  },
  emprunteur: {
    explication: "L'assurance emprunteur couvre le remboursement de votre crédit immobilier en cas de décès, invalidité ou arrêt de travail. Elle n'est pas légalement obligatoire mais toutes les banques l'exigent. Depuis la loi Lemoine (2022), vous pouvez en changer à tout moment sans frais.",
    exemple: "Sur un prêt de 200 000€ sur 20 ans, passer d'un contrat groupe bancaire (0.36%) à une délégation individuelle (0.15%) économise environ 8 400€.",
    conseil: "Ne prenez JAMAIS le contrat groupe de votre banque sans comparer. La délégation individuelle (April, Swiss Life, Generali) coûte 30 à 50% moins cher. HT Assurance négocie les meilleures délégations.",
  },
  catnat: {
    explication: "La garantie catastrophe naturelle (CatNat) couvre les dommages causés par un événement naturel exceptionnel : inondation, sécheresse, tremblement de terre, coulée de boue. Elle est automatiquement incluse dans tout contrat habitation ou auto.",
    exemple: "La sécheresse provoque des fissures sur votre maison (retrait-gonflement des argiles). Si un arrêté CatNat est publié pour votre commune, votre assurance prend en charge les réparations, avec une franchise légale de 1 520€.",
    conseil: "Vérifiez si votre commune est en zone à risque sur georisques.gouv.fr. En PACA, le risque sécheresse et inondation est élevé. Déclarez le sinistre dans les 10 jours suivant la publication de l'arrêté.",
  },
};

export async function POST(req: NextRequest) {
  if (!checkGptAuth(req)) return unauthorized();

  const body: Body = await req.json();
  await logToKv("explain-insurance", body);

  const q = (body.question || "").toLowerCase();

  // Find best match in knowledge base
  let match = Object.entries(KNOWLEDGE).find(([key]) => q.includes(key));
  if (!match && q.includes("tous risques")) match = ["tiers", KNOWLEDGE.tiers];
  if (!match && (q.includes("bonus") || q.includes("malus") || q.includes("crm"))) match = ["bonus", KNOWLEDGE.bonus];
  if (!match && (q.includes("catastrophe") || q.includes("catnat") || q.includes("inondation") || q.includes("secheresse"))) match = ["catnat", KNOWLEDGE.catnat];
  if (!match && (q.includes("pret") || q.includes("credit") || q.includes("lemoine"))) match = ["emprunteur", KNOWLEDGE.emprunteur];

  if (match) {
    const [, data] = match;
    return NextResponse.json({
      explication: data.explication,
      exemple_concret: data.exemple,
      conseil: data.conseil,
      cta: CTA,
    });
  }

  // Generic fallback
  return NextResponse.json({
    explication: `Bonne question ! "${body.question}" est un sujet qui mérite une réponse personnalisée selon votre situation. L'assurance est pleine de subtilités et chaque cas est différent.`,
    exemple_concret: "Pour une réponse précise adaptée à votre profil, un courtier indépendant comme HT Assurance peut analyser gratuitement votre situation et vous expliquer concrètement ce qui s'applique à vous.",
    conseil: "N'hésitez pas à poser la question directement à Talel, courtier chez HT Assurance. L'analyse est gratuite et sans engagement.",
    cta: CTA,
  });
}
