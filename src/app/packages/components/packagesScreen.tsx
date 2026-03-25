"use client";

import { useMemo, useState } from "react";
import Search from "./search";
import PackageCard from "./packageCard";
import { Pagination } from "../../tests/components/pagination";
import rawData from "@/data/packages.json";

export default function PackagesScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 9;

  const filteredPackages = useMemo(() => {
    const query = search.toLowerCase().trim();

    return rawData.packages.filter((pkg: any) =>
      (pkg.PackageName || "").toLowerCase().includes(query)
    );
  }, [search]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);

  // slice data for current page
  const paginatedPackages = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredPackages.slice(start, start + itemsPerPage);
  }, [page, filteredPackages]);

  return (
    <div id="packages-section" className="bg-white min-h-screen">
      
      {/* Search Component */}
      <Search
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-12">
        {paginatedPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            
            {paginatedPackages.map((pkg: any, index) => (
              <PackageCard
              key={`${pkg.Id || pkg.PackageName}-${index}`}
                title={pkg.PackageName || ""}
                description={pkg.Description || ""}
                price={Number(pkg.DiscountedPrice) || 0}
                originalPrice={Number(pkg.Price) || 0}
                parameters={pkg.ParametersCovered || 0}
                categories={pkg.Categories || ""}
                fasting={pkg.Fasting || ""}
                reporting={pkg.Reporting || ""}
                slug={pkg.Slug || ""}
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
              onChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
}