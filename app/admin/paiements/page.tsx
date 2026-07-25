import PaiementsClient from "./PaiementsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Paiements & Factures — HT Assurance",
  robots: { index: false, follow: false },
};

export default function AdminPaiementsPage() {
  return <PaiementsClient />;
}
