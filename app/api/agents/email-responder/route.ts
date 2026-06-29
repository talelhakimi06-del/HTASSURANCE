import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { saveEmail, getAgentFlag, setAgentFlag } from "@/lib/memory";

export const maxDuration = 120;

/*
  Agent email-responder — lit les emails non lus, les catégorise, génère une
  réponse pro avec Claude, puis CRÉE UN VRAI BROUILLON GMAIL rattaché au thread
  (Talel n'a plus qu'à relire et envoyer). Le message traité est marqué « lu »
  pour ne pas être re-traité.

  Nécessite GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN avec un scope permettant la
  création de brouillons : https://www.googleapis.com/auth/gmail.modify
  (ou gmail.compose). Si le scope est insuffisant → notification pour ré-autoriser.
*/

const SIGNATURE = "\n\n— Talel\nHT Assurance · Courtier à Nice\n09 86 11 32 57 · https://www.htassurance.fr";

type Email = {
  id: string;
  threadId: string;
  rfcMessageId: string;
  from: string;
  subject: string;
  body: string;
  date: string;
};

async function getAccessToken(): Promise<string | null> {
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
  } catch {
    return null;
  }
}

async function fetchUnreadEmails(token: string): Promise<Email[]> {
  try {
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread+category:primary&maxResults=5",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const list = await listRes.json();
    if (!list.messages?.length) return [];

    const emails = await Promise.all(
      list.messages.slice(0, 5).map(async (m: { id: string }) => {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const msg = await msgRes.json();
        const headers = msg.payload?.headers ?? [];
        const h = (name: string) =>
          headers.find((x: { name: string }) => x.name.toLowerCase() === name.toLowerCase())?.value ?? "";

        let body = "";
        if (msg.payload?.body?.data) {
          body = Buffer.from(msg.payload.body.data, "base64").toString("utf-8");
        } else if (msg.payload?.parts) {
          const textPart = msg.payload.parts.find((p: { mimeType: string }) => p.mimeType === "text/plain");
          if (textPart?.body?.data) body = Buffer.from(textPart.body.data, "base64").toString("utf-8");
        }

        return {
          id: m.id,
          threadId: msg.threadId ?? "",
          rfcMessageId: h("Message-ID"),
          from: h("From"),
          subject: h("Subject"),
          body: body.slice(0, 2000),
          date: h("Date"),
        } as Email;
      })
    );
    return emails;
  } catch (err) {
    console.error("[AGENT EMAIL] Gmail fetch error:", err);
    return [];
  }
}

function extractAddress(from: string): string {
  const m = from.match(/<([^>]+)>/);
  return m ? m[1] : from.trim();
}

// Encode un sujet contenant des accents en MIME word (=?UTF-8?B?...?=)
function encodeSubject(s: string): string {
  if (/^[\x00-\x7F]*$/.test(s)) return s;
  return `=?UTF-8?B?${Buffer.from(s, "utf-8").toString("base64")}?=`;
}

function base64Url(s: string): string {
  return Buffer.from(s, "utf-8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Crée un brouillon Gmail (réponse) rattaché au thread. Retourne {ok, status}.
async function createDraft(token: string, email: Email, responseText: string): Promise<{ ok: boolean; status: number }> {
  const to = extractAddress(email.from);
  const subject = /^re\s*:/i.test(email.subject) ? email.subject : `Re: ${email.subject}`;
  const lines = [
    `To: ${to}`,
    `Subject: ${encodeSubject(subject)}`,
  ];
  if (email.rfcMessageId) {
    lines.push(`In-Reply-To: ${email.rfcMessageId}`);
    lines.push(`References: ${email.rfcMessageId}`);
  }
  lines.push("MIME-Version: 1.0", "Content-Type: text/plain; charset=UTF-8", "", responseText + SIGNATURE);
  const raw = base64Url(lines.join("\r\n"));

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: { threadId: email.threadId || undefined, raw } }),
  });
  return { ok: res.ok, status: res.status };
}

// Marque l'email comme lu (dédup : ne sera plus re-traité). Best-effort.
async function markRead(token: string, id: string): Promise<void> {
  try {
    await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/modify`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ removeLabelIds: ["UNREAD"] }),
    });
  } catch {
    /* ignore */
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const isVercelCron = req.headers.get("x-vercel-cron") === "true";
    if (!isVercelCron && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });

  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ processed: 0, mode: "simulation", note: "Gmail non configuré (GMAIL_CLIENT_ID/SECRET/REFRESH_TOKEN)" });
  }

  const emails = await fetchUnreadEmails(token);
  if (emails.length === 0) {
    return NextResponse.json({ processed: 0, mode: "live", note: "Aucun email non lu en boîte de réception principale" });
  }

  let processed = 0;
  let drafted = 0;
  let scopeError = false;

  for (const email of emails) {
    try {
      // Dédup KV (si KV configuré)
      const flagKey = `email_drafted:${email.id}`;
      if (await getAgentFlag(flagKey)) continue;

      // 1) Catégorisation
      const catRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 256,
          system: `Catégorise cet email reçu par HT Assurance (courtier sinistres à Nice). Retourne UNIQUEMENT un JSON :
{"categorie":"sinistre_refuse"|"demande_devis"|"question_generale"|"spam"|"autre","urgence":"haute"|"normale"|"basse","type_sinistre":string|null,"prenom_client":string|null,"resume":"résumé en 1 phrase","prescription_detectee":boolean}`,
          messages: [{ role: "user", content: `De: ${email.from}\nSujet: ${email.subject}\n\n${email.body}` }],
        }),
      });
      const catData = await catRes.json();
      const catText = catData.content?.[0]?.text ?? "{}";
      let cat;
      try { cat = JSON.parse(catText); } catch { const m = catText.match(/\{[\s\S]*\}/); cat = m ? JSON.parse(m[0]) : { categorie: "autre", urgence: "normale", resume: email.subject }; }

      // Spam → marquer lu, ignorer
      if (cat.categorie === "spam") {
        await markRead(token, email.id);
        await saveEmail({ ...email, categorie: "spam", action: "ignoré" });
        await setAgentFlag(flagKey, "spam");
        processed++;
        continue;
      }

      // 2) Génération de la réponse
      const respRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 512,
          system: `Tu es Talel, courtier expert en sinistres chez HT Assurance à Nice. Tu réponds à ${cat.prenom_client || "ce client"} concernant ${cat.categorie} : ${cat.resume}.
Rédige une réponse email professionnelle qui :
- Commence par le prénom du client si disponible
- Montre que tu as compris sa situation précise
- Donne 2-3 informations concrètes selon son cas
- Cite un article du Code des assurances si sinistre
- Invite à envoyer lettre de refus + contrat
- Propose un RDV WhatsApp ou téléphonique
Ton : expert, humain, jamais robotique.
Max 200 mots. PAS de signature (elle est ajoutée automatiquement).`,
          messages: [{ role: "user", content: `Email original :\nDe: ${email.from}\nSujet: ${email.subject}\n\n${email.body}` }],
        }),
      });
      const respData = await respRes.json();
      const responseText = (respData.content?.[0]?.text ?? "").trim();

      // 3) Création du brouillon Gmail
      let draftStatus = "non créé";
      if (responseText) {
        const d = await createDraft(token, email, responseText);
        if (d.ok) {
          drafted++;
          draftStatus = "brouillon créé ✅";
          await markRead(token, email.id);
          await setAgentFlag(flagKey, "drafted");
        } else if (d.status === 403) {
          scopeError = true;
          draftStatus = "scope Gmail insuffisant ❌";
        } else {
          draftStatus = `erreur brouillon (HTTP ${d.status})`;
        }
      }

      await saveEmail({
        from: email.from,
        subject: email.subject,
        categorie: cat.categorie,
        urgence: cat.urgence,
        resume: cat.resume,
        response_generated: true,
      });

      await notify(
        `📧 Email traité\n👤 ${cat.prenom_client || "?"} (${email.from})\n📋 ${cat.categorie} · ⚡ ${cat.urgence}\n📝 ${cat.resume}\n✍️ ${draftStatus}${cat.prescription_detectee ? "\n🚨 DÉLAI / PRESCRIPTION DÉTECTÉ" : ""}`,
        cat.urgence === "haute" || cat.prescription_detectee ? "haute" : "normale"
      );

      processed++;
    } catch (err) {
      console.error("[AGENT EMAIL] Erreur traitement:", err);
    }
  }

  if (scopeError) {
    await notify(
      `⚠️ email-responder : Gmail refuse la création de brouillons (scope insuffisant).\nIl faut ré-autoriser le compte Gmail avec le scope « gmail.modify ». Préviens-moi pour le faire.`,
      "haute"
    );
  }

  return NextResponse.json({ processed, drafted, total: emails.length, scopeError });
}
