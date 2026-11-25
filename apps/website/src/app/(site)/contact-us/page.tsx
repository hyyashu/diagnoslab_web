import type { Metadata } from "next";
import ContactHero from "./components/contactHero";
import VisitCentre from "./components/visitCentre";
import OneInbox from "./components/oneInbox";
import { pageUrl, ogDefaults } from "@/lib/schema";
import { PHONE_DISPLAY } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us | Book a Test in Jamshedpur",
  description:
    `Contact Diagnos Lab in Sakchi, Jamshedpur for test bookings, home sample collection, corporate wellness, or report queries. Call ${PHONE_DISPLAY}.`,
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
    ...ogDefaults,
    title: "Contact Us | Book a Test in Jamshedpur",
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