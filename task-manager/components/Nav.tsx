'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BellRing, CalendarCheck, LayoutDashboard, Send, Users } from 'lucide-react';

const links = [
  { href: '/', label: 'דשבורד', icon: LayoutDashboard },
  { href: '/tasks', label: 'משימות', icon: CalendarCheck },
  { href: '/reminders', label: 'תזכורות', icon: BellRing },
  { href: '/employees', label: 'עובדים', icon: Users },
  { href: '/reports', label: 'דוחות', icon: Send },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <span className="text-lg font-bold text-[var(--brand)]">ניהול משימות משרדי</span>
        <nav className="flex items-center gap-1 md:gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? 'bg-[var(--brand)] text-white' : 'text-[var(--muted)] hover:bg-[var(--bg)]'
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
