const WHATSAPP_ENABLED = !!process.env.WHATSAPP_TOKEN;

type WaResult = { success: boolean; mode: "live" | "simulation"; messageId?: string };

export async function sendWhatsApp(to: string, message: string): Promise<WaResult> {
  if (!WHATSAPP_ENABLED) {
    console.log(`[WHATSAPP SIMULÉ] → ${to}\n${message}`);
    return { success: true, mode: "simulation" };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: { body: message },
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.error("[WHATSAPP] Erreur:", JSON.stringify(data));
      return { success: false, mode: "live" };
    }
    return { success: true, mode: "live", messageId: data.messages?.[0]?.id };
  } catch (err) {
    console.error("[WHATSAPP] Exception:", err);
    return { success: false, mode: "live" };
  }
}

export function isWhatsAppEnabled(): boolean {
  return WHATSAPP_ENABLED;
}
