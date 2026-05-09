# content/blog/

Articles markdown publiés automatiquement par l'agent `seo-autopilot`.

## Format attendu

Chaque fichier `.md` doit avoir ce frontmatter YAML :

```yaml
---
title: "Titre H1 affiché en haut de l'article"
seoTitle: "Titre balise <title> SEO (60 car. max)"
description: "Meta description SEO (155 car. max)"
slug: "url-de-l-article"
category: "Sinistres"
date: "2026-04-28"
readTime: "6 min"
image:
  src: "/blog/illustration.png"
  alt: "Description de l'image"
---
```

Catégories valides : `Sinistres`, `Décennale`, `Assurance VTC`, `RC Pro`, `Assurance emprunteur`, `Habitation`.

Le contenu sous le frontmatter est rendu en HTML via `react-markdown` avec support GFM (tables, checkboxes, etc.).

## Priorité

Si un slug existe à la fois en `.tsx` (dans `app/blog/posts/`) et en `.md` (ici), le `.tsx` prime — pour ne pas casser les articles existants.
