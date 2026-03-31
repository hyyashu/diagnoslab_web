"use client";

import { useMemo, useState } from "react";
import LeadForm from "../../components/leadForm";

interface TestCardProps {
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
  test_price: number;
  test_original_price: number;
  test_category: string;
  test_fasting: string;
  test_reporting: string;
}


export default function TestCard({
  title,
  description,
  price,
  originalPrice,
  category,
  fasting,
  reporting,
}: TestCardProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);
  const leadMeta = useMemo<leadMetaProps>(() => ({
    test_name: title,
    test_price: price,
    test_original_price: originalPrice,
    test_category: category,
    test_fasting: fasting,
    test_reporting: reporting,
  }), [title, price, originalPrice, category, fasting, reporting]);
  return (
    <>
    <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[220px]">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-black leading-tight w-2/3 font-heading">{title}</h3>
          <span className="text-[10px] px-3 py-1 rounded-full bg-background-primary text-center text-white font-medium uppercase tracking-wider font-heading">
            {category}
          </span>
        </div>
        <p className="text-sm text-black leading-relaxed mb-4 font-body">
          {description}
        </p>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-sm text-black space-y-1 pb-1">
          <p><span className="font-bold font-body">Fasting:</span> {fasting}</p>
          <p><span className="font-bold font-body">Reporting:</span> {reporting}</p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xl font-bold text-green-600 font-heading">₹{price}</p>
            <p className="text-sm line-through text-slate-400 font-medium font-heading">₹{originalPrice}</p>
          </div>
          <button onClick={() => setShowLeadForm(true)} className="bg-background-primary text-white px-10 py-2.5 rounded-xl text-lg font-bold shadow-md hover:bg-red-700 transition-colors font-heading">
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