import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const BASE_URL = "https://comparateur.horstaxeassurance.fr";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
    "assurance emprunteur Nice",
    "assurance habitation Nice",
    "assurance auto Nice",
    "courtier assurance Alpes-Maritimes",
  ],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Comparateur Assurance — HT Assurance Nice",
    description: "Trouvez la meilleure assurance en 2 minutes avec notre assistant IA. Courtier indépendant à Nice.",
    url: BASE_URL,
    siteName: "HT Assurance",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HT Assurance — Courtier à Nice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparateur Assurance — HT Assurance Nice",
    description: "Trouvez la meilleure assurance en 2 minutes avec notre assistant IA.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: "HT Assurance",
  description: "Courtier en assurance indépendant à Nice. Décennale, RC Pro, VTC, emprunteur, habitation, auto.",
  url: BASE_URL,
  telephone: "+33-X-XX-XX-XX-XX",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nice",
    addressRegion: "Alpes-Maritimes",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 43.7102,
      longitude: 7.262,
    },
    geoRadius: "50000",
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={geist.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Google Tag Manager ─────────────────────────────────── */}
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}

        {/* ── Google Analytics GA4 ───────────────────────────────── */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:true});`}
            </Script>
          </>
        )}

        {/* ── Meta Pixel (Facebook) ──────────────────────────────── */}
        {META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
          </Script>
        )}
      </head>
      <body className="font-sans antialiased">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
