import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://comparateur.horstaxeassurance.fr";
  const lastModified = new Date("2026-03-19");

  const articles = [
    "assurance-auto",
    "assurance-vtc",
    "assurance-habitation",
    "assurance-decennale",
    "assurance-pharmacien",
    "assurance-emprunteur",
    "rc-pro-freelance",
    "mutuelle-sante",
    "multirisque-professionnelle",
  ];

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
