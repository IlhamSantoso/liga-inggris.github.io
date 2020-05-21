importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    {url:"/manifest.json", revision: '1'},
    {url:"/index.html", revision: '1'},
    {url:"/teams.html", revision: '1'},
    {url:"/nav.html", revision: '1'},
    {url:"/navigator-sw.js", revision: '1'},
    ],{
        ignoreURLParametersMatching:[/.*/]
    });

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
    new RegExp('/css/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'assets'
    })
);

workbox.routing.registerRoute(
    new RegExp('/js/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'assets'
    })
);

workbox.routing.registerRoute(
    new RegExp('/img/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'assets'
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2\//,
    new workbox.strategies.CacheFirst({
        cacheName: 'data-liga-inggris',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                masAgeSeconds: 30 * 24 * 60 * 60,
                maxEntries: 50
            }),
        ],
    }),

);

//notfikasi
self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/icon1.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Liga Inggris', options)
    );
});
