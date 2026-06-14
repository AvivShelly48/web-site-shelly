'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList } from 'lucide-react';
import { NAV_LINKS } from '@/lib/nav-links';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:end-0 md:w-64 bg-white border-s border-[var(--border)] p-4">
      <div className="flex items-center gap-2 px-2 py-3 mb-4">
        <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--brand)] text-white">
          <ClipboardList size={18} />
        </span>
        <span className="font-bold leading-tight">
          ניהול משימות
          <br />
          משרדי
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active ? 'bg-[var(--brand-soft)] text-[var(--brand)]' : 'text-[var(--muted)] hover:bg-[var(--bg)]'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
