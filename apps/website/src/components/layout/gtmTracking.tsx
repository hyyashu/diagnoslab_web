import Script from "next/script";

export const GTM_ID = "GTM-5RGKCN4Z";

/* Google Tag Manager container, on every page. Loaded after hydration so it
   never competes with the LCP element. Tags, triggers and conversions are
   managed in the GTM dashboard, not here. */
export default function GtmTracking() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtm-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
      </Script>
    </>
  );
}
