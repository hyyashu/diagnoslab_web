import type { MetadataRoute } from "next";
import { getTestSlugs, getPackageSlugs, areas } from "@/lib/catalog";

/* Required for output: "export" — written to out/sitemap.xml at build time. */
export const dynamic = "force-static";

const BASE = "https://diagnoslab.in";

/* trailingSlash is on, so every page lives at /path/; listing /path would
   send crawlers through a 301 for each URL. */
const url = (path: string) => `${BASE}${path.replace(/\/?$/, "/")}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: url(`/tests`), lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: url(`/book-a-test`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: url(`/ultrasound-in-jamshedpur`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: url(`/radiology`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: url(`/ecg`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: url(`/xray`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: url(`/packages`), lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: url(`/aboutUs`), lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: url(`/contact-us`), lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: url(`/corporate`), lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: url(`/policy`), lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const testRoutes: MetadataRoute.Sitemap = getTestSlugs().map((slug) => ({
    url: url(`/tests/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const areaRoutes: MetadataRoute.Sitemap = areas.map((area) => ({
    url: url(`/area/${area.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const packageRoutes: MetadataRoute.Sitemap = getPackageSlugs().map((slug) => ({
    url: url(`/packages/${slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...testRoutes, ...areaRoutes, ...packageRoutes];
}
