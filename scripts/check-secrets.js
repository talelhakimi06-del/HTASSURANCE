#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────
   check-secrets.js — scanne le code à la recherche de secrets exposés.

   Usage :
     node scripts/check-secrets.js                  # scanne tout
     node scripts/check-secrets.js --staged         # uniquement les fichiers staged Git

   Exit codes :
     0 = aucun secret trouvé
     1 = au moins un secret détecté
     2 = erreur (fichier introuvable, etc.)

   Les patterns détectent :
     - Clés Google API : AIzaSy[A-Za-z0-9_-]{33}
     - Clés Resend : re_[A-Za-z0-9]{32,}
     - Tokens Vercel : vcp_[A-Za-z0-9]{40,}
     - Clés reCAPTCHA : 6L[A-Za-z0-9_-]{38} (site OU secret)
     - Personal Access Tokens GitHub : ghp_[A-Za-z0-9]{36}
     - Service account private keys (BEGIN PRIVATE KEY)
─────────────────────────────────────────────────────────────────────── */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const PATTERNS = [
  { name: "Google API Key", regex: /\bAIzaSy[A-Za-z0-9_-]{33}\b/g },
  { name: "Resend API Key", regex: /\bre_[A-Za-z0-9]{20,}\b/g },
  { name: "Vercel Token", regex: /\bvcp_[A-Za-z0-9]{40,}\b/g },
  { name: "reCAPTCHA Key", regex: /\b6L[A-Za-z0-9_-]{38}\b/g },
  { name: "GitHub PAT", regex: /\bghp_[A-Za-z0-9]{36}\b/g },
  { name: "Service Account Private Key", regex: /-----BEGIN PRIVATE KEY-----/g },
];

const IGNORE_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "out",
  "build",
  ".vercel",
  ".turbo",
  "coverage",
]);

const IGNORE_FILES = new Set([
  ".env.example",          // Patterns factices documentés
  "scripts/check-secrets.js", // Le script lui-même contient les regex
  "package-lock.json",     // Hash commits parfois ressemblent aux PAT
]);

const SCAN_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".yml",
  ".yaml",
  ".html",
  ".css",
]);

function getFiles(staged) {
  if (staged) {
    try {
      const out = execSync("git diff --cached --name-only --diff-filter=ACMR", {
        encoding: "utf8",
      });
      return out.split("\n").filter(Boolean);
    } catch {
      console.error("Impossible de récupérer les fichiers staged.");
      process.exit(2);
    }
  }
  const result = [];
  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      const full = path.join(dir, e.name);
      const rel = path.relative(process.cwd(), full);
      if (e.isDirectory()) {
        if (IGNORE_DIRS.has(e.name)) continue;
        walk(full);
      } else if (e.isFile()) {
        if (IGNORE_FILES.has(rel)) continue;
        if (!SCAN_EXTENSIONS.has(path.extname(e.name))) continue;
        result.push(rel);
      }
    }
  }
  walk(process.cwd());
  return result;
}

function scanFile(file) {
  let content;
  try {
    content = fs.readFileSync(file, "utf8");
  } catch {
    return [];
  }
  const findings = [];
  for (const { name, regex } of PATTERNS) {
    const matches = content.match(regex);
    if (matches) {
      for (const m of matches) {
        findings.push({ name, sample: m.slice(0, 12) + "..." });
      }
    }
  }
  return findings;
}

function main() {
  const staged = process.argv.includes("--staged");
  const files = getFiles(staged);
  let total = 0;

  for (const file of files) {
    if (IGNORE_FILES.has(file)) continue;
    const findings = scanFile(file);
    if (findings.length > 0) {
      total += findings.length;
      console.error(`\n❌ ${file}`);
      for (const f of findings) {
        console.error(`   ${f.name} : ${f.sample}`);
      }
    }
  }

  if (total === 0) {
    console.log(`✅ Aucun secret détecté dans ${files.length} fichier(s).`);
    process.exit(0);
  }

  console.error(`\n${total} secret(s) détecté(s). Nettoie avant de commit/push :`);
  console.error(`  - Déplace la valeur dans .env.local (ou Vercel env vars)`);
  console.error(`  - Référence-la via process.env.NOM_VARIABLE dans le code`);
  console.error(`  - Si déjà committé, révoque la clé immédiatement.\n`);
  process.exit(1);
}

main();
