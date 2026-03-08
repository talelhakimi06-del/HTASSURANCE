import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Comparateur Assurance — HT Assurance Nice",
  description:
    "Comparez vos assurances en 2 minutes avec l'assistant intelligent de HT Assurance. Décennale, RC Pro, VTC, emprunteur, habitation, auto.",
  keywords: [
    "comparateur assurance Nice",
    "devis assurance en ligne",
    "courtier assurance Nice",
    "assurance décennale",
    "RC Pro freelance",
    "assurance VTC",
  ],
  openGraph: {
    title: "Comparateur Assurance — HT Assurance",
    description: "Trouvez la meilleure assurance en 2 minutes avec notre assistant IA.",
    url: "https://comparateur.horstaxeassurance.fr",
    siteName: "HT Assurance",
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
