"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";

/* Web Speech API — not always in TS lib, declare minimally */
interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
}
interface ISpeechRecognitionEvent {
  resultIndex: number;
  results: { isFinal: boolean; [index: number]: { transcript: string } }[];
}
type SpeechRecognitionCtor = new () => ISpeechRecognition;

type Props = {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export default function ChatInput({ onSend, disabled, placeholder }: Props) {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const finalTranscriptRef = useRef("");

  useEffect(() => {
    const supported =
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setVoiceSupported(supported);

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  function adjustHeight() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    if (isListening) stopListening();
    onSend(trimmed);
    setValue("");
    finalTranscriptRef.current = "";
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function stopListening() {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  }

  function toggleVoice() {
    if (isListening) {
      stopListening();
      return;
    }

    const w = window as Window & { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor };
    const SpeechRecognitionAPI = w.SpeechRecognition ?? w.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "fr-FR";
    recognition.continuous = true;
    recognition.interimResults = true;

    finalTranscriptRef.current = value;

    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += t + " ";
        } else {
          interim = t;
        }
      }
      const newValue = finalTranscriptRef.current + interim;
      setValue(newValue);
      setTimeout(adjustHeight, 0);
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
      setValue(finalTranscriptRef.current.trim());
    };

    recognition.onerror = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }

  return (
    <div className="flex items-end gap-2 rounded-2xl px-4 py-3 transition-all duration-200"
      style={{
        background: "#0D2456",
        border: `1px solid ${isListening ? "#D94F3D" : "#1A3570"}`,
        boxShadow: isListening ? "0 0 0 2px rgba(217,79,61,0.2)" : undefined,
      }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={adjustHeight}
        disabled={disabled}
        placeholder={isListening ? "🎙 J'écoute…" : (placeholder ?? "Écris ton message…")}
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm outline-none disabled:opacity-50 max-h-[140px] leading-relaxed"
        style={{ color: "#e8edf5" }}
      />

      {voiceSupported && (
        <button type="button" onClick={toggleVoice} disabled={disabled}
          title={isListening ? "Arrêter la dictée" : "Dicter un message"}
          aria-label={isListening ? "Arrêter la dictée" : "Dicter un message"}
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-40"
          style={{ background: isListening ? "#D94F3D" : "#1A3570" }}>
          {isListening ? (
            <span className="flex items-center gap-[2px]">
              <span className="w-[3px] h-3 bg-white rounded-full animate-[soundwave_0.6s_ease-in-out_infinite_0ms]" />
              <span className="w-[3px] h-5 bg-white rounded-full animate-[soundwave_0.6s_ease-in-out_infinite_100ms]" />
              <span className="w-[3px] h-3 bg-white rounded-full animate-[soundwave_0.6s_ease-in-out_infinite_200ms]" />
            </span>
          ) : (
            <svg className="w-4 h-4" style={{ color: "#8090A8" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
      )}

      <button onClick={handleSend} disabled={disabled || !value.trim()} aria-label="Envoyer"
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 hover:opacity-90"
        style={{ background: value.trim() ? "#C9A84C" : "#1A3570" }}>
        <svg className="w-4 h-4" style={{ color: value.trim() ? "#0D1B3E" : "#8090A8" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      </button>
    </div>
  );
}
