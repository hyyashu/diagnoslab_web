"use client";

import { Star, User } from "lucide-react";

interface ReviewCardProps {
  author: string;
  stats: string;
  rating: number;
  time: string;
  text: string;
}

export default function ReviewCard({
  author,
  stats,
  rating,
  time,
  text,
}: ReviewCardProps) {

  const MAX_LENGTH = 140;

  const isLong = text.length > MAX_LENGTH;
  const displayText = isLong ? text.slice(0, MAX_LENGTH) : text;

  return (
    <div className="h-full bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col min-h-[260px]">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        
        <div className="flex gap-4 items-center">
          <div className="w-12 md:w-14 h-12 md:h-14 bg-background-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
            <User size={28} />
          </div>

          <div className="text-left">
            <h4 className="font-heading font-bold text-base leading-tight text-black">
              {author}
            </h4>
            {/*<p className="text-[12px] text-slate-400 mt-0.5">
              {stats}
            </p>*/}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex text-orange-400">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} size={15} fill="currentColor" />
            ))}
          </div>

          <p className="text-[10px] text-gray-700 mt-1 uppercase font-medium tracking-wide">
            {time}
          </p>
        </div>

      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-[14px] leading-relaxed min-h-[72px]">
        {displayText}
        {isLong && (
          <span className=" font-medium cursor-pointer ml-1 hover:underline">
            ...
          </span>
        )}
      </p>

    </div>
  );
}