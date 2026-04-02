"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto mb-4 md:mb-10 px-2 md:px-0">
      <div className="flex items-center bg-white rounded-full p-1.5 md:p-2 pl-5 md:pl-8 shadow-[0px_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 transition-shadow">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search "
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          suppressHydrationWarning
          className="flex-1 min-w-0 outline-none bg-transparent text-black placeholder-gray-400 text-sm md:text-lg"
        />

        <button
          className="bg-background-primary hover:bg-red-600 active:scale-95 transition-all w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center shadow-md ml-2 md:ml-4"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="white"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}