"use client";

import Image from "next/image";

interface RadiologyCardProps {
  title: string;
  description: string;
  facilities: string[];
  reportingTime: string;
  image: string;
  reverse?: boolean;
  femaleRadiologist?: boolean;
}

export default function RadiologyCard({
  title,
  description,
  facilities,
  reportingTime,
  image,
  reverse = false,
  femaleRadiologist = true,
}: RadiologyCardProps) {
  return (
    <div
      className={`flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } gap-6 bg-white rounded-[2rem] shadow-sm p-6 border border-gray-100 items-stretch mb-6`}
    >
      {/* Image Section - Always top on mobile */}
      <div className="w-full md:w-[30%] shrink-0">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="rounded-2xl object-cover w-full h-[200px] md:h-full"
        />
      </div>

      {/* Content Section */}
      <div className={`w-full md:w-[70%] flex flex-col justify-between py-1 ${reverse ? "md:text-right" : "md:text-left"} text-left`}>
        <div>
          <h2 className="text-xl font-heading font-bold uppercase tracking-tight text-black">
            {title}
          </h2>

          <p className="text-sm font-body font-bold text-black mt-2 leading-tight">
            {description}
          </p>

          <div className="mt-6">
            <p className="text-sm font-body font-bold text-black mb-1">Facilities:</p>
            <div className={`flex flex-wrap gap-x-2 gap-y-1 text-[14px] text-black justify-start ${reverse ? "md:justify-end" : "md:justify-start"}`}>
              {facilities.map((item, index) => (
                <span key={index} className="flex items-center">
                  {item}
                  {index < facilities.length - 1 && (
                    <span className="ml-2 text-black">|</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {femaleRadiologist && (
            <p className="text-sm font-body font-bold text-black mt-8">
              Female Radiologist for female cases.
            </p>
          )}
        </div>

        {/* Action Group */}
        <div className={`flex flex-col items-start ${reverse ? "md:items-start" : "md:items-end"} mt-6 md:mt-4 space-y-2`}>
          <p className="text-sm font-body text-black">
            <span className="font-bold">Reporting:</span> {reportingTime}
          </p>
          
          <button className="w-full md:w-auto bg-background-primary hover:bg-red-600 text-white font-semibold px-12 py-3 rounded-2xl transition-colors text-lg shadow-md">
            Book {title}
          </button>
        </div>
      </div>
    </div>
  );
}