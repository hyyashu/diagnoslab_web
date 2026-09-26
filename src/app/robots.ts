import type { MetadataRoute } from "next";

/* Required for output: "export" — written to out/robots.txt at build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* /_next/ must stay crawlable: it holds the CSS and JS Google needs
           to render pages. /lp/ is the paid landing page (noindex anyway). */
        disallow: ["/lp/"],
      },
    ],
    sitemap: "https://diagnoslab.in/sitemap.xml",
  };
}
