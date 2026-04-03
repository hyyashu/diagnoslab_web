"use client";

import { useMemo, useState } from "react";
import LeadForm from "../../components/leadForm";
import Link from "next/link";

interface TestCardProps {
  slug: string;
  showDetailsButton?: boolean;
  fillSlide?: boolean;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  fasting: string;
  reporting: string;
}

interface leadMetaProps {
  test_name: string;
  test_slug: string;
  test_price: number;
  test_original_price: number;
  test_category: string;
  test_fasting: string;
  test_reporting: string;
}

export default function TestCard({
  slug,
  showDetailsButton = true,
  fillSlide = false,
  title,
  description,
  price,
  originalPrice,
  category,
  fasting,
  reporting,
}: TestCardProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const leadMeta = useMemo<leadMetaProps>(
    () => ({
      test_name: title,
      test_slug: slug,
      test_price: price,
      test_original_price: originalPrice,
      test_category: category,
      test_fasting: fasting,
      test_reporting: reporting,
    }),
    [title, slug, price, originalPrice, category, fasting, reporting]
  );

  return (
    <>
      <div
        className={`bg-white rounded-3xl p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-gray-50 flex flex-col w-full ${fillSlide ? "h-full max-w-none" : "max-w-[400px]"
          }`}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
          <h3 className="text-xl md:text-2xl font-bold text-black leading-tight font-heading">
            {title}
          </h3>

          <span className="mt-2 md:mt-0 md:ml-2 bg-background-primary text-white text-[10px] md:text-xs px-3 py-1 rounded-full font-medium shrink-0  w-fit">
            {category}
          </span>
        </div>

        <div
          className={
            fillSlide ? "flex min-h-0 flex-1 flex-col" : "contents"
          }
        >
          {/* Middle content wrapper */}
          <div className="flex flex-col flex-1">
            {/* Description */}
            <p
              className={`text-gray-700 text-sm mb-4 md:mb-6 font-body ${fillSlide ? "line-clamp-4" : ""
                }`}
            >
              {description}
            </p>

            {/* Info List */}
            <div className="space-y-2 text-sm font-body">
              <p className="text-black">
                <span className="font-bold">Fasting:</span>{" "}
                <span className="text-gray-700">{fasting}</span>
              </p>
              <p className="text-black">
                <span className="font-bold">Reporting:</span>{" "}
                <span className="text-gray-700">{reporting}</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={fillSlide ? "mt-auto w-full pt-4" : "contents"}
        >
          {/* Pricing */}
          {price > 0 && (
            <div
              className={`flex justify-end items-center gap-2 mb-4${fillSlide ? "" : "mt-6"
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

          {/* Buttons */}
          <div
            className={`grid gap-3 ${showDetailsButton ? "grid-cols-2" : "grid-cols-1"
              }`}
          >
            {showDetailsButton && (
              <Link href={`/tests/${slug}`}>
                <button className="w-full py-2 border-[1.5px] border-background-primary text-background-primary rounded-xl text-base font-bold font-heading">
                  Details
                </button>
              </Link>
            )}

            <button
              onClick={() => setShowLeadForm(true)}
              className="w-full py-2 bg-background-primary text-white rounded-xl text-base font-bold hover:bg-red-700 shadow-sm shadow-red-100 transition-all font-heading text-sm md:text-base"
            >
              Book
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
        testPrice={price}
        testOriginalPrice={originalPrice}
        additionalSourceData={leadMeta}
      />
    </>
  );
}