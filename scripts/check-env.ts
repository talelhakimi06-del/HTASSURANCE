#!/usr/bin/env npx tsx

const REQUIRED = [
  { name: "ANTHROPIC_API_KEY", desc: "API Claude — console.anthropic.com" },
  { name: "RESEND_API_KEY", desc: "Email notifications — resend.com" },
  { name: "ADMIN_PASSWORD", desc: "Mot de passe backoffice /admin" },
];

const RECOMMENDED = [
  { name: "GMAIL_CLIENT_ID", desc: "Gmail API — console.cloud.google.com" },
  { name: "GMAIL_CLIENT_SECRET", desc: "Gmail API secret" },
  { name: "GMAIL_REFRESH_TOKEN", desc: "Gmail OAuth refresh token" },
  { name: "GITHUB_TOKEN", desc: "GitHub auto-publish — github.com/settings/tokens" },
  { name: "CRON_SECRET", desc: "Sécurité crons Vercel" },
  { name: "GPT_API_KEY", desc: "Auth ChatGPT Store Actions" },
];

const OPTIONAL = [
  { name: "WHATSAPP_TOKEN", desc: "WhatsApp Business API — developers.facebook.com" },
  { name: "WHATSAPP_VERIFY_TOKEN", desc: "Webhook verification" },
  { name: "WHATSAPP_PHONE_ID", desc: "Phone ID WhatsApp Business" },
];

let okCount = 0;
let missingCount = 0;
let pendingCount = 0;

console.log("\n🛡️  ELIA — Vérification des variables d'environnement\n");
console.log("═══ OBLIGATOIRES ═══════════════════════════════════");
for (const v of REQUIRED) {
  if (process.env[v.name]) {
    console.log(`  ✅ ${v.name} — OK`);
    okCount++;
  } else {
    console.log(`  ❌ ${v.name} — MANQUANT → ${v.desc}`);
    missingCount++;
  }
}

console.log("\n═══ RECOMMANDÉES ═══════════════════════════════════");
for (const v of RECOMMENDED) {
  if (process.env[v.name]) {
    console.log(`  ✅ ${v.name} — OK`);
    okCount++;
  } else {
    console.log(`  ❌ ${v.name} — Manquant → ${v.desc}`);
    missingCount++;
  }
}

console.log("\n═══ OPTIONNELLES (WhatsApp) ═════════════════════════");
for (const v of OPTIONAL) {
  if (process.env[v.name]) {
    console.log(`  ✅ ${v.name} — OK`);
    okCount++;
  } else {
    console.log(`  ⚠️  ${v.name} — En attente (normal)`);
    pendingCount++;
  }
}

console.log(`\n─────────────────────────────────────────────────────`);
console.log(`  ${okCount} variables OK`);
if (missingCount > 0) console.log(`  ${missingCount} variables manquantes → voir DOCS/SETUP-GUIDE.md`);
if (pendingCount > 0) console.log(`  ${pendingCount} variables en attente (WhatsApp)`);
console.log("");

if (missingCount > 0) process.exit(1);
