import type { MetadataRoute } from "next";
import { getAllMeta } from "./blog/lib/posts";

const BASE = "https://www.htassurance.fr";

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
    {
      url: `${BASE}/gpt-comparateur`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = getAllMeta().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...blogPages];
}
