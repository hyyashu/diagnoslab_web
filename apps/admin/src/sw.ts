/// <reference lib="webworker" />

/* Push notifications for the staff dashboard. The API sends
   { title, body, url, tag } (see apps/api/src/push). */
const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("install", () => sw.skipWaiting());
sw.addEventListener("activate", (event) => event.waitUntil(sw.clients.claim()));

sw.addEventListener("push", (event) => {
  let data: { title?: string; body?: string; url?: string; tag?: string } = {};
  try {
    data = event.data?.json() ?? {};
  } catch {
    data = { body: event.data?.text() };
  }

  event.waitUntil(
    sw.registration.showNotification(data.title || "Diagnos Lab", {
      body: data.body,
      icon: "/pwa-192.png",
      badge: "/pwa-192.png",
      tag: data.tag,
      data: { url: data.url || "/leads" },
    }),
  );
});

/* Opens the lead in the dashboard window that's already open, or a new one. */
sw.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || "/leads", sw.location.origin).href;

  event.waitUntil(
    (async () => {
      const windows = await sw.clients.matchAll({ type: "window", includeUncontrolled: true });
      const open = windows.find((w) => new URL(w.url).origin === sw.location.origin);
      if (open) {
        await open.focus();
        return open.navigate(url);
      }
      return sw.clients.openWindow(url);
    })(),
  );
});
