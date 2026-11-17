// Network first, fall back to cache so the app still opens with poor signal
const N = "shreeram-v2";
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(N).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request)));
});
