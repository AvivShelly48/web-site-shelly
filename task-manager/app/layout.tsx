import './globals.css';
import type { Metadata } from 'next';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'ניהול משימות משרדי',
  description: 'אפליקציה לניהול משימות יומיות וחודשיות במשרד, עם דוחות לעובדים בוואטסאפ ובמייל.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Nav />
        <main className="max-w-6xl mx-auto px-4 md:px-8 py-6">{children}</main>
      </body>
    </html>
  );
}
