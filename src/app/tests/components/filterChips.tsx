"use client";

interface FilterChipsProps {
  filters: string[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterChips({
  filters,
  active,
  onChange,
}: FilterChipsProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-8">
      <div 
        className="flex flex-wrap gap-3 md:flex-nowrap md:overflow-x-visible overflow-x-auto pb-2 custom-scrollbar-hide"
        style={{
          msOverflowStyle: 'none', 
          scrollbarWidth: 'none',   
        }}
      >
        
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 font-heading
              whitespace-nowrap flex-shrink-0 shadow-sm active:scale-95
              ${
                active === item
                  ? "bg-background-primary border-background-primary text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-400 font-heading"
              }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </div>
  );
}