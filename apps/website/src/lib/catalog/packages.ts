import { packages } from "./source";
import type { Package } from "./types";

export function getPackages(): Package[] {
  return packages;
}

export function getPackageBySlug(slug: string): Package | undefined {
  const wanted = slug.trim().toLowerCase();
  return packages.find((p) => p.slug.toLowerCase() === wanted);
}

export function getPackageSlugs(): string[] {
  return packages.map((p) => p.slug);
}
