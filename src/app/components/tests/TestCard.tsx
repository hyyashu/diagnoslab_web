"use client";

import React from "react";

interface TestCardProps {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
}

export default function TestCard({
  title,
  description,
  price,
  originalPrice,
}: TestCardProps) {
  return (
    <div className="h-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm transition-all duration-300 flex flex-col justify-between">

      <div>
        <h3 className="font-heading text-base md:text-xl font-bold text-black mb-4">
          {title}
        </h3>

        <p className="font-body text-black text-sm  leading-relaxed ">
          {description}
        </p>
      </div>

      <div className="space-y-1 md:space-y-5">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-bold text-green-600 font-heading">
            ₹{price}
          </span>

          <span className="font-heading text-gray-400 line-through text-sm md:text-base">
            ₹{originalPrice}
          </span>
        </div>

        <button className="font-heading w-full mt-2 md:mt-0 py-4 bg-background-primary hover:bg-red-600 text-white font-bold rounded-2xl transition-colors text-sm md:text-lg">
          Book
        </button>
      </div>

    </div>
  );
}