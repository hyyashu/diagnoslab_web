import SectionHead from "@/components/ui/sectionHead";
import PackageShelf, { type ShelfCategory } from "@/components/home/packageShelf";
import { packageCategories, toCheckupCard } from "@/components/home/content";
import { getPackageBySlug } from "@/lib/catalog";
import { shell } from "@/components/ui/shell";

/* DL.pen "Checkup Packages". Resolves every chip's packages here so the
   browser gets only the handful it can show. */
export default function CheckupPackages() {
  const categories: ShelfCategory[] = packageCategories.map((c) => ({
    label: c.label,
    icon: c.icon,
    packages: c.slugs.map(getPackageBySlug).filter((p) => p !== undefined).map(toCheckupCard),
  }));

  return (
    <section aria-labelledby="packages-heading" className="bg-white py-9 md:pt-24 md:pb-[88px]">
      <div className="flex flex-col gap-5 md:gap-9">
        <div className={shell}>
          <SectionHead
            id="packages-heading"
            title="Doctor-curated health checkup packages"
            mobileTitle="Health checkup packages"
            subtitle="Designed by our pathologists for every age and concern, with home collection available."
            mobileSubtitle="Designed by our pathologists for every age"
            link={{ href: "/packages/", label: "See all packages", mobileLabel: "See all" }}
          />
        </div>
        <PackageShelf categories={categories} />
      </div>
    </section>
  );
}
