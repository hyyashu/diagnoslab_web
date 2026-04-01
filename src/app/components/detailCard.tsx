"use client";

import Link from "next/link";
import EnquiryForm from "@/app/components/enquiryForm";
import LeadForm from "./leadForm";
import { useMemo, useState } from "react";

export type TestRecord = {
  Id: number;
  TestName: string;
  Description: string;
  Price: number;
  DiscountedPrice: number;
  Categories?: string[];
  Fasting?: string;
  Reporting?: string;
  SampleType?: string;
  Tat?: string;
  Slug: string;
};

interface LeadMeta {
  test_name: string;
  test_slug: string;
  test_price: number;
  test_original_price: number;
  test_categories: string[];
}

export default function DetailCard({ test }: { test: TestRecord }) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const categories = test.Categories ?? [];
  const price = test.DiscountedPrice;
  const originalPrice = test.Price;


  const leadMeta = useMemo<LeadMeta>(
    () => ({
      test_name: test.TestName,
      test_slug: test.Slug,
      test_price: test.DiscountedPrice,
      test_original_price: test.Price,
      test_categories: categories,
    }),
    [test.TestName, test.Slug, test.DiscountedPrice, test.Price, categories],
  );

  return (
    <>
      <div className="bg-background-primary p-4 md:p-8">
        <div className="max-w-6xl mx-auto mb-6 mt-10 md:mt-12">
          <Link href="/tests#tests-section">
            <button className="bg-white text-background-primary px-4 py-2 rounded-full text-sm font-medium font-heading flex items-center gap-2 shadow-sm hover:bg-gray-100 transition-all">
              <span>←</span> Back to Tests
            </button>
          </Link>
        </div>

        <h1 className="text-white font-heading text-2xl md:text-4xl text-center font-bold mb-8 px-4">
          {test.TestName}
        </h1>

        <div className="mx-auto w-full max-w-[90%] md:max-w-6xl mb-8">
          <EnquiryForm />
        </div>

        <div className="max-w-6xl mx-auto space-y-4">
          <div className="bg-white rounded-2xl p-6 flex flex-col md:flex-row flex-wrap justify-between gap-4 text-sm shadow-sm">
            {categories.length > 0 && (
              <p className="text-black font-body">
                <b className="font-heading">Category:</b>{" "}
                {categories.join(", ")}
              </p>
            )}
            <p className="text-black font-body">
              <b className="font-heading">Fasting:</b> {test.Fasting ?? "—"}
            </p>
            <p className="text-black font-body">
              <b className="font-heading">Reporting:</b>{" "}
              {test.Reporting ?? "—"}
            </p>
            {test.Tat ? (
              <p className="text-black font-body">
                <b className="font-heading">TAT:</b> {test.Tat}
              </p>
            ) : null}
            {test.SampleType ? (
              <p className="text-black font-body">
                <b className="font-heading">Sample:</b> {test.SampleType}
              </p>
            ) : null}
          </div>

          {test.Description ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-2 text-black font-heading">
                Overview
              </h2>
              <p className="text-black leading-relaxed text-sm font-body">
                {test.Description}
              </p>
            </div>
          ) : null}

          <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center shadow-lg gap-4">
            <p className="font-bold text-black sm:ml-4 font-heading text-center sm:text-left">
              Home Collection Available
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto">
              <div className="text-center sm:text-right">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-green-600 font-heading">
                    ₹{test.DiscountedPrice}
                  </span>
                  <span className="text-slate-400 line-through text-sm font-semibold font-heading">
                    ₹{test.Price}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLeadForm(true)}
                className="bg-background-primary hover:bg-red-700 text-white w-full sm:w-auto px-10 py-3 rounded-xl font-bold transition-all shadow-md font-heading"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <LeadForm
        open={showLeadForm}
        onOpenChange={setShowLeadForm}
        title="Book"
        testName={test.TestName}
        testDescription={test.Description}
        testPrice={test.DiscountedPrice}
        testOriginalPrice={test.Price}
        additionalSourceData={leadMeta}
      />
    </>
  );
}
