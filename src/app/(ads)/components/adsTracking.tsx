import Script from "next/script";
import { GADS_ID } from "@/lib/gtag";

/* Renders nothing until NEXT_PUBLIC_GADS_ID is set, so no empty gtag
   request goes out while the account is still being set up. */
export default function AdsTracking() {
  if (!GADS_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GADS_ID}');`}
      </Script>
    </>
  );
}
