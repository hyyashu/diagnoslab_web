import { tests } from "./source";
import type { Test, TestIndexEntry } from "./types";

export const TESTS_PER_PAGE = 24;

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

export function getTestsPage(page: number, perPage = TESTS_PER_PAGE) {
  const total = tests.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  return {
    items: tests.slice((current - 1) * perPage, current * perPage),
    page: current,
    totalPages,
    total,
  };
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

export function getTestCategories(): string[] {
  return [...new Set(tests.flatMap((t) => t.categories))].filter(Boolean).sort();
}
