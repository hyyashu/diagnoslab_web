import type { Metadata } from "next";
import FeaturedTests from "@/components/sections/featuredTests";
import FeaturedPackages from "@/components/sections/featuredPackages";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import JsonLd from "@/components/seo/jsonLd";
import BookHero from "./components/bookHero";
import BookingSteps from "./components/bookingSteps";
import PrescriptionBand from "./components/prescriptionBand";
import Coverage from "./components/coverage";
import { bookingFaq } from "./content";
import { ORG_REF, breadcrumbSchema, pageUrl, ogDefaults } from "@/lib/schema";
import { PHONE_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Book Blood Test in Jamshedpur | Home Collection",
  description:
    `Book blood tests, ultrasound, ECG, X-Ray & health packages in Jamshedpur with home sample collection. Same-day digital reports. Call ${PHONE_DISPLAY}.`,
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
    canonical: pageUrl("/book-a-test/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "Book Blood Test in Jamshedpur | Home Collection",
    description:
      "Home sample collection across all Jamshedpur areas. Same-day reports.",
    url: pageUrl("/book-a-test/"),
  },
};

const bookingSchema = {
  "@context": "https://schema.org",
  /* Attaches the booking action to the existing business node rather than
     declaring a second Diagnos Lab. */
  ...ORG_REF,
  potentialAction: {
    "@type": "ReserveAction",
    target: pageUrl("/book-a-test/"),
    name: "Book a Blood Test",
  },
};

const bookingBreadcrumb = breadcrumbSchema([
  ["Home", ""],
  ["Book a Blood Test in Jamshedpur", "/book-a-test/"],
]);

export default function BookATestPage() {
  return (
    <>
      <JsonLd data={bookingSchema} />
      <JsonLd data={bookingBreadcrumb} />
      <BookHero />
      <BookingSteps />
      <FeaturedTests
        eyebrow="TRANSPARENT PRICES"
        title="Popular tests & prices"
        subtitle="Tell us the test name on the call and we'll confirm the price and slot right away."
      />
      <PrescriptionBand />
      <FeaturedPackages title="Full-body checkups, collected at your home" />
      <Coverage />
      <PatientReviews tone="white" subtitle="Real Google reviews from patients across Jamshedpur" />
      <FaqJsonLd items={bookingFaq} />
      <FAQAccordion
        title="Questions before you book?"
        items={bookingFaq}
        intro="Not sure which test to book? Message us on WhatsApp, share your prescription and we'll help."
        tone="muted"
      />
    </>
  );
}
