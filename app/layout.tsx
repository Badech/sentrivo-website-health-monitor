import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import '@/styles/globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Sentrivo — Website Conversion Monitoring',
    template: '%s | Sentrivo',
  },
  description:
    'Sentrivo monitors your website daily and alerts you before broken UX, speed issues, and conversion leaks cost you leads.',
  keywords: [
    'website monitoring',
    'conversion optimization',
    'UX monitoring',
    'lead tracking',
    'website health',
  ],
  authors: [{ name: 'Sentrivo' }],
  creator: 'Sentrivo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sentrivo.com',
    title: 'Sentrivo — Website Conversion Monitoring',
    description:
      'Sentrivo monitors your website daily and alerts you before broken UX, speed issues, and conversion leaks cost you leads.',
    siteName: 'Sentrivo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sentrivo — Website Conversion Monitoring',
    description:
      'Sentrivo monitors your website daily and alerts you before broken UX, speed issues, and conversion leaks cost you leads.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7TX04S8T0T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7TX04S8T0T');
          `}
        </Script>
        
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
