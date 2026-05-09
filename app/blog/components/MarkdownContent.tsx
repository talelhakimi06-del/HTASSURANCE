import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { InlineCta } from "./ArticleLayout";

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <>
      <div className="md-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-12 mb-5 leading-tight">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-3">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-slate-700 leading-relaxed text-base mb-5">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-5">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-6 space-y-2 text-slate-700 mb-5">
                {children}
              </ol>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 hover:text-blue-800 underline font-medium"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-5 py-3 italic text-slate-700 my-6 rounded-r">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border border-slate-300 text-sm">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-bold">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-slate-300 px-3 py-2">{children}</td>
            ),
            strong: ({ children }) => (
              <strong className="font-bold text-slate-900">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">
                {children}
              </code>
            ),
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
      <InlineCta />
    </>
  );
}
