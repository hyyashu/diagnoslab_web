import Link from "next/link";
import BookButton from "@/components/cards/bookButton";
import { Fragment } from "react";
import {
  Clock,
  Utensils,
  FlaskConical,
  Timer,
  Home,
  Zap,
  Shield,
  ChevronLeft,
} from "lucide-react";

export type DetailKind = "test" | "package";

export type DetailEntity = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  discountedPrice: number;
  categories: string[];
  fasting?: string;
  reporting?: string;
  tat?: string;
  sampleType?: string;
  whoShouldTake?: string;
  parametersCovered?: number;
};

interface DetailCardProps {
  kind: DetailKind;
  data: DetailEntity;
}

function toTitleCase(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

const TRUST_BADGES = [
  { icon: Home, label: "Home Collection", sub: "" },
  { icon: Zap, label: "Same-Day Reports", sub: "" },
  { icon: Shield, label: "Trusted Lab", sub: "" },
];

export default function DetailCard({ kind, data }: DetailCardProps) {
  const displayName = toTitleCase(data.name);
  const discount =
    data.price > 0 &&
    data.discountedPrice > 0 &&
    data.price > data.discountedPrice
      ? Math.round(((data.price - data.discountedPrice) / data.price) * 100)
      : 0;

  const backHref =
    kind === "test" ? "/tests#tests-section" : "/packages#packages-section";
  const backLabel = kind === "test" ? "All Tests" : "All Packages";

  const leadMeta =
    kind === "test"
      ? {
          test_name: data.name,
          test_slug: data.slug,
          test_price: data.discountedPrice,
          test_original_price: data.price,
          test_categories: data.categories,
        }
      : {
          package_name: data.name,
          package_description: data.description,
          package_price: data.discountedPrice,
          package_original_price: data.price,
          package_parameters: data.parametersCovered,
          package_categories: data.categories,
        };

  /* Both Book Now buttons (mobile sticky bar and sidebar) open the same form. */
  const bookForm = {
    title: "Book",
    testName: data.name,
    testDescription: data.description,
    testPrice: data.discountedPrice,
    testOriginalPrice: data.price,
    additionalSourceData: leadMeta,
  };

  const benefits = [
    "Early disease detection",
    "Lifestyle & diet monitoring",
    "Doctor-recommended tracking",
    ...(kind === "package" && data.parametersCovered
      ? [`${data.parametersCovered}+ parameters covered`]
      : []),
  ];

  return (
    <>
      {/* ── Mobile sticky CTA ── */}
      <div className="fixed bottom-16 left-0 right-0 z-40 md:hidden bg-white border-t border-slate-100 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] px-4 py-3 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            {data.discountedPrice > 0 && (
              <span className="text-xl font-black text-[#E73834] font-heading">
                ₹{data.discountedPrice}
              </span>
            )}
            {data.price > data.discountedPrice && data.price > 0 && (
              <span className="text-xs text-slate-400 line-through font-heading">
                ₹{data.price}
              </span>
            )}
          </div>
          <p className="text-[10px] text-slate-400 font-body">
            Home collection available
          </p>
        </div>
        <BookButton
          className="bg-[#E73834] text-white font-bold font-heading px-6 py-2.5 rounded-xl text-sm shrink-0 shadow-md active:scale-95 transition-transform"
          form={bookForm}
        >
          Book Now
        </BookButton>
      </div>

      <div className="bg-slate-50 min-h-screen pb-28 md:pb-12">
        {/* ── Header ── */}
        <div className="bg-white border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="max-w-6xl mx-auto px-4 pt-6 pb-5">
            <Link
              href={backHref}
              className="inline-flex items-center gap-1.5 text-[#E73834] text-sm font-heading font-semibold mb-5 group"
            >
              <ChevronLeft
                size={15}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              {backLabel}
            </Link>

            {/* Title with red accent bar */}
            <div className="flex items-start gap-4">
              <div
                className="w-1 shrink-0 rounded-full mt-1"
                style={{
                  background: "#E73834",
                  height: "3.5rem",
                  minHeight: "3rem",
                }}
              />
              <div>
                <p className="text-[10px] font-heading font-bold text-[#E73834] uppercase tracking-[0.15em] mb-1">
                  {kind === "test" ? "Diagnostic Test" : "Health Package"} ·
                  Jamshedpur
                </p>
                <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {displayName}
                  {kind === "test" && (
                    <span className="text-slate-400 font-light"> Test</span>
                  )}
                </h1>
              </div>
            </div>

            {/* Attribute chips */}
            <div className="flex flex-wrap gap-2 mt-4 pl-5">
              {data.fasting && data.fasting.trim() && (
                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-[11px] font-body font-medium text-slate-600">
                  <Utensils size={10} className="text-slate-400" />
                  Fasting: {data.fasting}
                </span>
              )}
              {data.reporting && data.reporting.trim() && (
                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-[11px] font-body font-medium text-slate-600">
                  <Clock size={10} className="text-slate-400" />
                  Reports: {data.reporting}
                </span>
              )}
              {data.sampleType && data.sampleType.trim() && (
                <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-[11px] font-body font-medium text-slate-600">
                  <FlaskConical size={10} className="text-slate-400" />
                  {data.sampleType}
                </span>
              )}
              {data.categories.slice(0, 2).map((cat) => (
                <Link
                  key={cat}
                  href={backHref}
                  className="inline-flex items-center bg-red-50 border border-red-100 rounded-full px-3 py-1 text-[11px] font-body font-medium text-[#E73834] hover:bg-red-100 transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl p-3 md:p-4 text-center shadow-sm border border-slate-50"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon size={13} className="text-[#E73834]" />
                  </div>
                  <p className="font-heading text-[10px] md:text-xs font-bold text-slate-900 leading-tight">
                    {label}
                  </p>
                  <p className="font-body text-[9px] md:text-[10px] text-slate-400 mt-0.5">
                    {sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Overview */}
            {data.description && (
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                <h2 className="font-heading font-bold text-sm md:text-base text-slate-900 mb-3">
                  About This {kind === "test" ? "Test" : "Package"}
                </h2>
                <p className="font-body text-sm text-slate-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
            )}

            {/* Benefits + Who Should Take */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm">
                <h2 className="font-heading font-bold text-sm md:text-base text-slate-900 mb-4">
                  Key Benefits
                </h2>
                <ul className="space-y-2.5">
                  {benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-slate-700 font-body"
                    >
                      <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-green-600 text-[8px] font-black">
                          ✓
                        </span>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-heading font-bold text-sm md:text-base text-slate-900 mb-3">
                    Who Should Take This?
                  </h2>
                  <p className="font-body text-sm text-slate-600 leading-relaxed">
                    {data.whoShouldTake ??
                      "Anyone monitoring related symptoms or advised by their doctor may benefit from this test."}
                  </p>
                </div>

                {/* Mini how-it-works */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <p className="font-heading text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">
                    How it works
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-body text-slate-500">
                    {["Book", "Collect", "Reports"].map((step, i) => (
                      <Fragment key={step}>
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0"
                            style={{ background: "#E73834" }}
                          >
                            {i + 1}
                          </span>
                          {step}
                        </span>
                        {i < 2 && (
                          <span className="flex-1 border-t border-dashed border-slate-200" />
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: sticky booking card (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-28 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              {/* Price header */}
              <div className="bg-[#E73834] px-6 py-5">
                <p className="font-heading text-white/70 text-[10px] font-bold uppercase tracking-widest">
                  Price
                </p>
                <div className="flex items-baseline gap-2.5 mt-1">
                  {data.discountedPrice > 0 && (
                    <span className="font-heading text-3xl font-black text-white">
                      ₹{data.discountedPrice}
                    </span>
                  )}
                  {data.price > data.discountedPrice && data.price > 0 && (
                    <span className="font-heading text-base text-white/50 line-through">
                      ₹{data.price}
                    </span>
                  )}
                  {discount >= 10 && (
                    <span className="bg-white/20 text-white text-[10px] font-bold font-heading px-2 py-0.5 rounded-full">
                      {discount}% off
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <ul className="space-y-2.5">
                  {[
                    { icon: Home, text: "Home collection available" },
                    {
                      icon: Clock,
                      text: `${data.reporting || "Same-day"} reports`,
                    },
                    { icon: Timer, text: "Book in under 2 minutes" },
                  ].map(({ icon: Icon, text }) => (
                    <li
                      key={text}
                      className="flex items-center gap-2 text-sm text-slate-600 font-body"
                    >
                      <Icon size={13} className="text-[#E73834] shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>

                <BookButton
                  className="w-full bg-[#E73834] hover:bg-red-700 text-white font-black font-heading py-4 rounded-xl transition-all text-base shadow-md hover:shadow-lg active:scale-[0.98]"
                  form={bookForm}
                >
                  Book Now
                </BookButton>

                <p className="text-center text-xs text-slate-400 font-body">
                  Or call{" "}
                  <a
                    href="tel:+918404802201"
                    className="text-[#E73834] font-semibold"
                  >
                    +91 8404802201
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
