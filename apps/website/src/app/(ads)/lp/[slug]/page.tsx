import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarCheck, Check, MessageCircle, Phone, Star } from "lucide-react";
import CallbackForm from "@/components/forms/callbackForm";
import CollectionSteps from "@/components/home/collectionSteps";
import PatientReviews from "@/components/sections/patientReviews";
import FAQAccordion from "@/components/sections/faq";
import FindUsPanel from "@/components/sections/findUsPanel";
import { shell } from "@/components/ui/shell";
import { PHONE_DISPLAY, PHONE_HREF, ULTRASOUND_HOURS_DISPLAY, whatsappHref } from "@/lib/contact";
import { discountPct, rupees } from "@/lib/format";
import { getOffer, getOffers, type LpOffer } from "../offers";

/* One template for every paid landing page; see ../offers.ts for where
   each page's content comes from. */

export function generateStaticParams() {
  return getOffers().map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const offer = getOffer((await params).slug);
  if (!offer) return {};
  return {
    title: offer.metaTitle,
    description: offer.metaDescription,
    /* Paid pages must not compete with the site's own pages in search. */
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const offer = getOffer((await params).slug);
  if (!offer) notFound();
  /* The title minus its place, e.g. "Vitamin D Test"; topic has catalogue typos. */
  const what = offer.title.replace(/ in (Sakchi, )?Jamshedpur$/, "");
  const wa = whatsappHref(`Hi Diagnos Lab, I want to book: ${what}. Please share the price and available slots.`);

  return (
    <>
      <Hero offer={offer} wa={wa} />
      <Scans offer={offer} />
      <Included offer={offer} />
      <PriceList offer={offer} />
      {offer.atLab ? (
        <FindUsPanel tone="muted" hours={{ title: "Ultrasound hours", text: ULTRASOUND_HOURS_DISPLAY }} />
      ) : (
        <CollectionSteps />
      )}
      <PatientReviews tone="muted" subtitle="Real Google reviews from patients across Jamshedpur" />
      <FAQAccordion
        title="Questions before you book?"
        items={offer.faq}
        intro="Not sure which test to book? Message us on WhatsApp, share your prescription and we'll help."
        whatsapp={wa}
      />
      <ClosingCta wa={wa} />
      <MobileBar wa={wa} />
    </>
  );
}

/* One row of fact cards on desktop, whatever the count. */
const factCols: Record<number, string> = {
  2: "grid-cols-2 md:max-w-[400px]",
  3: "grid-cols-3 md:max-w-[600px]",
};

function Hero({ offer, wa }: { offer: LpOffer; wa: string }) {
  const off = offer.price && offer.originalPrice ? discountPct(offer.price, offer.originalPrice) : 0;
  return (
    <section className="bg-linear-to-b from-dl-red-soft to-dl-bg">
      <div
        className={`${shell} grid gap-4 pt-4 pb-10 md:grid-cols-[minmax(0,1fr)_minmax(0,400px)] md:grid-rows-[auto_auto] md:gap-x-10 md:gap-y-7 md:py-16 xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-x-16`}
      >
        {/* Phones read: intro, form, then facts. Desktop keeps intro and
            facts on the left with the form beside them. */}
        <div className="flex flex-col gap-3 md:col-start-1 md:row-start-1 md:gap-7 md:self-end">
          <div className="flex flex-col gap-2.5 md:gap-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-dl-line bg-white py-1 pl-2.5 md:py-1.5 pr-3 text-xs font-semibold text-dl-ink-2 md:text-[13px]">
              <span className="size-[7px] rounded-full bg-dl-green md:size-2" aria-hidden />
              {offer.eyebrow}
            </p>
            <h1 className="font-display text-[27px] font-extrabold leading-[1.12] tracking-[-0.03em] text-dl-ink md:text-[40px] xl:text-[46px] xl:leading-[1.08]">
              {offer.title}
            </h1>
            <p className="max-w-[600px] text-sm leading-normal text-dl-ink-2 md:text-[17px] md:leading-[1.55]">
              {offer.subtitle}
            </p>
            <p className="flex w-fit items-center gap-1.5 rounded-full border border-dl-line bg-white py-1 pl-2.5 pr-3 shadow-[0_4px_14px_rgba(22,24,29,0.06)] md:px-3.5 md:py-1.5">
              <span className="flex gap-0.5 text-dl-star" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3 md:size-3.5" fill="currentColor" />
                ))}
              </span>
              <span className="font-display text-[13px] font-extrabold text-dl-ink md:text-[15px]">4.9</span>
              <span className="sr-only"> out of 5 from</span>
              <span className="text-[11.5px] font-semibold text-dl-ink-2 md:text-[13px]">2,700+ Google reviews</span>
            </p>
            {offer.highlights && (
              <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[13px] font-semibold text-dl-ink md:text-sm">
                {offer.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-1">
                    <Check className="size-[15px] text-dl-green" strokeWidth={3} aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {offer.price !== undefined && (
            <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-[34px] font-extrabold leading-tight tracking-[-0.03em] text-dl-ink md:text-[44px]">
                {rupees(offer.price)}
              </span>
              {off > 0 && offer.originalPrice !== undefined && (
                <>
                  <span className="text-lg text-dl-muted line-through">{rupees(offer.originalPrice)}</span>
                  <span className="rounded-full bg-dl-green/10 px-2.5 py-1 text-[13px] font-bold text-dl-green">{off}% off</span>
                </>
              )}
            </p>
          )}
        </div>

        <div className="order-last flex flex-col gap-5 md:order-none md:col-start-1 md:row-start-2 md:gap-7 md:self-start">
          <dl className={`grid gap-2 md:gap-3 ${factCols[offer.facts.length] ?? "grid-cols-2 md:grid-cols-4"}`}>
            {offer.facts.map((f) => (
              <div key={f.label} className="flex flex-col gap-0.5 rounded-2xl border border-dl-line bg-white px-3.5 py-3">
                <dt className="text-[11.5px] text-dl-muted md:text-xs">{f.label}</dt>
                <dd className="text-[14.5px] font-bold text-dl-ink md:text-[15px]">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="hidden gap-3 md:flex">
            <a
              href={PHONE_HREF}
              className="flex items-center gap-3 rounded-full bg-dl-red py-3 pl-3.5 pr-6 text-white transition-colors hover:bg-dl-red-dark"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Phone className="size-[17px]" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-white/80">Call to book</span>
                <span className="font-display text-[17px] font-extrabold">{PHONE_DISPLAY}</span>
              </span>
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-full border border-dl-line bg-white py-3 pl-3.5 pr-6 transition-colors hover:border-dl-ink"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-dl-whatsapp text-white">
                <MessageCircle className="size-[17px]" aria-hidden />
              </span>
              <span className="flex flex-col">
                <span className="text-xs font-semibold text-dl-muted">Send prescription</span>
                <span className="font-display text-[17px] font-extrabold text-dl-ink">WhatsApp us</span>
              </span>
            </a>
          </div>
        </div>

        <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:self-center">
          <CallbackForm
            title="Book with a quick call"
            subtitle=""
            service={offer.topic}
            note="We never share your number. No spam."
          />
        </div>
      </div>
    </section>
  );
}

function Scans({ offer }: { offer: LpOffer }) {
  if (!offer.scans?.length) return null;
  const one = offer.scans.length === 1;
  return (
    <section aria-labelledby="scans-heading" className="bg-white py-10 md:py-16">
      <div className={`${shell} flex flex-col gap-6`}>
        <h2 id="scans-heading" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-dl-ink md:text-[32px]">
          {one ? "About the scan" : "Scans we do"}
        </h2>
        <ul className={`grid gap-3 ${one ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {offer.scans.map((s) => (
            <li key={s.title} className="flex flex-col gap-2 rounded-2xl bg-dl-bg p-5">
              <h3 className="text-base font-bold text-dl-ink">{s.title}</h3>
              <p className="text-[13.5px] leading-normal text-dl-ink-2">{s.description}</p>
              <p className="mt-auto pt-1 text-[12.5px] font-semibold text-dl-red">Prep: {s.preparation}</p>
            </li>
          ))}
        </ul>
        {offer.notice && <p className="text-xs leading-normal text-dl-muted">{offer.notice}</p>}
      </div>
    </section>
  );
}

function Included({ offer }: { offer: LpOffer }) {
  if (!offer.profiles && !offer.includes?.length) return null;
  return (
    <section aria-labelledby="included-heading" className="bg-white py-10 md:py-16">
      <div className={`${shell} flex flex-col gap-6`}>
        <h2 id="included-heading" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-dl-ink md:text-[32px]">
          What&apos;s included
        </h2>
        {offer.profiles ? (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {offer.profiles.map(({ name, examples, count, icon: Icon }) => (
              <li key={name} className="flex items-center gap-3.5 rounded-2xl bg-dl-bg px-4 py-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-dl-red">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-[14.5px] font-bold text-dl-ink">{name}</span>
                  <span className="truncate text-[12.5px] text-dl-muted">{examples}</span>
                </span>
                <span className="shrink-0 rounded-full border border-dl-line bg-white px-2.5 py-1 text-xs font-bold text-dl-ink">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {offer.includes?.map((c) => (
              <li key={c} className="rounded-full border border-dl-line bg-dl-bg px-3.5 py-2 text-sm font-semibold text-dl-ink-2">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function PriceList({ offer }: { offer: LpOffer }) {
  if (!offer.priceList?.length) return null;
  return (
    <section aria-labelledby="prices-heading" className="bg-white py-10 md:py-16">
      <div className={`${shell} flex flex-col gap-6`}>
        <div className="flex flex-col gap-2">
          <h2 id="prices-heading" className="font-display text-2xl font-extrabold tracking-[-0.03em] text-dl-ink md:text-[32px]">
            Tests people book at home
          </h2>
          <p className="text-sm text-dl-ink-2 md:text-base">
            Booking something else? Call {PHONE_DISPLAY} and we&apos;ll tell you the price.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {offer.priceList.map((t) => (
            <li key={t.title} className="flex flex-col gap-2 rounded-2xl border border-dl-line bg-white p-4">
              <span className="text-[15px] font-bold text-dl-ink">{t.title}</span>
              <span className="flex items-baseline gap-2">
                <span className="font-display text-xl font-extrabold text-dl-ink">{rupees(t.price)}</span>
                {t.originalPrice > t.price && (
                  <span className="text-sm text-dl-muted line-through">{rupees(t.originalPrice)}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ClosingCta({ wa }: { wa: string }) {
  return (
    <section className="bg-dl-red py-12 text-white md:py-16">
      <div className={`${shell} flex flex-col items-center gap-5 text-center`}>
        <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] md:text-[34px]">
          Book today, get your report on WhatsApp
        </h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={PHONE_HREF}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-dl-red"
          >
            <Phone className="size-4" aria-hidden />
            Call {PHONE_DISPLAY}
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 font-bold text-white"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}

/* Phones: always-visible call, WhatsApp and form buttons. */
function MobileBar({ wa }: { wa: string }) {
  return (
    <nav
      aria-label="Book"
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 gap-2 border-t border-dl-line bg-white p-2.5 shadow-[0_-8px_24px_rgba(22,24,29,0.08)] md:hidden"
    >
      <a href={PHONE_HREF} className="flex items-center justify-center gap-1.5 rounded-full bg-dl-red py-3 text-sm font-bold text-white">
        <Phone className="size-4" aria-hidden />
        Call
      </a>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 rounded-full bg-dl-whatsapp py-3 text-sm font-bold text-white"
      >
        <MessageCircle className="size-4" aria-hidden />
        WhatsApp
      </a>
      <a href="#enquiry-form" className="flex items-center justify-center gap-1.5 rounded-full border border-dl-line py-3 text-sm font-bold text-dl-ink">
        <CalendarCheck className="size-4" aria-hidden />
        Book
      </a>
    </nav>
  );
}
