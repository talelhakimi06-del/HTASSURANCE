import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HT Assurance — Courtier en assurance à Nice | Audit gratuit",
  description:
    "HT Assurance, courtier indépendant à Nice. Assurance décennale, emprunteur, RC Pro, habitation, auto. Audit gratuit de vos contrats, accompagnement personnalisé. Intervient à Nice, Cannes, Antibes, Monaco et partout en France.",
  keywords:
    "courtier assurance Nice, assurance décennale Nice, assurance emprunteur Nice, RC Pro Nice, multirisque professionnelle, audit assurance gratuit, cabinet courtage Nice, Côte d'Azur, Cannes, Antibes, Monaco",
  openGraph: {
    title: "HT Assurance — Courtier indépendant à Nice",
    description:
      "Un vrai courtier indépendant qui compare les meilleures assurances pour vous. Audit gratuit, accompagnement personnalisé, dossiers complexes acceptés.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
