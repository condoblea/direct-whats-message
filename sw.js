const static_cache = "static-v1";
const dynamic_cache = "dynamic-v1";

//TODO clear old cache and manage update ui"

const app_shell = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'js/app.js',
    'manifest.json'
];

self.addEventListener('install', (e) => {
  const cache_static = caches.open(static_cache).then((cache) => {
    cache.addAll(app_shell);
  });

  e.waitUntil(cache_static);
});

// self.addEventListener('fetch', (e) => {
//   const respuesta = caches.match(e.request).then((res) => {
//     if (res !== undefined) {
//       console.log(res);
//       if (res) {
//         console.log("primer if");
//         return res;
//       } else {
//         return fetch(e.request).then((newRes) => {
//           console.log("la nueva respuesta es: ", newRes);
//           if (newRes.ok) {
//             return caches.open(dynamic_cache).then((cache) => {
//               console.log("i am here");
//               cache.put(e.request, newRes.clone());
//               return newRes.clone();
//             });
//           } else {
//             return newRes;
//           }
//         });
//       }
//       e.respondWith(respuesta);
//     } else {
//       return;
//     }
//   });
// });

// self.addEventListener('fetch', function (event) {
//     console.log('*****')
//     console.log(event.request)
//     event.respondWith(
//         caches.open(dynamic_cache)
//             .then(function(cache) {
//                 cache.match(event.request)
//                     .then( function(cacheResponse) {
//                         if(cacheResponse)
//                             return cacheResponse
//                         else
//                             return fetch(event.request)
//                                 .then(function(networkResponse) {
//                                     cache.put(event.request, networkResponse.clone())
//                                     return networkResponse
//                                 })
//                     })
//             })
//     )
// });

self.addEventListener('fetch', function(e){
    const respuesta = caches.match(e.request).then(res => {
        if( res ) return res
        return fetch( e.request ).then( newRes => {
            //TODO It works correctly but after the first reload in offline mode
            // it doesnt work and a second reload has to be done to go back to normal
            if(newRes.ok) {
                caches.open(dynamic_cache).then( cache => {
                    cache.put(e.request, newRes)
                })
            }
            return newRes.clone()
        })
    })
    e.respondWith( respuesta )
})
