import './globals.css';
import type { Metadata } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import SmoothScroll from './components/SmoothScroll';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VELARO — Beyond The Surface',
  description:
    'VELARO designs luxury architectural surface systems for elite kitchens, interiors and engineered facades. Inspired by the sail. Built to endure.',
  metadataBase: new URL('https://velaro.example'),
  openGraph: {
    title: 'VELARO — Beyond The Surface',
    description: 'Luxury architectural surface systems. Inspired by the sail.',
    images: ['/media/wordmark.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
