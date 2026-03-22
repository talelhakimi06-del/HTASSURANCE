import { NextRequest } from "next/server";
import { getSystemPrompt } from "@/lib/systemPrompt";
import type { ChatRequest } from "@/lib/types";

// Edge Runtime = pas de timeout 10s sur Vercel Hobby
export const runtime = "edge";

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey?.trim()) {
    return Response.json(
      { error: "Clé API non configurée." },
      { status: 500 }
    );
  }

  try {
    const body: ChatRequest = await req.json();
    const { messages, mode } = body;

    if (!messages || !Array.isArray(messages))
      return Response.json({ error: "Messages requis" }, { status: 400 });

    const systemPrompt = getSystemPrompt(mode ?? "comparison");

    const filtered = messages
      .filter((m) => m.content?.trim())
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const valid =
      filtered.length > 0 && filtered[0].role === "user"
        ? filtered
        : [{ role: "user" as const, content: "Bonjour" }, ...filtered];

    // Appel direct API Anthropic avec streaming (compatible Edge)
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        stream: true,
        system: systemPrompt,
        messages: valid,
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("[/api/chat] Anthropic error:", anthropicRes.status, errText);
      return Response.json({ error: "Erreur IA" }, { status: 500 });
    }

    // Transformer le stream SSE d'Anthropic en notre format simplifié
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = anthropicRes.body!.getReader();

    const readable = new ReadableStream({
      async start(controller) {
        let buffer = "";
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (!data || data === "[DONE]") continue;

              try {
                const event = JSON.parse(data);
                if (
                  event.type === "content_block_delta" &&
                  event.delta?.type === "text_delta" &&
                  event.delta.text
                ) {
                  const chunk = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
                  controller.enqueue(encoder.encode(chunk));
                }
              } catch {
                // ignore malformed JSON
              }
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          console.error("[/api/chat] Stream error:", err);
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: "Erreur IA" })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[/api/chat]", err);
    return Response.json({ error: "Erreur IA" }, { status: 500 });
  }
}
