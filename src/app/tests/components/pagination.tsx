import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, onChange }: PaginationProps) {
  const pagesPerGroup = 5;

  let start = Math.max(0, current - 3);
  let end = start + pagesPerGroup;

  if (end > total) {
    end = total;
    start = Math.max(0, end - pagesPerGroup);
  }

  const showArrows = total > 5;

  return (
    <div className="flex justify-center mt-8 gap-2 text-black font-heading items-center">

      {showArrows && (
        <>
          {/* Go to Page 1 */}
          <button
            onClick={() => onChange(1)}
            disabled={current === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <ChevronLeft className="w-4 h-4 -ml-2" />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => onChange(current - 1)}
            disabled={current === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Page Numbers */}
      {Array.from({ length: total })
        .slice(start, end)
        .map((_, i) => {
          const pageNumber = start + i + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => onChange(pageNumber)}
              className={`w-8 h-8 rounded-full text-sm font-heading ${current === pageNumber
                ? "bg-background-primary text-white"
                : "bg-white border border-gray-200"
                }`}
            >
              {pageNumber}
            </button>
          );
        })}

      {showArrows && (
        <button
          onClick={() => onChange(current + 1)}
          disabled={current === total}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-50"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}