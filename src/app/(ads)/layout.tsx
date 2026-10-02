import AdsTracking from "./components/adsTracking";

/* Paid landing pages sit outside the site chrome on purpose. The old
   header (logo and call link) went with the old landing page; the Google
   Ads tag stays for the new one. */
export default function AdsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdsTracking />
      {children}
    </>
  );
}
