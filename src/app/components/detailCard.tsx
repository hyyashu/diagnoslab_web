"use client";

import Link from "next/link";
import EnquiryForm from "@/app/components/enquiryForm";
import LeadForm from "./leadForm";
import { useMemo, useState } from "react";

export type DetailKind = "test" | "package";

export type DetailEntity = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountedPrice: number;
  categories: string[];
  fasting?: string;
  reporting?: string;
  tat?: string;
  sampleType?: string;
  whoShouldTake?: string;
  parametersCovered?: number; 
};

interface DetailCardProps {
  kind: DetailKind;
  data: DetailEntity;
}


export default function DetailCard({ kind, data }: DetailCardProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const backHref =
    kind === "test"
      ? "/tests#tests-section"
      : "/packages#packages-section";

  const backLabel =
    kind === "test" ? "Back" : "Back";

  const leadMeta = useMemo(() => {
    if (kind === "test") {
      return {
        test_name: data.name,
        test_slug: data.slug,
        test_price: data.discountedPrice,
        test_original_price: data.price,
        test_categories: data.categories,
      };
    }

    return {
      package_name: data.name,
      package_description: data.description,
      package_price: data.discountedPrice,
      package_original_price: data.price,
      package_parameters: data.parametersCovered,
      package_categories: data.categories,
    };
  }, [kind, data]);

  return (
    <>
      <div className="bg-background-primary p-4 md:p-8">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto mb-6 mt-10 md:mt-12">
          <Link href={backHref}>
            <button className="bg-white text-background-primary px-4 py-2 rounded-full text-sm font-medium font-heading flex items-center gap-2 shadow-sm hover:bg-gray-100 transition-all">
              <span>←</span> {backLabel}
            </button>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-white font-heading text-2xl md:text-4xl text-center font-bold mb-8 px-4">
          {data.name}
        </h1>

        {/* Enquiry Form */}
        <div className="mx-auto w-full max-w-[90%] md:max-w-6xl mb-8">
          <EnquiryForm formType="enquiry_form" />
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row flex-wrap justify-between gap-4 text-sm shadow-sm">
            {data.categories.length > 0 && (
              <p className="text-black font-body">
                <b className="font-heading">Category:</b>{" "}
                {data.categories.join(", ")}
              </p>
            )}

            <p className="text-black font-body">
              <b className="font-heading">Fasting:</b>{" "}
              {data.fasting ?? "—"}
            </p>

            <p className="text-black font-body">
              <b className="font-heading">Reporting:</b>{" "}
              {data.reporting ?? "—"}
            </p>

            {data.tat && (
              <p className="text-black font-body">
                <b className="font-heading">TAT:</b> {data.tat}
              </p>
            )}

            {data.sampleType && (
              <p className="text-black font-body">
                <b className="font-heading">Sample:</b>{" "}
                {data.sampleType}
              </p>
            )}
          </div>

          {/* Overview */}
          {data.description && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-2 text-black font-heading">
                Overview
              </h2>
              <p className="text-black leading-relaxed text-sm font-body">
                {data.description}
              </p>
            </div>
          )}

          {/* Two Column Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4 text-black font-heading">
                Key Benefits
              </h2>
              <ul className="space-y-2 text-sm text-black font-body">
                <li className="flex items-center gap-2 before:content-['✓'] before:text-green-600 before:font-bold">
                  Early detection
                </li>

                {kind === "package" && (
                  <li className="flex items-center gap-2 before:content-['✓'] before:text-green-600 before:font-bold">
                    {data.parametersCovered || "70+"} Parameters Covered
                  </li>
                )}

                <li className="flex items-center gap-2 before:content-['✓'] before:text-green-600 before:font-bold">
                  Lifestyle tracking
                </li>
              </ul>
            </div>

            {/* Who Should Take */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-4 text-black font-heading">
                Who should take this test?
              </h2>
              <p className="text-black text-sm leading-relaxed font-body">
                {data.whoShouldTake ??
                  "Consult your doctor for suitability."}
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center shadow-lg gap-4">
            <p className="font-bold text-black sm:ml-4 font-heading text-center sm:text-left">
              Home Collection Available
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
              <div className="text-center sm:text-right">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-green-600 font-heading">
                    ₹{data.discountedPrice}
                  </span>

                  <span className="text-slate-400 line-through text-sm font-semibold font-heading">
                    ₹{data.price}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowLeadForm(true)}
                className="bg-background-primary hover:bg-red-700 text-white w-full sm:w-auto px-10 py-3 rounded-xl font-bold transition-all shadow-md font-heading"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm
        open={showLeadForm}
        onOpenChange={setShowLeadForm}
        title="Book"
        testName={data.name}
        testDescription={data.description}
        testPrice={data.discountedPrice}
        testOriginalPrice={data.price}
        additionalSourceData={leadMeta}
      />
    </>
  );
}