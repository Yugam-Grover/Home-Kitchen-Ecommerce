import type { Metadata } from 'next';
import { Lora, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import '@/styles/tailwind.css';

// 1. Heading Font (Google)
const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

// 2. Body Font (Local - Satoshi)
const satoshi = localFont({
  src: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-body",
  display: "swap",
  weight: "300 900",
});

// 3. Mono Font (Google - Geist Mono)
const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Home & Kitchen Platform",
  description: "Organic Modernist E-commerce",
};

import { ToastProvider } from '@/components/wellness-ui/toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lora.variable} ${satoshi.variable} ${geistMono.variable} antialiased bg-surface-default text-primary font-sans`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
