import { ArrowRight, Zap } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import SiteSearch from "@/components/search/siteSearch";
import QuickActions from "@/components/home/quickActions";
import { buttonClass } from "@/components/ui/button";
import { shell } from "@/components/ui/shell";
import { getPackageBySlug } from "@/lib/catalog";

/* DL.pen "Hero". Phones: heading, offer, quick actions (search lives in
   the header). Desktop: heading, search and quick actions on the left, the
   offer on the right. */
export default function HomeHero() {
  const offer = getPackageBySlug("nd-plus");

  return (
    <section className="bg-dl-bg">
      <div
        className={`${shell} grid gap-5 pt-6 pb-7 md:grid-cols-[minmax(0,1fr)_minmax(0,440px)] md:gap-x-10 md:gap-y-8 md:pt-14 md:pb-[72px] xl:grid-cols-[minmax(0,1fr)_500px] xl:gap-x-14`}
      >
        <div className="flex flex-col gap-3 md:col-start-1 md:row-start-1 md:gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-dl-line bg-white py-1.5 pl-2.5 pr-3 text-xs font-semibold text-dl-ink-2 md:py-[7px] md:pl-2.5 md:pr-3.5 md:text-[13px]">
            <span className="size-[7px] rounded-full bg-dl-green md:size-2" aria-hidden />
            <span className="md:hidden">Home collection from 6 AM</span>
            <span className="hidden md:inline">Home collection in Jamshedpur from 6 AM</span>
          </p>
          <h1 className="font-display text-[36px] font-extrabold leading-[1.05] tracking-[-0.04em] text-dl-ink md:text-[56px] xl:text-[68px] xl:leading-[1.02]">
            Looking for a test?
          </h1>
          <p className="speakable-description max-w-[540px] text-[14.5px] leading-normal text-dl-ink-2 md:text-lg md:leading-[1.55]">
            <span className="md:hidden">1,000+ tests, packages &amp; scans. Reports on WhatsApp.</span>
            <span className="hidden md:inline">
              Search 1,000+ blood tests, packages and scans, with reports straight to your WhatsApp.
            </span>
          </p>
        </div>

        <div className="hidden md:col-start-1 md:row-start-2 md:block">
          <SiteSearch variant="hero" />
        </div>

        {offer && (
          <div className="relative isolate flex h-[300px] flex-col justify-end gap-2 overflow-hidden rounded-[22px] p-5 text-white md:col-start-2 md:row-span-3 md:row-start-1 md:h-[560px] md:gap-4 md:self-center md:rounded-[28px] md:p-8">
            <img
              src="/images/hero/hero1-mobile.avif"
              alt="Pathologist examining a sample at Diagnos Lab, Jamshedpur"
              width={720}
              height={1028}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 -z-10 size-full object-cover object-[center_25%]"
            />
            <div
              className="absolute inset-0 -z-10 bg-linear-to-b from-dl-red-dark/0 from-10% via-dl-red-dark/90 via-55% to-dl-red-dark"
              aria-hidden
            />

            <p className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-2.5 py-[5px] text-[10px] font-extrabold tracking-[0.11em] text-dl-red md:px-3 md:py-1.5 md:text-[11px]">
              <Zap className="size-3 md:size-[13px]" aria-hidden />
              LIMITED OFFER
            </p>
            <h2 className="font-display text-[19px] font-extrabold tracking-[-0.02em] md:text-[28px]">
              Full Body Checkup
            </h2>
            <div className="flex items-end justify-between">
              <p className="flex items-end gap-1.5 md:gap-2.5">
                <span className="font-display text-[56px] font-extrabold leading-[0.9] tracking-[-0.04em] md:text-[96px]">
                  75%
                </span>
                <span className="font-display text-[17px] font-extrabold leading-[1.2] md:text-[26px] md:leading-[1.3]">
                  OFF
                </span>
              </p>
              <p className="flex flex-col items-end md:hidden">
                <s className="text-xs text-white/65">₹10,000</s>
                <span className="font-display text-xl font-extrabold">₹2,500</span>
              </p>
            </div>
            <p className="hidden text-[14.5px] leading-normal text-white/85 md:block">
              ND Plus · 75 parameters incl. CBC, liver, kidney, lipid &amp; thyroid
            </p>
            <div className="flex items-center justify-between gap-4 md:border-t md:border-white/20 md:pt-[18px]">
              <p className="hidden items-end gap-2.5 md:flex">
                <span className="font-display text-[28px] font-extrabold">₹2,500</span>
                <s className="pb-1.5 text-[15px] font-medium text-white/65">₹10,000</s>
              </p>
              <BookButton
                className={buttonClass("white", "md", "w-full md:w-auto")}
                form={{
                  title: "Book",
                  testName: offer.title,
                  testDescription: offer.description,
                  testPrice: offer.price,
                  testOriginalPrice: offer.originalPrice,
                  additionalSourceData: {
                    package_name: offer.title,
                    package_description: offer.description,
                    package_price: offer.price,
                    package_original_price: offer.originalPrice,
                    package_parameters: offer.parameters,
                    package_categories: offer.categories.split(","),
                    package_fasting: offer.fasting,
                    package_reporting: offer.reporting,
                  },
                }}
              >
                Book now
                <ArrowRight className="size-4" aria-hidden />
              </BookButton>
            </div>
          </div>
        )}

        <div className="md:col-start-1 md:row-start-3">
          <QuickActions />
        </div>
      </div>
    </section>
  );
}
