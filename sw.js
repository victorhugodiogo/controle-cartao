// Service worker do Controle de Cartão: modo offline e "Instalar app".
const VERSION = 'cartao-v1';               // troque a cada versão importante
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
// Bibliotecas de CDN usadas pelo app (fonte e leitor de .xlsx), guardadas após o 1º uso
const CDN = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com', 'https://cdnjs.cloudflare.com'];

self.addEventListener('install', e => e.waitUntil(
  caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
));

self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Bibliotecas externas: cache primeiro, rede se ainda não tiver
  if (CDN.some(o => url.origin === o)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); return r;
    })));
    return;
  }
  if (url.origin !== location.origin) return;

  // Páginas: rede primeiro (recebe atualizações), cache se offline
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => {
      const c = r.clone(); caches.open(VERSION).then(x => x.put('./index.html', c)); return r;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
