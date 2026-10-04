import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, CircleCheck, ClipboardList, Clock3, UserRoundCheck } from "lucide-react";
import BookButton from "@/components/cards/bookButton";
import Icon from "@/components/ui/icon";
import { buttonClass } from "@/components/ui/button";
import { leadMeta } from "@/lib/leadMeta";

export type ScanService = {
  id: string;
  title: string;
  image: string;
  icon: string;
  reportingTime: string;
  description: string;
  mobileDescription?: string;
  usedFor: string[];
  /* One-line summary for the compact phone row. */
  mobileUsedFor?: string;
  href?: string;
  femaleRadiologist?: boolean;
  /* Featured card only: the label over the chips, and a preparation line. */
  usedForLabel?: string;
  preparation?: string;
};

/* DL.pen radiology "Ultrasound / Featured" (featured) and "Service Cards"
   (card). A card is a compact row on phones. */
export default function ScanCard({
  scan,
  variant = "card",
}: {
  scan: ScanService;
  variant?: "featured" | "card";
}) {
  const book = (className: string, label = "Book now") => (
    <BookButton
      className={className}
      form={{
        testName: scan.title,
        additionalSourceData: leadMeta({ kind: "scan", ...scan }),
      }}
    >
      {label}
      <ArrowRight className="size-4" aria-hidden />
    </BookButton>
  );

  const details = scan.href && (
    <Link href={scan.href} className={buttonClass("neutral", "sm", "flex-1 md:flex-none")}>
      View details
    </Link>
  );

  const titleRow = (size: string) => (
    <div className="flex items-center gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-dl-red-soft text-dl-red md:size-11">
        <Icon name={scan.icon} className="size-5" />
      </span>
      <h3 className={`font-display font-extrabold tracking-[-0.02em] text-dl-ink ${size}`}>{scan.title}</h3>
    </div>
  );

  const timeBadge = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-dl-ink md:text-xs">
      <Clock3 className="size-3.5 text-dl-red" aria-hidden />
      {variant === "featured" ? `Reports in ${scan.reportingTime}` : scan.reportingTime}
    </span>
  );

  if (variant === "featured") {
    return (
      <article className="grid overflow-hidden rounded-3xl border border-dl-line bg-white md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="relative h-[210px] md:h-auto md:min-h-[380px]">
          <Image src={scan.image} alt={`${scan.title} at Diagnos Lab, Jamshedpur`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-x-3 top-3 flex justify-end md:inset-x-4 md:top-4">
            {scan.femaleRadiologist && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-dl-red px-2.5 py-1 text-[11px] font-bold text-white md:text-xs">
                <UserRoundCheck className="size-3.5" aria-hidden />
                Female radiologist
              </span>
            )}
          </div>
          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">{timeBadge}</div>
        </div>

        <div className="flex flex-col justify-center gap-4 p-5 md:gap-5 md:p-10">
          {titleRow("text-[19px] md:text-[26px]")}
          <p className="text-[13.5px] leading-relaxed text-dl-ink-2 md:text-[15px]">
            {scan.mobileDescription ? (
              <>
                <span className="md:hidden">{scan.mobileDescription}</span>
                <span className="hidden md:inline">{scan.description}</span>
              </>
            ) : (
              scan.description
            )}
          </p>
          <div className="flex flex-col gap-2.5">
            <p className="hidden text-[11px] font-bold tracking-[0.14em] text-dl-muted md:block">
              {scan.usedForLabel ?? "USED FOR"}
            </p>
            <ul className="grid grid-cols-2 gap-2 md:flex md:flex-wrap">
              {scan.usedFor.map((u) => (
                <li
                  key={u}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-dl-red-soft px-2.5 py-1.5 text-xs font-semibold text-dl-red md:text-[12.5px]"
                >
                  <Check className="size-3.5 shrink-0" aria-hidden />
                  {u}
                </li>
              ))}
            </ul>
          </div>
          {scan.preparation && (
            <p className="flex items-start gap-2 text-[13px] md:text-[13.5px]">
              <ClipboardList className="mt-0.5 size-4 shrink-0 text-dl-red" aria-hidden />
              <span>
                <span className="font-bold text-dl-ink">Preparation:</span>{" "}
                <span className="text-dl-ink-2">{scan.preparation}</span>
              </span>
            </p>
          )}
          <div className="flex gap-2.5 pt-1">
            {details}
            {book(buttonClass("primary", "sm", "flex-1 md:flex-none md:px-6"))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="h-full">
      {/* Phones: compact row */}
      <div className="flex gap-3.5 rounded-[18px] border border-dl-line bg-white p-3 md:hidden">
        <div className="relative size-[88px] shrink-0 overflow-hidden rounded-[14px]">
          <Image src={scan.image} alt="" fill sizes="88px" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-base font-extrabold text-dl-ink">
              {scan.href ? <Link href={scan.href}>{scan.title}</Link> : scan.title}
            </h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-dl-bg px-2 py-0.5 text-[11px] font-semibold text-dl-ink-2">
              <Clock3 className="size-3 text-dl-red" aria-hidden />
              {scan.reportingTime.replace("hours", "hrs")}
            </span>
          </div>
          <p className="text-[12.5px] text-dl-ink-2">{scan.mobileDescription ?? scan.description}</p>
          {scan.mobileUsedFor && <p className="text-[11.5px] text-dl-muted">{scan.mobileUsedFor}</p>}
          <div className="pt-1.5">{book("inline-flex items-center rounded-full bg-dl-red px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-dl-red-dark")}</div>
        </div>
      </div>

      {/* Desktop: card */}
      <div className="hidden h-full flex-col overflow-hidden rounded-[20px] border border-dl-line bg-white md:flex">
        <div className="relative h-[180px]">
          <Image src={scan.image} alt={`${scan.title} at Diagnos Lab, Jamshedpur`} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          <div className="absolute bottom-3 left-3">{timeBadge}</div>
        </div>
        <div className="flex flex-1 flex-col gap-3.5 p-5">
          {titleRow("text-[19px]")}
          <p className="text-[13.5px] leading-normal text-dl-ink-2">{scan.description}</p>
          <ul className="flex flex-col gap-2">
            {scan.usedFor.map((u) => (
              <li key={u} className="flex items-center gap-2 text-[13px] text-dl-ink-2">
                <CircleCheck className="size-4 shrink-0 text-dl-green" aria-hidden />
                {u}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex gap-2.5 pt-2">
            {details}
            {book(buttonClass("primary", "sm", "flex-1"))}
          </div>
        </div>
      </div>
    </article>
  );
}
