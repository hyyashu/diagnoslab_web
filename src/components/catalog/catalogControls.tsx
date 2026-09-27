"use client";

import { ChevronLeft, ChevronRight, Search } from "lucide-react";

/* DL.pen catalogue controls, shared by the Lab Tests and Health Packages
   pages: the search field, the category chips and the pager. */

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

export function CategoryChips({
  options,
  active,
  onChange,
  label,
}: {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
      {options.map((o) => {
        const selected = o === active;
        return (
          <button
            key={o}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(o)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors md:text-[13.5px] ${
              selected ? "border-dl-ink bg-dl-ink text-white" : "border-dl-line bg-white text-dl-ink-2 hover:border-dl-ink/40"
            }`}
          >
            {o}
          </button>
        );
      })}
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
