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
      
      <div className="flex flex-nowrap gap-2 overflow-x-auto w-full pb-2 scroll-smooth snap-x snap-mandatory pr-4 no-scrollbar">
        
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 font-heading
              whitespace-nowrap flex-shrink-0 shadow-sm active:scale-95 snap-start
              ${
                active === item
                  ? "bg-background-primary border-background-primary text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-400"
              }
            `}
          >
            {item}
          </button>
        ))}

      </div>
    </div>
  );
}