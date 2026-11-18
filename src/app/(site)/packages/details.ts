import {
  Atom,
  Bone,
  Droplet,
  FlaskConical,
  Funnel,
  Gauge,
  HeartPulse,
  Pill,
  Sun,
  Syringe,
  TestTube,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { FaqItem } from "@/lib/faq";
import type { PrepStep } from "@/components/detail/detailParts";

/* Package detail page copy from DL.pen "Package Details". Only ND Plus is
   written up in the design; other packages fall back to catalogue data and
   generic sections (see PackageDetail). Prices, parameters and reporting
   always come from the catalogue. */

export type TestProfile = { name: string; examples: string; count: number; icon: LucideIcon };

export type PackageDetails = {
  headline: string;
  category: string;
  mostBooked?: boolean;
  audience: string;
  audienceMobile?: string;
  intro: string;
  introMobile?: string;
  sample?: string;
  fasting?: string;
  report?: string;
  profiles?: TestProfile[];
  whoShouldBook?: string[];
  prepIntro?: string;
  prepIntroMobile?: string;
  prep?: PrepStep[];
  faq?: FaqItem[];
  /* Slugs for "Compare with other packages", in order. */
  compare?: string[];
  compareSubtitle?: string;
  compareSubtitleMobile?: string;
};

export const packageDetails: Record<string, PackageDetails> = {
  "nd-plus": {
    headline: "ND Plus Full Body Checkup",
    category: "Full Body",
    mostBooked: true,
    audience: "Recommended for adults 18–40 · Doctor-curated by our pathologists",
    audienceMobile: "Recommended for adults 18–40 · Doctor-curated",
    intro:
      "A complete yearly screen covering 75 parameters across 12 health profiles: blood count, liver, kidney, lipids, thyroid, sugar, vitamins and more, with one home sample collection.",
    introMobile: "A complete yearly screen covering 75 parameters across 12 health profiles, with one home sample collection.",
    sample: "Blood & urine",
    fasting: "10–12 hours",
    profiles: [
      { name: "Complete blood count", examples: "Hemoglobin, RBC, WBC, platelets", count: 20, icon: Droplet },
      { name: "Liver function", examples: "SGOT, SGPT, bilirubin, ALP…", count: 11, icon: FlaskConical },
      { name: "Kidney function", examples: "Creatinine, urea, uric acid, eGFR", count: 7, icon: Funnel },
      { name: "Lipid profile", examples: "Cholesterol, HDL, LDL, TG…", count: 8, icon: HeartPulse },
      { name: "Urine routine", examples: "Physical & microscopic exam", count: 15, icon: TestTube },
      { name: "Thyroid profile", examples: "T3, T4, TSH", count: 3, icon: Gauge },
      { name: "Diabetes", examples: "Fasting blood sugar, HbA1c", count: 2, icon: Syringe },
      { name: "Iron studies", examples: "Serum iron, TIBC, saturation", count: 3, icon: Atom },
      { name: "Electrolytes", examples: "Sodium, potassium, chloride", count: 3, icon: Zap },
      { name: "Vitamin D", examples: "25-OH Vitamin D", count: 1, icon: Sun },
      { name: "Vitamin B12", examples: "Serum cyanocobalamin", count: 1, icon: Pill },
      { name: "Calcium", examples: "Serum calcium", count: 1, icon: Bone },
    ],
    whoShouldBook: [
      "Adults 18–40 who haven't had a checkup in a year",
      "Desk jobs, long hours or irregular sleep",
      "Family history of diabetes, thyroid or heart disease",
      "Feeling tired, low energy or frequently unwell",
    ],
    prepIntro: "This package includes fasting sugar and lipids, so fasting is required.",
    prepIntroMobile: "Fasting is required for sugar and lipid tests.",
    prep: [
      { title: "Fast for 10–12 hours", text: "Only water is allowed. Skip tea, coffee and snacks." },
      { title: "Collect morning urine", text: "We'll bring a sterile container for your first sample." },
      { title: "Pick an early slot", text: "Book 6–8 AM so you can have breakfast soon after." },
    ],
    faq: [
      {
        question: "Why do I need to fast for this package?",
        answer: "Fasting blood sugar and the lipid profile need an empty stomach for accurate results. Water is fine.",
      },
      {
        question: "Will I get all 75 reports together?",
        answer: "Yes. All results come in one report on WhatsApp, usually the same day as sample collection.",
      },
      {
        question: "Can I add more tests to this package?",
        answer: "Yes. Call us or message us on WhatsApp with the tests you need, and our team will add them to your booking.",
      },
      {
        question: "Can I book this for my family members?",
        answer: "Yes. Tell our team how many people when you book, and we'll arrange sample collection for each of them.",
      },
    ],
    compare: ["nd-max-plus", "bio-t-plus", "bio-t-d-plus"],
    compareSubtitle: "Need more coverage or a diabetes focus? These are booked most often alongside ND Plus.",
    compareSubtitleMobile: "More coverage or a diabetes focus",
  },
};
