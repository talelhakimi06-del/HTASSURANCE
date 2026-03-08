import type { Metadata } from "next";
import ChatContainer from "./_components/ChatContainer";

export const metadata: Metadata = {
  title: "Comparateur Assurance IA — HT Assurance Nice",
  description:
    "Comparez vos assurances en 2 minutes avec l'assistant intelligent de HT Assurance. Décennale, RC Pro, VTC, emprunteur, habitation, auto.",
  robots: { index: true, follow: true },
};

export default function ComparateurPage() {
  return <ChatContainer />;
}
