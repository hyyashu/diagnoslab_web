"use client";
import Link from "next/link";
import LeadForm from "@/components/forms/leadForm";
import { useMemo, useState } from "react";
import { Clock, Utensils, FlaskConical } from "lucide-react";

interface Props {
  title: string;
  description: string;
  price?: number;
  originalPrice: number;
  parameters?: number;
  categories?: string;
  fasting?: string;
  reporting?: string;
  slug: string;
  showDetailsButton?: boolean;
  fillSlide?: boolean;
}

interface leadMetaProps {
  [key: string]: unknown;
  package_name: string;
  package_description: string;
  package_price: number;
  package_original_price: number;
  package_parameters: number;
  package_categories: string[];
  package_fasting: string;
  package_reporting: string;
}

export default function PackageCard({
  title,
  description,
  price,
  originalPrice,
  parameters = 75,
  categories = "General",
  fasting = "Not Required",
  reporting = "Same Day",
  slug = "",
  showDetailsButton = true,
  fillSlide = false,
}: Props) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const discount =
    originalPrice > 0 && price && price > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const leadMeta = useMemo<leadMetaProps>(
    () => ({
      package_name: title,
      package_description: description,
      package_price: price ?? 0,
      package_original_price: originalPrice,
      package_parameters: parameters,
      package_categories: categories.split(","),
      package_fasting: fasting ?? "",
      package_reporting: reporting ?? "",
    }),
    [title, description, price, originalPrice, parameters, categories, fasting, reporting]
  );

  return (
    <>
      <div
        className={`bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col w-full overflow-hidden ${
          fillSlide ? "h-full max-w-none" : ""
        }`}
        style={{ borderTop: "3px solid #E73834" }}
      >
        <div className="p-4 md:p-5 flex flex-col flex-1">

          {/* Parameters badge + title */}
          <div className="flex items-start gap-2 mb-2">
            <h3 className="font-heading font-bold text-black text-sm md:text-base leading-snug flex-1">
              {title}
            </h3>
            <span className="shrink-0 bg-red-50 text-[#E73834] text-[10px] font-bold px-2 py-0.5 rounded-full font-body whitespace-nowrap">
              {parameters} params
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-xs font-body leading-relaxed line-clamp-2 mb-3">
            {description}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="flex items-center gap-1 bg-gray-50 text-gray-600 text-[11px] font-body font-medium px-2 py-1 rounded-lg">
              <Clock size={11} className="shrink-0" />
              {reporting}
            </span>
            <span className="flex items-center gap-1 bg-gray-50 text-gray-600 text-[11px] font-body font-medium px-2 py-1 rounded-lg">
              <Utensils size={11} className="shrink-0" />
              {fasting}
            </span>
            {categories && (
              <span className="flex items-center gap-1 bg-gray-50 text-gray-600 text-[11px] font-body font-medium px-2 py-1 rounded-lg max-w-[160px] truncate">
                <FlaskConical size={11} className="shrink-0" />
                {categories.split(",")[0].trim()}
                {categories.split(",").length > 1 && ` +${categories.split(",").length - 1}`}
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price */}
          {price && price > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading font-black text-lg text-black">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice > 0 && (
                <span className="font-heading text-gray-400 line-through text-sm">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
              {discount >= 10 && (
                <span className="ml-auto text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-body">
                  {discount}% off
                </span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div
            className={`grid gap-2 ${
              showDetailsButton ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {showDetailsButton && (
              <Link href={`/packages/${slug}`}>
                <button className="w-full py-2.5 border border-[#E73834] text-[#E73834] rounded-xl text-xs font-bold font-heading transition-colors hover:bg-red-50 active:scale-95">
                  Details
                </button>
              </Link>
            )}
            <button
              onClick={() => setShowLeadForm(true)}
              className="w-full py-2.5 bg-[#E73834] text-white rounded-xl text-xs font-bold font-heading hover:bg-red-700 transition-all active:scale-95 shadow-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <LeadForm
        open={showLeadForm}
        onOpenChange={setShowLeadForm}
        title="Book"
        testName={title}
        testDescription={description}
        testPrice={price ?? 0}
        testOriginalPrice={originalPrice}
        additionalSourceData={leadMeta}
      />
    </>
  );
}
