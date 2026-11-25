import { getPackages, getTestIndex, pregnancyScans, radiologyServices } from "@/lib/catalog";

export const dynamic = "force-static";

/* What the header and hero search boxes match against. Written once at
   build time and fetched on first focus, so no page ships the catalogue in
   its bundle. Keys are short because every page can end up loading it. */
export type SearchEntry = {
  /* title */ t: string;
  /* href */ h: string;
  /* kind */ k: "Test" | "Package" | "Scan";
  /* price, 0 when unpriced */ p: number;
};

const scanHref: Record<string, string> = {
  ultrasound: "/ultrasound-in-jamshedpur/",
  ecg: "/ecg/",
  xray: "/xray/",
};

const titleCase = (s: string) =>
  s.length <= 4 ? s : s.charAt(0) + s.slice(1).toLowerCase();

export function GET() {
  const entries: SearchEntry[] = [
    ...radiologyServices.map((s) => ({
      t: titleCase(s.title),
      h: scanHref[s.id] ?? "/radiology/",
      k: "Scan" as const,
      p: 0,
    })),
    ...pregnancyScans.map((s) => ({
      t: s.title,
      h: `/ultrasound-in-jamshedpur/${s.slug}/`,
      k: "Scan" as const,
      p: 0,
    })),
    ...getPackages().map((p) => ({
      t: p.title,
      h: `/packages/${p.slug}/`,
      k: "Package" as const,
      p: p.price,
    })),
    ...getTestIndex().map((t) => ({
      t: t.title,
      h: `/tests/${t.slug}/`,
      k: "Test" as const,
      p: t.price,
    })),
  ];

  return Response.json(entries);
}
