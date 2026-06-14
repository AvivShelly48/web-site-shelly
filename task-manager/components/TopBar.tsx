import { ClipboardList } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="md:hidden sticky top-0 z-10 bg-white border-b border-[var(--border)] px-4 py-3 flex items-center gap-2">
      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--brand)] text-white">
        <ClipboardList size={16} />
      </span>
      <span className="font-bold text-sm">ניהול משימות משרדי</span>
    </header>
  );
}
