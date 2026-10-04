import type { Metadata } from "next";
import HeroSection from "./components/hero";
import OurPartners from "./components/ourPatners";
import WhyPartner from "./components/whyPartner";
import FindUsAreas from "@/components/sections/findUsAreas";
import FaqCards from "@/components/sections/faqCards";
import PatientReviews from "@/components/sections/patientReviews";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import { generalFaq } from "@/lib/faq";
import { pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Corporate Health Testing in Jamshedpur | Diagnos Lab" },
  description:
    "Partner with Diagnos Lab for corporate wellness and employee health check programmes in Jamshedpur. Flexible on-site and in-lab testing for companies in Jharkhand.",
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
    title: "Corporate Health Testing in Jamshedpur | Diagnos Lab",
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
