import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Mail } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/aboutUs" },
    { name: "Radiology", href: "/radiology" },
    { name: "Ultrasound", href: "/ultrasound-in-jamshedpur" },
    { name: "Packages", href: "/packages" },
    { name: "Tests", href: "/tests#tests-section" },
    { name: "Book a test", href: "/tests#enquiry-form" },
    { name: "Policy", href: "/policy" },
  ];

  return (
    <footer className="w-full font-sans bg-white font-heading">
      {/* 1. Logo Section (Line Top) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <hr className="border-gray-300 w-full" />
        <div className="flex flex-col items-center py-2 md:py-8">
          {/* Logo Image */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/diagnoslogo.avif"
              alt="Diagnos Labs Logo"
              width={500}
              height={500}
              className="object-contain h-30 w-auto"
            />
            <div className="flex flex-col">
              <p className="text-xs text-black  font-bold uppercase tracking-wider">
                Accurate Diagnostics since 2010
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Red Content Section */}
      <div className="bg-background-primary text-white">
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Tagline */}
            <div className="text-sm md:text-base leading-relaxed">
              <p className="max-w-[280px]">
                Book tests and packages online, choose home collection, and
                access your reports securely anytime.
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:pl-10">
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3 opacity-90">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Hours */}
            <div className="space-y-10">
              <section>
                <h3 className="text-lg font-bold mb-6">Contact Details</h3>
                <div className="space-y-4 opacity-90">
                  <a
                    href="tel:+918404802201"
                    className="flex items-center gap-3 hover:opacity-100"
                  >
                    <Phone size={18} className="fill-white" />
                    <span>+91 8404802201</span>
                  </a>
                  <a
                    href="https://wa.me/+918404802214"
                    className="flex items-center gap-3 hover:opacity-100"
                  >
                    <MessageCircle size={18} className="fill-white" />
                    <span>Whatsapp Support</span>
                  </a>
                  <a
                    href="mailto:info@diagnoslab.in"
                    className="flex items-center gap-3 hover:opacity-100"
                  >
                    <Mail size={18} className="fill-white" />
                    <span>info@diagnoslab.in</span>
                  </a>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-3">Working Hours</h3>
                <p className="text-sm opacity-90">Mon–Sun: 7:30 AM – 7:30 PM</p>
                <p className="text-sm mt-4 italic ">
                  Home collection slots available daily.
                </p>
              </section>
            </div>
          </div>

          {/* 3. Bottom Line (Mirroring Top Line length) */}
          <hr className="border-red-400 w-full mb-6" />

          {/* Copyright Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-4">
            <Link
              href="/policy"
              className="hidden md:block hover:underline opacity-80"
            >
              Policy
            </Link>

            <p className="text-center opacity-80 font-light">
              © 2026 Diagnos Labs. All rights reserved.
            </p>

            {/* Mobile Footer Links */}
            <div className="flex gap-4 md:hidden">
              <Link href="/policy">Policy</Link>
              <span className="opacity-40">|</span>
              <Link href="/contact">Contact Us</Link>
            </div>

            <Link
              href="/contact"
              className="hidden md:block hover:underline opacity-80"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
