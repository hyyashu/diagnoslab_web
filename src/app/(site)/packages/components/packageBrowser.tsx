"use client";

import { useMemo, useState } from "react";
import { FeaturedPackageCard, PackageGridCard, type ListingPackage } from "@/components/cards/packageListingCards";
import { CatalogSearch, CategoryChips, Pager } from "@/components/catalog/catalogControls";
import SectionHead from "@/components/ui/sectionHead";
import { shell } from "@/components/ui/shell";
import { packageChips } from "../content";

const PER_PAGE = 6;

/* DL.pen Health Packages "Choose your health package". The two featured
   packages lead the unfiltered view; every package is also in the grid's
   HTML so the static page links to all of them. */
export default function PackageBrowser({
  packages,
  featured,
}: {
  packages: ListingPackage[];
  featured: [ListingPackage, ListingPackage];
}) {
  const [chip, setChip] = useState("All packages");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const q = query.trim().toLowerCase();
  const showFeatured = !q && chip === "All packages";

  const filtered = useMemo(() => {
    if (q) {
      return packages.filter((p) =>
        [p.title, p.categories, p.categoryLabel, p.summary ?? "", p.description].some((s) => s.toLowerCase().includes(q)),
      );
    }
    const slugs = packageChips.find(([label]) => label === chip)?.[1];
    if (slugs) return slugs.map((s) => packages.find((p) => p.slug === s)).filter((p) => p !== undefined);
    return packages.filter((p) => !featured.some((f) => f.slug === p.slug));
  }, [packages, featured, chip, q]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = useMemo(
    () => new Set(filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((p) => p.slug)),
    [filtered, page],
  );
  /* Grid order follows the filter's order (chips list their best match first). */
  const order = new Map(filtered.map((p, i) => [p.slug, i]));
  const gridItems = [...packages].sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));

  const goTo = (p: number) => {
    setPage(p);
    document.getElementById("packages-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="packages-section" aria-labelledby="choose-package-heading" className="bg-white py-10 md:py-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-8`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHead
            id="choose-package-heading"
            eyebrow="HEALTH PACKAGES"
            title="Choose your health package"
            subtitle="Save more by booking tests together — reports in 6–12 hours."
          />
          <CatalogSearch
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search packages e.g. Full body, PCOD"
            label="Search health packages"
          />
        </div>

        <CategoryChips
          label="Package categories"
          options={packageChips.map(([label]) => label)}
          active={q ? "All packages" : chip}
          onChange={(c) => {
            setChip(c);
            setQuery("");
            setPage(1);
          }}
        />

        {showFeatured && page === 1 && (
          <div className="grid gap-4 md:gap-5 lg:grid-cols-2">
            <FeaturedPackageCard pkg={featured[0]} />
            <FeaturedPackageCard pkg={featured[1]} tone="dark" bestValue />
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-dl-muted">No packages found.</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {gridItems.map((p) => (
              <li key={p.slug} className={visible.has(p.slug) ? "" : "hidden"}>
                <PackageGridCard pkg={p} />
              </li>
            ))}
          </ul>
        )}

        <Pager current={page} total={totalPages} onChange={goTo} />
      </div>
    </section>
  );
}
