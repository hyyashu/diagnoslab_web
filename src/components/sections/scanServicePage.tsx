import ServicePageHero, { type ProofPoint } from "@/components/sections/servicePageHero";
import WhyPoints, { type WhyPoint } from "@/components/sections/whyPoints";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import ScanCard, { type ScanService } from "@/components/cards/scanCard";
import SectionHead from "@/components/ui/sectionHead";
import { shell } from "@/components/ui/shell";
import type { FaqItem } from "@/lib/faq";

type ScanServicePageProps = {
  hero: {
    crumb: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    chips: string[];
    proofPoints: ProofPoint[];
  };
  scan: ScanService;
  section: { id: string; title: string; subtitle: string };
  why: { title: string; points: WhyPoint[] };
  faq: { title: string; items: FaqItem[] };
  related: { label: string; href: string }[];
};

/* The single-scan pages (ECG, X-Ray): the ultrasound page's layout without
   its scan-type grid and preparation guide. */
export default function ScanServicePage({ hero, scan, section, why, faq, related }: ScanServicePageProps) {
  return (
    <>
      <ServicePageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Radiology", href: "/radiology/" }, { label: hero.crumb }]}
        eyebrow={hero.eyebrow}
        title={hero.title}
        subtitle={hero.subtitle}
        chips={hero.chips}
        proofPoints={hero.proofPoints}
        cta={{ label: `Book ${scan.title}`, href: `#${section.id}` }}
        form={{
          subtitle: `Share your details and our team will call you to book your ${scan.title} slot.`,
          service: scan.title,
        }}
      />

      <section id={section.id} aria-labelledby={`${section.id}-heading`} className="bg-white py-10 md:py-24">
        <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
          <SectionHead id={`${section.id}-heading`} title={section.title} subtitle={section.subtitle} />
          <ScanCard scan={scan} variant="featured" />
        </div>
      </section>

      <WhyPoints title={why.title} points={why.points} />
      <FindUsPanel />
      <PatientReviews />
      <FaqJsonLd items={faq.items} />
      <FAQAccordion
        title={faq.title}
        items={faq.items}
        intro="Still unsure? Message us on WhatsApp and our team will help you pick the right scan."
        related={related}
      />
    </>
  );
}
