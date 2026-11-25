import type { Metadata } from "next";
import { Clock3, House, Star } from "lucide-react";
import ServicePageHero from "@/components/sections/servicePageHero";
import WhyPoints from "@/components/sections/whyPoints";
import HowItWorks from "@/components/sections/howItWorks";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { labWhyPoints, labWhySubtitle } from "@/components/sections/labWhyPoints";
import { getTests } from "@/lib/catalog";
import { labTestsFaq } from "@/lib/faq";
import TestBrowser, { type BrowserTest } from "./components/testBrowser";
import { pageUrl, ogDefaults } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book Blood Tests in Jamshedpur | All Lab Tests",
  description:
    "Browse and book 500+ blood tests and pathology tests at Diagnos Lab in Jamshedpur. Home sample collection, affordable pricing, and same-day digital reports.",
  keywords: [
    "Blood Test in Jamshedpur",
    "Book Lab Test Jamshedpur",
    "Pathology Test Jamshedpur",
    "Complete Blood Count Jamshedpur",
    "Thyroid Test Jamshedpur",
    "Diabetes Test Jamshedpur",
    "Liver Function Test Jamshedpur",
    "Home Sample Collection Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/tests/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "Book Blood Tests in Jamshedpur",
    description:
      "Browse 500+ lab tests. Book with home sample collection at Diagnos Lab, Sakchi, Jamshedpur.",
    url: pageUrl("/tests/"),
  },
};

export default function Page() {
  const tests: BrowserTest[] = getTests().map((t) => ({
    slug: t.slug,
    title: t.title,
    description: t.description,
    price: t.price,
    originalPrice: t.originalPrice,
    category: t.category,
    categories: t.categories,
    fasting: t.fasting,
    reporting: t.reporting,
  }));

  return (
    <>
      <ServicePageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Lab Tests" }]}
        eyebrow="Blood tests in Jamshedpur · Home collection available"
        title="Blood tests in Jamshedpur, reports in 6–12 hours"
        subtitle="CBC, thyroid, diabetes, liver, kidney and hormone tests, with sample collection at home or at our Sakchi, Jugsalai and Adityapur centres."
        proofPoints={[
          { icon: Clock3, value: "6–12 hrs", label: "Report turnaround", mobileLabel: "Reports" },
          { icon: House, value: "At home", label: "Sample collection", mobileLabel: "Collection" },
          { icon: Star, value: "4.9", label: "2,700+ Google reviews", mobileLabel: "Google rating" },
        ]}
        cta={{ label: "Book a test", href: "#tests-section" }}
        form={{ service: "Blood test" }}
      />
      <TestBrowser tests={tests} />
      <WhyPoints
        title="Why patients in Jamshedpur choose us for lab tests"
        mobileTitle="Why patients choose us for lab tests"
        subtitle={labWhySubtitle}
        points={labWhyPoints}
      />
      <HowItWorks />
      <FindUsPanel tone="muted" />
      <PatientReviews tone="white" />
      <FaqJsonLd items={labTestsFaq} />
      <FAQAccordion
        title="Lab test FAQs"
        items={labTestsFaq}
        intro="Still unsure? Message us on WhatsApp and our team will help you pick the right test."
        tone="muted"
      />
    </>
  );
}
