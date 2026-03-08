import Link from "next/link";
import type { PostMeta } from "../lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  "Décennale": "bg-orange-100 text-orange-700",
  "Assurance VTC": "bg-violet-100 text-violet-700",
  "RC Pro": "bg-blue-100 text-blue-700",
  "Assurance emprunteur": "bg-emerald-100 text-emerald-700",
  "Habitation": "bg-amber-100 text-amber-700",
};

export default function PostCard({ post }: { post: PostMeta }) {
  const catColor = CATEGORY_COLORS[post.category] ?? "bg-slate-100 text-slate-600";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-100 hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 ${catColor}`}>
          {post.category}
        </span>
        <span className="text-xs text-slate-400">{post.readTime}</span>
      </div>
      <h2 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-blue-600 transition-colors">
        {post.title}
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
        {post.description}
      </p>
      <p className="mt-4 text-blue-600 text-sm font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
        Lire l&apos;article <span>→</span>
      </p>
    </Link>
  );
}
