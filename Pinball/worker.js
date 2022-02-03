const filesToCache = [
	"Pinball.htm",
	"Pinball.json",
	"assets/PinballFavIcon_16x16.png",
	"assets/PinballFavIcon_192x192.png",
	"assets/PinballFavIcon_512x512.png",
	"PinballGame.html",
	"PinballGame.js",
	"PinballShare.png"
];

const staticCacheName = "Pinball-v1";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
		}).catch(error => {
		})
	);
});