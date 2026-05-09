import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getAllMeta } from "../lib/posts";
import ArticleLayout from "../components/ArticleLayout";

type Props = { params: Promise<{ slug: string }> };

/* ── Static params for all 20 articles ── */
export async function generateStaticParams() {
  return getAllMeta().map((p) => ({ slug: p.slug }));
}

/* ── Per-article SEO metadata ── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const canonical = `https://www.htassurance.fr/blog/${slug}`;
  return {
    title: post.seoTitle,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.description,
      url: canonical,
      type: "article",
      locale: "fr_FR",
    },
  };
}

/* ── Article page ── */
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { Content, ...meta } = post;

  return (
    <ArticleLayout meta={meta}>
      <Content />
    </ArticleLayout>
  );
}
