import JsonLd from "@/components/seo/jsonLd";
import { PHONE_DISPLAY } from "@/lib/contact";

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Book a Blood Test at Home in Jamshedpur",
  description:
    "Book home sample collection from Diagnos Lab in Jamshedpur in 3 easy steps.",
  totalTime: "PT30M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Book Your Test",
      text: `Call or WhatsApp ${PHONE_DISPLAY}, or fill the online form on diagnoslab.in. Choose your tests or health package.`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Sample Collection at Home",
      text: "A trained phlebotomist visits your home at the scheduled time across all areas of Jamshedpur including Sakchi, Bistupur, and Mango.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Receive Digital Reports",
      text: "Reports are processed at our NABL-grade lab and sent to your WhatsApp automatically within 6–12 hours.",
    },
  ],
};

export default function HomeCollectionJsonLd() {
  return <JsonLd data={howToSchema} />;
}
