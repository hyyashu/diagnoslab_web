import JsonLd from "@/components/seo/jsonLd";
import HomeCollectionJsonLd from "@/components/seo/homeCollectionJsonLd";
import Navbar from "@/components/layout/navbar";
// import BottomNav from "@/components/layout/bottomNav";
import FloatingCTA from "@/components/layout/floatingCTA";
import Footer from "@/components/layout/footer";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  /* Canonical identifier for the business. Every other block that talks about
     Diagnos Lab references this @id instead of describing it again, so search
     engines resolve one entity rather than one per page. */
  "@id": "https://diagnoslab.in/#organization",
  name: "Diagnos Lab",
  alternateName: "Diagno Labs Jamshedpur",
  url: "https://diagnoslab.in",
  logo: "https://diagnoslab.in/images/diagnoslogo.avif",
  image: "https://diagnoslab.in/images/diagnoslogo.avif",
  description:
    "Diagnos Lab is a top-rated diagnostic centre in Sakchi, Jamshedpur offering blood tests, ultrasound, ECG, X-Ray, PFT, and health packages with home sample collection.",
  telephone: "+918404802214",
  email: "info@diagnoslab.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sakchi",
    addressLocality: "Jamshedpur",
    addressRegion: "Jharkhand",
    postalCode: "831001",
    addressCountry: "IN",
  },
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
      closes: "20:00",
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
  areaServed: [
    "Jamshedpur",
    "Sakchi",
    "Bistupur",
    "Jugsalai",
    "Adityapur",
    "Mango",
    "Kadma",
    "Agrico",
    "Golmuri",
    "Telco",
    "Baridih",
    "Sonari",
  ],
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
          phoneNumber="+918404802214"
          whatsappNumber="+918404802214"
        />
      </main>
      <Footer />
      {/* Bottom nav switched off for now. To bring it back, uncomment this
          and its import, restore pb-20 md:pb-0 on <main>, bottom-16 on the
          detail page sticky bar and bottom-24 / bottom-40 on FloatingCTA. */}
      {/* <BottomNav /> */}
    </>
  );
}
