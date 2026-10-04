import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

const styles = {
  /* Page heroes. */
  hero: { list: "flex-wrap gap-1.5 text-xs md:text-[13px]", item: "gap-1.5" },
  /* Above the test and package detail cards. */
  detail: { list: "gap-2.5 text-[13px]", item: "gap-2.5" },
};

/* The visible "Home › …" trail. The last crumb is the current page;
   earlier crumbs without an href render as plain text. */
export default function Breadcrumbs({
  items,
  size = "hero",
  className,
}: {
  items: Crumb[];
  size?: keyof typeof styles;
  className?: string;
}) {
  const s = styles[size];
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={`flex items-center text-dl-muted ${s.list}`}>
        {items.map((crumb, i) => {
          const last = i === items.length - 1;
          return (
            <li key={crumb.label} className={`flex items-center ${s.item}`}>
              {last ? (
                <span aria-current="page" className="font-semibold text-dl-ink">{crumb.label}</span>
              ) : (
                <>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-dl-ink">{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                  <ChevronRight className="size-3.5" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
