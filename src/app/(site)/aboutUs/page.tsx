import type { Metadata } from "next";
import AboutHero from "./components/aboutHero";
import Journey from "./components/journey";
import WhyTrust from "./components/whyTrust";
import HowItWorks from "@/components/sections/howItWorks";
import FindUsAreas from "@/components/sections/findUsAreas";
import PatientReviews from "@/components/sections/patientReviews";
import FaqCards from "@/components/sections/faqCards";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { generalFaq } from "@/lib/faq";

export const metadata: Metadata = {
  title: {
    absolute: "About Diagnos Lab | Diagnostic Centre in Jamshedpur Since 2009",
  },
  description:
    "Learn about Diagnos Lab, Jamshedpur's trusted diagnostic centre for 15+ years. NABL-quality testing, 4.9-star Google rating, and a patient-first team in Sakchi.",
  keywords: [
    "About Diagnos Lab",
    "Best Diagnostic Center Jamshedpur",
    "Trusted Pathology Lab Jamshedpur",
    "NABL Lab Jamshedpur",
    "Diagnos Lab History",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/aboutUs/",
  },
  openGraph: {
    title: "About Diagnos Lab | Trusted Diagnostic Centre in Jamshedpur",
    description:
      "15+ years of diagnostic excellence in Jamshedpur. 4.9-star rating, in-house pathologist, same-day reports.",
    url: "https://diagnoslab.in/aboutUs/",
  },
};

/* DL.pen "About Us" (desktop and mobile). */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Journey />
      <WhyTrust />
      <HowItWorks />
      <FindUsAreas tone="muted" staticMap />
      <PatientReviews tone="white" />
      <FaqJsonLd items={generalFaq} />
      <FaqCards items={generalFaq} />
    </>
  );
}
