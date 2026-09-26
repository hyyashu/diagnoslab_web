import { getTestSlugs, getPackageSlugs, areas } from "@/lib/catalog";

/* The site's sitemaps, split by section so Search Console reports indexing
   for each one separately. /sitemap.xml is an index pointing at these; each
   is served by a static route handler under src/app/sitemap-<name>.xml/. */

const BASE = "https://diagnoslab.in";

type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

type Entry = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

/* trailingSlash is on, so every page lives at /path/; listing /path would
   send crawlers through a 301 for each URL. */
const absolute = (path: string) => `${BASE}${path.replace(/\/?$/, "/")}`;

const page = (
  path: string,
  changeFrequency: ChangeFrequency,
  priority: number,
): Entry => ({ path, changeFrequency, priority });

export const sitemaps = {
  main: (): Entry[] => [
    page("/", "weekly", 1),
    page("/book-a-test", "monthly", 0.9),
    page("/contact-us", "yearly", 0.7),
    page("/aboutUs", "yearly", 0.6),
    page("/corporate", "monthly", 0.6),
    page("/policy", "yearly", 0.3),
    ...areas.map((area) => page(`/area/${area.slug}`, "monthly", 0.7)),
  ],
  tests: (): Entry[] => [
    page("/tests", "weekly", 0.9),
    ...getTestSlugs().map((slug) => page(`/tests/${slug}`, "monthly", 0.7)),
  ],
  radiology: (): Entry[] => [
    page("/ultrasound-in-jamshedpur", "monthly", 0.9),
    page("/radiology", "monthly", 0.8),
    page("/xray", "monthly", 0.8),
    page("/ecg", "monthly", 0.8),
  ],
  packages: (): Entry[] => [
    page("/packages", "weekly", 0.8),
    ...getPackageSlugs().map((slug) => page(`/packages/${slug}`, "monthly", 0.7)),
  ],
} as const;

export type SitemapName = keyof typeof sitemaps;

export const sitemapUrl = (name: SitemapName) => `${BASE}/sitemap-${name}.xml`;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const xmlResponse = (body: string) =>
  new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });

export function urlsetResponse(name: SitemapName) {
  const lastmod = new Date().toISOString();
  const urls = sitemaps[name]()
    .map(
      (e) =>
        `<url>\n<loc>${escapeXml(absolute(e.path))}</loc>\n<lastmod>${lastmod}</lastmod>\n<changefreq>${e.changeFrequency}</changefreq>\n<priority>${e.priority}</priority>\n</url>`,
    )
    .join("\n");
  return xmlResponse(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
  );
}

export function indexResponse() {
  const lastmod = new Date().toISOString();
  const entries = (Object.keys(sitemaps) as SitemapName[])
    .map(
      (name) =>
        `<sitemap>\n<loc>${sitemapUrl(name)}</loc>\n<lastmod>${lastmod}</lastmod>\n</sitemap>`,
    )
    .join("\n");
  return xmlResponse(
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>`,
  );
}
