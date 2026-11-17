import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import AdsTracking from "@/components/layout/adsTracking";
import Tracking from "@/components/layout/tracking";
import { OG_IMAGE, SITE_URL, ogDefaults, pageUrl } from "@/lib/schema";
import "./globals.css";
import { PHONE_DISPLAY } from "@/lib/contact";

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

/* Titles: pages give only their own words ("Book ECG in Jamshedpur") and
   these templates add " | Diagnos Lab", to the page title and the share
   (Open Graph) title alike. Twitter sets no title or description, so Next
   fills both from each page's Open Graph tags. Use `title: { absolute }`
   only for a title that must not carry the brand. */
const BRAND_TEMPLATE = "%s | Diagnos Lab";
const DEFAULT_TITLE = "Blood Test, Ultrasound & Radiology in Jamshedpur | Diagnos Lab";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: BRAND_TEMPLATE,
  },
  description:
    `Jamshedpur's top-rated diagnostic lab in Sakchi: blood tests, ultrasound by a female radiologist, ECG, X-ray. Home collection from 6 AM. Call ${PHONE_DISPLAY}.`,
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
    ...ogDefaults,
    title: { default: DEFAULT_TITLE, template: BRAND_TEMPLATE },
    description:
      "Top-rated diagnostic centre in Sakchi, Jamshedpur. Blood tests, USG, ECG, X-Ray, and health packages with home collection.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
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
          src="https://replybash.com/embed.js"
          data-agent-id="diagnoslab_RQQVD"
          // strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
