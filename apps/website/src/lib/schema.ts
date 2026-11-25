import type { Metadata } from "next";

/* Shared SEO pieces. The business itself is described once, in the
   site layout, under ORG_ID; every other block points at it with
   ORG_REF instead of repeating its name, phone and address. */

export const SITE_URL = "https://diagnoslab.in";
/* The absolute URL of a site path, e.g. "/tests/". */
export const pageUrl = (path: string) => `${SITE_URL}${path}`;
export const ORG_ID = `${SITE_URL}/#organization`;
export const ORG_REF = { "@id": ORG_ID };

/* The share image (Open Graph and Twitter). A JPG because WhatsApp,
   Facebook and X don't render AVIF previews. Next replaces a parent's whole
   openGraph object when a page sets its own, so every page spreads
   ogDefaults into its openGraph to keep the image, site name and locale. */
export const OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Diagnos Lab, diagnostic centre in Jamshedpur",
};
export const ogDefaults = {
  siteName: "Diagnos Lab",
  locale: "en_IN",
  type: "website" as const,
  images: [OG_IMAGE],
};

/* The ListItems of a breadcrumb trail. `path` is site-relative; "" is the
   home page. For a BreadcrumbList inside an @graph. */
export const breadcrumbNode = (trail: [name: string, path: string][]) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: path.startsWith("http") ? path : pageUrl(path),
  })),
});

/* A standalone BreadcrumbList block. */
export const breadcrumbSchema = (trail: [name: string, path: string][]) => ({
  "@context": "https://schema.org",
  ...breadcrumbNode(trail),
});

/* The metadata of a test or package detail page. */
export function detailMeta({
  path,
  title,
  description,
  keywords,
}: {
  path: string;
  title: string;
  description: string;
  keywords: string[];
}): Metadata {
  const url = pageUrl(path);
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: { ...ogDefaults, title, description, url, type: "website" },
    robots: { index: true, follow: true },
  };
}
