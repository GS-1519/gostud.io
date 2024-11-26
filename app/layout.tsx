import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import FooterWrapper from "@/components/FooterWrapper";
import { CSPostHogProvider } from './providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import ClarityScript from "@/components/ClarityScript";
import GoogleTagManager from "@/components/GoogleTagManager";

export const metadata: Metadata = {
  metadataBase: new URL('https://gostudio.ai'),
  title: "Headshots AI",
  description: "Generate awesome headshots in minutes using AI",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="GoStudio" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msvalidate.01" content="1EBFA7B1A8C0B11490CBE5476B33271C" />
      </head>
      <body className="flex flex-col bg-[#F4F7FA] min-h-screen w-full overflow-x-hidden font-[Poppins]">
        <GoogleTagManager />
        <ClarityScript />
        <Navbar />
        <CSPostHogProvider>
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
        </CSPostHogProvider>
        <FooterWrapper />
        <Toaster />
        <Analytics />    
        <SpeedInsights />    
      </body>
    </html>
  );
}