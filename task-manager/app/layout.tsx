import './globals.css';
import type { Metadata, Viewport } from 'next';
import Sidebar from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import TopBar from '@/components/TopBar';

export const metadata: Metadata = {
  title: 'ניהול משימות משרדי',
  description: 'אפליקציה לניהול משימות יומיות, שבועיות וחודשיות במשרד, עם תזכורות ודוחות לעובדים בוואטסאפ ובמייל.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#3b6fe0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Sidebar />
        <div className="md:me-64">
          <TopBar />
          <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 pb-24 md:pb-10">{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
