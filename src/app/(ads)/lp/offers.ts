import { getPackageBySlug, getPackages, getTestBySlug, getTests, pregnancyScans, ultrasoundScans } from "@/lib/catalog";
import { PCPNDT_NOTICE, ULTRASOUND_HOURS_DISPLAY } from "@/lib/contact";
import { labTestsFaq, packagesFaq, ultrasoundFaq, type FaqItem } from "@/lib/faq";
import { discountPct, isNoFasting, isOvernightFast, reportLabel, rupees } from "@/lib/format";
import { packageDetails, type TestProfile } from "../../(site)/packages/details";

/* Every paid landing page is one of these. /lp/<slug>/ exists for:
   1. each campaign written below (its own headline and copy), then
   2. every package in the catalogue, then
   3. every test in the catalogue.
   A campaign slug wins over a package of the same name, and a package
   over a test. Prices always come from the catalogue.

   To start a new campaign, add an entry to `campaigns` and point the ad's
   final URL at /lp/<slug>/. UTMs and gclid ride along on the URL; the
   site's attribution code stores them with the lead. */

export type LpFact = { label: string; value: string };

export type LpOffer = {
  slug: string;
  /* Short line above the headline. */
  eyebrow: string;
  title: string;
  subtitle: string;
  /* Browser tab and share title (the brand is added by the root layout). */
  metaTitle: string;
  metaDescription: string;
  price?: number;
  originalPrice?: number;
  facts: LpFact[];
  /* "What's included": test groups with counts, or plain test names. */
  profiles?: TestProfile[];
  includes?: string[];
  /* Popular tests with prices, for broad campaigns with no single offer. */
  priceList?: { title: string; price: number; originalPrice: number }[];
  /* Scans with what they check and how to prepare (ultrasound pages). */
  scans?: { title: string; description: string; preparation: string }[];
  /* What the call-back form sends as the lead's contact topic. */
  topic: string;
  /* Offers a "which one?" select on the form; the choice becomes the topic. */
  services?: string[];
  /* Done at the Sakchi lab, not at home: shows "Visit us" instead of the
     home collection steps. */
  atLab?: boolean;
  /* Small print under the hero, e.g. the PC-PNDT notice. */
  notice?: string;
  /* Asks for a home visit (vs a general booking) in the CRM. */
  homeCollection: boolean;
  faq: FaqItem[];
};

const homeCollectionFact: LpFact = { label: "Home collection", value: "From 6 AM" };

const fastingValue = (fasting: string) =>
  isNoFasting(fasting) ? "Not needed" : isOvernightFast(fasting) ? "10–12 hours" : fasting;

const reportValue = (reporting: string) => reportLabel(reporting).replace(/ reports$/, "").replace(/^Reports in /, "");

const priceLine = (price: number, originalPrice: number) => {
  const off = discountPct(price, originalPrice);
  return off ? `${rupees(price)} (${off}% off)` : rupees(price);
};

function packageOffer(slug: string, over: Partial<LpOffer> = {}): LpOffer | undefined {
  const p = getPackageBySlug(slug);
  if (!p) return undefined;
  const d = packageDetails[p.slug];
  const name = d?.headline ?? `${p.title} Health Package`;
  return {
    slug: p.slug,
    eyebrow: "NABL & ISO accredited lab · Since 2009",
    title: `${name} in Jamshedpur`,
    subtitle: `${p.description || "Several tests from one sample."} Your report reaches your WhatsApp.`,
    metaTitle: `${name} in Jamshedpur at ${rupees(p.price)}`,
    metaDescription: `${name} at Diagnos Lab, Jamshedpur: ${p.parameters} tests for ${priceLine(p.price, p.originalPrice)}. Home sample collection from 6 AM, reports on WhatsApp.`,
    price: p.price,
    originalPrice: p.originalPrice,
    facts: [
      ...(p.parameters > 0 ? [{ label: "Tests", value: `${p.parameters} parameters` }] : []),
      { label: "Fasting", value: d?.fasting ?? fastingValue(p.fasting) },
      { label: "Report", value: d?.report ?? reportValue(p.reporting) },
      homeCollectionFact,
    ],
    profiles: d?.profiles,
    includes: d?.profiles ? undefined : p.categories.split(",").map((c) => c.trim()).filter(Boolean),
    topic: p.title,
    homeCollection: false,
    faq: d?.faq ?? packagesFaq.filter((f) => !f.desktopOnly),
    ...over,
  };
}

function testOffer(slug: string, over: Partial<LpOffer> = {}): LpOffer | undefined {
  const t = getTestBySlug(slug);
  if (!t) return undefined;
  return {
    slug: t.slug,
    eyebrow: "NABL & ISO accredited lab · Since 2009",
    title: `${t.title} in Jamshedpur`,
    subtitle: "Book a home sample collection or walk in at our Sakchi lab. Your report reaches your WhatsApp.",
    metaTitle: `${t.title} in Jamshedpur at ${rupees(t.price)}`,
    metaDescription: `${t.title} at Diagnos Lab, Jamshedpur for ${priceLine(t.price, t.originalPrice)}. Home sample collection from 6 AM, reports on WhatsApp.`,
    price: t.price,
    originalPrice: t.originalPrice,
    facts: [
      ...(t.sampleType ? [{ label: "Sample", value: t.sampleType }] : []),
      { label: "Fasting", value: fastingValue(t.fasting) },
      { label: "Report", value: reportValue(t.reporting) },
      homeCollectionFact,
    ],
    topic: t.title,
    homeCollection: false,
    faq: labTestsFaq.filter((f) => !f.desktopOnly),
    ...over,
  };
}

const POPULAR_TESTS = [
  "complete-blood-count",
  "blood-sugar-fasting",
  "hba1c-test",
  "tsh",
  "vitamin-d",
  "vitamin-b12",
  "cholestrol",
  "creatinine",
];

const usgFacts: LpFact[] = [
  { label: "Radiologist", value: "Female, MD" },
  { label: "Report", value: "1–2 hours" },
  { label: "Days", value: "Mon–Sat" },
  { label: "Where", value: "Sakchi lab" },
];

const usgBase = {
  facts: usgFacts,
  atLab: true,
  homeCollection: false,
  notice: PCPNDT_NOTICE,
  faq: ultrasoundFaq.filter((f) => !f.desktopOnly),
};

/* One page per pregnancy scan: /lp/nt-scan/, /lp/growth-scan/, /lp/doppler-scan/. */
const pregnancyScanOffers: LpOffer[] = pregnancyScans.map((s) => ({
  ...usgBase,
  slug: s.slug,
  eyebrow: `Pregnancy ultrasound · ${s.when}`,
  title: s.h1,
  subtitle: s.subtitle,
  metaTitle: s.metaTitle,
  metaDescription: s.metaDescription,
  facts: [{ label: "When", value: s.when }, ...usgFacts.slice(0, 3)],
  scans: [{ title: s.title, description: s.description, preparation: s.preparation }],
  topic: s.title,
}));

/* Hand-written campaigns. Add new ones here. */
const campaigns: LpOffer[] = [
  {
    slug: "blood-test-at-home",
    eyebrow: "Booking now · 7:30 AM – 7:30 PM, every day",
    title: "Blood test at home in Jamshedpur",
    subtitle:
      "A Diagnos Lab phlebotomist collects your sample at your door with a sealed, single-use kit. Most reports reach your WhatsApp the same day.",
    metaTitle: "Blood Test at Home in Jamshedpur",
    metaDescription:
      "Book a blood test at home in Jamshedpur. A Diagnos Lab phlebotomist collects your sample from 6 AM and most reports reach your WhatsApp the same day.",
    facts: [
      homeCollectionFact,
      { label: "Reports", value: "Mostly same day" },
      { label: "Lab", value: "NABL & ISO" },
      { label: "Since", value: "2009" },
    ],
    priceList: POPULAR_TESTS.map((s) => getTestBySlug(s))
      .filter((t) => t !== undefined)
      .map((t) => ({ title: t.title, price: t.price, originalPrice: t.originalPrice })),
    topic: "Home collection",
    homeCollection: true,
    faq: labTestsFaq.filter((f) => !f.desktopOnly),
  },
  {
    ...usgBase,
    slug: "ultrasound",
    eyebrow: `Ultrasound in Jamshedpur · ${ULTRASOUND_HOURS_DISPLAY}`,
    title: "Ultrasound (USG) in Sakchi, Jamshedpur",
    subtitle:
      "Abdomen, pelvis, pregnancy, KUB, thyroid and breast scans on modern digital machines, with a female MD radiologist for female patients.",
    metaTitle: "Ultrasound (USG) in Jamshedpur",
    metaDescription:
      "Book an ultrasound at Diagnos Lab, Sakchi, Jamshedpur. Female MD radiologist, report on WhatsApp in 1–2 hours. Monday to Saturday.",
    scans: ultrasoundScans,
    topic: "Ultrasound",
    services: ultrasoundScans.map((s) => s.title),
  },
  ...pregnancyScanOffers,
  ...[
    packageOffer("nd-plus", {
      slug: "full-body-checkup",
      eyebrow: "Most booked · NABL & ISO accredited lab",
      title: "Full body checkup in Jamshedpur",
      metaTitle: "Full Body Checkup in Jamshedpur: 75 Tests at ₹2,500",
      topic: "ND Plus",
    }),
  ].filter((o) => o !== undefined),
];

export function getOffers(): LpOffer[] {
  const seen = new Set<string>();
  const all = [
    ...campaigns,
    ...getPackages().map((p) => packageOffer(p.slug)),
    ...getTests().map((t) => testOffer(t.slug)),
  ].filter((o) => o !== undefined);
  return all.filter((o) => (seen.has(o.slug) ? false : (seen.add(o.slug), true)));
}

export const getOffer = (slug: string) => getOffers().find((o) => o.slug === slug);
