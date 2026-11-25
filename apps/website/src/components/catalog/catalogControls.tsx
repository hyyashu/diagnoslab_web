"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Icon from "@/components/ui/icon";

/* DL.pen catalogue controls, shared by the Lab Tests and Health Packages
   pages: the search field, the category chips and the pager. The chips are
   also the home page's package filter. */

export function CatalogSearch({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full items-center gap-2.5 rounded-full border border-dl-line bg-white py-1.5 pl-4 pr-1.5 md:w-[420px] md:shrink-0"
    >
      <Search className="size-[18px] shrink-0 text-dl-muted" aria-hidden />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        className="min-w-0 flex-1 bg-transparent text-sm text-dl-ink outline-none placeholder:text-dl-muted [&::-webkit-search-cancel-button]:hidden"
      />
      <button type="submit" className="shrink-0 rounded-full bg-dl-red px-4 py-2 text-sm font-bold text-white hover:bg-dl-red-dark">
        Search
      </button>
    </form>
  );
}

export type ChipOption = { label: string; icon: string };

/* DL.pen "Category Chip": an icon in a tinted circle beside the label. */
export function CategoryChip({
  option,
  selected,
  onClick,
}: {
  option: ChipOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-full border py-[7px] pl-2 pr-[13px] text-[13px] font-semibold transition-colors md:py-[9px] md:pl-2.5 md:pr-4 md:text-sm ${
        selected ? "border-dl-red bg-dl-red text-white" : "border-dl-line bg-white text-dl-ink hover:border-dl-ink/40"
      }`}
    >
      <span
        className={`flex size-[22px] items-center justify-center rounded-full md:size-[26px] ${
          selected ? "bg-white/15 text-white" : "bg-dl-red-soft text-dl-red"
        }`}
      >
        <Icon name={option.icon} className="size-3.5" />
      </span>
      {option.label}
    </button>
  );
}

/* One scrolling row of chips; on desktop a round button scrolls it on. */
export function CategoryChips({
  options,
  active,
  onChange,
  label,
}: {
  options: ChipOption[];
  active: string;
  onChange: (value: string) => void;
  label: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex items-center gap-4">
      <div
        ref={rowRef}
        role="tablist"
        aria-label={label}
        className="no-scrollbar -mx-4 flex flex-1 gap-2 overflow-x-auto px-4 md:mx-0 md:gap-2.5 md:px-0"
      >
        {options.map((o) => (
          <CategoryChip key={o.label} option={o} selected={o.label === active} onClick={() => onChange(o.label)} />
        ))}
      </div>
      <button
        type="button"
        aria-label="More categories"
        onClick={() => rowRef.current?.scrollBy({ left: 240, behavior: "smooth" })}
        className="hidden size-[42px] shrink-0 items-center justify-center rounded-full border border-dl-line text-dl-ink hover:border-dl-ink md:flex"
      >
        <ChevronRight className="size-[18px]" aria-hidden />
      </button>
    </div>
  );
}

export function Pager({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  if (total <= 1) return null;

  /* Up to five numbered pages around the current one. */
  const size = Math.min(5, total);
  const start = Math.min(Math.max(1, current - 2), total - size + 1);
  const pages = Array.from({ length: size }, (_, i) => start + i);
  const btn = "flex size-10 items-center justify-center rounded-full border text-sm font-bold transition-colors";

  return (
    <nav aria-label="Pages" className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        aria-label="Previous page"
        className={`${btn} border-dl-line bg-white text-dl-ink disabled:opacity-40`}
      >
        <ChevronLeft className="size-4" aria-hidden />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === current ? "page" : undefined}
          className={`${btn} ${p === current ? "border-dl-red bg-dl-red text-white" : "border-dl-line bg-white text-dl-ink hover:border-dl-ink"}`}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        aria-label="Next page"
        className={`${btn} border-dl-line bg-white text-dl-ink disabled:opacity-40`}
      >
        <ChevronRight className="size-4" aria-hidden />
      </button>
    </nav>
  );
}
