/* ─────────────────────────────────────────────────────────────
   Mémoire partagée ELIA — Vercel KV
   Préfixes : lead: article: email: interaction: catnat: gpt:
───────────────────────────────────────────────────────────── */

type KV = {
  set: (k: string, v: string, opts?: { ex?: number }) => Promise<void>;
  get: (k: string) => Promise<string | null>;
  lpush: (k: string, ...v: string[]) => Promise<void>;
  ltrim: (k: string, start: number, end: number) => Promise<void>;
  lrange: (k: string, start: number, end: number) => Promise<string[]>;
  incr: (k: string) => Promise<number>;
  keys: (pattern: string) => Promise<string[]>;
};

let _kv: KV | null = null;

async function getKv(): Promise<KV | null> {
  if (_kv) return _kv;
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  try {
    const mod = await import("@vercel/kv");
    _kv = mod.kv as unknown as KV;
    return _kv;
  } catch {
    return null;
  }
}

const today = () => new Date().toISOString().slice(0, 10);

/* ── In-memory fallback when KV is not configured ── */
const memStore: Record<string, string[]> = {};

function fallbackLpush(key: string, value: string) {
  if (!memStore[key]) memStore[key] = [];
  memStore[key].unshift(value);
  if (memStore[key].length > 100) memStore[key] = memStore[key].slice(0, 100);
}

function fallbackLrange(key: string, start: number, end: number): string[] {
  return (memStore[key] ?? []).slice(start, end + 1);
}

/* ── Public API ── */

export async function saveLead(data: Record<string, unknown>) {
  const entry = JSON.stringify({ ...data, savedAt: new Date().toISOString() });
  const kv = await getKv();
  if (kv) {
    await kv.lpush("lead:all", entry);
    await kv.ltrim("lead:all", 0, 199);
    await kv.incr(`lead:count:${today()}`);
  } else {
    fallbackLpush("lead:all", entry);
    console.log("[MEMORY] saveLead:", entry.slice(0, 100));
  }
}

export async function saveArticle(data: Record<string, unknown>) {
  const entry = JSON.stringify({ ...data, savedAt: new Date().toISOString() });
  const kv = await getKv();
  if (kv) {
    await kv.lpush("article:all", entry);
    await kv.ltrim("article:all", 0, 99);
    await kv.incr(`article:count:${today()}`);
  } else {
    fallbackLpush("article:all", entry);
    console.log("[MEMORY] saveArticle:", entry.slice(0, 100));
  }
}

export async function saveEmail(data: Record<string, unknown>) {
  const entry = JSON.stringify({ ...data, savedAt: new Date().toISOString() });
  const kv = await getKv();
  if (kv) {
    await kv.lpush("email:all", entry);
    await kv.ltrim("email:all", 0, 199);
    await kv.incr(`email:count:${today()}`);
  } else {
    fallbackLpush("email:all", entry);
    console.log("[MEMORY] saveEmail:", entry.slice(0, 100));
  }
}

export async function saveInteraction(data: Record<string, unknown>) {
  const entry = JSON.stringify({ ...data, savedAt: new Date().toISOString() });
  const kv = await getKv();
  if (kv) {
    await kv.lpush("interaction:all", entry);
    await kv.ltrim("interaction:all", 0, 499);
  } else {
    fallbackLpush("interaction:all", entry);
  }
}

export async function saveCatnat(data: Record<string, unknown>) {
  const entry = JSON.stringify({ ...data, savedAt: new Date().toISOString() });
  const kv = await getKv();
  if (kv) {
    await kv.lpush("catnat:all", entry);
    await kv.ltrim("catnat:all", 0, 99);
    await kv.set(`catnat:latest`, entry, { ex: 86400 * 7 });
  } else {
    fallbackLpush("catnat:all", entry);
    console.log("[MEMORY] saveCatnat:", entry.slice(0, 100));
  }
}

export async function getRecentItems(prefix: string, count: number = 10): Promise<Record<string, unknown>[]> {
  const kv = await getKv();
  const raw = kv
    ? await kv.lrange(`${prefix}:all`, 0, count - 1)
    : fallbackLrange(`${prefix}:all`, 0, count - 1);
  return raw.map((s) => {
    try { return JSON.parse(s) as Record<string, unknown>; } catch { return {}; }
  });
}

export async function getDailyStats() {
  const kv = await getKv();
  const d = today();
  if (!kv) {
    return { leads: 0, articles: 0, emails: 0, date: d };
  }
  const [leads, articles, emails] = await Promise.all([
    kv.get(`lead:count:${d}`),
    kv.get(`article:count:${d}`),
    kv.get(`email:count:${d}`),
  ]);
  return {
    leads: Number(leads ?? 0),
    articles: Number(articles ?? 0),
    emails: Number(emails ?? 0),
    date: d,
  };
}

export async function getWeeklySummary() {
  const items: Record<string, Record<string, unknown>[]> = {};
  for (const prefix of ["lead", "article", "email", "interaction"]) {
    items[prefix] = await getRecentItems(prefix, 50);
  }
  return items;
}

export async function setAgentFlag(key: string, value: string) {
  const kv = await getKv();
  if (kv) await kv.set(`agent:${key}`, value, { ex: 86400 });
  else console.log(`[MEMORY] setAgentFlag: ${key} = ${value}`);
}

export async function getAgentFlag(key: string): Promise<string | null> {
  const kv = await getKv();
  if (kv) return kv.get(`agent:${key}`);
  return null;
}
