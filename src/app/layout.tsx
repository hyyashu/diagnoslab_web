import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar";
import FloatingCTA from "./components/floatingCTA";
import Footer from "./components/footer";
import FAQAccordion from "./components/faq";
import FindUs from "./components/findus";
import ReviewCarousel from "./components/reviews/reviews";
import ConditionalHowItWorks from "./components/conditionalHowItWorks";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Diagnos Lab",
  description: "Diagnos Lab is a leading diagnostic center in Jamshedpur, Jharkhand. We provide a wide range of diagnostic services to our patients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="pt-12 md:pt-24">
          {children}
          <FloatingCTA phoneNumber="+918404802201" whatsappNumber="+918404802214" />
          <FindUs />
          <ReviewCarousel />
          <ConditionalHowItWorks />
          <FAQAccordion />
        </main>
        <Footer />
      </body>
    </html>
  );
}
