/* ─────────────────────────────────────────────────────────────────────
   Wrapper Google Search Console API.
   - Auth via service account (JSON dans GOOGLE_SERVICE_ACCOUNT_JSON)
   - Format de retour normalisé pour le dashboard
───────────────────────────────────────────────────────────────────── */

import { google } from "googleapis";

const SITE_URL = "sc-domain:htassurance.fr";
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

export type Period = "7d" | "30d" | "90d";

export type Row = {
  key: string; // requête ou page
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

export type EvolutionPoint = {
  date: string;
  clicks: number;
  impressions: number;
};

export type SeoStats = {
  totals: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  evolution: EvolutionPoint[];
  topQueries: Row[];
  topPages: Row[];
  period: Period;
  fetchedAt: string;
  error?: string;
};

const EMPTY: SeoStats = {
  totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
  evolution: [],
  topQueries: [],
  topPages: [],
  period: "90d",
  fetchedAt: new Date().toISOString(),
};

function periodToDays(p: Period): number {
  return p === "7d" ? 7 : p === "30d" ? 30 : 90;
}

function dateRange(p: Period) {
  const end = new Date();
  end.setDate(end.getDate() - 2); // SC a un délai de ~2 jours
  const start = new Date(end);
  start.setDate(start.getDate() - periodToDays(p));
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    const credentials = JSON.parse(raw) as { client_email: string; private_key: string };
    return new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });
  } catch (err) {
    console.error("[searchConsole] JSON invalide:", err);
    return null;
  }
}

export async function fetchSeoStats(period: Period = "90d"): Promise<SeoStats> {
  const auth = getAuth();
  if (!auth) {
    return { ...EMPTY, period, error: "GOOGLE_SERVICE_ACCOUNT_JSON manquant" };
  }

  const { startDate, endDate } = dateRange(period);
  const wm = google.webmasters({ version: "v3", auth });

  try {
    const [topQ, topP, daily] = await Promise.all([
      wm.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ["query"],
          rowLimit: 50,
        },
      }),
      wm.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ["page"],
          rowLimit: 50,
        },
      }),
      wm.searchanalytics.query({
        siteUrl: SITE_URL,
        requestBody: {
          startDate,
          endDate,
          dimensions: ["date"],
          rowLimit: periodToDays(period) + 5,
        },
      }),
    ]);

    type ScRow = {
      keys?: string[] | null;
      clicks?: number | null;
      impressions?: number | null;
      ctr?: number | null;
      position?: number | null;
    };
    const mapRow = (r: ScRow): Row => ({
      key: r.keys?.[0] ?? "",
      clicks: r.clicks ?? 0,
      impressions: r.impressions ?? 0,
      ctr: r.ctr ?? 0,
      position: r.position ?? 0,
    });

    const topQueries = ((topQ.data.rows ?? []) as ScRow[]).map(mapRow);
    const topPages = ((topP.data.rows ?? []) as ScRow[]).map(mapRow);
    const evolution: EvolutionPoint[] = ((daily.data.rows ?? []) as ScRow[]).map(
      (r) => ({
        date: r.keys?.[0] ?? "",
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
      })
    );

    const totals = topQueries.reduce(
      (acc, r) => {
        acc.clicks += r.clicks;
        acc.impressions += r.impressions;
        return acc;
      },
      { clicks: 0, impressions: 0 }
    );
    const positionWeighted =
      topQueries.reduce((acc, r) => acc + r.position * r.impressions, 0) /
      Math.max(totals.impressions, 1);

    return {
      totals: {
        clicks: totals.clicks,
        impressions: totals.impressions,
        ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
        position: positionWeighted || 0,
      },
      evolution,
      topQueries,
      topPages,
      period,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[searchConsole] error:", msg);
    return { ...EMPTY, period, error: msg };
  }
}
