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
import { pageUrl, ogDefaults } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us | Diagnostic Centre in Jamshedpur Since 2009",
  description:
    "Diagnos Lab, Sakchi: Jamshedpur's trusted diagnostic centre since 2009. NABL and ISO certified, rated 4.9 from 2,700+ Google reviews.",
  keywords: [
    "About Diagnos Lab",
    "Best Diagnostic Center Jamshedpur",
    "Trusted Pathology Lab Jamshedpur",
    "NABL Lab Jamshedpur",
    "Diagnos Lab History",
  ],
  alternates: {
    canonical: pageUrl("/aboutUs/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "About Us | Trusted Diagnostic Centre in Jamshedpur",
    description:
      "15+ years of diagnostic excellence in Jamshedpur. A 4.9 rating from 2,700+ Google reviews, in-house pathologist, same-day reports.",
    url: pageUrl("/aboutUs/"),
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
