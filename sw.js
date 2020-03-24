const staticCacheName = 'site-static-pwa-v2.0.1';
const dynamicCacheName = 'site-dynamic-pwa-v2.0.1';
const assets = [
    '/',
    '/_home.html',
    '/_fallback.html',
    '/bootstrap/4/css/bootstrap.min.css',
    '/css/style.css',
    '/fontawesome4/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Roboto:400,700',
    '/dmxAppConnect/dmxAppConnect.js',
    'https://code.jquery.com/jquery-3.4.1.slim.min.js',
    '/js/app.js',
    '/manifest.json'
]

// cache size limit function
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
};

// install event
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

// activate event
self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //console.log(keys);
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    // check cached items size
                    limitCacheSize(dynamicCacheName, 15);
                    return fetchRes;
                })
            });
        }).catch(() => {
            if (evt.request.url.indexOf('.html') > -1) {
                return caches.match('/_fallback.html');
            }
        })
    );
});