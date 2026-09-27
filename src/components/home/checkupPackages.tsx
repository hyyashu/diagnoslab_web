import SectionHead from "@/components/ui/sectionHead";
import PackageShelf, { type ShelfCategory } from "@/components/home/packageShelf";
import type { CheckupPackage } from "@/components/cards/checkupPackageCard";
import { featuredPackages, packageCategories } from "@/components/home/content";
import { getPackageBySlug } from "@/lib/catalog";
import { shell } from "@/components/ui/shell";

/* DL.pen "Checkup Packages". Resolves every chip's packages here so the
   browser gets only the handful it can show. */
export default function CheckupPackages() {
  const toCard = (slug: string): CheckupPackage | null => {
    const p = getPackageBySlug(slug);
    if (!p) return null;
    return {
      slug: p.slug,
      title: p.title,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice,
      parameters: p.parameters,
      categories: p.categories,
      fasting: p.fasting,
      reporting: p.reporting,
      ...featuredPackages[p.slug],
    };
  };

  const categories: ShelfCategory[] = packageCategories.map((c) => ({
    label: c.label,
    icon: c.icon,
    packages: c.slugs.map(toCard).filter((p): p is CheckupPackage => p !== null),
  }));

  return (
    <section aria-labelledby="packages-heading" className="bg-white py-9 md:pt-24 md:pb-[88px]">
      <div className="flex flex-col gap-5 md:gap-9">
        <div className={shell}>
          <SectionHead
            id="packages-heading"
            eyebrow="HEALTH CHECKUPS"
            title="Doctor-curated health checkup packages"
            mobileTitle="Health checkup packages"
            subtitle="Designed by our pathologists for every age and concern — with free home collection."
            mobileSubtitle="Designed by our pathologists for every age"
            link={{ href: "/packages/", label: "See all packages", mobileLabel: "See all" }}
          />
        </div>
        <PackageShelf categories={categories} />
      </div>
    </section>
  );
}
