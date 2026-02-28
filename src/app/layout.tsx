import type { Metadata } from 'next';
import { Lora, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import '@/styles/globals.css';

// 1. Heading Font (Google)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// 2. Body Font (Local - Satoshi)
const satoshi = localFont({
  src: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
  weight: "300 900",
});

// 3. Mono Font (Google - Geist Mono)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home & Kitchen Platform",
  description: "Organic Modernist E-commerce",
};

import { Toaster } from '@/components/wellness-ui/toaster';
import { Navbar } from '@/components/external/dynamic-wrappers';
import { Footer } from '@/components/wellness-ui/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${satoshi.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-stone-900 focus:shadow-xl focus:rounded-full focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
