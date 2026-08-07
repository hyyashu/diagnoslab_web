"use client";

import Image from "next/image";
import LeadForm from "../../components/leadForm";
import { useMemo, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";

interface leadMetaProps {
  radiology_name: string;
  radiology_description: string;
  radiology_facilities: string[];
  radiology_reporting_time: string;
}

interface RadiologyCardProps {
  title: string;
  description: string;
  facilities: string[];
  reportingTime: string;
  image: string;
  femaleRadiologist?: boolean;
}

export default function RadiologyCard({
  title,
  description,
  facilities,
  reportingTime,
  image,
  femaleRadiologist = false,
}: RadiologyCardProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  const leadMeta = useMemo<leadMetaProps>(
    () => ({
      radiology_name: title,
      radiology_description: description,
      radiology_facilities: facilities,
      radiology_reporting_time: reportingTime,
    }),
    [title, description, facilities, reportingTime]
  );

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
        style={{ borderTop: "3px solid #E73834" }}>

        {/* Image */}
        <div className="relative w-full h-44 md:h-52 shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Reporting badge over image */}
          <span className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full font-body">
            <Clock size={11} className="text-[#E73834]" />
            {reportingTime}
          </span>

          {femaleRadiologist && (
            <span className="absolute top-3 right-3 bg-[#E73834] text-white text-[10px] font-bold px-2.5 py-1 rounded-full font-body">
              Female Radiologist
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1">

          {/* Title */}
          <h2 className="font-heading font-black text-lg md:text-xl text-black tracking-tight mb-1">
            {title}
          </h2>

          {/* Description */}
          <p className="font-body text-gray-500 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>

          {/* Scan types */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {facilities.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-red-50 text-[#E73834] text-[11px] font-semibold px-2.5 py-1 rounded-lg font-body"
              >
                <CheckCircle2 size={10} className="shrink-0" />
                {item}
              </span>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Book button */}
          <button
            onClick={() => setShowLeadForm(true)}
            className="w-full bg-[#E73834] hover:bg-red-700 active:scale-95 text-white font-bold font-heading text-sm py-3 rounded-xl transition-all shadow-sm mt-1"
          >
            Book {title}
          </button>
        </div>
      </div>

      <LeadForm
        open={showLeadForm}
        onOpenChange={setShowLeadForm}
        title="Book"
        testName={title}
        testDescription={description}
        additionalSourceData={leadMeta}
      />
    </>
  );
}
