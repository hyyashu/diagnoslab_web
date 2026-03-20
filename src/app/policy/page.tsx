"use client";

import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white ">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Heading */}
        <h1 className="text-3xl font-heading md:text-4xl font-bold mb-6 text-black">
          Privacy Policy
        </h1>

        {/* Content */}
        <div className="space-y-8 text-black leading-relaxed">

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              1. Introduction
            </h2>
            <p className="font-body">
              We value your privacy and are committed to protecting your personal
              information. This Privacy Policy explains how we collect, use, and
              safeguard your data when you use our website and services.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal details (name, phone number, email)</li>
              <li>Health-related information (for diagnostic services)</li>
              <li>Payment and billing information</li>
              <li>Usage data (browser type, pages visited)</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and manage diagnostic services</li>
              <li>To communicate reports and updates</li>
              <li>To improve our services and user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              4. Data Sharing
            </h2>
            <p className="font-body">
              We do not sell your personal data. We may share your information
              with trusted partners such as laboratories, payment providers, and
              legal authorities when required.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              5. Data Security
            </h2>
            <p className="font-body">
              We implement appropriate security measures to protect your data
              against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              6. Cookies
            </h2>
            <p className="font-body">
              Our website may use cookies to enhance user experience and analyze
              traffic. You can disable cookies through your browser settings.
            </p>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              7. Your Rights
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          {/* Section */}
          <section>
            <h2 className="text-xl font-heading font-semibold mb-2 text-black">
              8. Changes to This Policy
            </h2>
            <p className="font-body">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated date.
            </p>
          </section>

          

        </div>
      </div>
    </div>
  );
}