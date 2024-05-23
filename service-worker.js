self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('static-v1').then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './styles.css',
                './app.js',
                './manifest.json',
                './icon-192x192.png',
                './icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
