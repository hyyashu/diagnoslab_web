"use client";
import rawData from "@/data/tests.json";

import { useMemo, useState } from "react";

import FilterChips from "./filterChips";
import { Pagination } from "./pagination";
import SearchBar from "./searchBar"; 
import TestCard from "./testCard";

const filters = [
  "All",
  "Blood Health",
  "Diabetes",
  "General Health",
  "Heart Health",
  "Hormonal Health",
  "Kidney Health",
  "Liver Health",
];


const ITEMS_PER_PAGE = 6;
const tests = rawData.tests.map((t: any) => ({
  id: t.Id,
  title: t.TestName,
  description: t.Description,
  price: t.DiscountedPrice,
  originalPrice: t.Price,
  category: t.Categories?.[0] || "General Health",
  fasting: t.Fasting || "Not Required",
  reporting: t.Reporting || "Same Day",
}));

export default function SearchTests() {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // FILTER LOGIC
  const filteredTests = useMemo(() => {
    const query = search.toLowerCase().trim();

    return tests.filter((t) => {
      if (query.length > 0) {
        return (
          t.category.toLowerCase().includes(query) ||
          t.title.toLowerCase().includes(query)
        );
      }
      return active === "All" || t.category === active;
    });
  }, [search, active]);

  //  PAGINATION
  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);

  const paginatedTests = filteredTests.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  //  CHIP CLICK
  const handleFilterChange = (value: string) => {
    setActive(value);
    setSearch("");
    setPage(1);
  };

  //  SEARCH INPUT
  const handleSearchChange = (value: string) => {
    const query = value.toLowerCase();
    setSearch(value);

    const matchedFilter = filters.find((f) =>
      f.toLowerCase().includes(query)
    );

    if (matchedFilter) {
      setActive(matchedFilter);
    } else {
      setActive("All");
    }

    setPage(1);
  };

  return (
    <div id="tests-section" className=" bg-white px-4 md:px-6 py-8 md:py-10">
      
      {/* Heading Section */}
      <div className="text-center mb-8 md:mb-10">
        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-black mb-3 tracking-tight">
          Search tests
        </h1>
        <p className="font-body text-gray-500 font-medium text-sm md:text-lg">
          Search by test name or description to find more tests.
        </p>
      </div>

      {/*  SearchBar Component */}
      <SearchBar value={search} onChange={handleSearchChange} />

      {/* Filters */}
      <FilterChips
        filters={filters}
        active={active}
        onChange={handleFilterChange}
      />

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 md:mt-12 max-w-6xl mx-auto">
        {paginatedTests.length > 0 ? (
          paginatedTests.map((test) => (
            <TestCard key={test.id} {...test} />
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <p className="text-gray-400 italic font-heading">
              No tests found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 md:mt-16">
          <Pagination
            current={page}
            total={totalPages}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
}