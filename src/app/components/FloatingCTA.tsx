"use client";

import React, { useState, useEffect } from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import EnquiryForm from "./enquiryForm";
import Modal from "./modal";

interface FloatingCTAProps {
  phoneNumber: string;      // +919876543210
  whatsappNumber: string;   // 919876543210 (no +)
}

export default function FloatingCTA({
  phoneNumber,
  whatsappNumber,
}: FloatingCTAProps) {

  const [openForm, setOpenForm] = useState(false);


  /* Scroll Lock */
  useEffect(() => {
    if (openForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openForm]);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <>
      <div id="contact" className="fixed bottom-24 md:bottom-6 right-6 z-50 flex flex-col gap-3 items-end">

        {/* Call Button (Mobile Only) */}
        <button
          onClick={handleCall}
          className="md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="Call"
        >
          <PhoneIcon className="w-6 h-6" />
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          aria-label="WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6 fill-white"
          >
            <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.88.75 5.585 2.063 7.936L0 32l7.87-2.048a15.93 15.93 0 0 0 8.13 2.244c8.837 0 16-7.164 16-16S24.837.396 16 .396zm0 29.156a13.02 13.02 0 0 1-6.648-1.828l-.475-.281-4.67 1.216 1.247-4.555-.31-.47A13.01 13.01 0 0 1 2.98 16.396c0-7.182 5.838-13.02 13.02-13.02 7.182 0 13.02 5.838 13.02 13.02 0 7.182-5.838 13.02-13.02 13.02zm7.12-9.78c-.39-.195-2.304-1.137-2.66-1.267-.356-.13-.615-.195-.874.195-.26.39-1.003 1.267-1.23 1.527-.227.26-.455.293-.844.098-.39-.195-1.645-.607-3.134-1.937-1.158-1.033-1.94-2.307-2.167-2.697-.227-.39-.024-.6.17-.794.175-.174.39-.455.585-.683.195-.227.26-.39.39-.65.13-.26.065-.488-.032-.683-.098-.195-.874-2.108-1.198-2.888-.315-.756-.635-.653-.874-.665l-.745-.013c-.26 0-.683.098-1.04.488-.356.39-1.365 1.333-1.365 3.25 0 1.918 1.398 3.773 1.593 4.033.195.26 2.75 4.198 6.66 5.887.93.4 1.655.638 2.222.816.933.296 1.782.254 2.453.154.748-.112 2.304-.94 2.63-1.848.325-.907.325-1.684.227-1.848-.098-.163-.357-.26-.746-.455z" />
          </svg>
        </button>

      </div>

      {/* Vertical Request a Call CTA */}
      <button
        onClick={() => setOpenForm(true)}
        className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-orange-500 text-white px-3 py-6 rounded-r-lg shadow-lg hover:bg-orange-600 transition"
      >
        <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-medium tracking-wide">
          Request a Call
        </span>
      </button>

      {/* Popup Form */}
      <Modal isOpen={openForm} onClose={() => setOpenForm(false)}>

        <EnquiryForm formType="enquiry_form" />
      </Modal>
    </>
  );
}
