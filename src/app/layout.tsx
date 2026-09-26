import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

/* The site's only typeface, self-hosted by next/font. Only latin is
   preloaded; the rupee sign lives in latin-ext, which still loads on demand
   via unicode-range. 800/900 are synthesised from 700, as they always were. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://diagnoslab.in"),
  title: {
    default: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    template: "%s | Diagnos Lab",
  },
  description:
    "Jamshedpur's top-rated diagnostic lab in Sakchi. Blood tests, ultrasound by female radiologist, ECG & X-Ray. Home sample collection across all areas. Same-day digital reports. Call 8404802201.",
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
    url: "https://diagnoslab.in",
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
    canonical: "https://diagnoslab.in",
    types: {
      "text/plain": "https://diagnoslab.in/llms.txt",
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
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
