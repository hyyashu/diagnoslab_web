"use client";

import { useMemo, useState } from "react";
import Search from "./search";
import PackageCard from "./packageCard";
import { Pagination } from "../../tests/components/pagination";

const packages = [
    {
      id: 1,
      title: "ND Plus",
      parameters: 75,
      description: "Comprehensive full body checkup with blood, liver, and kidney tests.",
      categories: "A, B, C",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 2500,
      originalPrice: 10000,
    },
    {
      id: 2,
      title: "ND Diabetes Care",
      parameters: 45,
      description: "HbA1c, fasting glucose, and insulin tests for diabetes monitoring.",
      categories: "Blood, Sugar",
      fasting: "Required (12h)",
      reporting: "Next Day",
      price: 1499,
      originalPrice: 3999,
    },
    {
      id: 3,
      title: "ND Heart Health",
      parameters: 60,
      description: "Cardiac screening with lipid profile and heart risk markers.",
      categories: "Heart, Lipid",
      fasting: "Required (10h)",
      reporting: "Same Day",
      price: 1999,
      originalPrice: 4999,
    },
    {
      id: 4,
      title: "ND Liver Function",
      parameters: 35,
      description: "Liver panel including SGPT, SGOT, bilirubin and proteins.",
      categories: "Liver",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 1299,
      originalPrice: 3499,
    },
    {
      id: 5,
      title: "ND Kidney Care",
      parameters: 30,
      description: "Creatinine, urea and electrolyte tests for kidney function.",
      categories: "Kidney",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 1199,
      originalPrice: 3299,
    },
    {
      id: 6,
      title: "ND Thyroid Profile",
      parameters: 25,
      description: "T3, T4 and TSH tests for thyroid balance.",
      categories: "Hormonal",
      fasting: "Not Required",
      reporting: "Next Day",
      price: 899,
      originalPrice: 2499,
    },
    {
      id: 7,
      title: "ND Full Body Advanced",
      parameters: 90,
      description: "Advanced full body check with vitamins and hormones.",
      categories: "Full Body",
      fasting: "Required (10h)",
      reporting: "Same Day",
      price: 2999,
      originalPrice: 8999,
    },
    {
      id: 8,
      title: "ND Vitamin Panel",
      parameters: 20,
      description: "Vitamin D, B12 and nutrient deficiency analysis.",
      categories: "Vitamins",
      fasting: "Not Required",
      reporting: "Next Day",
      price: 1099,
      originalPrice: 2999,
    },
    {
      id: 9,
      title: "ND Women Wellness",
      parameters: 50,
      description: "Hormonal and iron profile tailored for women.",
      categories: "Women Health",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 1799,
      originalPrice: 4599,
    },
    {
      id: 10,
      title: "ND Senior Citizen",
      parameters: 65,
      description: "Health package designed for elderly care.",
      categories: "Senior",
      fasting: "Required (8h)",
      reporting: "Same Day",
      price: 1599,
      originalPrice: 4299,
    },
    {
      id: 11,
      title: "ND Immunity Boost",
      parameters: 40,
      description: "Tests for immunity levels and infection markers.",
      categories: "Immunity",
      fasting: "Not Required",
      reporting: "Next Day",
      price: 1399,
      originalPrice: 3699,
    },
    {
      id: 12,
      title: "ND Fitness Profile",
      parameters: 55,
      description: "Protein, metabolism and fitness tracking tests.",
      categories: "Fitness",
      fasting: "Required (6h)",
      reporting: "Same Day",
      price: 1299,
      originalPrice: 3499,
    },
    {
      id: 13,
      title: "ND Allergy Panel",
      parameters: 30,
      description: "Detect common allergies and immune responses.",
      categories: "Allergy",
      fasting: "Not Required",
      reporting: "Next Day",
      price: 1599,
      originalPrice: 3999,
    },
    {
      id: 14,
      title: "ND Bone Health",
      parameters: 28,
      description: "Calcium, Vitamin D and bone density markers.",
      categories: "Bone",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 1199,
      originalPrice: 2999,
    },
    {
      id: 15,
      title: "ND Pregnancy Care",
      parameters: 48,
      description: "Complete prenatal health screening.",
      categories: "Pregnancy",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 1999,
      originalPrice: 4999,
    },
    {
      id: 16,
      title: "ND Cancer Screening",
      parameters: 70,
      description: "Early detection markers for major cancers.",
      categories: "Oncology",
      fasting: "Required (10h)",
      reporting: "Next Day",
      price: 3499,
      originalPrice: 9999,
    },
    {
      id: 17,
      title: "ND Respiratory Panel",
      parameters: 32,
      description: "Tests for lung function and respiratory health.",
      categories: "Respiratory",
      fasting: "Not Required",
      reporting: "Same Day",
      price: 1299,
      originalPrice: 3299,
    },
    {
      id: 18,
      title: "ND Gut Health",
      parameters: 36,
      description: "Digestive system and gut microbiome analysis.",
      categories: "Digestive",
      fasting: "Required (8h)",
      reporting: "Next Day",
      price: 1499,
      originalPrice: 3999,
    },
  ];

export default function PackagesScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 9; 
  // Filter based on search
  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) =>
      pkg.title.toLowerCase().includes(search.toLowerCase())
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
    <div className="bg-white min-h-screen">
      
      {/* Search Component  */}
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
            {paginatedPackages.map((pkg, index) => (
              <PackageCard key={`${pkg.id}-${index}`} {...pkg} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-xl text-gray-400 italic">No packages found</p>
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