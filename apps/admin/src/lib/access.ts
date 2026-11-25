import type { Permission } from "@diagno/schemas";

/* Pages and who sees them in the menu. The same lists guard the routes
   (App.tsx), and the API checks every request regardless. */
export const PAGE_ACCESS: Record<string, Permission[] | undefined> = {
  "/leads": ["leads:read:all", "leads:read:own"],
  "/bookings": ["leads:read:all"],
  "/meetings": ["meetings:read:all", "meetings:read:own"],
  "/attendance": ["attendance:read:all"],
  "/doctors": ["doctors:read"],
  "/users": ["users:manage"],
  "/settings": ["settings:manage"],
};
