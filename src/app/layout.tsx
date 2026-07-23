import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";

import "./globals.css";

import { Analytics } from "@/components/analytics";
import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { Toaster } from "@/components/ui/sonner";
import { isDemoDeployment, site } from "@/content/site";
import { localBusinessJsonLd } from "@/lib/seo";

// Self-hosted via next/font — no external font requests, no layout shift.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Builders in Tauranga & Bay of Plenty`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: true },
  // Site-wide default so routes without their own metadata (404, etc.) are
  // covered too. Per-page buildMetadata() re-applies the same rule.
  ...(isDemoDeployment ? { robots: { index: false, follow: false } } : {}),
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NZ",
    url: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NZ"
      // Opts back into Next's scroll-behavior override during navigation,
      // which v16 no longer does by default.
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 lg:pb-0">
        <JsonLd data={localBusinessJsonLd()} />
        <a
          href="#main"
          className="sr-only rounded-sm bg-clay px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
        <Toaster position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
