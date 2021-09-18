//Update cache names any time any of the cached files change.

const CACHE_MYSHOP = 'static-cache-v1';

//Add list of files to cache here.

const FILES_TO_CACHE = [
    './index.html','./compte.html','./inscription.html','./panier.html','./produit.html','./img/13408200.jpg','./img/15337847.jpg','./img/15337850.jpg','./img/15387989.jpg','./img/15427808.jpg','./img/15442045.jpg','./img/15442045.jpg','./img/di-20210910-offer-cameras-top-deals-m.jpg','./img/ht-20210910-offer-tv-topdeal-m.jpg','./img/pa-20210910-offer-td-pa-on-sale-m.jpg','./img/recu.png','./img/souris.png','./img/pwa/souris.png','./img/pwa/maskable_icon.png','./img/pwa/unnamed.png'
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
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
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