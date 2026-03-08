import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getSystemPrompt } from "@/lib/systemPrompt";
import { parseAiResponse } from "@/lib/utils";
import type { ChatRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const body: ChatRequest = await req.json();
    const { messages, mode } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages requis" }, { status: 400 });
    }

    const systemPrompt = getSystemPrompt(mode ?? "comparison");

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      temperature: 0.7,
      max_tokens: 900,
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const { content, actions } = parseAiResponse(raw);

    return NextResponse.json({ content, actions });
  } catch (err: unknown) {
    console.error("[/api/chat] Erreur:", err);

    const message = err instanceof Error ? err.message : "Erreur interne";

    if (message.includes("API key")) {
      return NextResponse.json(
        { error: "Clé OpenAI manquante ou invalide. Configurez OPENAI_API_KEY dans .env.local" },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "Erreur lors de la communication avec l'IA" }, { status: 500 });
  }
}
