import type { Package, Test } from "@/lib/catalog";

/* What a Book button is booking. */
export type LeadItem =
  | ({ kind: "test" } & Pick<Test, "title" | "price">)
  | ({ kind: "package" } & Pick<Package, "title" | "price">)
  | { kind: "scan"; title: string };

/* The item details every Book button and detail page sends in the lead's
   `source`: what was booked and the price the visitor saw. */
export function leadMeta(item: LeadItem): Record<string, unknown> {
  switch (item.kind) {
    case "test":
      return {
        test_name: item.title,
        test_price: item.price,
      };
    case "package":
      return {
        package_name: item.title,
        package_price: item.price,
      };
    case "scan":
      return { radiology_name: item.title };
  }
}
