const CACHE = 'phonic-v1'
const FILES = [
  '/',
  '/index.html',
  '/src/main.ts',
  '/src/style.css',
  '/manifest.json',
  '/icon-512x512.png'
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)))
})
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
})