import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { StickyBooking } from "@/components/layout/StickyBooking";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE_URL } from "@/config/brand";
import { SEO } from "@/lib/seo";
import "./globals.css";

const mona = localFont({
  src: "../fonts/MonaSans-Variable-latin.woff2",
  variable: "--font-mona",
  weight: "200 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  adjustFontFallback: "Arial",
});

const schibsted = localFont({
  src: "../fonts/SchibstedGrotesk-Variable-latin.woff2",
  variable: "--font-schibsted",
  weight: "400 900",
  display: "swap",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: "%s — VX Barbearia · Rio de Janeiro",
  },
  description: SEO.description,
  applicationName: "VX",
  keywords: [
    "barbearia Rio de Janeiro",
    "barbearia RJ",
    "barbeiro Rio de Janeiro",
    "corte masculino Rio de Janeiro",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "VX",
    title: SEO.title,
    description: SEO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title,
    description: SEO.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${mona.variable} ${schibsted.variable}`} suppressHydrationWarning>
      <head>
        <script
          // Marca que há JS antes da primeira pintura (revelações só com JS).
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <SmoothScroll>
          <BookingProvider>
            <Navbar />
            <main id="conteudo">{children}</main>
            <Footer />
            <StickyBooking />
          </BookingProvider>
        </SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
