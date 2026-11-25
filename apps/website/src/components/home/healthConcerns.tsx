import Link from "next/link";
import SectionHead from "@/components/ui/sectionHead";
import Icon from "@/components/ui/icon";
import { healthConcerns } from "@/components/home/content";
import { shell } from "@/components/ui/shell";

/* DL.pen "Health Concerns": one bordered grid, 4-up on phones (first
   eight), 10-up on desktop. */
export default function HealthConcerns() {
  return (
    <section aria-labelledby="concerns-heading" className="bg-white pt-2 pb-9 md:pt-6 md:pb-24">
      <div className={`${shell} flex flex-col gap-5 md:gap-9`}>
        <SectionHead
          id="concerns-heading"
          title="Find tests by health concern"
          subtitle="Not sure what to book? Start with what you're feeling."
          mobileSubtitle={null}
          link={{ href: "/tests/", label: "View all tests", mobileLabel: "View all" }}
        />
        <ul className="grid grid-cols-4 gap-px overflow-hidden rounded-[20px] border border-dl-line bg-dl-line md:grid-cols-5 md:rounded-3xl lg:grid-cols-10">
          {healthConcerns.map((c, i) => (
            <li key={c.label} className={`bg-white ${i >= 8 ? "hidden md:block" : ""}`}>
              <Link
                href={c.href}
                className="group flex h-full flex-col items-center gap-2 px-1 py-4 text-center md:gap-3 md:px-2 md:py-7"
              >
                <span className="flex size-[46px] items-center justify-center rounded-full bg-dl-red-soft text-dl-red transition-colors group-hover:bg-dl-red group-hover:text-white md:size-[60px]">
                  <Icon name={c.icon} className="size-5 md:size-6" />
                </span>
                <span className="text-xs font-semibold leading-tight text-dl-ink md:text-sm">{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
