/* The ONLY module that reads the raw data files.

   Swapping the catalogue to a CMS or to the backend API means rewriting this
   file and nothing else. Everything downstream depends on the normalised
   domain types, not on the JSON shape. */

import rawTests from "@/data/tests.json";
import rawPackages from "@/data/packages.json";
import rawRadiology from "@/data/radiologyServices.json";
import rawAreas from "@/data/areasServed.json";
import rawReviews from "@/data/reviews.json";
import rawScans from "@/data/ultrasoundScans.json";
import type {
  Area,
  Package,
  RadiologyService,
  Review,
  Test,
} from "./types";

/* Price is sometimes a string in the source data. Coerce once, here, so no
   caller has to remember. */
const num = (v: unknown): number => Number(v) || 0;

/* A trailing space in a slug once put a 404 URL into the sitemap. */
const slug = (v: unknown): string => String(v ?? "").trim();

const text = (v: unknown): string => String(v ?? "").trim();

export const tests: Test[] = rawTests.tests.map((t) => ({
  id: t.Id,
  slug: slug(t.Slug),
  title: text(t.TestName),
  description: text(t.Description),
  price: num(t.DiscountedPrice),
  originalPrice: num(t.Price),
  categories: t.Categories ?? [],
  category: t.Categories?.[0]?.trim() || "General Health",
  fasting: text(t.Fasting) || "Not Required",
  reporting: text(t.Reporting) || "Same Day",
  tat: text(t.Tat),
  sampleType: text(t.SampleType),
  metaTitle: text(t.MetaTitle),
  metaDescription: text(t.MetaDescription),
  metaKeywords: text(t.MetaKeywords),
}));

export const packages: Package[] = rawPackages.packages.map((p) => ({
  id: p.Id,
  slug: slug(p.Slug),
  title: text(p.PackageName),
  description: text(p.Description),
  price: num(p.DiscountedPrice),
  originalPrice: num(p.Price),
  parameters: num(p.ParametersCovered),
  categories: text(p.Categories),
  testsIncluded: text(p.TestInclued),
  fasting: text(p.Fasting) || "Not Required",
  reporting: text(p.Reporting) || "Same Day",
  tat: text(p.Tat),
  sampleType: text(p.SampleType),
  metaTitle: text(p.MetaTitle),
  metaDescription: text(p.MetaDescription),
  metaKeywords: text(p.MetaKeywords),
}));

export const radiologyServices: RadiologyService[] =
  rawRadiology.radiologyServices as RadiologyService[];

export const areas: Area[] = rawAreas.areas as Area[];
export const areaCity: string = rawAreas.city;
export const areaIntro: string = rawAreas.intro;

export const reviews: Review[] = rawReviews.reviews as Review[];

export const ultrasoundScans = rawScans.scanTypes;
export const ultrasoundPreparationSteps = rawScans.preparationSteps;
