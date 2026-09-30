import type { ScanService } from "@/components/cards/scanCard";
import type { WhyPoint } from "@/components/sections/whyPoints";
import { ultrasoundScans } from "@/lib/catalog";

/* Ultrasound page copy from DL.pen. Scan descriptions and preparation
   notes come from data/ultrasoundScans.json. */

const scan = (id: string) => ultrasoundScans.find((s) => s.id === id)!;

const pregnancy = scan("pregnancy");

export const featuredScan: ScanService = {
  id: "pregnancy",
  title: "Pregnancy (Obstetric) USG",
  image: "/images/radiology/USG.avif",
  icon: "baby",
  reportingTime: "1–2 hours",
  description: pregnancy.description,
  usedFor: ["Dating scan", "NT scan", "Anomaly scan", "Growth & Doppler"],
  usedForLabel: "SCANS INCLUDED",
  preparation: pregnancy.preparation,
  femaleRadiologist: true,
};

const icons: Record<string, string> = {
  abdomen: "scan-line",
  pelvic: "venus",
  kub: "droplets",
  thyroid: "scan-face",
  breast: "heart-pulse",
};

export const scanTypes = ["abdomen", "pelvic", "kub", "thyroid", "breast"].map((id) => ({
  ...scan(id),
  icon: icons[id],
}));

export const whyPoints: WhyPoint[] = [
  { icon: "monitor", title: "Advanced USG equipment", text: "High-resolution colour Doppler machines for clear, detailed images." },
  { icon: "users", title: "Experienced radiology team", text: "Qualified radiologists with years of ultrasound expertise." },
  {
    icon: "user-round-check",
    title: "Female radiologist",
    text: "Pelvic, obstetric and breast scans by a female radiologist on request.",
    highlight: true,
  },
  { icon: "clock-3", title: "Same-day reports", text: "Reports in 1–2 hours, shared digitally on WhatsApp." },
  { icon: "shield-check", title: "Painless & radiation-free", text: "Non-invasive and safe for all ages, including during pregnancy." },
];

export const prepIcons: Record<number, string> = {
  1: "utensils-crossed",
  2: "glass-water",
  3: "folder-open",
  4: "shirt",
};

export const expectStats = [
  { value: "15–30 min", label: "Scan duration" },
  { value: "1–2 hrs", label: "Report ready" },
  { value: "Zero", label: "Radiation" },
];

export const expectPoints = [
  "Painless, non-invasive and uses no radiation. Safe for all ages including pregnancy.",
  "A gel is applied to the skin and a probe is moved over the area being examined.",
  "Female patients can request a female radiologist for pelvic, obstetric and breast scans.",
  "Digital reports are shared on WhatsApp and available through our portal.",
];

export const relatedServices = [
  { label: "ECG", href: "/ecg/" },
  { label: "X-Ray", href: "/xray/" },
  { label: "2D ECHO", href: "/radiology/" },
  { label: "All radiology services", href: "/radiology/" },
];
