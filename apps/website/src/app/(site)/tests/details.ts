import { BatteryLow, HeartPulse, Pill, Thermometer, type LucideIcon } from "lucide-react";
import type { FaqItem } from "@/lib/faq";
import type { PrepStep } from "@/components/detail/detailParts";

/* Test detail page copy from DL.pen "Test Details". Only CBC is written up
   in the design; other tests fall back to catalogue data and generic
   sections (see TestMain). Prices, fasting and reporting always come from
   the catalogue. */

export type ParameterGroup = {
  name: string;
  purpose: string;
  purposeMobile?: string;
  /* Dot colour. */
  color: string;
  parameters: string[];
};

export type TestReason = { icon: LucideIcon; title: string; text: string; textMobile?: string };

export type TestDetails = {
  headline: string;
  shortName: string;
  category: string;
  mostBooked?: boolean;
  alsoKnownAs?: string;
  intro: string;
  introMobile?: string;
  sample?: string;
  groupsSummary?: string;
  groups?: ParameterGroup[];
  whenToTake?: TestReason[];
  prepIntro?: string;
  prepIntroMobile?: string;
  prep?: PrepStep[];
  faq?: FaqItem[];
  /* Slugs for "Often booked with", in order. */
  related?: string[];
  relatedSubtitle?: string;
  relatedSubtitleMobile?: string;
};

export const testDetails: Record<string, TestDetails> = {
  "complete-blood-count": {
    headline: "Complete Blood Count (CBC)",
    shortName: "CBC",
    category: "Blood Health",
    mostBooked: true,
    alsoKnownAs: "Also known as: Hemogram · CBC with differential",
    intro:
      "Checks overall blood health and detects infections. A CBC measures your red cells, white cells and platelets to screen for anaemia, infection, inflammation and a range of blood disorders.",
    introMobile: "Checks overall blood health and detects infections. Screens for anaemia, infection, inflammation and blood disorders.",
    sample: "Blood",
    groupsSummary: "20 parameters across three groups of blood cells.",
    groups: [
      {
        name: "Red blood cells",
        purpose: "Carry oxygen around the body · 8 tests",
        purposeMobile: "Carry oxygen · 8",
        color: "#D92D27",
        parameters: ["Hemoglobin", "RBC count", "Hematocrit (PCV)", "MCV", "MCH", "MCHC", "RDW-CV", "RDW-SD"],
      },
      {
        name: "White blood cells",
        purpose: "Fight infection · 8 tests",
        purposeMobile: "Fight infection · 8",
        color: "#2F6FDB",
        parameters: [
          "Total WBC count",
          "Neutrophils",
          "Lymphocytes",
          "Monocytes",
          "Eosinophils",
          "Basophils",
          "Absolute neutrophil count",
          "Absolute lymphocyte count",
        ],
      },
      {
        name: "Platelets",
        purpose: "Help blood clot · 4 tests",
        purposeMobile: "Help blood clot · 4",
        color: "#1F8A5B",
        parameters: ["Platelet count", "MPV", "PDW", "Plateletcrit (PCT)"],
      },
    ],
    whenToTake: [
      { icon: BatteryLow, title: "Tiredness or weakness", text: "Persistent fatigue can be a sign of anaemia." },
      {
        icon: Thermometer,
        title: "Fever or infection",
        text: "Helps your doctor spot bacterial or viral infections.",
        textMobile: "Helps spot bacterial or viral infections.",
      },
      { icon: HeartPulse, title: "Routine health check", text: "Part of every annual checkup and pre-surgery work-up." },
      { icon: Pill, title: "Monitoring treatment", text: "Tracks the effect of medicines and chronic conditions." },
    ],
    prepIntro: "No special preparation needed. Book any time of day.",
    prepIntroMobile: "No special preparation needed.",
    prep: [
      { title: "No fasting needed", text: "Eat and drink normally before your sample." },
      { title: "Stay hydrated", text: "A glass of water makes the draw quicker." },
      { title: "Share your medicines", text: "Tell the phlebotomist about any medicines you take." },
    ],
    faq: [
      {
        question: "How long does it take to get my CBC report?",
        answer: "Most CBC reports are ready the same day and sent to your WhatsApp automatically.",
      },
      {
        question: "Is the sample collected at home?",
        answer: "Yes. Our phlebotomist can collect your sample at home from 6 AM, or you can walk in at any of our centres.",
      },
      {
        question: "What is a normal hemoglobin level?",
        answer:
          "It depends on age and sex. Your report shows the normal range next to your result, and your doctor will explain what it means for you.",
      },
      {
        question: "Can I take a CBC test during fever?",
        answer: "Yes. Doctors often ask for a CBC during a fever, because it helps show whether there is an infection.",
      },
    ],
    related: ["hba1c-test", "creatinine", "cholesterol-total-serum", "ige"],
    relatedSubtitle: "Add these to the same home collection: one visit, one sample draw.",
    relatedSubtitleMobile: "One visit, one sample draw",
  },
};
