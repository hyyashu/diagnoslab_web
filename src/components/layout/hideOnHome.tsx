"use client";

import { usePathname } from "next/navigation";

/* The shared end-of-page blocks (find us, areas, reviews, how it works)
   that the home page replaces with its own sections. */
export default function HideOnHome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
