import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Sinistre refusé par votre assurance ? Contestation gratuite | HT Assurance",
  description:
    "Votre assurance refuse votre sinistre ? Analyse gratuite sous 48h, 0€ si on ne gagne pas. Dégât des eaux, incendie, vol, catastrophe naturelle, fissures, auto, RC Pro. Courtier expert à Nice.",
  keywords:
    "sinistre refusé, assurance refuse sinistre, contestation assurance, recours sinistre, expertise contradictoire, médiateur assurance, courtier sinistre Nice",
  openGraph: {
    title: "Sinistre refusé ? On conteste gratuitement | HT Assurance",
    description:
      "Analyse gratuite sous 48h. 0€ si on ne gagne pas. Expert en contestation de refus d'assurance à Nice.",
    locale: "fr_FR",
    type: "website",
  },
  alternates: {
    canonical: "https://www.htassurance.fr/sinistres",
  },
};

export default function SinistresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
