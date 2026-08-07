import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar";
import BottomNav from "./components/BottomNav";
import FloatingCTA from "./components/floatingCTA";
import Footer from "./components/footer";
import FAQAccordion from "./components/faq";
import FaqJsonLd from "./components/FaqJsonLd";
import FindUs from "./components/findus";
import AreasServed from "./components/areasServed";
import ReviewCarousel from "./components/reviews/reviews";
import ConditionalHowItWorks from "./components/conditionalHowItWorks";
import JsonLd from "./components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Diagnos Lab",
  alternateName: "Diagno Labs Jamshedpur",
  url: "https://diagnoslab.in",
  logo: "https://diagnoslab.in/images/diagnoslogo.avif",
  image: "https://diagnoslab.in/images/diagnoslogo.avif",
  description:
    "Diagnos Lab is a top-rated diagnostic centre in Sakchi, Jamshedpur offering blood tests, ultrasound, ECG, X-Ray, PFT, and health packages with home sample collection.",
  telephone: "+918404802201",
  email: "info@diagnoslab.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sakchi",
    addressLocality: "Jamshedpur",
    addressRegion: "Jharkhand",
    postalCode: "831001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.8046,
    longitude: 86.2029,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:30",
      closes: "20:00",
    },
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "3000",
    bestRating: "5",
  },
  sameAs: ["https://wa.me/918404802214"],
  areaServed: [
    "Jamshedpur",
    "Sakchi",
    "Bistupur",
    "Jugsalai",
    "Adityapur",
    "Mango",
    "Kadma",
    "Agrico",
    "Golmuri",
    "Telco",
    "Baridih",
    "Sonari",
  ],
  medicalSpecialty: ["Pathology", "Radiology", "Cardiology"],
  availableService: [
    { "@type": "MedicalTest", name: "Blood Test" },
    { "@type": "MedicalTest", name: "Ultrasound (USG)" },
    { "@type": "MedicalTest", name: "Mammography" },
    { "@type": "MedicalTest", name: "X-Ray" },
    { "@type": "MedicalTest", name: "Echocardiography" },
    { "@type": "MedicalTest", name: "ECG" },
    { "@type": "MedicalTest", name: "PFT" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://diagnoslab.in"),
  title: {
    default: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    template: "%s | Diagnos Lab",
  },
  description:
    "Diagnos Lab is Jamshedpur's top-rated diagnostic centre in Sakchi. Book blood tests, ultrasound (USG), ECG, X-Ray, and health packages with home sample collection and same-day reports.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd data={localBusinessSchema} />
        <Navbar />
        <main className="pt-12 md:pt-24 pb-16 md:pb-0">
          {children}
          <FloatingCTA
            phoneNumber="+918404802201"
            whatsappNumber="+918404802214"
          />
          <FindUs />
          <AreasServed />
          <ReviewCarousel />
          <ConditionalHowItWorks />
          <FaqJsonLd />
          <FAQAccordion />
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
