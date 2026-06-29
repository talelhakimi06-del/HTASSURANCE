/* ─────────────────────────────────────────────────────────────
   Capsolver — Résolution automatique de captchas
   Supporte : reCAPTCHA v2/v3, hCaptcha, Cloudflare Turnstile
───────────────────────────────────────────────────────────── */

const API_URL = "https://api.capsolver.com";

function getKey(): string | null {
  // Accepte les deux noms de variable (CAPSOLVER_API_KEY ou CAPSOLVER)
  return process.env.CAPSOLVER_API_KEY ?? process.env.CAPSOLVER ?? null;
}

type TaskResult = {
  success: boolean;
  solution?: string;
  error?: string;
};

async function createTask(task: Record<string, unknown>): Promise<string | null> {
  const key = getKey();
  if (!key) return null;

  try {
    const res = await fetch(`${API_URL}/createTask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientKey: key, task }),
    });
    const data = await res.json();
    if (data.errorId !== 0) {
      console.error("[CAPSOLVER] createTask error:", data.errorDescription);
      return null;
    }
    return data.taskId;
  } catch (err) {
    console.error("[CAPSOLVER] createTask exception:", err);
    return null;
  }
}

async function getTaskResult(taskId: string, maxWait = 60000): Promise<TaskResult> {
  const key = getKey();
  if (!key) return { success: false, error: "No API key" };

  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      const res = await fetch(`${API_URL}/getTaskResult`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientKey: key, taskId }),
      });
      const data = await res.json();

      if (data.status === "ready") {
        return {
          success: true,
          solution: data.solution?.gRecaptchaResponse
            ?? data.solution?.token
            ?? data.solution?.text
            ?? JSON.stringify(data.solution),
        };
      }

      if (data.errorId !== 0) {
        return { success: false, error: data.errorDescription };
      }

      // Still processing — wait 3s
      await new Promise((r) => setTimeout(r, 3000));
    } catch (err) {
      return { success: false, error: String(err) };
    }
  }

  return { success: false, error: "Timeout" };
}

/* ── Public API ── */

export async function solveRecaptchaV2(
  websiteURL: string,
  websiteKey: string
): Promise<TaskResult> {
  const taskId = await createTask({
    type: "ReCaptchaV2TaskProxyLess",
    websiteURL,
    websiteKey,
  });
  if (!taskId) return { success: false, error: "Failed to create task" };
  return getTaskResult(taskId);
}

export async function solveRecaptchaV3(
  websiteURL: string,
  websiteKey: string,
  pageAction = ""
): Promise<TaskResult> {
  const taskId = await createTask({
    type: "ReCaptchaV3TaskProxyLess",
    websiteURL,
    websiteKey,
    pageAction,
  });
  if (!taskId) return { success: false, error: "Failed to create task" };
  return getTaskResult(taskId);
}

export async function solveHCaptcha(
  websiteURL: string,
  websiteKey: string
): Promise<TaskResult> {
  const taskId = await createTask({
    type: "HCaptchaTaskProxyLess",
    websiteURL,
    websiteKey,
  });
  if (!taskId) return { success: false, error: "Failed to create task" };
  return getTaskResult(taskId);
}

export async function solveTurnstile(
  websiteURL: string,
  websiteKey: string
): Promise<TaskResult> {
  const taskId = await createTask({
    type: "AntiTurnstileTaskProxyLess",
    websiteURL,
    websiteKey,
  });
  if (!taskId) return { success: false, error: "Failed to create task" };
  return getTaskResult(taskId);
}

export function isCapsolverEnabled(): boolean {
  return !!getKey();
}
