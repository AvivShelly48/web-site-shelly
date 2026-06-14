import { BellRing, CalendarCheck, LayoutDashboard, Send, Users, type LucideIcon } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'דשבורד', icon: LayoutDashboard },
  { href: '/tasks', label: 'משימות', icon: CalendarCheck },
  { href: '/reminders', label: 'תזכורות', icon: BellRing },
  { href: '/employees', label: 'עובדים', icon: Users },
  { href: '/reports', label: 'דוחות', icon: Send },
];
