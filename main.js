//Cargar Service Worker
if('serviceWorker' in navigator){
    console.log("Puedes usar el Service Worker");
    //configuración del SW
    navigator.serviceWorker.register('./sw.js')
                            .then(res=>console.log('se ah cargado correctamente', res))
                            .catch(err => console.log('service Worker no se ha podido registrar',err));
                            
}