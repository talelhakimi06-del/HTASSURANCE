import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Comparateur d'assurance IA gratuit — ELIA by HT Assurance",
  description:
    "Comparez les assurances en 30 secondes avec ELIA, notre IA spécialisée. Habitation, auto, santé, décennale, RC Pro. Devis personnalisé et rappel sous 24h par un courtier indépendant à Nice.",
  keywords:
    "comparateur assurance IA, comparer assurance en ligne, devis assurance gratuit, ChatGPT assurance, courtier assurance Nice",
  openGraph: {
    title: "ELIA — Comparateur d'assurance IA gratuit | HT Assurance",
    description:
      "Comparez les offres de 10+ assureurs français en 30 secondes grâce à l'IA. Devis gratuit, courtier indépendant.",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.htassurance.fr/gpt-comparateur",
  },
};

export default function GptComparateurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
