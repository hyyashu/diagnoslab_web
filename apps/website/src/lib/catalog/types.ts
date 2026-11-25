/* Domain types for the catalogue. These are what the rest of the app sees;
   the raw JSON shape stays behind src/lib/catalog/source.ts. */

export type Test = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  /* Raw list from the source. `category` is a convenience for the common case;
     call sites that display a different fallback read `categories` directly. */
  categories: string[];
  category: string;
  fasting: string;
  reporting: string;
  tat: string;
  sampleType: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

export type Package = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  parameters: number;
  categories: string;
  testsIncluded: string;
  fasting: string;
  reporting: string;
  tat: string;
  sampleType: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

export type RadiologyService = {
  id: string;
  title: string;
  bookLabel: string;
  description: string;
  bullets: string[];
  extra: string;
  reportingTime: string;
  image: string;
  href: string | null;
};

export type Area = { name: string; slug: string };

export type Review = {
  authorName: string;
  rating: number;
  date: string;
  text: string;
};

/* The subset shipped to the browser for search. Deliberately small: the full
   Test carries description and meta fields that search never reads. */
export type TestIndexEntry = {
  slug: string;
  title: string;
  category: string;
  price: number;
};
