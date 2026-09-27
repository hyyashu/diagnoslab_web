"use client";

import { usePathname } from "next/navigation";

/* Shared end-of-page blocks from the site layout that redesigned pages
   replace with their own sections. */
export default function HideOn({
  paths,
  children,
}: {
  paths: string[];
  children: React.ReactNode;
}) {
  const path = usePathname().replace(/\/$/, "") || "/";
  if (paths.includes(path)) return null;
  return <>{children}</>;
}
