import { tests } from "./source";
import type { Test, TestIndexEntry } from "./types";

export function getTests(): Test[] {
  return tests;
}

export function getTestBySlug(slug: string): Test | undefined {
  const wanted = slug.trim().toLowerCase();
  return tests.find((t) => t.slug.toLowerCase() === wanted);
}

export function getTestSlugs(): string[] {
  return tests.map((t) => t.slug);
}

export function getPopularTests(limit = 15): Test[] {
  return tests.slice(0, limit);
}

/* The browser only needs enough to match a query and render a result row. */
export function getTestIndex(): TestIndexEntry[] {
  return tests.map((t) => ({
    slug: t.slug,
    title: t.title,
    category: t.category,
    price: t.price,
  }));
}
