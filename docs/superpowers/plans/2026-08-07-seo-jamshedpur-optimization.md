# SEO Jamshedpur Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all SEO gaps for Diagnos Lab's Next.js site so every page ranks well for Jamshedpur-specific searches.

**Architecture:** Next.js 16 App Router — metadata is exported from each `page.tsx`, JSON-LD is injected via `<script type="application/ld+json">` server components, and `sitemap.ts` / `robots.ts` are route handlers. No third-party SEO library needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next/navigation`, `@/data/*.json` for dynamic data.

## Global Constraints

- Domain: `https://diagnoslab.in`
- Primary city: Jamshedpur, Jharkhand
- Key local areas: Sakchi, Bistupur, Jugsalai, Adityapur, Mango, Kadma, Golmuri, Telco, Baridih
- All metadata titles follow pattern: `[Service] in Jamshedpur | Diagnos Lab`
- Never use `<img>` — always `next/image`
- No new npm packages — use only what's already installed
- App Router: metadata is a named export `export const metadata: Metadata` or `export async function generateMetadata()`
- JSON-LD components must be server components (no `"use client"`)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/app/layout.tsx` | Modify | Add `metadataBase`, expand global keywords |
| `src/app/page.tsx` | Modify | Add home page `metadata` export |
| `src/app/tests/page.tsx` | Modify | Add tests page `metadata` |
| `src/app/contact/page.tsx` | Modify | Add contact page `metadata` |
| `src/app/aboutUs/page.tsx` | Modify | Add about page `metadata` |
| `src/app/packages/page.tsx` | Modify | Add packages page `metadata` |
| `src/app/corporate/page.tsx` | Modify | Add corporate page `metadata` |
| `src/app/policy/page.tsx` | Modify | Add policy page `metadata` |
| `src/app/sitemap.ts` | Create | Auto-generate sitemap.xml for all routes |
| `src/app/robots.ts` | Create | Auto-generate robots.txt |
| `src/app/components/JsonLd.tsx` | Create | Reusable JSON-LD server component |
| `src/app/layout.tsx` | Modify | Add LocalBusiness JSON-LD to `<body>` |
| `src/app/components/faq.tsx` | Modify | Add FAQPage JSON-LD alongside accordion |
| `src/app/tests/[slug]/page.tsx` | Modify | Add MedicalTest JSON-LD + fix unused variable |
| `src/app/components/hero.tsx` | Modify | Fix generic carousel alt texts |
| `src/app/components/navbar.tsx` | Modify | Fix inconsistent logo alt text |
| `src/app/contact/components/contactSection.tsx` | Modify | Add `<h1>` tag |

---

### Task 1: `metadataBase` + expanded layout metadata

**Files:**
- Modify: `src/app/layout.tsx`

**Why:** Without `metadataBase`, Next.js cannot resolve relative OG image paths to absolute URLs. Crawlers and social previews silently break.

- [ ] **Step 1: Open `src/app/layout.tsx` and add `metadataBase` to the metadata export**

Replace the existing `metadata` export with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://diagnoslab.in"),
  title: {
    default: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    template: "%s | Diagnos Lab",
  },
  description:
    "Diagnos Lab is Jamshedpur's top-rated diagnostic centre in Sakchi. Book blood tests, ultrasound (USG), ECG, X-Ray, and health packages with home sample collection and same-day reports.",
  keywords: [
    "Blood Test in Jamshedpur",
    "Best Lab in Jamshedpur",
    "Diagnostic Center in Jamshedpur",
    "Pathology Lab Jamshedpur",
    "Ultrasound in Jamshedpur",
    "Home Blood Collection Jamshedpur",
    "Lab in Sakchi Jamshedpur",
    "Diagnos Lab Jamshedpur",
    "Blood Test in Sakchi",
    "ECG in Jamshedpur",
    "X-Ray in Jamshedpur",
    "Health Packages Jamshedpur",
  ],
  openGraph: {
    title: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    description:
      "Top-rated diagnostic centre in Sakchi, Jamshedpur. Blood tests, USG, ECG, X-Ray, and health packages with home collection.",
    url: "https://diagnoslab.in",
    siteName: "Diagnos Lab",
    images: [
      {
        url: "/images/diagnoslogo.avif",
        width: 1200,
        height: 630,
        alt: "Diagnos Lab – Diagnostic Centre in Jamshedpur",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnos Lab | Diagnostic Centre in Jamshedpur",
    description:
      "Book blood tests, ultrasound, ECG, and X-Ray at Diagnos Lab in Sakchi, Jamshedpur.",
    images: ["/images/diagnoslogo.avif"],
  },
  alternates: {
    canonical: "https://diagnoslab.in",
  },
};
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors related to `layout.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "seo: add metadataBase and expand global metadata for Jamshedpur"
```

---

### Task 2: Home page metadata

**Files:**
- Modify: `src/app/page.tsx`

**Why:** Home page currently has no metadata export, so it inherits the layout default. We need a home-specific export to set canonical URL and reinforce home page signals.

- [ ] **Step 1: Add metadata export to `src/app/page.tsx`**

The full file becomes:

```tsx
import type { Metadata } from "next";
import WhyDiagnosLab from "./components/whyDiagnos/whyDiagnos";
import PopularTests from "./components/popularTests";
import Packages from "./components/packages";
import HeroSection from "./components/hero";
import RadiologyServices from "./components/radiology/services";

export const metadata: Metadata = {
  title: "Diagnos Lab | Book Blood Test & Ultrasound in Jamshedpur",
  description:
    "Diagnos Lab in Sakchi, Jamshedpur offers blood tests, ultrasound (USG), ECG, X-Ray, PFT, and health packages. Home sample collection available across Jamshedpur. Reports in 6–12 hours.",
  keywords: [
    "Blood Test in Jamshedpur",
    "Diagnostic Center Jamshedpur",
    "Pathology Lab Sakchi",
    "Home Blood Collection Jamshedpur",
    "Ultrasound in Jamshedpur",
    "Best Lab in Jamshedpur",
    "Health Packages Jamshedpur",
    "Lab near me Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in",
  },
  openGraph: {
    title: "Diagnos Lab | Blood Test, Ultrasound & Radiology in Jamshedpur",
    description:
      "Top-rated diagnostic centre in Sakchi, Jamshedpur. Blood tests, USG, ECG, X-Ray, and health packages with home collection.",
    url: "https://diagnoslab.in",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <WhyDiagnosLab />
      <PopularTests />
      <Packages />
      <RadiologyServices />
    </>
  );
}
```

- [ ] **Step 2: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "seo: add home page metadata targeting Jamshedpur"
```

---

### Task 3: Tests, Contact, and About Us page metadata

**Files:**
- Modify: `src/app/tests/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/aboutUs/page.tsx`

- [ ] **Step 1: Add metadata to `src/app/tests/page.tsx`**

```tsx
import type { Metadata } from "next";
import SearchTests from "./components/searchTest";
import PopularTests from "./components/popularTest";
import HeroSection from "../components/hero";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book Blood Tests in Jamshedpur | All Lab Tests | Diagnos Lab",
  description:
    "Browse and book 500+ blood tests and pathology tests at Diagnos Lab in Jamshedpur. Home sample collection, affordable pricing, and same-day digital reports.",
  keywords: [
    "Blood Test in Jamshedpur",
    "Book Lab Test Jamshedpur",
    "Pathology Test Jamshedpur",
    "Complete Blood Count Jamshedpur",
    "Thyroid Test Jamshedpur",
    "Diabetes Test Jamshedpur",
    "Liver Function Test Jamshedpur",
    "Home Sample Collection Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/tests",
  },
  openGraph: {
    title: "Book Blood Tests in Jamshedpur | Diagnos Lab",
    description:
      "Browse 500+ lab tests. Book with home sample collection at Diagnos Lab, Sakchi, Jamshedpur.",
    url: "https://diagnoslab.in/tests",
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div>Loading tests…</div>}>
        <PopularTests />
        <SearchTests />
      </Suspense>
    </>
  );
}
```

- [ ] **Step 2: Add metadata to `src/app/contact/page.tsx`**

```tsx
import type { Metadata } from "next";
import ContactSection from "./components/contactSection";

export const metadata: Metadata = {
  title: "Contact Diagnos Lab in Jamshedpur | Book a Test",
  description:
    "Contact Diagnos Lab in Sakchi, Jamshedpur for test bookings, home sample collection, corporate wellness, or report queries. Call +91 8404802201.",
  keywords: [
    "Contact Diagnos Lab",
    "Book Blood Test Jamshedpur",
    "Diagnostic Lab Contact Jamshedpur",
    "Home Collection Booking Jamshedpur",
    "Lab Phone Number Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/contact",
  },
  openGraph: {
    title: "Contact Diagnos Lab | Book Tests in Jamshedpur",
    description:
      "Reach Diagnos Lab in Sakchi, Jamshedpur for bookings and queries.",
    url: "https://diagnoslab.in/contact",
  },
};

export default function Page() {
  return <ContactSection />;
}
```

- [ ] **Step 3: Add metadata to `src/app/aboutUs/page.tsx`**

```tsx
import type { Metadata } from "next";
import AboutCard from "./components/aboutCard";

export const metadata: Metadata = {
  title: "About Diagnos Lab | Diagnostic Centre in Jamshedpur Since 2009",
  description:
    "Learn about Diagnos Lab — Jamshedpur's trusted diagnostic centre for 15+ years. NABL-quality testing, 4.9-star Google rating, and a patient-first team in Sakchi.",
  keywords: [
    "About Diagnos Lab",
    "Best Diagnostic Center Jamshedpur",
    "Trusted Pathology Lab Jamshedpur",
    "NABL Lab Jamshedpur",
    "Diagnos Lab History",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/aboutUs",
  },
  openGraph: {
    title: "About Diagnos Lab | Trusted Diagnostic Centre in Jamshedpur",
    description:
      "15+ years of diagnostic excellence in Jamshedpur. 4.9-star rating, in-house pathologist, same-day reports.",
    url: "https://diagnoslab.in/aboutUs",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-background-primary relative overflow-hidden py-14 px-4 md:px-12">
      <div className="max-w-5xl mx-auto space-y-10 relative z-10">
        <AboutCard
          title="Who We Are"
          description={`Diagnos Lab is a trusted diagnostic centre in Jamshedpur, built on accuracy, transparency, and patient care. For over 15 years, we have supported doctors, families, and organisations with reliable diagnostic services that help in early detection and better treatment decisions.
                        From routine blood tests to advanced radiology and cardiac diagnostics, we bring all essential diagnostic services under one roof.`}
          image="/images/about/about1.avif"
        />
        <AboutCard
          title="Our Journey"
          reverse
          description={`What started as a small collection centre has grown into a full-service laboratory trusted by millions of patients. Over the years, Diagnos Lab has evolved with modern technology, strict quality standards, and a patient-first approach that remains unchanged.
                        Today, we are proud to serve Jamshedpur with a strong reputation built on consistent reporting, ethical practices, and long-term trust.`}
          image="/images/about/about3.avif"
        />
        <AboutCard
          title="Why Patients Trust Diagnos Lab"
          description={[
            "15+ years of diagnostic excellence",
            "4.9-star Google rating with 2500+ reviews",
            "In-house pathologist for quality control",
            "Experienced medical and technical team",
            "Fast turnaround time for most tests",
            "Clear digital reports on WhatsApp",
          ]}
          image="/images/about/about3.avif"
        />
        <div className="bg-white rounded-2xl p-6 text-center shadow-md">
          <h2 className="font-heading text-black text-2xl md:text-4xl font-extrabold">Our Presence</h2>
          <p className="font-body text-gray-700 text-sm md:text-base">
            We receive samples from all over Jharkhand.
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/tests/page.tsx src/app/contact/page.tsx src/app/aboutUs/page.tsx
git commit -m "seo: add metadata for tests, contact, and about pages"
```

---

### Task 4: Packages, Corporate, and Policy page metadata

**Files:**
- Modify: `src/app/packages/page.tsx`
- Modify: `src/app/corporate/page.tsx`
- Modify: `src/app/policy/page.tsx`

- [ ] **Step 1: Add metadata to `src/app/packages/page.tsx`**

```tsx
import type { Metadata } from "next";
import PackagesScreen from "./components/packagesScreen";
import HeroSection from "../components/hero";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Health Packages in Jamshedpur | Full Body Checkup | Diagnos Lab",
  description:
    "Book affordable health checkup packages at Diagnos Lab in Jamshedpur. Full body checkup, thyroid profile, diabetes panel, cardiac profile, and more with home collection.",
  keywords: [
    "Health Packages Jamshedpur",
    "Full Body Checkup Jamshedpur",
    "Health Checkup Jamshedpur",
    "Preventive Health Package Jamshedpur",
    "Thyroid Profile Jamshedpur",
    "Diabetes Package Jamshedpur",
    "Affordable Health Test Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/packages",
  },
  openGraph: {
    title: "Health Packages in Jamshedpur | Diagnos Lab",
    description:
      "Affordable full body checkup and health packages with home collection at Diagnos Lab, Jamshedpur.",
    url: "https://diagnoslab.in/packages",
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div>Loading packages…</div>}>
        <PackagesScreen />
      </Suspense>
    </>
  );
}
```

- [ ] **Step 2: Add metadata to `src/app/corporate/page.tsx`**

```tsx
import type { Metadata } from "next";
import HeroSection from "./components/hero";
import OurPartners from "./components/ourPatners";
import WhyPartner from "./components/whyPartner";

export const metadata: Metadata = {
  title: "Corporate Health Testing in Jamshedpur | Diagnos Lab",
  description:
    "Partner with Diagnos Lab for corporate wellness and employee health check programmes in Jamshedpur. Flexible on-site and in-lab testing for companies in Jharkhand.",
  keywords: [
    "Corporate Health Checkup Jamshedpur",
    "Employee Health Testing Jamshedpur",
    "Corporate Wellness Jamshedpur",
    "Bulk Health Testing Jharkhand",
    "Corporate Lab Partner Jamshedpur",
  ],
  alternates: {
    canonical: "https://diagnoslab.in/corporate",
  },
  openGraph: {
    title: "Corporate Health Testing in Jamshedpur | Diagnos Lab",
    description:
      "Employee health check and corporate wellness programmes at Diagnos Lab, Jamshedpur.",
    url: "https://diagnoslab.in/corporate",
  },
};

export default function Page() {
  return (
    <>
      <HeroSection />
      <OurPartners />
      <WhyPartner />
    </>
  );
}
```

- [ ] **Step 3: Add metadata to `src/app/policy/page.tsx`**

Read the current contents of `src/app/policy/page.tsx` first, then prepend the metadata export and `import type { Metadata }` line. The content block of the page component stays unchanged. Resulting file structure:

```tsx
import type { Metadata } from "next";
// ... existing imports ...

export const metadata: Metadata = {
  title: "Privacy Policy | Diagnos Lab Jamshedpur",
  description:
    "Read the privacy policy of Diagnos Lab, Jamshedpur. We are committed to protecting patient data and maintaining confidentiality.",
  alternates: {
    canonical: "https://diagnoslab.in/policy",
  },
  robots: {
    index: true,
    follow: false,
  },
};

// ... existing default export ...
```

- [ ] **Step 4: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/packages/page.tsx src/app/corporate/page.tsx src/app/policy/page.tsx
git commit -m "seo: add metadata for packages, corporate, and policy pages"
```

---

### Task 5: sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

**Why:** Without a sitemap, Googlebot must discover pages by crawling links. A sitemap guarantees all pages are indexed and provides freshness signals.

- [ ] **Step 1: Read the tests data to get the total test slugs count**

```bash
cat "/Users/hyyashu/Lab Website/Dignoslab_temp/src/data/tests.json" | python3 -c "import json,sys; d=json.load(sys.stdin); print(len(d['tests'])); print(d['tests'][0])"
```

Note the number of tests and the field name (`Slug`) for the next step.

- [ ] **Step 2: Create `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import tests from "@/data/tests.json";

const BASE = "https://diagnoslab.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tests`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/ultrasound-in-jamshedpur`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/radiology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ecg`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/xray`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/packages`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/aboutUs`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/corporate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const testRoutes: MetadataRoute.Sitemap = tests.tests.map((test) => ({
    url: `${BASE}/tests/${test.Slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...testRoutes];
}
```

- [ ] **Step 3: Verify sitemap generates at the correct URL**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no type errors on the new file.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "seo: add sitemap.ts covering all static and test detail routes"
```

---

### Task 6: robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://diagnoslab.in/sitemap.xml",
  };
}
```

- [ ] **Step 2: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "seo: add robots.ts pointing to sitemap"
```

---

### Task 7: JSON-LD — LocalBusiness structured data

**Files:**
- Create: `src/app/components/JsonLd.tsx`
- Modify: `src/app/layout.tsx`

**Why:** Google's rich results for local businesses pull from `LocalBusiness` (or `MedicalBusiness`) JSON-LD. This is the single highest-impact structured data change for local SEO in Jamshedpur.

- [ ] **Step 1: Create `src/app/components/JsonLd.tsx`**

This is a server component — no `"use client"` directive.

```tsx
interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Add `JsonLd` with LocalBusiness schema to `src/app/layout.tsx`**

Import `JsonLd` at the top:

```tsx
import JsonLd from "./components/JsonLd";
```

Add the schema object (place this as a `const` above the `RootLayout` function, after the font declarations):

```tsx
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Diagnos Lab",
  alternateName: "Diagnos Laboratory Jamshedpur",
  url: "https://diagnoslab.in",
  logo: "https://diagnoslab.in/images/diagnoslogo.avif",
  image: "https://diagnoslab.in/images/diagnoslogo.avif",
  description:
    "Diagnos Lab is a top-rated diagnostic centre in Sakchi, Jamshedpur offering blood tests, ultrasound, ECG, X-Ray, PFT, and health packages with home sample collection.",
  telephone: "+918404802201",
  email: "info@diagnoslab.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sakchi",
    addressLocality: "Jamshedpur",
    addressRegion: "Jharkhand",
    postalCode: "831001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.8046,
    longitude: 86.2029,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "13:00",
    },
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2500",
    bestRating: "5",
  },
  sameAs: [
    "https://wa.me/918404802214",
  ],
  areaServed: [
    "Jamshedpur", "Sakchi", "Bistupur", "Jugsalai", "Adityapur",
    "Mango", "Kadma", "Golmuri", "Telco", "Baridih", "Sonari",
  ],
  medicalSpecialty: [
    "Pathology", "Radiology", "Cardiology",
  ],
  availableService: [
    { "@type": "MedicalTest", name: "Blood Test" },
    { "@type": "MedicalTest", name: "Ultrasound (USG)" },
    { "@type": "MedicalTest", name: "ECG" },
    { "@type": "MedicalTest", name: "X-Ray" },
    { "@type": "MedicalTest", name: "PFT" },
  ],
};
```

Then inside `RootLayout`, add `<JsonLd data={localBusinessSchema} />` as the first child of `<body>`:

```tsx
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <JsonLd data={localBusinessSchema} />
  <Navbar />
  ...
</body>
```

- [ ] **Step 3: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/JsonLd.tsx src/app/layout.tsx
git commit -m "seo: add LocalBusiness JSON-LD structured data for Jamshedpur"
```

---

### Task 8: JSON-LD — FAQPage structured data

**Files:**
- Modify: `src/app/components/faq.tsx`

**Why:** FAQPage schema enables Google FAQ rich results — accordion-style answers appear directly in search results, dramatically increasing CTR for Jamshedpur queries.

- [ ] **Step 1: Extract the FAQ data to a separate server component wrapper**

The current `faq.tsx` is `"use client"`. We need to inject JSON-LD without making layout server-component aware of client state. The cleanest approach: add a sibling server component `src/app/components/FaqJsonLd.tsx`:

```tsx
import JsonLd from "./JsonLd";

const faqItems = [
  {
    question: "How fast will I get my reports?",
    answer: "Most reports are delivered within 6 to 12 hours depending on the test type.",
  },
  {
    question: "Do you provide home sample collection?",
    answer: "Yes, we offer professional home collection services across Jamshedpur including Sakchi, Bistupur, Mango, Kadma, Jugsalai, and surrounding areas.",
  },
  {
    question: "Do I need an appointment?",
    answer: "No, walk-ins are welcome at our Sakchi centre, but booking ahead saves you time.",
  },
  {
    question: "Are reports digital?",
    answer: "Yes, all reports are available digitally via our portal and delivered on WhatsApp and email.",
  },
  {
    question: "What services do you provide in Jamshedpur?",
    answer: "Diagnos Lab in Jamshedpur offers blood tests, ultrasound (USG), ECG, digital X-Ray, PFT, and affordable health packages with home sample collection.",
  },
  {
    question: "Where is Diagnos Lab located in Jamshedpur?",
    answer: "Diagnos Lab is located in Sakchi, Jamshedpur, Jharkhand. We also serve Bistupur, Mango, Kadma, Jugsalai, Adityapur, Golmuri, Telco, and Baridih.",
  },
];

export default function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}
```

- [ ] **Step 2: Update `src/app/components/faq.tsx` — add two more Jamshedpur-specific FAQ entries and keep the same accordion UI**

The `faqData` array inside `faq.tsx` should be expanded to match the items in `FaqJsonLd.tsx` (both must stay in sync):

```tsx
const faqData = [
  { question: "How fast will I get my reports?", answer: "Most reports are delivered within 6 to 12 hours depending on the test type." },
  { question: "Do you provide home sample collection?", answer: "Yes, we offer professional home collection services across Jamshedpur including Sakchi, Bistupur, Mango, Kadma, Jugsalai, and surrounding areas." },
  { question: "Do I need an appointment?", answer: "No, walk-ins are welcome at our Sakchi centre, but booking ahead saves you time." },
  { question: "Are reports digital?", answer: "Yes, all reports are available digitally via our portal and delivered on WhatsApp and email." },
  { question: "What services do you provide in Jamshedpur?", answer: "Diagnos Lab in Jamshedpur offers blood tests, ultrasound (USG), ECG, digital X-Ray, PFT, and affordable health packages with home sample collection." },
  { question: "Where is Diagnos Lab located in Jamshedpur?", answer: "Diagnos Lab is located in Sakchi, Jamshedpur, Jharkhand. We also serve Bistupur, Mango, Kadma, Jugsalai, Adityapur, Golmuri, Telco, and Baridih." },
];
```

- [ ] **Step 3: Add `<FaqJsonLd />` to `src/app/layout.tsx`**

Import at top:
```tsx
import FaqJsonLd from "./components/FaqJsonLd";
```

Add inside `<main>` just before `<FAQAccordion />`:

```tsx
<FaqJsonLd />
<FAQAccordion />
```

- [ ] **Step 4: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/FaqJsonLd.tsx src/app/components/faq.tsx src/app/layout.tsx
git commit -m "seo: add FAQPage JSON-LD and expand FAQ with Jamshedpur-specific answers"
```

---

### Task 9: JSON-LD — MedicalTest on test detail pages + fix unused variable

**Files:**
- Modify: `src/app/tests/[slug]/page.tsx`

**Why:** Each test detail page already generates good metadata. Adding `MedicalTest` schema makes the page eligible for rich results when someone searches e.g. "CBC test Jamshedpur".

The current file also has a bug: `description` is computed on line 30 but then overridden by a hardcoded string on line 33 — the computed variable is never used.

- [ ] **Step 1: Fix the unused `description` variable and add JSON-LD to `src/app/tests/[slug]/page.tsx`**

Full replacement of the `Page` default export section (keep `generateStaticParams` and `generateMetadata` exactly as-is, just fix the bug inside `generateMetadata` and extend the `Page` component):

Inside `generateMetadata`, replace lines 30–33:
```tsx
// BEFORE (bug: description computed but unused)
const description =
  test.Description ||
  `Book ${test.TestName} in Jamshedpur with home sample collection and same day reporting.`;

return {
  ...
  description: `Book ${test.TestName} Test in Jamshedpur at Diagnos Lab. Home sample collection, same day report , affordable pricing and trusted lab in jamshedpur.`,
```

```tsx
// AFTER (single source of truth)
const description = `Book ${test.TestName} test in Jamshedpur at Diagnos Lab. Home sample collection, same-day reports, affordable pricing, and trusted pathology lab in Sakchi.`;

return {
  ...
  description,
```

Then in the `Page` component, add JSON-LD before the return:

```tsx
import JsonLd from "../../components/JsonLd";

// inside Page():
const testSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalTest",
  name: test.TestName,
  url: `https://diagnoslab.in/tests/${test.Slug}`,
  description: `${test.TestName} available at Diagnos Lab, Jamshedpur with home sample collection and same-day digital reports.`,
  usesDevice: {
    "@type": "MedicalDevice",
    name: "Clinical Laboratory Analyser",
  },
  usedToDiagnose: test.Categories?.join(", ") ?? "",
  provider: {
    "@type": "MedicalBusiness",
    name: "Diagnos Lab",
    url: "https://diagnoslab.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jamshedpur",
      addressRegion: "Jharkhand",
      addressCountry: "IN",
    },
  },
};

return (
  <>
    <JsonLd data={testSchema} />
    <DetailCard kind="test" data={entity} />
    <SimilarTests currentSlug={slug} />
  </>
);
```

- [ ] **Step 2: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/tests/\[slug\]/page.tsx
git commit -m "seo: add MedicalTest JSON-LD to test detail pages, fix unused description variable"
```

---

### Task 10: Fix image alt texts

**Files:**
- Modify: `src/app/components/hero.tsx`
- Modify: `src/app/components/navbar.tsx`

**Why:** Generic alts like `Slide 1` and `Narayana Diagnostic` give search engines no signal. Descriptive alts improve image search visibility and accessibility.

- [ ] **Step 1: Fix carousel alts in `src/app/components/hero.tsx`**

Replace the `carouselImages` array (currently just paths) with an array of objects:

```tsx
const carouselSlides = [
  { src: "/images/hero/hero1.avif", alt: "Blood test home collection service in Jamshedpur – Diagnos Lab" },
  { src: "/images/hero/hero2.avif", alt: "Ultrasound and radiology services at Diagnos Lab, Sakchi Jamshedpur" },
  { src: "/images/hero/hero3.avif", alt: "Diagnostic centre in Jamshedpur – affordable tests with fast reports" },
];
```

Update the Swiper map from `carouselImages.map` to `carouselSlides.map` and change:
```tsx
// BEFORE
{carouselImages.map((src, index) => (
  <SwiperSlide key={index}>
    <div className="relative h-full w-full">
      <Image src={src} alt={`Slide ${index + 1}`} ...

// AFTER
{carouselSlides.map((slide, index) => (
  <SwiperSlide key={index}>
    <div className="relative h-full w-full">
      <Image src={slide.src} alt={slide.alt} ...
```

Also update the pagination buttons map from `carouselImages.map` to `carouselSlides.map`.

- [ ] **Step 2: Fix navbar logo alt in `src/app/components/navbar.tsx` line 167**

```tsx
// BEFORE
alt="Narayana Diagnostic"

// AFTER
alt="Diagnos Lab – Diagnostic Centre in Jamshedpur"
```

- [ ] **Step 3: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/components/hero.tsx src/app/components/navbar.tsx
git commit -m "seo: fix generic image alt texts with descriptive Jamshedpur-specific alts"
```

---

### Task 11: Fix contact page H1

**Files:**
- Modify: `src/app/contact/components/contactSection.tsx`

**Why:** The contact page has no `<h1>`. Search engines use H1 as a primary relevance signal. The current `<h2>` heading should be elevated to `<h1>`.

- [ ] **Step 1: Change the `<h2>` to `<h1>` in `src/app/contact/components/contactSection.tsx`**

```tsx
// BEFORE (line ~15)
<h2 className="font-heading text-3xl md:text-4xl font-extrabold mt-2">
  Talk to Diagnos Labs
</h2>

// AFTER
<h1 className="font-heading text-3xl md:text-4xl font-extrabold mt-2">
  Contact Diagnos Lab in Jamshedpur
</h1>
```

- [ ] **Step 2: Compile check**

```bash
cd "/Users/hyyashu/Lab Website/Dignoslab_temp" && npx tsc --noEmit 2>&1 | head -20
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/components/contactSection.tsx
git commit -m "seo: add H1 to contact page targeting Jamshedpur"
```

---

## Self-Review Checklist

- [x] `metadataBase` added → OG images resolve to absolute URLs
- [x] 7 pages without metadata all get unique, Jamshedpur-targeted exports
- [x] `sitemap.ts` covers all static routes + all test slugs dynamically
- [x] `robots.ts` points to sitemap, blocks `/api/` and `/_next/`
- [x] `LocalBusiness` JSON-LD in layout — covers every page
- [x] `FAQPage` JSON-LD — eligible for FAQ rich results
- [x] `MedicalTest` JSON-LD on test detail pages — eligible for medical rich results
- [x] Hero carousel alts are descriptive and geo-targeted
- [x] Navbar logo alt fixed
- [x] Contact page H1 added
- [x] `description` variable bug in test detail page fixed
- [x] No new npm packages introduced
- [x] All JSON-LD components are server components (no `"use client"`)
- [x] `title.template` in layout means subpage titles auto-append `| Diagnos Lab`
