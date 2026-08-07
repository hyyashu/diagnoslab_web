import type { Metadata } from "next";
import HeroSection from "./components/hero";
import OurPartners from "./components/ourPatners";
import WhyPartner from "./components/whyPartner";

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
    canonical: "https://diagnoslab.in/corporate",
  },
  openGraph: {
    title: "Corporate Health Testing in Jamshedpur | Diagnos Lab",
    description:
      "Employee health check and corporate wellness programmes at Diagnos Lab, Jamshedpur.",
    url: "https://diagnoslab.in/corporate",
  },
};

export default function Page() {
    return<>
    <HeroSection />
    <OurPartners />
    <WhyPartner />
    </> ;
  }