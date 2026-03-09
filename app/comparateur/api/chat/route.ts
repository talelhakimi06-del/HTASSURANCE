import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "../../_lib/systemPrompt";
import { parseAiResponse } from "../../_lib/utils";
import type { ChatRequest } from "../../_lib/types";

export const maxDuration = 30;

const enc = new TextEncoder();
function sse(payload: unknown) {
  return enc.encode(`data: ${JSON.stringify(payload)}\n\n`);
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Configuration manquante. Contactez l'administrateur." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const client = new Anthropic({ apiKey });

  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Requête invalide" }), { status: 400 });
  }

  const { messages, mode } = body;
  if (!messages || !Array.isArray(messages)) {
    return new Response(JSON.stringify({ error: "Messages requis" }), { status: 400 });
  }

  const systemPrompt = getSystemPrompt(mode ?? "comparison");

  const stream = new ReadableStream({
    async start(controller) {
      try {
        /* Modèle Haiku : 4× plus rapide que Sonnet pour cette tâche */
        const anthropicStream = client.messages.stream({
          model: process.env.ANTHROPIC_MODEL ?? "claude-haiku-4-5",
          max_tokens: 400,
          system: systemPrompt,
          messages: messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
        });

        let fullText = "";

        for await (const chunk of anthropicStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            fullText += chunk.delta.text;
            /* Envoyer chaque fragment au client */
            controller.enqueue(sse({ t: chunk.delta.text }));
          }
        }

        /* Réponse finale avec actions parsées */
        const { content, actions } = parseAiResponse(fullText);
        controller.enqueue(sse({ done: true, content, actions }));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[/comparateur/api/chat] Erreur Anthropic:", message);

        let userMsg = `Erreur IA: ${message.slice(0, 120)}`;
        if (
          message.toLowerCase().includes("api key") ||
          message.toLowerCase().includes("unauthorized") ||
          message.toLowerCase().includes("authentication")
        ) {
          userMsg = "Clé API invalide. Vérifiez ANTHROPIC_API_KEY dans Vercel.";
        } else if (
          message.toLowerCase().includes("quota") ||
          message.toLowerCase().includes("rate limit") ||
          message.toLowerCase().includes("overloaded")
        ) {
          userMsg = "API Anthropic surchargée. Réessaie dans quelques secondes.";
        }

        controller.enqueue(sse({ error: userMsg }));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
