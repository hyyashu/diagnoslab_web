interface PaginationProps {
    current: number;
    total: number;
    onChange: (page: number) => void;
  }
  
  export function Pagination({ current, total, onChange }: PaginationProps) {
    return (
      <div className="flex justify-center mt-8 gap-2 text-black font-heading">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i + 1)}
            className={`w-8 h-8 rounded-full text-sm font-heading ${
              current === i + 1
                ? "bg-background-primary text-white"
                : "bg-white border border-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  }