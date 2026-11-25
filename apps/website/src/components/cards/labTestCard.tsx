import Link from "next/link";
import { ArrowRight, Utensils, Zap } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import { buttonClass } from "@/components/ui/button";
import type { Test } from "@/lib/catalog";
import { discountPct, fastingLabel, reportLabel, rupees } from "@/lib/format";
import { leadMeta } from "@/lib/leadMeta";

/* DL.pen "Test Card". */
export type LabTest = Pick<
  Test,
  "slug" | "title" | "description" | "price" | "originalPrice" | "category" | "fasting" | "reporting"
>;

/* "home": the most-booked card (Details and Book under the price).
   "catalog": the Lab Tests page card, with a category pill and a Details
   link. */
export default function LabTestCard({
  test,
  variant = "home",
  categoryLabel = test.category,
  stacked: stackedProp = false,
}: {
  test: LabTest;
  variant?: "home" | "catalog" | "related";
  categoryLabel?: string;
  /* Buttons on their own full-width row under the price, for narrow
     four-up grids (the area pages). The home card is always stacked. */
  stacked?: boolean;
}) {
  const catalog = variant === "catalog";
  /* "related": the detail pages' "Often booked with" card: grey category
     pill, green discount pill and a "Book" button. */
  const related = variant === "related";
  const home = variant === "home";
  const stacked = stackedProp || home;
  const withDetails = catalog || home;
  const { slug, title, description, price, originalPrice } = test;
  const discount = discountPct(price, originalPrice);

  return (
    <article className="flex h-full flex-col gap-[18px] rounded-[20px] border border-dl-line bg-white p-5 md:p-6">
      {catalog || related ? (
        <div className="flex items-center justify-between gap-2 text-xs font-bold">
          <span
            className={
              related
                ? "rounded-full bg-dl-bg px-2.5 py-1 font-semibold text-dl-ink-2"
                : "rounded-md bg-dl-red-soft px-2 py-1 text-dl-red-dark"
            }
          >
            {categoryLabel}
          </span>
          {discount > 0 && (
            <span className={`bg-dl-green/10 px-2 py-1 text-dl-green ${related ? "rounded-full px-2.5" : "rounded-md"}`}>
              {discount}% off
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 text-[12.5px]">
          <span className="inline-flex items-center gap-[7px] font-semibold text-dl-ink-2">
            <span className="size-1.5 rounded-full bg-dl-red" aria-hidden />
            {categoryLabel}
          </span>
          {discount > 0 && (
            <span className="font-bold text-dl-green">{discount}% off</span>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display text-[19px] md:text-xl font-bold tracking-[-0.02em] text-dl-ink">
          <Link href={`/tests/${slug}`} className="hover:text-dl-red">
            {title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-normal text-dl-ink-2">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12.5px] text-dl-ink-2">
        <span className="inline-flex items-center gap-[5px]">
          <Zap className="size-[13px] text-dl-muted" aria-hidden />
          {reportLabel(test.reporting)}
        </span>
        {test.fasting && (
          <span className="inline-flex items-center gap-[5px]">
            <Utensils className="size-[13px] text-dl-muted" aria-hidden />
            {fastingLabel(test.fasting)}
          </span>
        )}
      </div>

      <div
        className={`mt-auto flex gap-3 border-t border-dl-line pt-[18px] ${
          stacked ? "flex-col" : "flex-wrap items-center justify-between"
        }`}
      >
        <div className="flex items-end gap-2">
          <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-dl-ink">
            {rupees(price)}
          </span>
          {originalPrice > price && (
            <s className="pb-0.5 text-sm text-dl-muted">
              {rupees(originalPrice)}
            </s>
          )}
        </div>
        <div className={`flex shrink-0 items-center gap-2 ${stacked ? "" : "ml-auto"}`}>
          {withDetails && (
            <Link href={`/tests/${slug}`} className={buttonClass("neutral", "sm", stacked ? "flex-1" : "")}>
              Details
            </Link>
          )}
          <BookButton
            className={buttonClass("primary", "sm", stacked ? "flex-1" : "")}
            form={{
              testName: title,
              testPrice: price,
              testOriginalPrice: originalPrice,
              additionalSourceData: leadMeta({ kind: "test", ...test }),
            }}
          >
            Book
            <ArrowRight className="size-4" aria-hidden />
          </BookButton>
        </div>
      </div>
    </article>
  );
}
