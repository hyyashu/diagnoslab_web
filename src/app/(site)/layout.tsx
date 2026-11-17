import JsonLd from "@/components/seo/jsonLd";
import { BUSINESS_TYPE, PHONE_E164, POSTAL_ADDRESS } from "@/lib/contact";
import { OG_IMAGE, ORG_ID, SITE_URL, pageUrl } from "@/lib/schema";
import { areas } from "@/lib/catalog";
import HomeCollectionJsonLd from "@/components/seo/homeCollectionJsonLd";
import Navbar from "@/components/layout/navbar";
import FloatingCTA from "@/components/layout/floatingCTA";
import Footer from "@/components/layout/footer";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": BUSINESS_TYPE,
  /* Canonical identifier for the business. Every other block that talks about
     Diagnos Lab references this @id instead of describing it again, so search
     engines resolve one entity rather than one per page. */
  "@id": ORG_ID,
  name: "Diagnos Lab",
  alternateName: "Diagno Labs Jamshedpur",
  url: SITE_URL,
  logo: pageUrl("/images/diagnoslogo.png"),
  image: pageUrl(OG_IMAGE.url),
  description:
    "Diagnos Lab is a top-rated diagnostic centre in Sakchi, Jamshedpur offering blood tests, ultrasound, ECG, X-Ray, PFT, and health packages with home sample collection.",
  telephone: PHONE_E164,
  email: "info@diagnoslab.in",
  address: POSTAL_ADDRESS,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.8088744,
    longitude: 86.2029601,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:30",
      closes: "19:30",
    },
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "3000",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    /* Profiles that identify the same business elsewhere on the web. */
    "https://maps.google.com/?cid=5050796909999792755",
    "https://www.instagram.com/diagnoslab.in/",
  ],
  /* Every area in areasServed.json, so the schema matches the area pages. */
  areaServed: ["Jamshedpur", ...areas.map((area) => area.name)],
  medicalSpecialty: ["Pathology", "Radiology", "Cardiology"],
  availableService: [
    { "@type": "MedicalTest", name: "Blood Test" },
    { "@type": "MedicalTest", name: "Ultrasound (USG)" },
    { "@type": "MedicalTest", name: "Mammography" },
    { "@type": "MedicalTest", name: "X-Ray" },
    { "@type": "MedicalTest", name: "Echocardiography" },
    { "@type": "MedicalTest", name: "ECG" },
    { "@type": "MedicalTest", name: "PFT" },
  ],
};

/* Every marketing route shares this chrome. Paid landing pages under
   (ads) deliberately sit outside it - each nav link there is a click
   away from an offer we paid for. */
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <HomeCollectionJsonLd />
      <Navbar />
      <main>
        {children}
        <FloatingCTA
          phoneNumber={PHONE_E164}
          whatsappNumber={PHONE_E164}
        />
      </main>
      <Footer />
    </>
  );
}
