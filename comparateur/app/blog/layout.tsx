import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-semibold text-lg hover:text-blue-700 transition-colors">
            HT Assurance
          </Link>
          <Link
            href="/"
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Obtenir un devis →
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-100 mt-20 py-10">
        <div className="max-w-3xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} HT Assurance — Courtier en assurance à Nice</p>
          <p className="mt-1">
            <Link href="/blog" className="hover:text-slate-600">Blog</Link>
            {" · "}
            <Link href="/" className="hover:text-slate-600">Comparateur</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
