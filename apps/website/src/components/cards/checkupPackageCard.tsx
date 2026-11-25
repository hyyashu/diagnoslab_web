import Link from "next/link";
import { ArrowRight, Clock3, Flame, TestTubes } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import { buttonClass } from "@/components/ui/button";
import type { Package } from "@/lib/catalog";
import { discountPct, reportLabel, rupees } from "@/lib/format";
import { leadMeta } from "@/lib/leadMeta";

/* DL.pen "Package Card". The audience line and the "includes" chips are
   editorial and only exist for the featured packages; any other package
   falls back to its description. */
export type CheckupPackage = Pick<
  Package,
  "slug" | "title" | "description" | "price" | "originalPrice" | "parameters" | "categories" | "fasting" | "reporting"
> & {
  audience?: string;
  includes?: string[];
  mostBooked?: boolean;
};

/* `highlight`: the red border without the Most Booked tag (detail page
   comparison). */
export default function CheckupPackageCard({ pkg, highlight = false }: { pkg: CheckupPackage; highlight?: boolean }) {
  const { title, description, price, originalPrice, parameters, slug } = pkg;
  const discount = discountPct(price, originalPrice);

  return (
    <article
      className={`flex h-full flex-col gap-[18px] md:gap-5 rounded-[20px] bg-white p-5 md:p-6 ${
        pkg.mostBooked || highlight
          ? "border-[1.5px] border-dl-red"
          : "border border-dl-line"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        {parameters > 0 && (
          <span className="inline-flex items-center gap-[5px] rounded-md bg-dl-red-soft px-[9px] py-[5px] text-xs font-bold text-dl-red">
            <TestTubes className="size-[13px]" aria-hidden />
            {parameters} parameters
          </span>
        )}
        {discount > 0 && (
          <span className="rounded-md bg-dl-green/10 px-[9px] py-[5px] text-xs font-extrabold text-dl-green">
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="font-display text-[22px] md:text-2xl font-extrabold tracking-[-0.025em] text-dl-ink">
            <Link href={`/packages/${slug}`} className="hover:text-dl-red">
              {title}
            </Link>
          </h3>
          {pkg.mostBooked && (
            <span className="inline-flex items-center gap-[5px] rounded-md bg-dl-red px-2 py-1 text-[10px] font-extrabold tracking-[0.1em] text-white">
              <Flame className="size-3" aria-hidden />
              MOST BOOKED
            </span>
          )}
        </div>
        {pkg.audience && (
          <p className="text-[13.5px] font-medium text-dl-muted">{pkg.audience}</p>
        )}
      </div>

      {pkg.includes ? (
        <ul className="flex flex-wrap gap-1" aria-label="Includes">
          {pkg.includes.map((item) => (
            <li
              key={item}
              className="rounded-md border border-dl-line px-2 py-[5px] text-xs font-medium text-dl-ink-2"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="line-clamp-2 text-[13.5px] leading-normal text-dl-ink-2">
          {description}
        </p>
      )}

      <div className="flex items-center gap-4 text-[12.5px] font-medium text-dl-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5 text-dl-muted" aria-hidden />
          {reportLabel(pkg.reporting)}
        </span>
        {parameters > 0 && (
          <span className="inline-flex items-center gap-1.5">
            <TestTubes className="size-3.5 text-dl-muted" aria-hidden />
            {parameters} parameters
          </span>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-4 border-t border-dl-line pt-5">
        <div className="flex items-end gap-2">
          <span className="font-display text-2xl md:text-[26px] font-extrabold tracking-[-0.025em] text-dl-ink">
            {rupees(price)}
          </span>
          {originalPrice > price && (
            <s className="pb-1 text-[13px] font-medium text-dl-muted">
              {rupees(originalPrice)}
            </s>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/packages/${slug}`} className={buttonClass("neutral", "md", "flex-1")}>
            Details
          </Link>
          <BookButton
            className={buttonClass("primary", "md", "flex-1")}
            form={{
              testName: title,
              testPrice: price,
              testOriginalPrice: originalPrice,
              additionalSourceData: leadMeta({ kind: "package", ...pkg }),
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
