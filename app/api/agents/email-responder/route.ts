import { NextRequest, NextResponse } from "next/server";
import { notify } from "@/lib/notify";
import { saveEmail } from "@/lib/memory";

export const maxDuration = 120;

// Gmail API requires OAuth credentials — this agent is ready but needs GMAIL_* env vars
// When not configured, it logs and returns a simulation result

async function fetchUnreadEmails(): Promise<Array<{ id: string; from: string; subject: string; body: string; date: string }>> {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    console.log("[AGENT EMAIL] Gmail non configuré — simulation");
    return [];
  }

  try {
    // Get access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }),
    });
    const { access_token } = await tokenRes.json();
    if (!access_token) return [];

    // Fetch unread emails
    const listRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?q=is:unread+-label:ELIA-répondu+-label:ELIA-ignoré&maxResults=5",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    const list = await listRes.json();
    if (!list.messages?.length) return [];

    const emails = await Promise.all(
      list.messages.slice(0, 5).map(async (m: { id: string }) => {
        const msgRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        const msg = await msgRes.json();
        const headers = msg.payload?.headers ?? [];
        const from = headers.find((h: { name: string }) => h.name === "From")?.value ?? "";
        const subject = headers.find((h: { name: string }) => h.name === "Subject")?.value ?? "";
        const date = headers.find((h: { name: string }) => h.name === "Date")?.value ?? "";

        // Extract body (simplified — handles text/plain)
        let body = "";
        if (msg.payload?.body?.data) {
          body = Buffer.from(msg.payload.body.data, "base64").toString("utf-8");
        } else if (msg.payload?.parts) {
          const textPart = msg.payload.parts.find((p: { mimeType: string }) => p.mimeType === "text/plain");
          if (textPart?.body?.data) {
            body = Buffer.from(textPart.body.data, "base64").toString("utf-8");
          }
        }

        return { id: m.id, from, subject, body: body.slice(0, 2000), date };
      })
    );

    return emails;
  } catch (err) {
    console.error("[AGENT EMAIL] Gmail fetch error:", err);
    return [];
  }
}

export async function GET(req: NextRequest) {
  // Cron security
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Allow Vercel cron (no auth header) or matching secret
    const isVercelCron = req.headers.get("x-vercel-cron") === "true" || !cronSecret;
    if (!isVercelCron && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY manquante" }, { status: 500 });
  }

  const emails = await fetchUnreadEmails();

  if (emails.length === 0) {
    console.log("[AGENT EMAIL] Aucun email non lu — Gmail non configuré ou boîte vide");
    return NextResponse.json({ processed: 0, mode: process.env.GMAIL_CLIENT_ID ? "live" : "simulation" });
  }

  let processed = 0;

  for (const email of emails) {
    try {
      // Step 1: Categorize
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

      // Skip spam
      if (cat.categorie === "spam") {
        await saveEmail({ ...email, categorie: "spam", action: "ignoré" });
        processed++;
        continue;
      }

      // Step 2: Generate response
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
      const responseText = respData.content?.[0]?.text ?? "";

      // Note: Actually sending the reply requires Gmail API send permission
      // For now, we log and notify
      console.log(`[AGENT EMAIL] Réponse générée pour ${email.from}: ${responseText.slice(0, 100)}...`);

      await saveEmail({
        from: email.from,
        subject: email.subject,
        categorie: cat.categorie,
        urgence: cat.urgence,
        resume: cat.resume,
        response_generated: true,
      });

      // Notify Talel
      await notify(
        `📧 Email traité\n👤 ${cat.prenom_client || "?"} (${email.from})\n📋 ${cat.categorie}\n⚡ Urgence : ${cat.urgence}\n📝 ${cat.resume}\n✅ Réponse générée${cat.prescription_detectee ? "\n🚨 DÉLAI DÉTECTÉ" : ""}`,
        cat.urgence === "haute" || cat.prescription_detectee ? "haute" : "normale"
      );

      processed++;
    } catch (err) {
      console.error("[AGENT EMAIL] Erreur traitement:", err);
    }
  }

  return NextResponse.json({ processed, total: emails.length });
}
