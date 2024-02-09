const CACHE_NAME='v1_cache_BCH_PWA';

var urlsToCache=[
    './',
    './css/style.css',
    './img/gatito.png',
    './img/gatito - 32.png',
    './img/gatito - 64.png',
    './img/gatito - 128.png',
    './img/gatito - 512.png'

];

self.addEventListener('install', e => {
    //utilizamos la variable del evento

    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                //le mandamos los elementos que tengamos en el array
                return cache.addAll(urlsToCache)
                            .then(()=>{
                                self.skipWaiting();
                            })
            })
            .catch(err=>console.log('No se ha registrado el cache', err))

    );
});

//Evento activate
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
     caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheNames => {
                    if(cacheWhitelist.indexOf(cacheNames)==-1)
                    {
                        //borrar elementos que no se necesitan
                        return cache.detele(cacheNames);
                    }
                })
            );
        })
        .then(()=> {
            self.clients.claim();//activa la cache en el dispositivo
        })
    );

})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo datos desde cache
                    return res;
                }
                return fetch(e.request);
                //Hago petición al servidor en caso de que no esté en el cache
            })
    );
});


