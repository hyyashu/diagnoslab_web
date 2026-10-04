import type { Metadata } from "next";
import { BadgePercent, House, Star } from "lucide-react";
import ServicePageHero from "@/components/sections/servicePageHero";
import WhyPoints from "@/components/sections/whyPoints";
import HowItWorks from "@/components/sections/howItWorks";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import type { ListingPackage } from "@/components/cards/packageListingCards";
import { labWhyPoints, labWhySubtitle } from "@/components/sections/labWhyPoints";
import { getPackages } from "@/lib/catalog";
import { packagesFaq } from "@/lib/faq";
import PackageBrowser from "./components/packageBrowser";
import { featured, leadOrder, toListing } from "./content";
import { pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Health Packages in Jamshedpur | Full Body Checkup | Diagnos Lab" },
  description:
    "Book affordable health checkup packages at Diagnos Lab in Jamshedpur. Full body checkup, thyroid profile, diabetes panel, cardiac profile, and more with home collection.",
  keywords: [
    "Health Packages Jamshedpur",
    "Full Body Checkup Jamshedpur",
    "Health Checkup Jamshedpur",
    "Preventive Health Package Jamshedpur",
    "Thyroid Profile Jamshedpur",
    "Diabetes Package Jamshedpur",
    "Affordable Health Test Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/packages/"),
  },
  openGraph: {
    title: "Health Packages in Jamshedpur | Diagnos Lab",
    description:
      "Affordable full body checkup and health packages with home collection at Diagnos Lab, Jamshedpur.",
    url: pageUrl("/packages/"),
  },
};

export default function Page() {
  const all = getPackages().map(toListing);
  const rank = (slug: string) => {
    const i = leadOrder.indexOf(slug);
    return i === -1 ? leadOrder.length : i;
  };
  const packages = [...all].sort((a, b) => rank(a.slug) - rank(b.slug));

  const feature = (slug: keyof typeof featured): ListingPackage => ({
    ...all.find((p) => p.slug === slug)!,
    summary: featured[slug].summary,
    includes: [...featured[slug].includes],
  });

  return (
    <>
      <ServicePageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Health Packages" }]}
        eyebrow="Health packages in Jamshedpur · Home collection available"
        title="Full body checkups & health packages from ₹1,100"
        subtitle="Bundled tests for full body, diabetes, thyroid, PCOD and pregnancy care, at a fraction of the individual test price."
        proofPoints={[
          { icon: BadgePercent, value: "Up to 80%", label: "Off on packages", mobileLabel: "Off" },
          { icon: House, value: "At home", label: "Sample collection", mobileLabel: "Collection" },
          { icon: Star, value: "4.9", label: "3,000+ Google reviews", mobileLabel: "Google rating" },
        ]}
        cta={{ label: "Book a package", href: "#packages-section" }}
        form={{ service: "Health package" }}
      />
      <PackageBrowser packages={packages} featured={[feature("nd-plus"), feature("nd-max-plus")]} />
      <WhyPoints
        title="Why patients in Jamshedpur choose our health packages"
        mobileTitle="Why patients choose our health packages"
        subtitle={labWhySubtitle}
        points={labWhyPoints}
      />
      <HowItWorks />
      <FindUsPanel tone="muted" />
      <PatientReviews tone="white" />
      <FaqJsonLd items={packagesFaq} />
      <FAQAccordion
        title="Health package FAQs"
        items={packagesFaq}
        intro="Not sure which package fits? Message us on WhatsApp and our team will help you choose."
        tone="muted"
      />
    </>
  );
}
