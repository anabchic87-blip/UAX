const CACHE_NAME = 'integra-pwa-v2';

const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo.png',
  './assets/integra_favicon_16.png',
  './assets/integra_favicon_32.png',
  './assets/integra_favicon_180.png',
  './assets/integra_favicon_192.png',
  './assets/integra_favicon_512.png',

  // ASIGNATURAS CORREGIDAS (IMPORTANTE)
  './bdd/index.html',
  './ciberseguridad/index.html',
  './sostenibilidad/index.html',
  './tai/index.html',
  './certificado-profesionalidad/index.html'
];

// INSTALACIÓN
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .catch(() => Promise.resolve())
  );
  self.skipWaiting();
});

// ACTIVACIÓN (limpia caché antigua)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH (estrategia mejorada)
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          try {
            cache.put(event.request, cloned);
          } catch (e) {}
        });
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(
          cached => cached || caches.match('./index.html')
        )
      )
  );
});
