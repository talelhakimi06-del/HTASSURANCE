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

  const url = `https://www.htassurance.fr/blog/${slug}`;
  const imageUrl = meta.image?.src?.startsWith("http")
    ? meta.image.src
    : `https://www.htassurance.fr${meta.image?.src ?? "/opengraph-image.png"}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: meta.title,
        description: meta.description,
        image: imageUrl,
        datePublished: meta.date,
        dateModified: meta.date,
        articleSection: meta.category,
        inLanguage: "fr-FR",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Person", name: "Talel Hakimi", url: "https://www.htassurance.fr" },
        publisher: {
          "@type": "Organization",
          name: "HT Assurance",
          logo: { "@type": "ImageObject", url: "https://www.htassurance.fr/logo.png" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.htassurance.fr" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.htassurance.fr/blog" },
          { "@type": "ListItem", position: 3, name: meta.title, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout meta={meta}>
        <Content />
      </ArticleLayout>
    </>
  );
}
