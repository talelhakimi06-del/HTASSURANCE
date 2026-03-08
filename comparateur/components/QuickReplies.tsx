type Props = {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
};

export default function QuickReplies({ options, onSelect, disabled }: Props) {
  if (!options.length) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-3 pl-11">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          disabled={disabled}
          className="px-4 py-2 text-sm font-medium rounded-full border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
