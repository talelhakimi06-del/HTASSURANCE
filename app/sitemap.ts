import type { MetadataRoute } from "next";

const BASE = "https://www.htassurance.fr";

const blogSlugs = [
  "assurance-decennale-auto-entrepreneur",
  "assurance-decennale-etancheite",
  "assurance-decennale-sans-experience",
  "assurance-emprunteur-moins-chere",
  "assurance-locataire-obligatoire",
  "assurance-pno-definition",
  "assurance-vtc-obligatoire",
  "assurance-vtc-pas-chere",
  "assurance-vtc-resilie",
  "assurance-vtc-uber-chauffeur",
  "changer-assurance-emprunteur",
  "courtier-assurance-decennale-nice",
  "degat-des-eaux-assurance-que-faire",
  "meilleure-assurance-vtc",
  "prix-assurance-decennale-artisan",
  "rc-pro-auto-entrepreneur",
  "rc-pro-consultant",
  "rc-pro-freelance",
  "rc-pro-restaurant",
  "refus-assurance-emprunteur-que-faire",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const pages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/comparateur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/sinistres`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...blogPages];
}
