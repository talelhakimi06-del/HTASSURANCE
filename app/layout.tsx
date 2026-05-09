import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-SLL7N7KBG7";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  verification: {
    google: "3S6h4AdZUMAQBNUTbaQog2xA_HBpmmPw0FSkAaGlqYA",
  },
  title: "HT Assurance — Courtier en assurance à Nice | Audit gratuit",
  description:
    "HT Assurance, courtier indépendant à Nice. Assurance décennale, emprunteur, RC Pro, habitation, auto. Audit gratuit de vos contrats, accompagnement personnalisé. Intervient à Nice, Cannes, Antibes, Monaco et partout en France.",
  keywords:
    "courtier assurance Nice, assurance décennale Nice, assurance emprunteur Nice, RC Pro Nice, multirisque professionnelle, audit assurance gratuit, cabinet courtage Nice, Côte d'Azur, Cannes, Antibes, Monaco",
  alternates: {
    canonical: "https://www.htassurance.fr",
  },
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
      <head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.htassurance.fr/#organization",
                  name: "HT Assurance",
                  url: "https://www.htassurance.fr",
                  logo: "https://www.htassurance.fr/logo.png",
                  description:
                    "Cabinet de courtage en assurance indépendant à Nice. Décennale, emprunteur, RC Pro, habitation, auto, contestation de sinistres refusés.",
                  email: "talelhakimi06@gmail.com",
                  telephone: "+33986113257",
                  founder: { "@type": "Person", name: "Talel Hakimi" },
                  sameAs: [
                    "https://wa.me/33986113257",
                    "https://www.google.com/search?q=HT+Assurance+Nice",
                  ],
                },
                {
                  "@type": ["LocalBusiness", "InsuranceAgency", "FinancialService"],
                  "@id": "https://www.htassurance.fr/#localbusiness",
                  name: "HT Assurance",
                  image: "https://www.htassurance.fr/logo.png",
                  url: "https://www.htassurance.fr",
                  telephone: "+33986113257",
                  priceRange: "Gratuit",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Nice",
                    addressRegion: "Alpes-Maritimes",
                    postalCode: "06000",
                    addressCountry: "FR",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 43.7102,
                    longitude: 7.262,
                  },
                  areaServed: [
                    { "@type": "City", name: "Nice" },
                    { "@type": "City", name: "Cannes" },
                    { "@type": "City", name: "Antibes" },
                    { "@type": "City", name: "Monaco" },
                    { "@type": "Country", name: "France" },
                  ],
                  openingHoursSpecification: [
                    {
                      "@type": "OpeningHoursSpecification",
                      dayOfWeek: [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                      ],
                      opens: "10:00",
                      closes: "19:00",
                    },
                  ],
                  serviceType: [
                    "Courtage en assurance",
                    "Assurance décennale",
                    "Assurance emprunteur",
                    "RC Pro",
                    "Assurance habitation",
                    "Assurance auto",
                    "Contestation de sinistre refusé",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.htassurance.fr/#website",
                  url: "https://www.htassurance.fr",
                  name: "HT Assurance",
                  inLanguage: "fr-FR",
                  publisher: { "@id": "https://www.htassurance.fr/#organization" },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
