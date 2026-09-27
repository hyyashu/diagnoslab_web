import type { WhyPoint } from "@/components/sections/whyPoints";

/* "Why choose us" points shared by the Lab Tests and Health Packages pages. */
export const labWhyPoints: WhyPoint[] = [
  { icon: "house", title: "Home sample collection", text: "Trained phlebotomists collect samples at your doorstep across Jamshedpur." },
  { icon: "microscope", title: "Modern lab equipment", text: "Samples processed on automated analysers for accurate results." },
  { icon: "clock-3", title: "Reports in 6–12 hours", text: "Most reports delivered the same day, depending on the test.", highlight: true },
  { icon: "message-circle", title: "Reports on WhatsApp", text: "Digital reports shared directly on your phone once ready." },
  { icon: "badge-percent", title: "Clear, discounted prices", text: "See the price upfront before you book — no surprises." },
];

export const labWhySubtitle =
  "Accurate pathology testing with fast turnaround — at our centres or from the comfort of your home.";
