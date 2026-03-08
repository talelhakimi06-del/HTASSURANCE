export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in">
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #1A3570, #0D2456)", border: "1px solid #C9A84C" }}>
        <svg className="w-4 h-4" style={{ color: "#C9A84C" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <div className="rounded-2xl rounded-tl-sm px-4 py-3"
        style={{ background: "#0D2456", border: "1px solid #1A3570" }}>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full inline-block"
              style={{ background: "#C9A84C", animation: `typing 1.2s infinite ${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
