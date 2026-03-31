"use client";

import rawData from "@/data/packages.json";
import { useMemo, useState } from "react";

import Search from "./search";
import PackageCard from "./packageCard";
import { Pagination } from "../../tests/components/pagination";

const ITEMS_PER_PAGE = 9;

//  STEP 1: Transform data (same like tests.tsx)
const packages = rawData.packages.map((pkg: any) => ({
  id: pkg.Id,
  title: pkg.PackageName || "",
  description: pkg.Description || "",
  price: Number(pkg.DiscountedPrice) || 0,
  originalPrice: Number(pkg.Price),
  parameters: pkg.ParametersCovered || 0,
  categories: pkg.Categories || "",
  fasting: pkg.Fasting || "",
  reporting: pkg.Reporting || "",
  slug: pkg.Slug || "",
}));

export default function PackagesScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  //  STEP 2: FILTER LOGIC (same style as tests)
  const filteredPackages = useMemo(() => {
    const query = search.toLowerCase().trim();

    return packages.filter((pkg) => {
      return (
        pkg.title.toLowerCase().includes(query) ||
        pkg.categories.toLowerCase().includes(query)
      );
    });
  }, [search]);

  //  STEP 3: PAGINATION
  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);

  const paginatedPackages = filteredPackages.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div id="packages-section" className="bg-white min-h-screen">

      {/* Search */}
      <Search
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        {paginatedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            
            {paginatedPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                originalPrice={pkg.originalPrice}
                parameters={pkg.parameters}
                categories={pkg.categories}
                fasting={pkg.fasting}
                reporting={pkg.reporting}
                slug={pkg.slug}
              />
            ))}

          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400 italic">
              No packages found
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination
              current={page}
              total={totalPages}
              onChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}