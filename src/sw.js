// Import just the `workbox-precaching` package.
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { skipWaiting, clientsClaim } from 'workbox-core';

skipWaiting();
clientsClaim();

registerRoute(
    ({ url }) => url.origin === 'https://lwc-push-notification.herokuapp.com/',
    new StaleWhileRevalidate()
);

self.addEventListener('push', (event) => {
    const title = 'Get Started With Workbox';
    const options = {
        body: event.data.text()
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

precacheAndRoute(self.__WB_MANIFEST);
