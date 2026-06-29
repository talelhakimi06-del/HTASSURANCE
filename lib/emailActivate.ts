/* ─────────────────────────────────────────────────────────────
   emailActivate — Active automatiquement les inscriptions annuaires
   en lisant les emails de confirmation dans Gmail (talelhakimi06)
   et en ouvrant les liens d'activation.

   Réutilise les credentials GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN
   (scope gmail.modify, déjà en place pour email-responder).

   Sécurité : on ne suit QUE des liens au motif d'activation clair
   (activate / confirm / verify / validation / token=…), et on
   EXCLUT les liens de désinscription. On marque l'email lu (dédup).
───────────────────────────────────────────────────────────── */

async function getGmailToken(): Promise<string | null> {
  const client_id = process.env.GMAIL_CLIENT_ID;
  const client_secret = process.env.GMAIL_CLIENT_SECRET;
  const refresh_token = process.env.GMAIL_REFRESH_TOKEN;
  if (!client_id || !client_secret || !refresh_token) return null;
  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id, client_secret, refresh_token, grant_type: "refresh_token" }),
    });
    const data = await res.json();
    return data.access_token ?? null;
  } catch { return null; }
}

function b64urlDecode(data: string): string {
  try { return Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf-8"); }
  catch { return ""; }
}

// Récupère tout le texte/HTML d'un payload Gmail (récursif)
function extractBody(payload: Record<string, unknown> | undefined): string {
  if (!payload) return "";
  let out = "";
  const body = payload.body as { data?: string } | undefined;
  if (body?.data) out += b64urlDecode(body.data);
  const parts = payload.parts as Record<string, unknown>[] | undefined;
  if (parts) for (const p of parts) out += extractBody(p);
  return out;
}

const ACTIVATION_RE = /(activate|activation|confirm|confirmer|verify|verif|validation|valider|valid[ae]|account[-_/]?confirm|email[-_/]?confirm|token=)/i;
const EXCLUDE_RE = /(unsubscribe|optout|opt-out|desabon|désabon|preferences|notification-settings|mailto:)/i;

function hostOf(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, "").toLowerCase(); } catch { return ""; }
}

// SÉCURITÉ : on ne suit QUE des liens vers les domaines d'annuaires autorisés
// (jamais les emails personnels/bancaires de la boîte).
function extractActivationLinks(html: string, allowed: Set<string>): string[] {
  const links = new Set<string>();
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const url = m[1].replace(/&amp;/g, "&");
    if (!/^https?:\/\//i.test(url)) continue;
    if (EXCLUDE_RE.test(url)) continue;
    const host = hostOf(url);
    // le host (ou son domaine parent) doit être dans la liste blanche des annuaires
    const ok = [...allowed].some((d) => host === d || host.endsWith("." + d));
    if (!ok) continue;
    if (ACTIVATION_RE.test(url)) links.add(url);
  }
  return [...links].slice(0, 5);
}

export type ActivateReport = {
  ok: boolean;
  mode: string;
  scanned: number;
  activated: { from: string; subject: string; url: string; status: number }[];
  note?: string;
};

export async function scanAndActivate(allowedDomains: string[]): Promise<ActivateReport> {
  const allowed = new Set((allowedDomains ?? []).map((d) => d.replace(/^www\./, "").toLowerCase()).filter(Boolean));
  if (allowed.size === 0) return { ok: false, mode: "off", scanned: 0, activated: [], note: "aucun domaine autorisé" };
  const token = await getGmailToken();
  if (!token) return { ok: false, mode: "off", scanned: 0, activated: [], note: "Gmail non configuré" };

  // Emails récents susceptibles d'être des confirmations d'inscription
  const q = encodeURIComponent('newer_than:2d (activate OR activation OR confirm OR confirmer OR verify OR "verify your email" OR "confirm your" OR "activez" OR "activer votre")');
  let messages: { id: string }[] = [];
  try {
    const listRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${q}&maxResults=15`, { headers: { Authorization: `Bearer ${token}` } });
    const list = await listRes.json();
    messages = list.messages ?? [];
  } catch (e) {
    return { ok: false, mode: "live", scanned: 0, activated: [], note: `list error: ${e instanceof Error ? e.message : e}` };
  }

  const activated: ActivateReport["activated"] = [];

  for (const msg of messages) {
    try {
      const r = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, { headers: { Authorization: `Bearer ${token}` } });
      const full = await r.json();
      const headers = full.payload?.headers ?? [];
      const h = (n: string) => headers.find((x: { name: string }) => x.name.toLowerCase() === n.toLowerCase())?.value ?? "";
      const from = h("From");
      const subject = h("Subject");

      // ne traite pas nos propres notifications ELIA / emails internes
      if (/htassurance|elia|noreply@.*google/i.test(from) && !/activate|confirm|verify/i.test(subject)) continue;

      const html = extractBody(full.payload);
      const links = extractActivationLinks(html, allowed);
      if (!links.length) continue;

      // tente le(s) lien(s) d'activation
      for (const url of links) {
        try {
          const resp = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36" } });
          activated.push({ from, subject, url, status: resp.status });
          if (resp.ok) break; // un lien activé suffit pour cet email
        } catch {
          activated.push({ from, subject, url, status: 0 });
        }
      }

      // marque lu (dédup léger : évite de retraiter en boucle)
      await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}/modify`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ removeLabelIds: ["UNREAD"] }),
      }).catch(() => {});
    } catch { /* skip ce message */ }
  }

  return { ok: true, mode: "live", scanned: messages.length, activated };
}
