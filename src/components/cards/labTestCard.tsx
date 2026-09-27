import Link from "next/link";
import { Plus, Utensils, Zap } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import { buttonClass } from "@/components/ui/button";
import type { Test } from "@/lib/catalog";

/* DL.pen "Test Card". */
export type LabTest = Pick<
  Test,
  "slug" | "title" | "description" | "price" | "originalPrice" | "category" | "fasting" | "reporting"
>;

/* The catalogue stores "Same Day" / "Not Required" / "Over-Night"; the
   design phrases them as patients would. */
const reportLabel = (reporting: string) =>
  /same\s*day/i.test(reporting) ? "Same-day report" : `${reporting} report`;

const fastingLabel = (fasting: string) => {
  if (/not\s*required/i.test(fasting)) return "No fasting";
  if (/over[\s-]*night/i.test(fasting)) return "Overnight fasting";
  return fasting;
};

export default function LabTestCard({ test }: { test: LabTest }) {
  const { slug, title, description, price, originalPrice } = test;
  const discount =
    originalPrice > 0 && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  /* Same lead payload as the classic TestCard. */
  const leadMeta = {
    test_name: title,
    test_slug: slug,
    test_price: price,
    test_original_price: originalPrice,
    test_category: test.category,
    test_fasting: test.fasting,
    test_reporting: test.reporting,
  };

  return (
    <article className="flex h-full flex-col gap-[18px] rounded-[20px] border border-dl-line bg-white p-5 md:p-6">
      <div className="flex items-center justify-between gap-2 text-[12.5px]">
        <span className="inline-flex items-center gap-[7px] font-semibold text-dl-ink-2">
          <span className="size-1.5 rounded-full bg-dl-red" aria-hidden />
          {test.category}
        </span>
        {discount > 0 && (
          <span className="font-bold text-dl-green">{discount}% off</span>
        )}
      </div>

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
        <span className="inline-flex items-center gap-[5px]">
          <Utensils className="size-[13px] text-dl-muted" aria-hidden />
          {fastingLabel(test.fasting)}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-dl-line pt-[18px]">
        <div className="flex items-end gap-2">
          <span className="font-display text-2xl font-extrabold tracking-[-0.02em] text-dl-ink">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {originalPrice > price && (
            <s className="pb-0.5 text-sm text-dl-muted">
              ₹{originalPrice.toLocaleString("en-IN")}
            </s>
          )}
        </div>
        <BookButton
          className={buttonClass("outline", "sm")}
          form={{
            title: "Book",
            testName: title,
            testDescription: description,
            testPrice: price,
            testOriginalPrice: originalPrice,
            additionalSourceData: leadMeta,
          }}
        >
          Book
          <Plus className="size-4" aria-hidden />
        </BookButton>
      </div>
    </article>
  );
}
