import type { Metadata } from "next";
import HeroSection from "./components/hero";
import OurPartners from "./components/ourPatners";
import WhyPartner from "./components/whyPartner";
import FindUsAreas from "@/components/sections/findUsAreas";
import FaqCards from "@/components/sections/faqCards";
import PatientReviews from "@/components/sections/patientReviews";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { generalFaq } from "@/lib/faq";
import { pageUrl, ogDefaults } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Corporate Health Testing in Jamshedpur",
  description:
    "Corporate wellness and employee health checks from Diagnos Lab, Jamshedpur. On-site camps or in-lab testing for companies across Jharkhand.",
  keywords: [
    "Corporate Health Checkup Jamshedpur",
    "Employee Health Testing Jamshedpur",
    "Corporate Wellness Jamshedpur",
    "Bulk Health Testing Jharkhand",
    "Corporate Lab Partner Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/corporate/"),
  },
  openGraph: {
    ...ogDefaults,
    title: "Corporate Health Testing in Jamshedpur",
    description:
      "Employee health check and corporate wellness programmes at Diagnos Lab, Jamshedpur.",
    url: pageUrl("/corporate/"),
  },
};

/* DL.pen "Corporate" (desktop and mobile). */
export default function Page() {
  return (
    <>
      <HeroSection />
      <OurPartners />
      <WhyPartner />
      <FindUsAreas />
      <PatientReviews tone="white" />
      <FaqJsonLd items={generalFaq} />
      <FaqCards items={generalFaq} intro="Can't find what you're looking for? Our corporate desk is a call away." />
    </>
  );
}
