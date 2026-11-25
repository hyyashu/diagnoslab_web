/// <reference lib="webworker" />

/* Push notifications for the installed admin app. */
const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};

  event.waitUntil(
    sw.registration.showNotification(data.title, {
      body: data.body,
      icon: "/pwa-192.png",
      badge: "/pwa-192.png",
      data: {
        url: data.url || "/",
      },
    }),
  );
});

sw.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(sw.clients.openWindow(event.notification.data.url));
});
