import { useEffect, useState } from "react";
import { Bell, BellOff, BellRing } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

type State = "loading" | "unsupported" | "ios-install" | "blocked" | "off" | "on";

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

function keyBytes(base64: string) {
  const pad = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/* Sidebar switch for new-lead notifications on this device. */
export default function NotificationToggle() {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
        // iPhone only allows push in the app installed to the home screen.
        return setState(isIos() && !isStandalone() ? "ios-install" : "unsupported");
      }
      if (Notification.permission === "denied") return setState("blocked");
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      setState(sub ? "on" : "off");
      // Keep the server's copy fresh (it can change after browser updates).
      if (sub) api.post("/push/subscribe", sub.toJSON()).catch(() => {});
    })().catch(() => setState("unsupported"));
  }, []);

  const turnOn = async () => {
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState(permission === "denied" ? "blocked" : "off");
        return;
      }
      const { data } = await api.get<{ data: { publicKey: string | null } }>("/push/public-key");
      if (!data.data.publicKey) {
        toast.error("Notifications aren't set up on the server yet.");
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyBytes(data.data.publicKey),
      });
      await api.post("/push/subscribe", sub.toJSON());
      setState("on");
      await api.post("/push/test");
      toast.success("Notifications on. You'll get one for every new lead.");
    } catch {
      toast.error("Couldn't turn on notifications on this device.");
    } finally {
      setBusy(false);
    }
  };

  const turnOff = async () => {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await api.post("/push/unsubscribe", { endpoint: sub.endpoint }).catch(() => {});
        await sub.unsubscribe();
      }
      setState("off");
    } finally {
      setBusy(false);
    }
  };

  if (state === "loading" || state === "unsupported") return null;

  const label =
    state === "on"
      ? "Notifications on"
      : state === "blocked"
        ? "Notifications blocked"
        : state === "ios-install"
          ? "Install to get alerts"
          : "Turn on notifications";
  const Icon = state === "on" ? BellRing : state === "blocked" ? BellOff : Bell;
  const hint =
    state === "blocked"
      ? "Allow notifications for app.diagnoslab.in in the browser's site settings, then reload."
      : state === "ios-install"
        ? "On iPhone: Share → Add to Home Screen, then open the app from the home screen."
        : state === "on"
          ? "Click to turn off on this device"
          : "Get an alert for every new lead";

  return (
    <button
      type="button"
      title={hint}
      disabled={busy || state === "blocked" || state === "ios-install"}
      onClick={state === "on" ? turnOff : turnOn}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-sm font-medium transition-colors",
        state === "on"
          ? "text-emerald-700 hover:bg-sidebar-accent/60"
          : state === "off"
            ? "text-foreground hover:bg-sidebar-accent/60"
            : "cursor-default text-muted-foreground",
      )}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
      {busy ? "Working…" : label}
    </button>
  );
}
