"use client";

import rawData from "@/data/packages.json";
import { useMemo, useState } from "react";
import Search from "./search";
import PackageCard from "@/components/cards/packageCard";
import { Pagination } from "../../tests/components/pagination";

const ITEMS_PER_PAGE = 9;

const packages = rawData.packages.map((pkg) => ({
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
  const showDetailsButton = true;

  // FILTER LOGIC 
  const filteredPackages = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return packages;
  
    const ranked = packages
      .map((pkg) => {
        const title = pkg.title.toLowerCase()
        const categories = pkg.categories.toLowerCase();
        const description = pkg.description.toLowerCase();
  
        const titleMatch = title.includes(query);
        const categoryMatch = categories.includes(query);
        const descriptionMatch = description.includes(query);
        const matches = titleMatch || categoryMatch || descriptionMatch;
  
        // 0 = title match (highest), 1 = category only, 2 = description only
        let sortRank = 99;
        if (titleMatch) sortRank = 0;
        else if (categoryMatch) sortRank = 1;
        else if (descriptionMatch) sortRank = 2;
  
        return { pkg, matches, sortRank };
      })
      .filter((x) => x.matches)
      .sort((a, b) => {
        if (a.sortRank !== b.sortRank) return a.sortRank - b.sortRank;
        return a.pkg.title.localeCompare(b.pkg.title);
      });
  
    return ranked.map((x) => x.pkg);
  }, [search]);

  //  PAGINATION
  const totalPages = Math.ceil(filteredPackages.length / ITEMS_PER_PAGE);

  const paginatedPackages = filteredPackages.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const visibleIds = useMemo(
    () => new Set(paginatedPackages.map((p) => p.id)),
    [paginatedPackages]
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

            {/* All packages render into the static HTML; paging only hides them. */}
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={visibleIds.has(pkg.id) ? "flex" : "hidden"}
              >
                <PackageCard
                title={pkg.title}
                description={pkg.description}
                price={pkg.price}
                originalPrice={pkg.originalPrice}
                parameters={pkg.parameters}
                categories={pkg.categories}
                fasting={pkg.fasting}
                reporting={pkg.reporting}
                slug={pkg.slug}
                showDetailsButton={showDetailsButton}
              />
              </div>
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