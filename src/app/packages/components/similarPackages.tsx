"use client";

import PackageCard from "./packageCard";
import rawData from "@/data/packages.json";

type FormattedPackage = {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  parameters: number;
  categories: string[];
  fasting: string;
  reporting: string;
  slug: string;
};

function formatPackage(p: any): FormattedPackage {
  return {
    id: p.Id,
    title: p.PackageName,
    description: p.Description,
    price: p.DiscountedPrice,
    originalPrice: Number(p.Price) || 0,
    parameters: p.ParametersCovered || 0,
    categories: [],
    fasting: p.Fasting?.trim() || "Not Required",
    reporting: p.Reporting?.trim() || "Same Day",
    slug: p.Slug?.toLowerCase() || "",
  };
}


function getSlugWords(slug: string) {
  return slug.split("-").map((w) => w.trim());
}

export default function SimilarPackages({
  currentSlug,
}: {
  currentSlug: string;
}) {
  
  const allPackages: FormattedPackage[] =
    rawData.packages.map(formatPackage);

  // find current
  const current = allPackages.find(
    (p) => p.slug === currentSlug
  );

  if (!current) return null;

  const currentWords = getSlugWords(current.slug);


  const similar = allPackages
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const words = getSlugWords(p.slug);

      const matchCount = words.filter((w) =>
        currentWords.includes(w)
      ).length;

      return { p, matchCount };
    })
    .filter((x) => x.matchCount > 0) 
    .sort((a, b) => b.matchCount - a.matchCount) 
    .slice(0, 3)
    .map((x) => x.p);

  if (similar.length === 0) return null;

  return (
    <div className="mt-16 max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 font-heading">
        Similar Packages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similar.map((pkg) => (
          <PackageCard key={pkg.id} 
          title={pkg.title} 
          description={pkg.description} 
          price={pkg.price} 
          originalPrice={pkg.originalPrice} 
          parameters={pkg.parameters} 
          categories={pkg.categories.join(", ")} 
          fasting={pkg.fasting} 
          reporting={pkg.reporting} 
          slug={pkg.slug} />
        ))}
      </div>
    </div>
  );
}