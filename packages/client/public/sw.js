const STATIC_ASSETS = ['/manifest.json'];

const STATIC_CACHE_NAME = 'static-data-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1';

const getFirst = async request => {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());

    return response;
  } catch (error) {
    return cache.match(request);
  }
};

const update = async request => {
  return caches
    .open(DYNAMIC_CACHE_NAME)
    .then(cache =>
      fetch(request).then(response => cache.put(request, response))
    );
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => {
        throw err;
      })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  const { url, method } = request;

  if (method !== 'GET') {
    return;
  }
  if (!url.startsWith('https')) {
    return;
  }

  event.respondWith(getFirst(request));
  event.waitUntil(update(request));
});
