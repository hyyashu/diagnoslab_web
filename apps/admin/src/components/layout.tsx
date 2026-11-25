import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuthStore } from "../store/authStore";
import SideBar, { Brand } from "./sideBar";
import { PAGE_ACCESS } from "@/lib/access";
import { useCan } from "../store/authStore";

const Layout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);
  const refresh = useAuthStore((state) => state.refresh);
  const can = useCan();
  const { pathname } = useLocation();
  const needs = PAGE_ACCESS["/" + (pathname.split("/")[1] ?? "")];
  const allowed = !needs || can(...needs);

  /* Pick up role or access changes when the app opens. */
  useEffect(() => {
    if (isAuthenticated) refresh();
  }, [isAuthenticated, refresh]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-52 shrink-0 border-r bg-sidebar sm:flex sm:flex-col">
        <SideBar />
      </aside>

      {/* Phone sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-60 bg-sidebar p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>Go to another page</SheetDescription>
          </SheetHeader>
          <SideBar onMobileClose={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Phones only: the menu button. Desktop has the sidebar. */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-3 sm:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <Brand />
        </header>

        {/* Same padding and width on every screen. */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1400px] space-y-5 px-4 py-5 md:px-8 md:py-7">
            {allowed ? (
              <Outlet />
            ) : (
              <div className="rounded-lg border p-8 text-center">
                <h1 className="text-lg font-semibold">You don't have access to this page</h1>
                <p className="mt-1 text-sm text-muted-foreground">Ask the owner if you need it.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
