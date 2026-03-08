import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSystemPrompt } from "../../_lib/systemPrompt";
import { parseAiResponse } from "../../_lib/utils";
import type { ChatRequest } from "../../_lib/types";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    console.error("[/comparateur/api/chat] ANTHROPIC_API_KEY manquante");
    return NextResponse.json(
      { error: "Configuration manquante. Contactez l'administrateur." },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const body: ChatRequest = await req.json();
    const { messages, mode } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages requis" }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(mode ?? "comparison");

    const response = await client.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
      max_tokens: 1400,
      system: systemPrompt,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const raw = response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const { content, actions } = parseAiResponse(raw);

    return NextResponse.json({ content, actions });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/comparateur/api/chat] Erreur Anthropic:", message);

    if (
      message.toLowerCase().includes("api key") ||
      message.toLowerCase().includes("unauthorized") ||
      message.toLowerCase().includes("authentication") ||
      message.toLowerCase().includes("x-api-key")
    ) {
      return NextResponse.json(
        { error: "Clé API invalide. Vérifiez ANTHROPIC_API_KEY dans les variables d'environnement Vercel." },
        { status: 500 }
      );
    }
    if (
      message.toLowerCase().includes("quota") ||
      message.toLowerCase().includes("rate limit") ||
      message.toLowerCase().includes("overloaded") ||
      message.toLowerCase().includes("529")
    ) {
      return NextResponse.json(
        { error: "API Anthropic surchargée. Réessaie dans quelques secondes." },
        { status: 429 }
      );
    }
    return NextResponse.json(
      { error: `Erreur IA: ${message.slice(0, 120)}` },
      { status: 500 }
    );
  }
}
