import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import localFont from 'next/font/local';

import '@/styles/globals.css';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/satoshi/Satoshi-Variable.woff2',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-body',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
});

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/geist-mono/GeistMono-Variable.woff2',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['SF Mono', 'Fira Code', 'monospace'],
});

export const metadata: Metadata = {
  title: {
    default: 'Home & Kitchen — Organic Modernist Living',
    template: '%s | Home & Kitchen',
  },
  description:
    'Premium self-sanitizing surfaces and modular multi-taskers for the modern home. Organic modernist design that restores calm to your kitchen.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Home & Kitchen',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${satoshi.variable} ${geistMono.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
