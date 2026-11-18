import { Check, Droplet, FileClock, TestTubes, UtensilsCrossed } from "lucide-react";
import type { ListingPackage } from "@/components/cards/packageListingCards";
import {
  BookingAside,
  DetailLayout,
  FaqCard,
  MobilePriceCard,
  Preparation,
  TitleCard,
  detailCard,
  detailCardTitle,
  type DetailFact,
  type PrepStep,
} from "@/components/detail/detailParts";
import { DetailStickyBar, EnquiryCard, ProfileList, type BookingItem } from "@/components/detail/detailClient";
import { packagesFaq, type FaqItem } from "@/lib/faq";
import { discountPct, isOvernightFast, isSameDay, reportLabel } from "@/lib/format";
import type { PackageDetails } from "../details";

/* DL.pen "Package Details". Packages the design doesn't write up get
   catalogue facts, generic preparation and the general package FAQ. */

function genericPrep(fasting: string): PrepStep[] {
  return [
    isOvernightFast(fasting)
      ? { title: "Fast for 10–12 hours", text: "Only water is allowed. Skip tea, coffee and snacks." }
      : { title: "No fasting needed", text: "You can eat and drink as usual before your sample." },
    { title: "Pick a slot", text: "Home collection runs daily from 6 AM, or walk in at any centre." },
    { title: "Get your report", text: "Your report is sent to your WhatsApp automatically." },
  ];
}

export function resolveDetails(pkg: ListingPackage, d?: PackageDetails) {
  const fasting = d?.fasting ?? (isOvernightFast(pkg.fasting) ? "10–12 hours" : "Not required");
  const report = d?.report ?? (isSameDay(pkg.reporting) ? "Same day" : pkg.reporting);
  const faq: FaqItem[] = d?.faq ?? packagesFaq.filter((f) => !f.desktopOnly);
  const facts: DetailFact[] = [
    ...(pkg.parameters > 0 ? [{ icon: TestTubes, label: "Parameters", value: `${pkg.parameters} tests` }] : []),
    ...(d?.sample ? [{ icon: Droplet, label: "Sample", value: d.sample }] : []),
    { icon: UtensilsCrossed, label: "Fasting", value: fasting },
    { icon: FileClock, label: "Report", value: report },
  ];
  return {
    headline: d?.headline ?? `${pkg.title} Health Package`,
    category: d?.category ?? pkg.categoryLabel,
    mostBooked: d?.mostBooked ?? false,
    audience: d?.audience,
    audienceMobile: d?.audienceMobile ?? d?.audience,
    intro: d?.intro ?? pkg.summary ?? pkg.description,
    introMobile: d?.introMobile ?? d?.intro ?? pkg.summary ?? pkg.description,
    facts,
    profiles: d?.profiles,
    whoShouldBook: d?.whoShouldBook,
    prepIntro: d?.prepIntro ?? (isOvernightFast(pkg.fasting) ? "This package needs overnight fasting." : "No special preparation is needed."),
    prepIntroMobile: d?.prepIntroMobile ?? d?.prepIntro,
    prep: d?.prep ?? genericPrep(pkg.fasting),
    faq,
  };
}

export type ResolvedDetails = ReturnType<typeof resolveDetails>;

function WhatsIncluded({ d, parameters }: { d: ResolvedDetails; parameters: number }) {
  if (!d.profiles) return null;
  return (
    <section aria-labelledby="included-heading" className={detailCard}>
      <div className="flex flex-col gap-1">
        <h2 id="included-heading" className={detailCardTitle}>What&apos;s included</h2>
        <p className="text-[13px] text-dl-ink-2 md:text-sm">
          {parameters} tests across {d.profiles.length} health profiles.
        </p>
      </div>
      <ProfileList
        toggleLabel={`Show all ${d.profiles.length} profiles · ${parameters} tests`}
        items={d.profiles.map(({ name, examples, count, icon: Icon }) => (
          <div key={name} className="flex items-center gap-3.5 rounded-2xl bg-dl-bg px-4 py-3.5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-dl-red">
              <Icon className="size-[18px]" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[14.5px] font-bold text-dl-ink">{name}</span>
              <span className="truncate text-[12.5px] text-dl-muted">{examples}</span>
            </span>
            <span className="shrink-0 rounded-full border border-dl-line bg-white px-2.5 py-1 text-xs font-bold text-dl-ink">
              {count}
              <span className="hidden md:inline"> {count === 1 ? "test" : "tests"}</span>
            </span>
          </div>
        ))}
      />
    </section>
  );
}

function WhoShouldBook({ items }: { items?: string[] }) {
  if (!items) return null;
  return (
    <section aria-labelledby="who-heading" className={detailCard}>
      <h2 id="who-heading" className={detailCardTitle}>Who should book this package?</h2>
      <ul className="grid gap-3.5 md:grid-cols-2 md:gap-x-7">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[14.5px] leading-[1.45] text-dl-ink md:text-[15px]">
            <span className="mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full bg-dl-green/10 text-dl-green">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PackageMain({ pkg, d, item }: { pkg: ListingPackage; d: ResolvedDetails; item: BookingItem }) {
  const discount = discountPct(pkg.price, pkg.originalPrice);
  const reportLine = `${reportLabel(pkg.reporting)} on WhatsApp`;
  return (
    <>
      <DetailLayout aside={<BookingAside item={item} discount={discount} reportLine={reportLine} kind="package" />}>
        <TitleCard
          category={d.category}
          discount={discount}
          mostBooked={d.mostBooked}
          headline={d.headline}
          subline={d.audience}
          sublineMobile={d.audienceMobile}
          intro={d.intro}
          introMobile={d.introMobile}
          facts={d.facts}
        />
        <MobilePriceCard item={item} discount={discount} reportLine={reportLine} />
        <WhatsIncluded d={d} parameters={pkg.parameters} />
        <WhoShouldBook items={d.whoShouldBook} />
        <Preparation intro={d.prepIntro} introMobile={d.prepIntroMobile} steps={d.prep} />
        <EnquiryCard item={item} name={pkg.title} kind="package" className="flex md:hidden" />
        <FaqCard items={d.faq} />
      </DetailLayout>
      <DetailStickyBar item={item} discount={discount} />
    </>
  );
}
