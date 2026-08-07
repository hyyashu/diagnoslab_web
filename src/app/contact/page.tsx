import type { Metadata } from "next";
import ContactSection from "./components/contactSection";

export const metadata: Metadata = {
  title: "Contact Diagnos Lab in Jamshedpur | Book a Test",
  description:
    "Contact Diagnos Lab in Sakchi, Jamshedpur for test bookings, home sample collection, corporate wellness, or report queries. Call +91 8404802201.",
  keywords: [
    "Contact Diagnos Lab",
    "Book Blood Test Jamshedpur",
    "Diagnostic Lab Contact Jamshedpur",
    "Home Collection Booking Jamshedpur",
    "Lab Phone Number Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/contact",
  },
  openGraph: {
    title: "Contact Diagnos Lab | Book Tests in Jamshedpur",
    description:
      "Reach Diagnos Lab in Sakchi, Jamshedpur for bookings and queries.",
    url: "https://diagnoslab.in/contact",
  },
};

export default function Page() {
  return <ContactSection />;
}