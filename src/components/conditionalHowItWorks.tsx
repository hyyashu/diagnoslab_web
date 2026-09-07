"use client";
import { usePathname } from "next/navigation";
import HowItWorks from "./howItWorks";
export default function ConditionalHowItWorks() {
  const pathname = usePathname();
  if (pathname.startsWith("/corporate")) {
    return null;
  }
  return <HowItWorks />;
}