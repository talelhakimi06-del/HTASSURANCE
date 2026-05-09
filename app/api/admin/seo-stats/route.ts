import { NextRequest, NextResponse } from "next/server";
import { fetchSeoStats, type Period } from "@/lib/searchConsole";

export const revalidate = 3600; // 1h

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const periodParam = url.searchParams.get("period");
  const period: Period =
    periodParam === "7d" || periodParam === "30d" ? periodParam : "90d";

  const stats = await fetchSeoStats(period);

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "private, max-age=0, s-maxage=3600",
    },
  });
}
