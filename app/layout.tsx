import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import { TranslationProvider } from '@/lib/TranslationContext';

export const metadata: Metadata = {
  title: 'GymBro - PPL Fitness Tracker',
  description: 'AI-driven Push-Pull-Legs workout tracking and coaching',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GymBro',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GymBro" />
        <meta name="theme-color" content="#0f0f0f" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="icon" type="image/png" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <TranslationProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto w-full px-4 pt-4 pb-20">
              {children}
            </main>
          </div>
        </TranslationProvider>
      </body>
    </html>
  );
}
