import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { saveArticle, getAgentFlag } from "@/lib/memory";

export const maxDuration = 300;

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
const BASE = "https://www.htassurance.fr";

const VALID_CATEGORIES = [
  "Sinistres",
  "Décennale",
  "Assurance VTC",
  "RC Pro",
  "Assurance emprunteur",
  "Habitation",
] as const;

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function callClaude(apiKey: string, system: string, user: string, maxTokens: number) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Claude API ${res.status}: ${JSON.stringify(data).slice(0, 500)}`);
  }
  return data.content?.[0]?.text ?? "";
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);
    const catnatTopic = await getAgentFlag("catnat_article_topic");

    /* ── Step 1 : choisir un sujet ─────────────────────────── */
    const topicText = await callClaude(
      apiKey,
      `Tu es stratège SEO/AEO pour HT Assurance (htassurance.fr), courtier indépendant à Nice spécialisé en contestation de refus de sinistre.
${catnatTopic ? `PRIORITÉ ABSOLUE : ${catnatTopic}. Écris dessus.` : "Choisis un sujet longue traîne transactionnel sur les refus de sinistre, expertise contradictoire, médiateur, dégât des eaux, incendie, vol, fissures, catastrophe naturelle."}

Retourne UNIQUEMENT un JSON valide, sans texte autour :
{"sujet":"...","angle":"...","requete_cible":"...","slug":"slug-court-sans-accent","categorie":"Sinistres"}`,
      `Date: ${today}. Choisis un sujet evergreen ou réactif.`,
      400
    );

    let topic: { sujet: string; angle: string; requete_cible: string; slug: string; categorie: string };
    try {
      topic = JSON.parse(topicText);
    } catch {
      const m = topicText.match(/\{[\s\S]*\}/);
      topic = m ? JSON.parse(m[0]) : {
        sujet: "Sinistre refusé : recours et solutions",
        angle: "Guide pratique 2026",
        requete_cible: "sinistre refusé assurance",
        slug: "sinistre-refuse-recours",
        categorie: "Sinistres",
      };
    }

    const safeCategory = (VALID_CATEGORIES as readonly string[]).includes(topic.categorie)
      ? topic.categorie
      : "Sinistres";
    const finalSlug = `${slugify(topic.slug || topic.sujet)}-${today}`;

    /* ── Step 2 : rédiger l'article en Markdown ────────────── */
    const articleContent = await callClaude(
      apiKey,
      `Tu es expert en droit des assurances et SEO pour HT Assurance (${BASE}), courtier indépendant à Nice.

Rédige un article de blog en MARKDOWN PUR sur : "${topic.sujet}" (angle : ${topic.angle}).

Structure OBLIGATOIRE (respecter dans l'ordre) :
1. Une introduction de 80 mots max qui répond DIRECTEMENT à la question (position 0 Google + IA)
2. Au moins 5 H2 formulés comme questions Google (## Question ?)
3. Articles du Code des assurances cités quand pertinent (L114-1, L113-2, L125-1, L121-12...)
4. Au moins 1 exemple concret anonymisé
5. Une section ## FAQ avec 5 questions/réponses (### Q? puis réponse)
6. 2 mentions du contact WhatsApp [contactez-nous](https://wa.me/33986113257)
7. Termine par un appel à l'action vers /sinistres

CONSIGNES STRICTES :
- Ton expert, factuel, sans bullshit ; longueur 1200-1800 mots
- Aucun H1 dans le contenu (le titre sera affiché par le layout)
- Pas de \`\`\`fence\`\`\` ni de blocs HTML
- Sortie : UNIQUEMENT le frontmatter YAML puis le markdown, RIEN d'autre

FRONTMATTER OBLIGATOIRE (à mettre en premier, format exact) :
---
title: "Titre H1 affiché — entre 50 et 70 caractères"
seoTitle: "Titre <title> SEO — max 60 caractères | HT Assurance"
description: "Meta description SEO entre 140 et 155 caractères, percutante."
slug: "${finalSlug}"
category: "${safeCategory}"
date: "${today}"
readTime: "8 min"
image:
  src: "/blog/default.jpg"
  alt: "Description de l'image"
---

(puis l'article en markdown)`,
      `Sujet : ${topic.sujet}\nAngle : ${topic.angle}\nRequête cible : ${topic.requete_cible}\nCatégorie : ${safeCategory}`,
      4096
    );

    const titleMatch = articleContent.match(/title:\s*"([^"]+)"/);
    const slugMatch = articleContent.match(/slug:\s*"([^"]+)"/);
    const title = titleMatch?.[1] ?? topic.sujet;
    const slug = slugMatch?.[1] ?? finalSlug;
    const hasFrontmatter = /^---\n[\s\S]*?\n---/.test(articleContent.trimStart());

    if (!hasFrontmatter) {
      throw new Error("Frontmatter manquant dans la sortie Claude — article rejeté.");
    }

    await saveArticle({
      title,
      slug,
      requete_cible: topic.requete_cible,
      angle: topic.angle,
      contentLength: articleContent.length,
      category: safeCategory,
    });

    /* ── Step 3 : commit GitHub dans content/blog/{slug}.md ─ */
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPO ?? "talelhakimi06-del/HTASSURANCE";
    const branch = process.env.GITHUB_BRANCH ?? "main";

    let publishedUrl: string | null = null;
    let publishStatus: "published" | "missing_token" | "error" = "missing_token";

    if (githubToken) {
      try {
        const filePath = `content/blog/${slug}.md`;
        const apiUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;
        const contentB64 = Buffer.from(articleContent, "utf-8").toString("base64");

        const ghRes = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
            "User-Agent": "ht-assurance-seo-autopilot",
          },
          body: JSON.stringify({
            message: `feat(blog): ${title}`,
            content: contentB64,
            branch,
          }),
        });

        if (ghRes.ok) {
          publishStatus = "published";
          publishedUrl = `${BASE}/blog/${slug}`;
        } else {
          const errBody = await ghRes.text();
          console.error("[seo-autopilot] GitHub PUT failed", ghRes.status, errBody.slice(0, 300));
          publishStatus = "error";
        }
      } catch (err) {
        console.error("[seo-autopilot] GitHub error:", err);
        publishStatus = "error";
      }
    }

    /* ── Step 4 : ping IndexNow pour indexation rapide ─────── */
    if (publishStatus === "published" && publishedUrl) {
      const indexNowKey = process.env.INDEXNOW_KEY ?? "htassurance2026indexnow";
      try {
        await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(publishedUrl)}&key=${indexNowKey}`, {
          method: "GET",
        });
      } catch (err) {
        console.error("[seo-autopilot] IndexNow ping failed:", err);
      }
    }

    /* ── Step 5 : notification Talel ───────────────────────── */
    const statusEmoji =
      publishStatus === "published" ? "✅" : publishStatus === "missing_token" ? "⚠️" : "❌";
    const statusText =
      publishStatus === "published"
        ? `Publié sur ${publishedUrl}`
        : publishStatus === "missing_token"
        ? "GITHUB_TOKEN manquant — article généré mais NON publié"
        : "Erreur GitHub — article généré mais NON publié";

    await notify(
      `${statusEmoji} Agent SEO\n📌 ${title}\n🎯 ${topic.requete_cible}\n📂 ${safeCategory}\n📊 ${articleContent.length} caractères\n${statusText}`,
      publishStatus === "published" ? "normale" : "haute"
    );

    return NextResponse.json({
      success: publishStatus === "published",
      title,
      slug,
      length: articleContent.length,
      publishStatus,
      publishedUrl,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[seo-autopilot]", msg);
    try {
      await notify(`❌ Agent SEO en erreur : ${msg.slice(0, 300)}`, "haute");
    } catch {}
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
