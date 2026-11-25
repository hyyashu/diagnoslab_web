import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ServicePageHero from "@/components/sections/servicePageHero";
import FindUsPanel from "@/components/sections/findUsPanel";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FaqJsonLd from "@/components/seo/faqJsonLd";
import JsonLd from "@/components/seo/jsonLd";
import Icon from "@/components/ui/icon";
import { shell } from "@/components/ui/shell";
import { pregnancyScans } from "@/lib/catalog";
import { ULTRASOUND_HOURS_DISPLAY } from "@/lib/contact";
import ScanDetail from "../components/scanDetail";
import { ORG_REF, breadcrumbNode, pageUrl, ogDefaults } from "@/lib/schema";

const BASE = pageUrl("/ultrasound-in-jamshedpur/");

/* Only the scans in data/ultrasoundScans.json ("pregnancyScans") are
   built; anything else under /ultrasound-in-jamshedpur/ is a 404. */
export function generateStaticParams() {
  return pregnancyScans.map((s) => ({ scan: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ scan: string }> }): Promise<Metadata> {
  const { scan: slug } = await params;
  const scan = pregnancyScans.find((s) => s.slug === slug);
  if (!scan) return {};
  const url = `${BASE}${scan.slug}/`;
  return {
    title: scan.metaTitle,
    description: scan.metaDescription,
    alternates: { canonical: url },
    openGraph: { ...ogDefaults, title: scan.metaTitle, description: scan.metaDescription, url },
  };
}

export default async function ScanPage({ params }: { params: Promise<{ scan: string }> }) {
  const { scan: slug } = await params;
  const scan = pregnancyScans.find((s) => s.slug === slug);
  if (!scan) notFound();

  const url = `${BASE}${scan.slug}/`;
  /* Same @id as on the main ultrasound page, so both describe one test. */
  const testId = `${BASE}#${scan.id}`;
  const others = pregnancyScans.filter((s) => s.slug !== scan.slug);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: scan.h1,
        description: scan.metaDescription,
        inLanguage: "en-IN",
        about: { "@id": testId },
        publisher: ORG_REF,
      },
      {
        "@type": "ImagingTest",
        "@id": testId,
        url,
        name: scan.title,
        description: scan.about,
        imagingTechnique: "https://schema.org/Ultrasound",
      },
      {
        ...ORG_REF,
        availableTest: { "@id": testId },
      },
      breadcrumbNode([
        ["Home", ""],
        ["Radiology", "/radiology/"],
        ["Ultrasound", BASE],
        [scan.title, url],
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={schema} />
      <ServicePageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Radiology", href: "/radiology/" },
          { label: "Ultrasound", href: "/ultrasound-in-jamshedpur/" },
          { label: scan.title },
        ]}
        eyebrow={`${scan.when} · ${ULTRASOUND_HOURS_DISPLAY}`}
        title={scan.h1}
        subtitle={scan.subtitle}
        cta={{ label: `Book ${scan.title.replace("Scan", "scan")}`, href: "#enquiry-form" }}
        form={{
          title: `Book your ${scan.title.replace("Scan", "scan")}`,
          subtitle: "Share your details and our team will call you to confirm a slot.",
          service: scan.title,
        }}
      />
      <ScanDetail scan={scan} />

      <section aria-labelledby="other-scans-heading" className="border-t border-dl-line bg-dl-bg py-10 md:py-16">
        <div className={`${shell} flex flex-col gap-5 md:gap-7`}>
          <h2 id="other-scans-heading" className="font-display text-[22px] font-extrabold tracking-[-0.02em] text-dl-ink md:text-[28px]">
            Other pregnancy scans
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3 md:gap-4">
            {[...others.map((s) => ({ title: s.title, text: s.when, href: `/ultrasound-in-jamshedpur/${s.slug}/`, icon: s.icon })),
              { title: "All ultrasound scans", text: "Abdomen, pelvis, KUB, thyroid, breast", href: "/ultrasound-in-jamshedpur/", icon: "scan-line" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group flex h-full items-center gap-3.5 rounded-2xl border border-dl-line bg-white p-4 transition-colors hover:border-dl-ink/40 md:p-5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red">
                    <Icon name={l.icon} className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="font-display text-base font-bold text-dl-ink">{l.title}</span>
                    <span className="text-[13px] text-dl-ink-2">{l.text}</span>
                  </span>
                  <ArrowUpRight className="size-[18px] shrink-0 text-dl-muted group-hover:text-dl-ink" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FindUsPanel tone="white" hours={{ title: "Ultrasound hours", text: ULTRASOUND_HOURS_DISPLAY }} />
      <PatientReviews tone="muted" />
      <FaqJsonLd items={scan.faq} />
      <FAQAccordion
        title={`${scan.title} FAQs`}
        items={scan.faq}
        intro="Still unsure? Message us on WhatsApp and our team will help."
        tone="muted"
      />
    </>
  );
}
