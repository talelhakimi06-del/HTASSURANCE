import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownContent from "../components/MarkdownContent";
import type { Post, PostMeta, Category } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const VALID_CATEGORIES: Category[] = [
  "Décennale",
  "Assurance VTC",
  "RC Pro",
  "Assurance emprunteur",
  "Habitation",
  "Sinistres",
];

function normalizeCategory(raw: unknown): Category {
  if (typeof raw === "string") {
    const found = VALID_CATEGORIES.find(
      (c) => c.toLowerCase() === raw.toLowerCase()
    );
    if (found) return found;
  }
  return "Sinistres";
}

function buildMeta(slug: string, data: Record<string, unknown>): PostMeta {
  const titleStr =
    typeof data.title === "string" ? data.title : "Article HT Assurance";
  const seoTitle =
    typeof data.seoTitle === "string"
      ? data.seoTitle
      : `${titleStr} | HT Assurance`;
  const description =
    typeof data.description === "string"
      ? data.description
      : typeof data.metaDescription === "string"
      ? data.metaDescription
      : "";
  const date =
    typeof data.date === "string"
      ? data.date
      : new Date().toISOString().slice(0, 10);
  const readTime =
    typeof data.readTime === "string" ? data.readTime : "6 min";

  let image = { src: "/blog/default.jpg", alt: titleStr };
  if (
    data.image &&
    typeof data.image === "object" &&
    "src" in (data.image as Record<string, unknown>)
  ) {
    const img = data.image as { src: unknown; alt?: unknown };
    image = {
      src: typeof img.src === "string" ? img.src : "/blog/default.jpg",
      alt: typeof img.alt === "string" ? img.alt : titleStr,
    };
  }

  return {
    slug,
    title: titleStr,
    seoTitle,
    description,
    category: normalizeCategory(data.category ?? data.categorie),
    date,
    readTime,
    image,
  };
}

export function getMdPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md") && f !== "README.md");

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const slugFromFile = file.replace(/\.md$/, "");
    const slug =
      typeof data.slug === "string" && data.slug.length > 0
        ? data.slug
        : slugFromFile;
    const meta = buildMeta(slug, data);
    const Content = () => MarkdownContent({ markdown: content });
    return { ...meta, Content };
  });
}
