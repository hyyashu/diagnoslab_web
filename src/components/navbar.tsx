"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu, Home, FileText, Package,
  Microscope, Handshake, Users, Phone
} from 'lucide-react';
import EnquiryForm from './enquiryForm';
import Modal from './modal';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [openForm, setOpenForm] = useState(false);
  // helper function for active route
  const isActive = (href: string) => {
    const cleanHref = href.split("#")[0];

    // Route match 
    if (pathname === cleanHref || pathname.startsWith(cleanHref + "/")) {
      return true;
    }

    // Section match 
    if (href.includes("#")) {
      const sectionId = href.split("#")[1];
      return activeSection === sectionId;
    }

    return false;
  };


  // Content for the marquee
  const tickerItems = [
    "ISO certified",
    "2500+ verified reviews",
    "15+ Years of trust",
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = [
      "tests-section",
      "packages-section",
      "radiology-section",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'Tests', href: '/tests#tests-section', icon: <FileText size={20} /> },
    { name: 'Packages', href: '/packages#packages-section', icon: <Package size={20} /> },
    { name: 'Radiology', href: '/radiology#radiology-section', icon: <Microscope size={20} /> },
    { name: 'Corporate Tie-ups', href: '/corporate', icon: <Handshake size={20} /> },
    { name: 'About Us', href: '/aboutUs', icon: <Users size={20} /> },
    { name: 'Contact Us', href: '/contact-us', icon: <Phone size={20} /> },
  ];

  return (
    <>
      <nav className="w-full bg-white shadow-sm fixed left-0 right-0 z-[100] font-body">

        {/* --- MARQUEE --- */}
        <div className="block w-full bg-[#C62828] overflow-hidden py-2">
          <div className="flex whitespace-nowrap animate-marquee w-max">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {tickerItems.map((item, index) => (
                  <div key={index} className="flex items-center mx-10">
                    <span className="w-1 h-1 bg-white rounded-full mr-3 opacity-60" />
                    <span className="text-white text-[11px] font-bold uppercase tracking-widest">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-20">

            {/* Mobile */}
            <div className="flex items-center space-x-3 md:hidden">
              <button
                onClick={() => setIsOpen(true)}
                className="text-red-600 focus:outline-none"
              >
                <Menu size={30} strokeWidth={2.5} />
              </button>
              <Link href="/">
                <Image
                  src="/images/diagnoslogo.avif"
                  alt="Diagnos Labs"
                  width={80}
                  height={80}
                  className="h-20 md:h-20 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Logo */}
            <Link href="/" className="hidden md:flex flex-shrink-0 items-center">
              <Image
                src="/images/diagnoslogo.avif"
                alt="Diagnos Labs"
                width={100}
                height={100}
                className="h-24 md:h-30 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-bold transition-colors relative pb-1 ${isActive(link.href)
                      ? 'text-black border-b-2 border-red-600'
                      : 'text-black hover:text-red-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4 lg:space-x-10">
              <button onClick={() => setOpenForm(true)} className="hidden xl:block bg-background-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all shadow-md">
                Book Home Collection
              </button>

              <div className="flex items-center pl-4 lg:pl-10 h-10">
                <Image
                  src="/images/narayanalogo.avif"
                  alt="Diagnos Lab – Diagnostic Centre in Jamshedpur"
                  width={140}
                  height={40}
                  className="h-30 md:h-30 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60] md:hidden transition-opacity"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Side Menu */}
        <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>

          <div className="flex items-center h-16 px-4 border-b border-slate-100">
            <button onClick={() => setIsOpen(false)} className="text-background-primary mr-4">
              <Menu size={30} />
            </button>
            <span className="font-bold text-black text-lg">Menu</span>
          </div>

          <div className="py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-6 py-4 space-x-5 hover:bg-slate-50 transition-colors group"
              >
                <span className={`${isActive(link.href)
                    ? 'text-background-primary'
                    : 'text-black group-hover:text-background-primary'
                  }`}>
                  {link.icon}
                </span>

                <span className={`text-[15px] font-bold ${isActive(link.href)
                    ? 'text-background-primary border-b-2 border-background-primary'
                    : 'text-black'
                  }`}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </aside>
      </nav>
      <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>
        <EnquiryForm formType="home_collection" />
      </Modal>
    </>
  );
};

export default Navbar;