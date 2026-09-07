import Image from "next/image";
import AdsTracking from "./components/adsTracking";
import CallLink from "./components/callLink";

/* Paid landing pages sit outside the site chrome on purpose: no nav, no
   footer links, nothing to click except the offer. The logo is not a link
   back to the homepage for the same reason. */
export default function AdsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdsTracking />
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Image
            src="/images/diagnoslogo.avif"
            alt="Diagnos Lab"
            width={132}
            height={40}
            priority
            className="h-9 w-auto"
          />
          <CallLink className="flex items-center gap-2 font-heading text-sm font-bold text-slate-900 md:text-base" />
        </div>
      </header>
      {children}
    </>
  );
}
