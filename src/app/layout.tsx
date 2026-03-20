import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar";
import FloatingCTA from "./components/floatingCTA";
import Footer from "./components/footer";
import FAQAccordion from "./components/faq";
import FindUs from "./components/findus";
import ReviewCarousel from "./components/reviews/reviews";
import HowItWorks from "./components/howItWorks";
import HeroSection from "./components/hero";

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
       
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><Navbar />
        {children}
        <FloatingCTA phoneNumber="+91 8404802201" whatsappNumber="+91 8404802201" />
        <FindUs />
      <ReviewCarousel />
      <HowItWorks />
      <FAQAccordion />
        <Footer />
      </body>
    </html>
  );
}
