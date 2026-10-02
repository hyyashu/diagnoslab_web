import { redirect } from "next/navigation";

/* The old paid landing page is switched off until the new design is
   ready. Ads that still point here land on Book a Test instead of a 404.
   The previous page is kept below, commented out, for reference; the
   components it used (CallLink, StickyCallBar, LpLeadForm) were deleted. */
export default function Page() {
  redirect("/book-a-test/");
}

// import type { Metadata } from "next";
// import { Clock, Home, FileText, ShieldCheck, Star, MapPin } from "lucide-react";
// import testsData from "@/data/tests.json";
// import areasData from "@/data/areasServed.json";
// import CallLink from "../../components/callLink";
// import StickyCallBar from "../../components/stickyCallBar";
// import LpLeadForm from "../../components/lpLeadForm";
//
// /* A paid page must not compete with /book-a-test in organic search, and
//    there is nothing here for a crawler to index that the site does not
//    already say elsewhere. */
// export const metadata: Metadata = {
//   title: "Blood Test at Home in Jamshedpur | Diagnos Lab",
//   description:
//     "Book a blood test at home in Jamshedpur. A Diagnos Lab phlebotomist collects your sample at your door and your digital report reaches you the same evening.",
//   robots: { index: false, follow: false },
//   alternates: { canonical: undefined },
// };
//
// type Test = (typeof testsData.tests)[number];
//
// const FEATURED_SLUGS = [
//   "complete-blood-count",
//   "blood-sugar-fasting",
//   "hba1c-test",
//   "tsh",
//   "vitamin-d",
//   "vitamin-b12",
//   "cholestrol",
//   "creatinine",
// ];
//
// const featured = FEATURED_SLUGS.map((slug) =>
//   testsData.tests.find((t) => t.Slug === slug),
// ).filter((t): t is Test => Boolean(t));
//
// const steps = [
//   {
//     icon: Clock,
//     title: "Tell us when",
//     body: "Call or leave your number. We fix a slot between 7:30 am and 8 pm, and tell you if the test needs fasting.",
//   },
//   {
//     icon: Home,
//     title: "We come to you",
//     body: "A trained phlebotomist arrives at your door with a sealed, single-use collection kit.",
//   },
//   {
//     icon: FileText,
//     title: "Report the same evening",
//     body: "Your digital report reaches your phone. Most routine tests are back within hours.",
//   },
// ];
//
// export default function BloodTestAtHomePage() {
//   return (
//     <main className="pb-24 md:pb-0">
//       {/* --- OFFER + CONVERSION --- */}
//       <section className="bg-slate-50">
//         <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2 md:gap-12 md:py-16">
//           <div>
//             <h1 className="font-heading text-3xl leading-tight font-black text-slate-900 md:text-4xl lg:text-5xl">
//               Blood test at home in Jamshedpur
//             </h1>
//             <p className="mt-4 font-body text-base leading-relaxed text-slate-700 md:text-lg">
//               A Diagnos Lab phlebotomist collects your sample at your door,
//               anywhere in the city. Your digital report reaches you the same
//               evening. No queue, no travel, no waiting room.
//             </p>
//
//             <div className="mt-7 flex flex-col gap-3 sm:flex-row">
//               <CallLink className="inline-flex items-center justify-center gap-2 rounded-xl bg-background-primary px-7 py-4 font-heading text-base font-black text-white transition-opacity hover:opacity-90">
//                 Call 8404802214
//               </CallLink>
//               <a
//                 href="#book"
//                 className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-4 font-heading text-base font-bold text-slate-900 transition-colors hover:border-slate-500"
//               >
//                 Request a call back
//               </a>
//             </div>
//
//             <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 font-body text-sm text-slate-700 sm:grid-cols-3">
//               <li className="flex items-center gap-2">
//                 <ShieldCheck
//                   className="h-4 w-4 shrink-0 text-background-primary"
//                   aria-hidden="true"
//                 />
//                 ISO certified
//               </li>
//               <li className="flex items-center gap-2">
//                 <Star
//                   className="h-4 w-4 shrink-0 text-background-primary"
//                   aria-hidden="true"
//                 />
//                 3000+ reviews
//               </li>
//               <li className="flex items-center gap-2">
//                 <Clock
//                   className="h-4 w-4 shrink-0 text-background-primary"
//                   aria-hidden="true"
//                 />
//                 15+ years
//               </li>
//             </ul>
//           </div>
//
//           <div id="book" className="scroll-mt-6">
//             <LpLeadForm />
//           </div>
//         </div>
//       </section>
//
//       {/* --- THE VISIT: a real three-step sequence --- */}
//       <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
//         <h2 className="font-heading text-2xl font-black text-slate-900 md:text-3xl">
//           How the home visit works
//         </h2>
//         <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-8">
//           {steps.map((step, i) => (
//             <li key={step.title} className="flex gap-4">
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background-primary/10">
//                 <step.icon
//                   className="h-5 w-5 text-background-primary"
//                   aria-hidden="true"
//                 />
//               </div>
//               <div>
//                 <p className="font-body text-sm font-bold text-slate-400">
//                   Step {i + 1}
//                 </p>
//                 <h3 className="mt-0.5 font-heading text-lg font-bold text-slate-900">
//                   {step.title}
//                 </h3>
//                 <p className="mt-1.5 font-body text-sm leading-relaxed text-slate-600">
//                   {step.body}
//                 </p>
//               </div>
//             </li>
//           ))}
//         </ol>
//       </section>
//
//       {/* --- PRICES --- */}
//       <section className="bg-slate-50 py-12 md:py-16">
//         <div className="mx-auto max-w-6xl px-4">
//           <h2 className="font-heading text-2xl font-black text-slate-900 md:text-3xl">
//             Tests people book at home
//           </h2>
//           <p className="mt-2 font-body text-sm text-slate-600 md:text-base">
//             Same prices as walking into the Sakchi centre.
//           </p>
//
//           <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             {featured.map((test) => (
//               <li
//                 key={test.Slug}
//                 className="rounded-xl border border-slate-200 bg-white p-4"
//               >
//                 <h3 className="font-heading text-base font-bold text-slate-900">
//                   {test.TestName}
//                 </h3>
//                 <p className="mt-2 flex items-baseline gap-2">
//                   <span className="font-heading text-xl font-black text-slate-900">
//                     &#8377;{Number(test.DiscountedPrice)}
//                   </span>
//                   {Number(test.DiscountedPrice) < Number(test.Price) && (
//                     <span className="font-body text-sm text-slate-400 line-through">
//                       &#8377;{Number(test.Price)}
//                     </span>
//                   )}
//                 </p>
//                 <p className="mt-2 font-body text-xs text-slate-500">
//                   {test.Fasting === "Not Required"
//                     ? "No fasting needed"
//                     : "Fasting required"}
//                 </p>
//               </li>
//             ))}
//           </ul>
//
//           <p className="mt-6 font-body text-sm text-slate-600">
//             Booking something else? Call{" "}
//             <CallLink
//               showIcon={false}
//               className="font-bold text-background-primary underline underline-offset-2"
//             >
//               8404802214
//             </CallLink>{" "}
//             and we&apos;ll quote it.
//           </p>
//         </div>
//       </section>
//
//       {/* --- COVERAGE --- */}
//       <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
//         <h2 className="font-heading text-2xl font-black text-slate-900 md:text-3xl">
//           We collect across {areasData.city}
//         </h2>
//         <ul className="mt-6 flex flex-wrap gap-2">
//           {areasData.areas.map((area) => (
//             <li
//               key={area.slug}
//               className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 font-body text-sm text-slate-700"
//             >
//               <MapPin
//                 className="h-3.5 w-3.5 shrink-0 text-slate-400"
//                 aria-hidden="true"
//               />
//               {area.name}
//             </li>
//           ))}
//         </ul>
//       </section>
//
//       {/* --- CLOSING CTA --- */}
//       <section className="bg-slate-900 py-12 md:py-16">
//         <div className="mx-auto max-w-3xl px-4 text-center">
//           <h2 className="font-heading text-2xl font-black text-white md:text-3xl">
//             Book today, report by this evening
//           </h2>
//           <p className="mt-3 font-body text-base text-slate-300">
//             Lines are open 7:30 am to 8 pm, all week.
//           </p>
//           <CallLink className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-background-primary px-8 py-4 font-heading text-base font-black text-white transition-opacity hover:opacity-90">
//             Call 8404802214
//           </CallLink>
//         </div>
//       </section>
//
//       <StickyCallBar />
//     </main>
//   );
// }
