import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ChevronRight,
  Flame,
  MessageCircle,
  MessageSquareText,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { shell } from "@/components/ui/shell";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import type { FaqItem } from "@/lib/faq";
import { DetailFaq, SheetButton, type BookingItem } from "./detailClient";

/* DL.pen "Test Details" / "Package Details": the pieces both pages share.
   Desktop is a content column beside a sticky booking card; phones stack
   the same cards with a price card up top and a sticky booking bar. */

export type DetailFact = { icon: LucideIcon; label: string; value: string };
export type PrepStep = { title: string; text: string };

export const detailCard =
  "flex flex-col gap-4 rounded-[20px] border border-dl-line bg-white p-5 md:gap-5 md:rounded-[24px] md:p-8";
export const detailCardTitle =
  "font-display text-lg font-extrabold tracking-[-0.02em] text-dl-ink md:text-[22px] md:tracking-[-0.025em]";

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const discountPct = (price: number, originalPrice: number) =>
  originalPrice > price && price > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

export function Responsive({ desktop, mobile }: { desktop: string; mobile?: string }) {
  if (!mobile || mobile === desktop) return <>{desktop}</>;
  return (
    <>
      <span className="md:hidden">{mobile}</span>
      <span className="hidden md:inline">{desktop}</span>
    </>
  );
}

export function DetailBreadcrumb({ parent, title }: { parent: { label: string; href: string }; title: string }) {
  return (
    <nav aria-label="Breadcrumb" className={`${shell} hidden py-4 md:block`}>
      <ol className="flex items-center gap-2.5 text-[13px] text-dl-muted">
        <li className="flex items-center gap-2.5">
          <Link href="/" className="hover:text-dl-ink">Home</Link>
          <ChevronRight className="size-3.5" aria-hidden />
        </li>
        <li className="flex items-center gap-2.5">
          <Link href={parent.href} className="hover:text-dl-ink">{parent.label}</Link>
          <ChevronRight className="size-3.5" aria-hidden />
        </li>
        <li aria-current="page" className="font-semibold text-dl-ink">{title}</li>
      </ol>
    </nav>
  );
}

type TitleCardProps = {
  category: string;
  categoryIcon?: LucideIcon;
  discount: number;
  mostBooked?: boolean;
  headline: string;
  subline?: string;
  sublineMobile?: string;
  intro?: string;
  introMobile?: string;
  facts: DetailFact[];
};

/* Full-bleed band on phones, a bordered card on desktop. */
export function TitleCard({
  category,
  categoryIcon: CategoryIcon = Activity,
  discount,
  mostBooked,
  headline,
  subline,
  sublineMobile,
  intro,
  introMobile,
  facts,
}: TitleCardProps) {
  return (
    <header className="-mx-4 flex flex-col gap-4 bg-linear-to-b from-dl-red-soft to-dl-bg px-4 pt-5 pb-6 md:mx-0 md:gap-5 md:rounded-[24px] md:border md:border-dl-line md:to-white md:p-8">
      <ul className="flex flex-wrap gap-2 text-xs font-bold">
        <li className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-[5px] text-dl-red">
          <CategoryIcon className="size-[13px]" aria-hidden />
          {category}
        </li>
        {discount > 0 && <li className="rounded-lg bg-dl-green/10 px-2.5 py-[5px] text-dl-green">{discount}% OFF</li>}
        {mostBooked && (
          <li className="inline-flex items-center gap-1.5 rounded-lg bg-dl-red px-2.5 py-[5px] text-white">
            <Flame className="size-[13px]" aria-hidden />
            MOST BOOKED
          </li>
        )}
      </ul>

      <div className="flex flex-col gap-1.5 md:gap-2">
        <h1 className="font-display text-[28px] font-extrabold leading-[1.1] tracking-[-0.03em] text-dl-ink md:text-[40px]">
          {headline}
        </h1>
        {subline && (
          <p className="text-[13px] font-medium text-dl-muted md:text-sm">
            <Responsive desktop={subline} mobile={sublineMobile} />
          </p>
        )}
        {intro && (
          <p className="text-[14.5px] leading-[1.55] text-dl-ink-2 md:text-base">
            <Responsive desktop={intro} mobile={introMobile} />
          </p>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-2.5 md:flex md:gap-3">
        {facts.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-center gap-3 rounded-2xl border border-dl-line bg-white p-3 md:flex-1 md:p-3.5">
            <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[11px] bg-dl-red-soft text-dl-red md:size-[38px]">
              <Icon className="size-[17px] md:size-[18px]" aria-hidden />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[11.5px] font-medium text-dl-muted md:text-xs">{label}</span>
              <span className="text-sm font-bold text-dl-ink md:text-[15px]">{value}</span>
            </span>
          </li>
        ))}
      </ul>
    </header>
  );
}

function PriceBlock({ item, discount }: { item: BookingItem; discount: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
        <span className="font-display text-[30px] font-extrabold tracking-[-0.03em] text-dl-ink md:text-[38px]">{rupees(item.price)}</span>
        {item.originalPrice > item.price && (
          <s className="text-[15px] font-medium text-dl-muted md:text-[17px]">{rupees(item.originalPrice)}</s>
        )}
        {discount > 0 && (
          <span className="self-center rounded-lg bg-dl-green/10 px-[9px] py-1 text-xs font-extrabold text-dl-green">{discount}% OFF</span>
        )}
      </p>
      <p className="text-[13px] text-dl-ink-2">Price includes home sample collection</p>
    </div>
  );
}

function BookingInfo({ reportLine }: { reportLine: string }) {
  const benefits: { icon: LucideIcon; text: string }[] = [
    { icon: MessageCircle, text: reportLine },
    { icon: BadgeCheck, text: "Accurate diagnostics since 2010" },
  ];
  return (
    <>
      <div className="flex items-center gap-3 rounded-[14px] bg-dl-bg p-3.5">
        <CalendarClock className="size-5 shrink-0 text-dl-red" aria-hidden />
        <span className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-dl-muted">Home collection</span>
          <span className="text-[14.5px] font-bold text-dl-ink">Every day, from 6:00 AM</span>
        </span>
      </div>
      <ul className="flex flex-col gap-3">
        {benefits.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm font-medium text-dl-ink-2">
            <Icon className="size-[17px] shrink-0 text-dl-green" aria-hidden />
            {text}
          </li>
        ))}
      </ul>
    </>
  );
}

type BookingProps = { item: BookingItem; discount: number; reportLine: string };

/* Phones: price and booking facts at the top of the body; the buttons live
   in the sticky bar. */
export function MobilePriceCard({ item, discount, reportLine }: BookingProps) {
  return (
    <section
      aria-label="Price"
      className="flex flex-col gap-4 rounded-[20px] border border-dl-line bg-white p-5 shadow-[0_14px_36px_rgba(217,45,39,0.08)] md:hidden"
    >
      <PriceBlock item={item} discount={discount} />
      <BookingInfo reportLine={reportLine} />
    </section>
  );
}

/* Desktop: the sticky booking card, anything the page adds under it (the
   test page's enquiry form), then the call-us card. */
export function BookingAside({ item, discount, reportLine, kind, children }: BookingProps & { kind: string; children?: ReactNode }) {
  return (
    <aside aria-label={`Book this ${kind}`} className="sticky top-6 hidden flex-col gap-4 md:flex">
      <div className="flex flex-col gap-5 rounded-[24px] border border-dl-line bg-white p-7 shadow-[0_14px_36px_rgba(217,45,39,0.08)]">
        <PriceBlock item={item} discount={discount} />
        <BookingInfo reportLine={reportLine} />
        <div className="flex flex-col gap-2.5">
          <SheetButton
            item={item}
            className="flex h-[52px] items-center justify-center gap-2 rounded-[14px] bg-dl-red text-base font-semibold text-white shadow-[0_8px_20px_rgba(217,45,39,0.25)] transition-colors hover:bg-dl-red-dark"
          >
            Book now
            <ArrowRight className="size-[18px]" aria-hidden />
          </SheetButton>
          <SheetButton
            item={item}
            className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dl-ink bg-white text-[15px] font-semibold text-dl-ink transition-colors hover:bg-dl-bg"
          >
            <MessageSquareText className="size-[18px]" aria-hidden />
            Have a question? Enquire now
          </SheetButton>
        </div>
      </div>
      {children}
      <a
        href={PHONE_HREF}
        className="flex items-center gap-3.5 rounded-[20px] bg-dl-red px-5 py-[18px] text-white transition-colors hover:bg-dl-red-dark"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15">
          <Phone className="size-[18px]" aria-hidden />
        </span>
        <span className="flex flex-col gap-0.5">
          <span className="text-[12.5px] font-medium text-white/80">Not sure which test you need?</span>
          <span className="font-display text-base font-bold">Call {PHONE_DISPLAY}</span>
        </span>
      </a>
    </aside>
  );
}

export function Preparation({ intro, introMobile, steps }: { intro: string; introMobile?: string; steps: PrepStep[] }) {
  return (
    <section aria-labelledby="prep-heading" className={detailCard}>
      <div className="flex flex-col gap-1">
        <h2 id="prep-heading" className={detailCardTitle}>How to prepare</h2>
        <p className="text-[13px] text-dl-ink-2 md:text-sm">
          <Responsive desktop={intro} mobile={introMobile} />
        </p>
      </div>
      <ol className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-3">
        {steps.map((s, i) => (
          <li key={s.title} className="flex gap-3 md:flex-col md:gap-2.5 md:rounded-2xl md:border md:border-dl-line md:p-[18px]">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-dl-red text-[13px] font-extrabold text-white">
              {i + 1}
            </span>
            <span className="flex flex-col gap-1">
              <span className="text-[15px] font-bold text-dl-ink">{s.title}</span>
              <span className="text-[13.5px] leading-[1.45] text-dl-ink-2">{s.text}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FaqCard({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="detail-faq-heading" className={`${detailCard} md:gap-3`}>
      <h2 id="detail-faq-heading" className={detailCardTitle}>Frequently asked questions</h2>
      <DetailFaq items={items} />
    </section>
  );
}

/* The two-column frame: content on the left, booking aside on the right. */
export function DetailLayout({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <div
      className={`${shell} grid gap-3.5 pb-8 md:grid-cols-[minmax(0,1fr)_minmax(0,392px)] md:items-start md:gap-8 md:pt-5 md:pb-16`}
    >
      <div className="flex min-w-0 flex-col gap-3.5 md:gap-5">{children}</div>
      {aside}
    </div>
  );
}
