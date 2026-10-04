import type { ListingPackage } from "@/components/cards/packageListingCards";
import type { Package } from "@/lib/catalog";
/* Health Packages page copy from DL.pen. Prices, parameters, fasting and
   reporting still come from the catalogue. */

export const featured = {
  "nd-plus": {
    summary: "Comprehensive checkup covering blood health, glucose, liver and kidney function, vitamin levels and more.",
    includes: ["CBC", "Liver", "Kidney", "Lipid", "Thyroid", "Vitamins", "+ more"],
  },
  "nd-max-plus": {
    summary: "Everything in ND Plus, plus autoimmune markers and inflammatory indicators for a deeper look at your health.",
    includes: ["All of ND Plus", "Autoimmune", "Inflammation", "Iron", "+ more"],
  },
} as const;

/* Short card summaries; packages without one fall back to their catalogue
   description (or none). */
const summaries: Record<string, string> = {
  "bio-t-plus": "Blood health, glucose, cholesterol, kidney function, uric acid, calcium and liver function.",
  "bio-t-d-plus": "Everything in BIO T Plus, with HbA1c for long-term glucose monitoring.",
  "diabetes-monitoring-panel-1": "Key tests to track blood sugar control and related health markers.",
  "pcod-profile": "Hormone and metabolic tests to help evaluate PCOD / PCOS.",
  "amh-plus": "Hormone panel including AMH to assess ovarian reserve and fertility.",
  "ante-natal-panel": "Essential tests recommended during early pregnancy.",
};

const womens = ["amh-plus", "pcod-profile"];
const pregnancy = ["ante-natal-panel", "antenatal-panel-1sl", "antenatal-panel-pg"];

/* The category pill on each card. */
const categoryLabel = (slug: string, categories: string) => {
  if (womens.includes(slug)) return "Women's Health";
  if (pregnancy.includes(slug)) return "Pregnancy";
  return categories.split(",")[0]?.trim() || "General Health";
};

/* The design's order for the first page; the rest follow in catalogue order. */
/* A catalogue package as the listing cards and the detail page show it. */
export const toListing = (p: Package): ListingPackage => ({
  slug: p.slug,
  title: p.title,
  description: p.description,
  price: p.price,
  originalPrice: p.originalPrice,
  parameters: p.parameters,
  categories: p.categories,
  fasting: p.fasting,
  reporting: p.reporting,
  categoryLabel: categoryLabel(p.slug, p.categories),
  summary: summaries[p.slug],
});

export const leadOrder = ["bio-t-plus", "bio-t-d-plus", "diabetes-monitoring-panel-1", "pcod-profile", "amh-plus", "ante-natal-panel"];

/* Chip label -> the packages it shows, and the chip's icon. */
export const packageChips: [string, string[] | null, string][] = [
  ["All packages", null, "layout-grid"],
  ["Full Body", ["nd-plus", "nd-max-plus", "bio-t-plus", "bio-t-d-plus"], "person-standing"],
  ["Diabetes", ["bio-t-d-plus", "diabetes-monitoring-panel-1", "diabetes-monitoring-panel-2", "nd-plus", "nd-max-plus"], "droplet"],
  ["Women's Health", ["amh-plus", "pcod-profile"], "venus"],
  ["Thyroid & Hormones", ["nd-plus", "nd-max-plus", "amh-plus", "pcod-profile"], "activity"],
  ["Pregnancy", pregnancy, "baby"],
  ["Heart Health", ["nd-plus", "nd-max-plus"], "heart-pulse"],
  ["Liver & Kidney", ["liver-function-test-lft", "kidney-function-tests-kft"], "flask-conical"],
  ["Vitamins", ["nd-plus", "nd-max-plus"], "pill"],
];
