import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { setAgentFlag } from "@/lib/memory";

export const maxDuration = 120;

const PAGES_TO_CHECK = [
  { name: "Accueil", url: "https://www.htassurance.fr" },
  { name: "Sinistres", url: "https://www.htassurance.fr/sinistres" },
  { name: "Blog", url: "https://www.htassurance.fr/blog" },
  { name: "Comparateur", url: "https://www.htassurance.fr/comparateur" },
  { name: "Admin", url: "https://www.htassurance.fr/admin" },
  { name: "GPT Comparateur", url: "https://www.htassurance.fr/gpt-comparateur" },
  { name: "API Chat", url: "https://www.htassurance.fr/comparateur/api/chat" },
  { name: "API Contact", url: "https://www.htassurance.fr/api/contact" },
  { name: "Sitemap", url: "https://www.htassurance.fr/sitemap.xml" },
  { name: "Robots", url: "https://www.htassurance.fr/robots.txt" },
];

const REQUIRED_ENV = [
  "ANTHROPIC_API_KEY",
  "RESEND_API_KEY",
  "ADMIN_PASSWORD",
];

const OPTIONAL_ENV = [
  "GMAIL_CLIENT_ID",
  "GMAIL_CLIENT_SECRET",
  "GMAIL_REFRESH_TOKEN",
  "GITHUB_TOKEN",
  "WHATSAPP_TOKEN",
  "GPT_API_KEY",
  "CRON_SECRET",
];

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const auth = req.headers.get("authorization");
    const isVercel = !!req.headers.get("x-vercel-cron");
    if (!isVercel && auth !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const errors: string[] = [];
  const warnings: string[] = [];
  const ok: string[] = [];

  // 1. Check pages
  const pageResults = await Promise.all(
    PAGES_TO_CHECK.map(async (page) => {
      try {
        const res = await fetch(page.url, {
          method: "HEAD",
          signal: AbortSignal.timeout(8000),
        });
        return { ...page, status: res.status, ok: res.ok };
      } catch {
        return { ...page, status: 0, ok: false };
      }
    })
  );

  for (const p of pageResults) {
    if (p.ok) {
      ok.push(`${p.name}: ${p.status}`);
    } else if (p.status === 405) {
      // POST-only endpoints return 405 for HEAD — that's fine
      ok.push(`${p.name}: OK (POST-only)`);
    } else {
      errors.push(`${p.name}: ${p.status || "TIMEOUT"} — ${p.url}`);
    }
  }

  // 2. Check env vars
  const envStatus: Record<string, string> = {};
  for (const v of REQUIRED_ENV) {
    if (process.env[v]) {
      envStatus[v] = "ok";
    } else {
      errors.push(`Variable manquante: ${v}`);
      envStatus[v] = "missing";
    }
  }
  for (const v of OPTIONAL_ENV) {
    if (process.env[v]) {
      envStatus[v] = "ok";
    } else {
      envStatus[v] = "pending";
      if (v !== "WHATSAPP_TOKEN") {
        warnings.push(`Variable optionnelle absente: ${v}`);
      }
    }
  }

  // 3. Check PageSpeed (if available — basic check)
  let perfScore = "non vérifié";
  try {
    const psiRes = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://www.htassurance.fr&strategy=mobile&category=performance`,
      { signal: AbortSignal.timeout(15000) }
    );
    if (psiRes.ok) {
      const psi = await psiRes.json();
      const score = Math.round((psi.lighthouseResult?.categories?.performance?.score ?? 0) * 100);
      perfScore = `${score}/100`;
      if (score < 50) errors.push(`Performance mobile: ${score}/100 (critique)`);
      else if (score < 75) warnings.push(`Performance mobile: ${score}/100 (à améliorer)`);
      else ok.push(`Performance mobile: ${score}/100`);
    }
  } catch {
    warnings.push("PageSpeed Insights: vérification impossible");
  }

  // Status
  const status = errors.length > 0 ? "critique" : warnings.length > 0 ? "warning" : "ok";

  // Save flag
  await setAgentFlag("dev_audit_status", status);
  await setAgentFlag("dev_audit_report", JSON.stringify({ errors, warnings, ok, envStatus, perfScore }));

  // Notify
  const pagesOk = pageResults.filter((p) => p.ok || p.status === 405).length;
  const message = status === "ok"
    ? `🛠️ Audit Dev — ${new Date().toISOString().slice(0, 10)}\n✅ Tout fonctionne parfaitement\n📊 ${pagesOk}/${PAGES_TO_CHECK.length} pages OK\n📈 Perf mobile : ${perfScore}`
    : status === "warning"
    ? `🛠️ Audit Dev — ${new Date().toISOString().slice(0, 10)}\n⚠️ ${warnings.length} warning(s)\n${warnings.map((w) => `  ⚠️ ${w}`).join("\n")}\n📊 ${pagesOk}/${PAGES_TO_CHECK.length} pages OK\n📈 Perf : ${perfScore}`
    : `🛠️ Audit Dev — ${new Date().toISOString().slice(0, 10)}\n🚨 ${errors.length} erreur(s) critique(s)\n${errors.map((e) => `  🔴 ${e}`).join("\n")}\n${warnings.length > 0 ? warnings.map((w) => `  ⚠️ ${w}`).join("\n") : ""}\n📊 ${pagesOk}/${PAGES_TO_CHECK.length} pages OK`;

  await notify(message, status === "critique" ? "critique" : status === "warning" ? "haute" : "normale");

  return NextResponse.json({ status, errors, warnings, ok, envStatus, perfScore });
}
