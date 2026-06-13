import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VELARO | Beyond The Surface',
  description: 'Luxury architectural surface systems for kitchens, interiors and engineered cladding.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
