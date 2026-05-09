import { fetchSeoStats, type Period } from "@/lib/searchConsole";
import SeoDashboard from "./SeoDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dashboard SEO — HT Assurance",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ period?: string }>;

export default async function AdminSeoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const period: Period =
    params.period === "7d" || params.period === "30d" ? params.period : "90d";

  const stats = await fetchSeoStats(period);

  return <SeoDashboard initialStats={stats} initialPeriod={period} />;
}
