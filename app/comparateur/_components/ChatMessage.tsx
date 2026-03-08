import type { Message } from "../_lib/types";
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
        <div className="max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm"
          style={{ background: "#C9A84C", color: "#0D1B3E" }}>
          <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-start gap-3">
        {/* Avatar ELIA */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "linear-gradient(135deg, #1A3570, #0D2456)", border: "1px solid #C9A84C" }}>
          <svg className="w-4 h-4" style={{ color: "#C9A84C" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
          </svg>
        </div>

        {/* Bulle */}
        <div className="max-w-[78%]">
          <div className="rounded-2xl rounded-tl-sm px-4 py-3"
            style={{ background: "#0D2456", border: "1px solid #1A3570" }}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "#e8edf5" }}>
              {message.content}
            </p>
          </div>
          <p className="text-[10px] mt-1 ml-1" style={{ color: "#8090A8" }}>
            {message.timestamp.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
      </div>

      {/* Estimation card */}
      {message.estimation && <EstimationCard estimation={message.estimation} />}

      {/* Quick replies — uniquement sur le dernier message assistant */}
      {isLast && message.quickReplies && message.quickReplies.length > 0 && (
        <QuickReplies options={message.quickReplies} onSelect={onQuickReply} disabled={isLoading} />
      )}
    </div>
  );
}
