"use client";

import SearchBar from "../../tests/components/searchBar";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function SearchHero({ search, onSearchChange }: Props) {
  return (
    <div className=" relative overflow-hidden bg-background-primary">
      <div className="relative max-w-5xl mx-auto text-center py-16 px-4">
        <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">
          Search Packages
        </h1>

        <p className="text-white mt-2 font-medium text-lg">
          Discover Packages Tailored for You
        </p>

        {/* SearchBar */}
        <div className="mt-6">
          <SearchBar value={search} onChange={onSearchChange} />
        </div>
      </div>
    </div>
  );
}