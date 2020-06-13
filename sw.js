const static_cache  = "static-v1"
const dynamic_cache = "dynamic-v1"


//TODO clear old cache and manage update ui"

const app_shell = [
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'js/app.js',   
]


self.addEventListener('install', e => {

    const cache_static = caches.open( static_cache )
        .then( cache => {
            cache.addAll( app_shell )
        })
    
    e.wailUntil( cache_static )
})

self.addEventListener('fetch', e => {
    const respuesta = caches.match( e.request )
        .then( res => {
            if( res ) {
                return res
            } else {
                return fetch( e.request ).then( newRes => {
                    console.log('la nueva respuesta es: ', newRes)
                    if( newRes.ok ) {
                        return caches.open( dynamic_cache ).then( cache => {
                            cache.put(e.request, newRes.clone())
                            return newRes.clone()
                        })
                    } else {
                        return newRes;
                    }
                })
            }
        })

    e.respondWith( respuesta )
})