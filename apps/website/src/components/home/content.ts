/* Home-page choices that aren't in the catalogue: which packages and tests
   are featured, and the editorial lines the design adds to them. Prices,
   parameters and descriptions still come from the catalogue. */

import type { CheckupPackage } from "@/components/cards/checkupPackageCard";
import type { Package } from "@/lib/catalog";

export const featuredPackages: Record<string, { audience: string; includes: string[]; mostBooked?: boolean }> = {
  "nd-plus": { audience: "Adults 18–40", includes: ["CBC", "Liver", "Kidney", "Lipid", "+8"], mostBooked: true },
  "nd-max-plus": { audience: "Complete annual check", includes: ["CBC", "Thyroid", "HbA1c", "+13"] },
  "bio-t-plus": { audience: "Quick yearly screen", includes: ["CBC", "Thyroid", "Lipid", "+6"] },
  "bio-t-d-plus": { audience: "For diabetics", includes: ["CBC", "HbA1c", "Thyroid", "+7"] },
};

/* A catalogue package as a checkup card, with the design's lines added. */
export const toCheckupCard = (p: Package): CheckupPackage => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  price: p.price,
  originalPrice: p.originalPrice,
  parameters: p.parameters,
  categories: p.categories,
  fasting: p.fasting,
  reporting: p.reporting,
  ...featuredPackages[p.slug],
});

/* Category chips above the package cards, each mapped to catalogue slugs. */
export const packageCategories: { label: string; icon: string; slugs: string[] }[] = [
  { label: "Full Body", icon: "person-standing", slugs: ["nd-plus", "nd-max-plus", "bio-t-plus", "bio-t-d-plus"] },
  { label: "Diabetes", icon: "droplet", slugs: ["bio-t-d-plus", "diabetes-monitoring-panel-1", "diabetes-monitoring-panel-2", "nd-plus"] },
  { label: "Thyroid", icon: "activity", slugs: ["bio-t-plus", "bio-t-d-plus", "nd-plus", "pcod-profile"] },
  { label: "Heart", icon: "heart-pulse", slugs: ["nd-plus", "nd-max-plus", "bio-t-plus"] },
  { label: "Vitamins", icon: "pill", slugs: ["nd-plus", "nd-max-plus"] },
  { label: "Women's Health", icon: "venus", slugs: ["amh-plus", "pcod-profile", "ante-natal-panel", "antenatal-panel-pg"] },
  { label: "Senior Citizen", icon: "hand-heart", slugs: ["nd-max-plus", "arthriti-panel-1", "arthriti-panel-2", "complete-anemia-profile"] },
  { label: "Liver & Kidney", icon: "flask-conical", slugs: ["liver-function-test-lft", "kidney-function-tests-kft", "nd-plus"] },
  { label: "Fever", icon: "thermometer", slugs: ["fever-panel"] },
];

export const featuredTestSlugs = ["complete-blood-count", "creatinine", "cholestrol", "ige"];

/* Health-concern tiles, each linked to the closest existing page. The last
   two only fit on desktop. */
export const healthConcerns: { label: string; icon: string; href: string }[] = [
  { label: "Fever", icon: "thermometer", href: "/packages/fever-panel/" },
  { label: "Diabetes", icon: "droplet", href: "/packages/diabetes-monitoring-panel-1/" },
  { label: "Thyroid", icon: "activity", href: "/tests/thyroid-function-profile-tft-free/" },
  { label: "Heart", icon: "heart-pulse", href: "/tests/cholestrol/" },
  { label: "Kidney", icon: "bean", href: "/packages/kidney-function-tests-kft/" },
  { label: "Vitamins", icon: "pill", href: "/tests/vitamin-d/" },
  { label: "Women's Health", icon: "venus", href: "/packages/pcod-profile/" },
  { label: "Pregnancy", icon: "baby", href: "/packages/antenatal-panel-pg/" },
  { label: "Bones & Joints", icon: "bone", href: "/packages/arthriti-panel-1/" },
  { label: "Allergy", icon: "shield-plus", href: "/tests/ige/" },
];

export const radiologyItems: { title: string; subtitle: string; icon: string; href: string }[] = [
  { title: "Ultrasound", subtitle: "Female radiologist available", icon: "scan-line", href: "/ultrasound-in-jamshedpur/" },
  { title: "Digital X-Ray", subtitle: "Low radiation, fast reporting", icon: "bone", href: "/xray/" },
  { title: "ECG", subtitle: "Results in minutes", icon: "heart-pulse", href: "/ecg/" },
  { title: "2D ECHO", subtitle: "By experienced cardiologist", icon: "activity", href: "/radiology/" },
  { title: "PFT", subtitle: "Lung capacity & airflow", icon: "wind", href: "/radiology/" },
];

