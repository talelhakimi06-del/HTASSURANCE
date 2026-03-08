import type { Message } from "@/lib/types";
import QuickReplies from "./QuickReplies";
import EstimationCard from "./EstimationCard";

type Props = {
  message: Message;
  onQuickReply: (text: string) => void;
  isLast: boolean;
  isLoading: boolean;
};

export default function ChatMessage({ message, onQuickReply, isLast, isLoading }: Props) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-[75%] bg-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>

        {/* Bubble */}
        <div className="max-w-[78%]">
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">{message.content}</p>
          </div>

          <p className="text-[10px] text-slate-400 mt-1 ml-1">
            {message.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>

      {/* Estimation card */}
      {message.estimation && <EstimationCard estimation={message.estimation} />}

      {/* Quick replies — only on last assistant message when not loading */}
      {isLast && !isLoading && message.quickReplies && message.quickReplies.length > 0 && (
        <QuickReplies options={message.quickReplies} onSelect={onQuickReply} />
      )}
    </div>
  );
}
