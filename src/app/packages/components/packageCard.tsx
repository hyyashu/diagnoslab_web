"use client";

interface Props {
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  parameters?: number;
  categories?: string;
  fasting?: string;
  reporting?: string;
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
}: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.1)] border border-gray-50 relative flex flex-col w-full max-w-[400px]">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-black leading-tight font-heading">{title}</h3>
        <span className="bg-background-primary text-white text-xs  px-3 py-1 rounded-full font-medium shrink-0 ml-2">
          {parameters} parameters
        </span>
      </div>

      {/* Description */}
      <p className="text-black text-sm  mb-6 font-body">
        {description}
      </p>

      {/* Info List */}
      <div className="space-y-2 text-sm  font-body">
        <p className="text-black">
          <span className="font-bold ">Categories :</span> <span className="text-gray-700 ">{categories}</span>
        </p>
        <p className="text-black">
          <span className="font-bold ">Fasting:</span> <span className="text-gray-700 ">{fasting}</span>
        </p>
        <p className="text-black">
          <span className="font-bold ">Reporting:</span> <span className="text-gray-700 f">{reporting}</span>
        </p>
      </div>

      {/* Pricing */}
      <div className="flex justify-end items-center gap-2 mb-6 mt-auto">
        <span className="text-green-600 font-bold text-xl font-heading">
          ₹{price.toLocaleString()}
        </span>
        <span className="text-slate-400 line-through text-sm md:text-base font-heading">
          ₹{originalPrice.toLocaleString()}
        </span>
      </div>

      {/* Compact Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="w-full py-2 border-[1.5px] border-background-primary text-background-primary rounded-xl text-base font-bold hover:bg-red-50 transition-colors font-heading">
          Details
        </button>
        <button className="w-full py-2 bg-background-primary text-white rounded-xl text-base font-bold hover:bg-red-600 shadow-sm shadow-red-100 transition-all font-heading text-sm md:text-base">
          Book
        </button>
      </div>
    </div>
  );
}