import type { Metadata } from "next";
import ContactHero from "./components/contactHero";
import VisitCentre from "./components/visitCentre";
import OneInbox from "./components/oneInbox";
import { pageUrl } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Contact Diagnos Lab in Jamshedpur | Book a Test" },
  description:
    "Contact Diagnos Lab in Sakchi, Jamshedpur for test bookings, home sample collection, corporate wellness, or report queries. Call +91 84048 02214.",
  keywords: [
    "Contact Diagnos Lab",
    "Book Blood Test Jamshedpur",
    "Diagnostic Lab Contact Jamshedpur",
    "Home Collection Booking Jamshedpur",
    "Lab Phone Number Jamshedpur",
  ],
  alternates: {
    canonical: pageUrl("/contact-us/"),
  },
  openGraph: {
    title: "Contact Diagnos Lab | Book Tests in Jamshedpur",
    description:
      "Reach Diagnos Lab in Sakchi, Jamshedpur for bookings and queries.",
    url: pageUrl("/contact-us/"),
  },
};

export default function Page() {
  return (
    <>
      <ContactHero />
      <VisitCentre />
      <OneInbox />
    </>
  );
}