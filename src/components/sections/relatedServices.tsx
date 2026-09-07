import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SERVICES = [
  { id: "ultrasound", label: "Ultrasound", href: "/ultrasound-in-jamshedpur" },
  { id: "ecg", label: "ECG", href: "/ecg" },
  { id: "xray", label: "X-Ray", href: "/xray" },
] as const;

interface RelatedServicesProps {
  current: (typeof SERVICES)[number]["id"];
  pageTitle: string;
}

export default function RelatedServices({ current, pageTitle }: RelatedServicesProps) {
  const others = SERVICES.filter((s) => s.id !== current);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 md:py-14">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 mb-8 text-xs md:text-sm text-slate-500 font-body"
      >
        <Link href="/" className="hover:text-[#E73834]">
          Home
        </Link>
        <ChevronRight size={12} />
        <Link href="/radiology" className="hover:text-[#E73834]">
          Radiology
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-900 font-medium">{pageTitle}</span>
      </nav>

      <h2 className="font-heading text-xl md:text-2xl font-black text-slate-900 mb-5">
        You May Also Need
      </h2>
      <div className="flex flex-wrap gap-3">
        {others.map((s) => (
          <Link
            key={s.id}
            href={s.href}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-heading font-semibold text-slate-700 hover:border-[#E73834] hover:text-[#E73834] transition-colors"
          >
            {s.label}
          </Link>
        ))}
        <Link
          href="/radiology"
          className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-4 py-2 text-sm font-heading font-semibold text-slate-700 hover:border-[#E73834] hover:text-[#E73834] transition-colors"
        >
          All Radiology Services
        </Link>
        <Link
          href="/book-a-test"
          className="inline-flex items-center gap-1.5 bg-[#E73834] text-white rounded-full px-4 py-2 text-sm font-heading font-semibold hover:bg-red-700 transition-colors"
        >
          Book a Test
        </Link>
      </div>
    </section>
  );
}
