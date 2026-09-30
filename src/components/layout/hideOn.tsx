"use client";

import { usePathname } from "next/navigation";

/* Shared end-of-page blocks from the site layout that redesigned pages
   replace with their own sections. */
export default function HideOn({
  paths,
  prefixes = [],
  children,
}: {
  paths: string[];
  /* Hide under these too, e.g. "/packages/" for every package page. */
  prefixes?: string[];
  children: React.ReactNode;
}) {
  const path = usePathname().replace(/\/$/, "") || "/";
  if (paths.includes(path) || prefixes.some((p) => path.startsWith(p))) return null;
  return <>{children}</>;
}
