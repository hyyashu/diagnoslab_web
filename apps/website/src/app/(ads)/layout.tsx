import { Phone, Star } from "lucide-react";
import Logo from "@/components/ui/logo";
import { shell } from "@/components/ui/shell";
import { ADDRESS_DISPLAY, HOURS_DISPLAY, PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/* Chrome for paid landing pages: no site nav, so every click goes to a
   call, WhatsApp or the call-back form. Calls and WhatsApp are real tel:
   and wa.me links, so GTM's link-click triggers count them. The phone
   bottom bar is in each page, since its WhatsApp message names the test. */
export default function AdsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-dl-line bg-white">
        <div className={`${shell} flex items-center gap-4 py-2.5 md:py-4`}>
          <Logo priority />
          <span className="hidden items-center gap-1.5 text-sm sm:flex">
            <Star className="size-[15px] text-dl-star" fill="currentColor" aria-hidden />
            <span className="font-bold text-dl-ink">4.9</span>
            <span className="text-[13px] font-medium text-dl-ink-2">· 2,700+ Google reviews</span>
          </span>
          <div className="flex-1" />
          <a href={PHONE_HREF} className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-dl-red text-white">
              <Phone className="size-4" aria-hidden />
            </span>
            <span className="flex flex-col">
              <span className="text-[11px] font-medium text-dl-muted">Call to book</span>
              <span className="text-sm font-bold text-dl-ink md:text-[15px]">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      </header>

      <main>{children}</main>

      <footer className="bg-dl-ink pb-24 pt-8 text-white/70 md:pb-8">
        <div className={`${shell} flex flex-col gap-2 text-[13px] md:flex-row md:items-center md:justify-between`}>
          <p>
            <span className="font-semibold text-white">Diagnos Lab</span> · {ADDRESS_DISPLAY}
          </p>
          <p>
            {HOURS_DISPLAY} ·{" "}
            <a href="/policy/" className="underline underline-offset-2 hover:text-white">
              Privacy policy
            </a>
          </p>
        </div>
      </footer>

    </>
  );
}
