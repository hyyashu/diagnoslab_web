"use client";

import React from "react";

interface FeatureCardProps {
  icon:React.ReactNode;
  title: string;
  description?: string;
}

export default function FeatureCard({
  icon,
  title,
  description = "",
}: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-4 md:p-6  bg-white rounded-2xl md:rounded-3xl shadow-lg text-center h-full transition-transform hover:scale-105">
      <div className="mb-3 md:mb-6 text-black">{icon}</div>

      <h3 className="font-heading text-base md:text-xl font-medium text-black  ">
        {title}
      </h3>

      <p className="font-body text-sm font-medium text-gray-700 mt-2">
        {description}
      </p>
    </div>
  );
}