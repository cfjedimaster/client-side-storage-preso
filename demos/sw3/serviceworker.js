var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
	'./',
	'./index.html?utm_source=homescreen',
  './images/icons/cat192.png',
  './js/app.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css',
  'https://code.jquery.com/jquery-3.2.1.slim.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js',
  'https://placekitten.com/200/301',
  './manifest.json'
];

self.addEventListener('install', function(event) {
	// Perform install steps
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
		.catch(function(e) {
			console.log('Error from caches open', e);
		})
	)
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
	  caches.match(event.request)
		.then(function(response) {
		  // Cache hit - return response
		  if (response) {
				console.log('got it from cache', event.request);
				return response;
		  }
		  return fetch(event.request);
		}
	  )
	);
  });
	
self.addEventListener('activated', function(event) {
	// I do cleanup
	event.waitUntil(
			caches.keys().then(function(cacheNames) {
					return Promise.all(
							cacheNames.map(function(cacheName) {          
									if (CACHE_NAME !== cacheName) {
											return caches.delete(cacheName);          
									}        
							})      
					);    
			})  
	);
});