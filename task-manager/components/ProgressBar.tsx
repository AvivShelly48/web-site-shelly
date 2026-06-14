export default function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5">
      <div
        className="bg-[var(--brand)] h-2.5 rounded-full transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
