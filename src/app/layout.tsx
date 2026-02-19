import type { Metadata } from 'next';
import { Lora, Inter } from 'next/font/google';

import '@/styles/globals.css';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['400', '500', '600', '700'],
});

// Using Inter as temporary body font until Satoshi .woff2 files are provided
// TODO: Replace with localFont({ src: '../../public/fonts/satoshi/Satoshi-Variable.woff2' })
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

// TODO: Add Geist Mono local font when .woff2 files are provided
// const geistMono = localFont({
//   src: [{ path: '../../public/fonts/geist-mono/GeistMono-Variable.woff2', style: 'normal' }],
//   display: 'swap',
//   variable: '--font-mono',
// });

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
      className={`${lora.variable} ${inter.variable}`}
    >
      <body>
        {children}
      </body>
    </html>
  );
}
