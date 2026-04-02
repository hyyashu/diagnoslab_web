"use client";
import Link from "next/link";
import LeadForm from "../../components/leadForm";
import { useMemo, useState } from "react";

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
  categories = "A, B, C",
  fasting = "Not Required",
  reporting = "Same Day",
  slug = "",
  showDetailsButton = true,
  fillSlide = false,
}: Props) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const leadMeta = useMemo<leadMetaProps>(() => ({
    package_name: title,
    package_description: description,
    package_price: price ?? 0,
    package_original_price: originalPrice,
    package_parameters: parameters,
    package_categories: categories.split(","),
    package_fasting: fasting ?? "",
    package_reporting: reporting ?? "",
  }), [title, description, price, originalPrice, parameters, categories, fasting, reporting]);
  return (
    <div className={`bg-white rounded-3xl p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-gray-50 relative flex flex-col w-full ${fillSlide ? "h-full max-w-none" : "max-w-[400px]"}`}>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-black leading-tight font-heading">{title}</h3>
        <span className="bg-background-primary text-white text-xs  px-3 py-1 rounded-full font-medium shrink-0 ml-2">
          {parameters} parameters
        </span>
      </div>

      <div className="flex flex-col flex-1">
        {/* Description */}
        <p className="text-gray-700 text-sm mb-6 font-body line-clamp-4">
          {description}
        </p>

        {/* Info List */}
        <div className="space-y-2 text-sm font-body">
          <p className="text-black">
            <span className="font-bold ">Categories :</span> <span className="text-gray-700 ">{categories}</span>
          </p>
          <p className="text-black">
            <span className="font-bold ">Fasting:</span> <span className="text-gray-700 ">{fasting}</span>
          </p>
          <p className="text-black">
            <span className="font-bold ">Reporting:</span> <span className="text-gray-700">{reporting}</span>
          </p>
        </div>
      </div>

      <div className={fillSlide ? "mt-auto w-full pt-4" : "contents"}>
        {/* Pricing */}
        {price && price > 0 && (
          <div
            className={`flex justify-end items-center gap-2 mb-4 ${fillSlide ? "" : "mt-6"
              }`}
          >
            <span className="text-green-600 font-bold text-xl font-heading">
              ₹{price.toLocaleString()}
            </span>

            {originalPrice > 0 && (
              <span className="text-gray-700 line-through text-sm md:text-base font-heading">
                ₹{originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        )}

        {/* Compact Buttons */}
        <div className={`grid gap-3 ${showDetailsButton ? "grid-cols-2" : "grid-cols-1"}`}>
          {showDetailsButton && (
            <Link href={`/packages/${slug}`}>
              <button className="w-full py-2 border-[1.5px] border-background-primary text-background-primary rounded-xl text-base font-bold hover:bg-red-50 transition-colors font-heading">
                Details
              </button>
            </Link>
          )}
          <button onClick={() => setShowLeadForm(true)} className="w-full py-2 bg-background-primary text-white rounded-xl text-base font-bold hover:bg-red-700 shadow-sm shadow-red-100 transition-all font-heading text-sm md:text-base">
            Book
          </button>
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
    </div>
  );
}