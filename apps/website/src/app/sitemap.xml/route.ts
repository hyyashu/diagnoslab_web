import { indexResponse } from "@/lib/sitemaps";

/* Sitemap index: points at one sitemap per section (see src/lib/sitemaps.ts).
   force-static writes it to out/sitemap.xml at build time. */
export const dynamic = "force-static";

export function GET() {
  return indexResponse();
}
