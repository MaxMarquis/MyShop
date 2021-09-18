//Update cache names any time any of the cached files change.

const CACHE_MYSHOP = 'static-cache-v1.2';

//Add list of files to cache here.

const FILES_TO_CACHE = [
    '/MyShop/index.html',
    '/MyShop/compte.html',
    '/MyShop/inscription.html',
    '/MyShop/panier.html',
    '/MyShop/produit.html',
    '/MyShop/img/souris.jpg',
    '/MyShop/img/recu.png',
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_MYSHOP).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');

    //Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_MYSHOP) {
                    console.log('[ServiceWorker] Removing old cache',key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
    }
    evt.respondWith(
    fetch(evt.request)
        .catch(() => {
            return caches.open(CACHE_MYSHOP)
            .then((cache) => {
                return cache.match('/MyShop/index.html');
            });
        })
    );
});

// Register service worker.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((reg) => {
            console.log('Service worker registered.', reg);
            });
    });
}