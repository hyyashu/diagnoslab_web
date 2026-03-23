import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, className = "" }) => {
  return (
    <div 
      className={`
        bg-white p-4 rounded-xl 
        shadow-[0_4px_20px_rgba(0,0,0,0.08)] 
        border border-gray-100/50 
        w-[200px] md:w-[250px] text-center
        flex flex-col justify-center
        z-20
        ${className}
      `}
    >
      <h3 className="font-bold text-black font-heading text-sm md:text-base mb-1 leading-tight">
        {title}
      </h3>
      <p className="text-gray-500 font-body text-xs md:text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;