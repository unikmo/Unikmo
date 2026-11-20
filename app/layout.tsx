import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/lib/toast";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SiteEntityJsonLd from "@/components/SiteEntityJsonLd";
import { Analytics } from "@vercel/analytics/react";
// Initialize admin user on app startup
import "@/lib/init-admin";

const siteTitle = "UNIKMO | Less stuff. More us.";
const siteDescription =
  "Less stuff. More us. Your voice, your words, their private moment — inside a premium physical UNIKMO card. No recipient app or account required.";
const twitterDescription =
  "Less stuff. More us. Give a private, personal moment inside a physical card.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.unikmo.com"),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "https://www.unikmo.com/",
  },
  icons: {
    icon: [{ url: "/unikmo-monogram.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: "https://www.unikmo.com/",
    siteName: "UNIKMO",
    images: ["https://www.unikmo.com/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: twitterDescription,
    images: ["https://www.unikmo.com/og-image.jpg"],
  },
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased font-sans">
        <SiteEntityJsonLd />
        <ErrorBoundary>
          <ToastProvider />
          {children}
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
