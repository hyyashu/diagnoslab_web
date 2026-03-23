"use client";

interface HealthPackageCardProps {
  name: string;
  parameters: number;
  description: string;
  currentPrice: string;
  originalPrice: string;
}

export default function HealthPackageCard({
  name,
  parameters,
  description,
  currentPrice,
  originalPrice,
}: HealthPackageCardProps) {
  return (
    <div className="h-full bg-white rounded-[2rem] p-6 shadow-xl flex flex-col justify-between min-h-[240px]">
      <div>
        <h3 className="font-heading text-xl font-bold text-black">
          {name}
        </h3>

        <p className="font-body text-black text-sm font-medium mb-5">
          {parameters} parameters
        </p>

        <p className="font-body text-black text-xs md:text-sm mb-8">
          {description}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="font-heading text-xl  font-bold text-green-600">
            ₹{currentPrice}
          </span>
          <span className="font-heading text-gray-400 line-through text-sm md:text-base font-medium">
            ₹{originalPrice}
          </span>
        </div>

        <div className="flex gap-3">
          <button className="font-heading flex-1 py-2.5 bg-background-primary hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-md">
            Book
          </button>

          <button className="font-heading flex-1 py-2.5 border border-background-primary text-background-primary hover:bg-red-50 text-sm font-bold rounded-xl transition-all">
            Details
          </button>
        </div>
      </div>
    </div>
  );
}