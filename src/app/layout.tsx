import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Codaze - For Life Partners',
  description: 'Schedule alignment app for partners',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}