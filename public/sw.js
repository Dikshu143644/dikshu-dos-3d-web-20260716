// Cache-first service worker for frame sequences
const CACHE_NAME = 'frame-sequences-v1';

// Only cache frame sequence requests
function isFrameRequest(url) {
  return /\/(1st|2nd|3rd|4th)-vdo(-thumb)?\//.test(url.pathname);
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (!isFrameRequest(url)) return; // Let Next.js handle everything else

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    )
  );
});
