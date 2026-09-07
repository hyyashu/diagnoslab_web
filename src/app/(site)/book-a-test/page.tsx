import type { Metadata } from "next";
import BookHero from "./components/bookHero";
import WhyDiagnosLab from "@/components/whyDiagnos/whyDiagnos";
import PopularTests from "@/components/popularTests";
import PopularHealthPackages from "@/components/packages";
import JsonLd from "@/components/jsonLd";

export const metadata: Metadata = {
  title: { absolute: "Book Blood Test in Jamshedpur | Home Collection | Diagnos Lab" },
  description:
    "Book blood tests, ultrasound, ECG, X-Ray & health packages in Jamshedpur with home sample collection. Same-day digital reports. Call +91 8404802201.",
  keywords: [
    "book blood test jamshedpur",
    "blood test at home jamshedpur",
    "home collection jamshedpur",
    "home sample collection jamshedpur",
    "book diagnostic test jamshedpur",
    "blood test near me jamshedpur",
    "full body checkup booking jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/book-a-test",
  },
  openGraph: {
    title: "Book Blood Test in Jamshedpur | Home Collection | Diagnos Lab",
    description:
      "Home sample collection across all Jamshedpur areas. Same-day reports.",
    url: "https://diagnoslab.in/book-a-test",
  },
};

const bookingSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Diagnos Lab",
  telephone: "+918404802201",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sakchi",
    addressLocality: "Jamshedpur",
    addressRegion: "Jharkhand",
    addressCountry: "IN",
  },
  areaServed: "Jamshedpur",
  potentialAction: {
    "@type": "ReserveAction",
    target: "https://diagnoslab.in/book-a-test",
    name: "Book a Blood Test",
  },
};

const bookingBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://diagnoslab.in" },
    { "@type": "ListItem", position: 2, name: "Book a Blood Test in Jamshedpur", item: "https://diagnoslab.in/book-a-test" },
  ],
};

export default function BookATestPage() {
  return (
    <>
      <JsonLd data={bookingSchema} />
      <JsonLd data={bookingBreadcrumb} />
      <BookHero />
      <WhyDiagnosLab />
      <PopularTests />
      <PopularHealthPackages />
    </>
  );
}
