// Import just the `workbox-precaching` package.
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { skipWaiting, clientsClaim } from 'workbox-core';

const baseUrl = 'https://lwc-push-notification.herokuapp.com/';

skipWaiting();
clientsClaim();

registerRoute(({ url }) => url.origin === baseUrl, new StaleWhileRevalidate());

self.addEventListener('push', (event) => {
    console.log('push received', { event });
    const title = 'LWC Push Notification!';
    const options = {
        body: event.data.text(),
        icon: `${baseUrl}/favicon.ico`,
        image: `${baseUrl}/icons/icon-512x512.png`,
        badge: `${baseUrl}/icons/icon-384x384.png`
    };

    self.registration.showNotification(title, options);
    event.waitUntil(self.registration.showNotification(title, options));
});

precacheAndRoute(self.__WB_MANIFEST);
