import { NavLink } from "react-router-dom";
import {
  BookCheck,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Settings,
  Stethoscope,
  Target,
  UserRound,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "../store/authStore";
import NotificationToggle from "./NotificationToggle";

const groups = [
  {
    items: [
      { label: "Dashboard", path: "/", icon: LayoutDashboard },
      { label: "Leads", path: "/leads", icon: Target },
      { label: "Bookings", path: "/bookings", icon: BookCheck },
    ],
  },
  {
    title: "Team",
    items: [
      { label: "Meetings", path: "/meetings", icon: UserRound },
      { label: "Attendance", path: "/attendance", icon: CalendarCheck },
      { label: "Doctors", path: "/doctors", icon: Stethoscope },
      { label: "Users", path: "/users", icon: Users },
    ],
  },
];

export function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex size-7 items-center justify-center rounded-md bg-red-600 text-xs font-bold text-white">DL</span>
      <span className="text-sm font-semibold leading-tight">
        Diagnos Lab
        <span className="block text-[11px] font-normal text-muted-foreground">Admin</span>
      </span>
    </div>
  );
}

const itemClass = (active: boolean) =>
  cn(
    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
  );

export default function SideBar({ onMobileClose }: { onMobileClose?: () => void }) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="flex h-full flex-col">
      <div className="px-4 py-4">
        <Brand />
      </div>

      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto px-2">
        {groups.map((g, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            {g.title && (
              <div className="px-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground/70">
                {g.title}
              </div>
            )}
            {g.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onMobileClose}
                className={({ isActive }) => itemClass(isActive)}
              >
                <item.icon className="size-[18px] shrink-0" strokeWidth={1.75} />
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-0.5 border-t px-2 py-3">
        <NotificationToggle />
        <NavLink to="/settings" onClick={onMobileClose} className={({ isActive }) => itemClass(isActive)}>
          <Settings className="size-[18px] shrink-0" strokeWidth={1.75} />
          Settings
        </NavLink>
        <div className="flex items-center gap-2.5 px-2.5 py-2">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            {(user?.name ?? "?").trim().charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{user?.name ?? "Signed in"}</div>
            <div className="truncate text-[11px] text-muted-foreground">{user?.email}</div>
          </div>
          <button
            onClick={logout}
            title="Log out"
            aria-label="Log out"
            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
