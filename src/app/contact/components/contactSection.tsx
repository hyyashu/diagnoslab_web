"use client";

import ContactCard from "./contactCard";
import ContactFormCard from "./contactFormCard";

export default function ContactSection() {
  return (
    <section className="relative mt-8  bg-background-primary text-white py-12 px-4 overflow-hidden">

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Heading */}
        <p className="font-heading text-sm md:text-base font-extrabold ">Contact Us</p>

        <h2 className="font-heading text-3xl md:text-4xl font-extrabold mt-2">
          Talk to Diagnos Labs
        </h2>

        <p className="font-body text-sm md:text-base mt-2 opacity-90 max-w-xl mx-auto">
          For bookings, corporate wellness, home collection support,
          or report queries.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <ContactCard
            title="Get in Touch"
            subtitle="We're here to help you anytime."
            phoneNumbers={[
              "+91 8404802201",
              "+91 8404802214",
            ]}
            email="infor@diagnoslab.in"
            buttonText="Contact Now"
          />

          <ContactFormCard />
        </div>
      </div>
    </section>
  );
}