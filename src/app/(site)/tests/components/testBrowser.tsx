"use client";

import { useMemo, useState } from "react";
import LabTestCard, { type LabTest } from "@/components/cards/labTestCard";
import { CatalogSearch, CategoryChips, Pager } from "@/components/catalog/catalogControls";
import SectionHead from "@/components/ui/sectionHead";
import { shell } from "@/components/ui/shell";

export type BrowserTest = LabTest & { categories: string[] };

/* Chip label -> catalogue category. */
const CHIPS: [string, string | null][] = [
  ["All tests", null],
  ["Blood Health", "Blood Health"],
  ["Diabetes", "Diabetes"],
  ["Thyroid & Hormones", "Hormonal Health"],
  ["Liver", "Liver Health"],
  ["Kidney", "Kidney Health"],
  ["Heart Health", "Heart Health"],
  ["Reproductive Health", "Reproductive Health"],
  ["Vitamins", "Nutrition / Immunity"],
];
/* The design words one category differently on the cards. */
const displayCategory = (category: string) => (category === "Hormonal Health" ? "Thyroid & Hormones" : category);

const PER_PAGE = 6;

/* DL.pen Lab Tests "Find your test". Every test is rendered so the static
   HTML links to all of them; search, chip and page only toggle visibility. */
export default function TestBrowser({ tests }: { tests: BrowserTest[] }) {
  const [chip, setChip] = useState("All tests");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) return tests.filter((t) => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    const category = CHIPS.find(([label]) => label === chip)?.[1];
    return category ? tests.filter((t) => t.categories.includes(category)) : tests;
  }, [tests, chip, query]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const visible = useMemo(
    () => new Set(filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((t) => t.slug)),
    [filtered, page],
  );

  const goTo = (p: number) => {
    setPage(p);
    document.getElementById("tests-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="tests-section" aria-labelledby="find-test-heading" className="bg-white py-10 md:py-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-8`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionHead
            id="find-test-heading"
            eyebrow="ALL LAB TESTS"
            title="Find your test"
            subtitle="Search by name or browse by health concern and book in under a minute."
          />
          <CatalogSearch
            value={query}
            onChange={(v) => {
              setQuery(v);
              setPage(1);
            }}
            placeholder="Search tests e.g. CBC, TSH, HbA1c"
            label="Search lab tests"
          />
        </div>

        <CategoryChips
          label="Test categories"
          options={CHIPS.map(([label]) => label)}
          active={query ? "All tests" : chip}
          onChange={(c) => {
            setChip(c);
            setQuery("");
            setPage(1);
          }}
        />

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-dl-muted">No tests found matching your search.</p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {tests.map((t) => (
              <li key={t.slug} className={visible.has(t.slug) ? "" : "hidden"}>
                <LabTestCard test={t} variant="catalog" categoryLabel={displayCategory(t.category)} />
              </li>
            ))}
          </ul>
        )}

        <Pager current={page} total={totalPages} onChange={goTo} />
      </div>
    </section>
  );
}
