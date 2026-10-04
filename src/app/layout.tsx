import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import AdsTracking from "@/components/layout/adsTracking";
import Tracking from "@/components/layout/tracking";
import { SITE_URL, pageUrl } from "@/lib/schema";
import "./globals.css";

/* Plus Jakarta Sans for headings, Inter for everything else, both
   self-hosted by next/font. The rupee sign lives in latin-ext, which loads
   on demand via unicode-range. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
  /* Not preloaded: with display swap the text paints in the metric-matched
     fallback straight away, and preloaded font files compete with the LCP
     element for bandwidth on slow 4G. */
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    template: "%s | Diagnos Lab",
  },
  description:
    "Jamshedpur's top-rated diagnostic lab in Sakchi. Blood tests, ultrasound by female radiologist, ECG & X-Ray. Home sample collection across all areas. Same-day digital reports. Call 8404802214.",
  keywords: [
    "Blood Test in Jamshedpur",
    "Best Lab in Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Pathology Lab Jamshedpur",
    "Ultrasound in Jamshedpur",
    "Home Blood Collection Jamshedpur",
    "Lab in Sakchi Jamshedpur",
    "Diagnos Lab Jamshedpur",
    "Blood Test in Sakchi",
    "ECG in Jamshedpur",
    "X-Ray in Jamshedpur",
    "Health Packages Jamshedpur",
  ],
  openGraph: {
    title: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    description:
      "Top-rated diagnostic centre in Sakchi, Jamshedpur. Blood tests, USG, ECG, X-Ray, and health packages with home collection.",
    url: SITE_URL,
    siteName: "Diagnos Lab",
    images: [
      {
        url: "/images/diagnoslogo.avif",
        width: 1200,
        height: 630,
        alt: "Diagnos Lab – Diagnostic Centre in Jamshedpur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnos Lab | Diagnostic Centre in Jamshedpur",
    description:
      "Book blood tests, ultrasound, ECG, and X-Ray at Diagnos Lab in Sakchi, Jamshedpur.",
    images: ["/images/diagnoslogo.avif"],
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      "text/plain": pageUrl("/llms.txt"),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${inter.variable} antialiased`}>
        {children}
        <Tracking />
        <AdsTracking />
        {/* ReplyBash chat widget. Loaded after the page is idle so it never
            competes with the LCP element. */}
        <Script
          src="https://replybash.sitebackend.com/embed.js"
          data-agent-id="diagnoslab_RQQVD"
          // strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
