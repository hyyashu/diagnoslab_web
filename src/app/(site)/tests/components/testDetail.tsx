import { Droplet, FileClock, FlaskConical, TestTubes, UtensilsCrossed } from "lucide-react";
import {
  BookingAside,
  DetailLayout,
  FaqCard,
  MobilePriceCard,
  Preparation,
  Responsive,
  TitleCard,
  detailCard,
  detailCardTitle,
  discountPct,
  type DetailFact,
  type PrepStep,
} from "@/components/detail/detailParts";
import { DetailStickyBar, EnquiryCard, type BookingItem } from "@/components/detail/detailClient";
import { labTestsFaq } from "@/lib/faq";
import type { Test } from "@/lib/catalog";
import type { TestDetails } from "../details";

/* DL.pen "Test Details". Tests the design doesn't write up get catalogue
   facts, generic preparation and the general lab test FAQ. */

const overnight = (f: string) => /over[\s-]*night/i.test(f);
const noFasting = (f: string) => /not\s*required/i.test(f);
const sameDay = (r: string) => /same\s*day/i.test(r);

function genericPrep(fasting: string): { intro: string; steps: PrepStep[] } {
  if (overnight(fasting))
    return {
      intro: "This test needs overnight fasting.",
      steps: [
        { title: "Fast for 10–12 hours", text: "Only water is allowed. Skip tea, coffee and snacks." },
        { title: "Pick an early slot", text: "Book 6–8 AM so you can have breakfast soon after." },
        { title: "Share your medicines", text: "Tell the phlebotomist about any medicines you take." },
      ],
    };
  return {
    intro: noFasting(fasting) ? "No special preparation needed." : `Fasting: ${fasting}.`,
    steps: [
      noFasting(fasting)
        ? { title: "No fasting needed", text: "Eat and drink normally before your sample." }
        : { title: `Fasting: ${fasting}`, text: "Our team will confirm the timing when you book." },
      { title: "Stay hydrated", text: "A glass of water makes the draw quicker." },
      { title: "Share your medicines", text: "Tell the phlebotomist about any medicines you take." },
    ],
  };
}

export function testBookingItem(test: Test): BookingItem {
  /* Same lead payload as LabTestCard. */
  return {
    name: test.title,
    price: test.price,
    originalPrice: test.originalPrice,
    sourceData: {
      test_name: test.title,
      test_slug: test.slug,
      test_price: test.price,
      test_original_price: test.originalPrice,
      test_category: test.category,
      test_fasting: test.fasting,
      test_reporting: test.reporting,
    },
  };
}

function Measures({ d }: { d: TestDetails }) {
  if (!d.groups) return null;
  return (
    <section aria-labelledby="measures-heading" className={detailCard}>
      <div className="flex flex-col gap-1">
        <h2 id="measures-heading" className={detailCardTitle}>What this test measures</h2>
        {d.groupsSummary && <p className="text-[13px] text-dl-ink-2 md:text-sm">{d.groupsSummary}</p>}
      </div>
      <ul className="flex flex-col">
        {d.groups.map((g) => (
          <li
            key={g.name}
            className="flex flex-col gap-2.5 border-b border-dl-line py-4 first:pt-0 last:border-b-0 last:pb-0 md:flex-row md:gap-6 md:py-5"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 md:w-[220px] md:shrink-0 md:flex-col md:gap-1">
              <span className="inline-flex items-center gap-2 text-[14.5px] font-bold text-dl-ink md:text-[15px]">
                <span className="size-2 shrink-0 rounded-full" style={{ background: g.color }} aria-hidden />
                {g.name}
              </span>
              <span className="text-[12.5px] text-dl-muted md:pl-4 md:text-[13px]">
                <Responsive desktop={g.purpose} mobile={g.purposeMobile} />
              </span>
            </div>
            <ul className="flex flex-wrap gap-1.5 md:gap-2" aria-label={`${g.name} parameters`}>
              {g.parameters.map((p) => (
                <li key={p} className="rounded-lg bg-dl-bg px-2.5 py-1.5 text-[12.5px] font-medium text-dl-ink-2 md:text-[13px]">
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WhenToTake({ d }: { d: TestDetails }) {
  if (!d.whenToTake) return null;
  return (
    <section aria-labelledby="when-heading" className={detailCard}>
      <h2 id="when-heading" className={detailCardTitle}>When should you take this test?</h2>
      <ul className="grid gap-4 md:grid-cols-2 md:gap-3">
        {d.whenToTake.map(({ icon: Icon, title, text, textMobile }) => (
          <li key={title} className="flex items-start gap-3.5 md:rounded-2xl md:bg-dl-bg md:p-[18px]">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:bg-white">
              <Icon className="size-[18px]" aria-hidden />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[15px] font-bold text-dl-ink">{title}</span>
              <span className="text-[13.5px] leading-[1.45] text-dl-ink-2">
                <Responsive desktop={text} mobile={textMobile} />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TestMain({ test, d }: { test: Test; d?: TestDetails }) {
  const item = testBookingItem(test);
  const discount = discountPct(test.price, test.originalPrice);
  const reportLine = sameDay(test.reporting) ? "Report on WhatsApp, same day" : "Report on WhatsApp";
  const parameterCount = d?.groups?.reduce((n, g) => n + g.parameters.length, 0) ?? 0;
  const sample = d?.sample ?? test.sampleType;

  const facts: DetailFact[] = [
    ...(parameterCount > 0 ? [{ icon: TestTubes, label: "Parameters", value: `${parameterCount} tests` }] : []),
    ...(sample ? [{ icon: d?.sample ? Droplet : FlaskConical, label: "Sample", value: sample }] : []),
    {
      icon: UtensilsCrossed,
      label: "Fasting",
      value: noFasting(test.fasting) ? "Not required" : overnight(test.fasting) ? "10–12 hours" : test.fasting,
    },
    { icon: FileClock, label: "Report", value: sameDay(test.reporting) ? "Same day" : test.reporting },
  ];
  const prep = d?.prep ? { intro: d.prepIntro ?? "", steps: d.prep } : genericPrep(test.fasting);
  const shortName = d?.shortName ?? test.title;

  return (
    <>
      <DetailLayout
        aside={
          <BookingAside item={item} discount={discount} reportLine={reportLine} kind="test">
            <EnquiryCard item={item} name={shortName} kind="test" className="flex" />
          </BookingAside>
        }
      >
        <TitleCard
          category={d?.category ?? test.category}
          categoryIcon={Droplet}
          discount={discount}
          mostBooked={d?.mostBooked}
          headline={d?.headline ?? test.title}
          subline={d?.alsoKnownAs}
          intro={d?.intro ?? test.description}
          introMobile={d?.introMobile}
          facts={facts}
        />
        <MobilePriceCard item={item} discount={discount} reportLine={reportLine} />
        {d && <Measures d={d} />}
        {d && <WhenToTake d={d} />}
        <Preparation intro={prep.intro} introMobile={d?.prepIntroMobile} steps={prep.steps} />
        <EnquiryCard item={item} name={shortName} kind="test" className="flex md:hidden" />
        <FaqCard items={d?.faq ?? labTestsFaq.filter((f) => !f.desktopOnly)} />
      </DetailLayout>
      <DetailStickyBar item={item} discount={discount} />
    </>
  );
}
