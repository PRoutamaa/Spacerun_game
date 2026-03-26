'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "7817a56331800352c8f6afb9dde0302a",
"version.json": "9f7a1d39ee2f2b3d9903229dc468f050",
"index.html": "7ee3b94e48a1493c76e5578f6c838170",
"/": "7ee3b94e48a1493c76e5578f6c838170",
"main.dart.js": "ed08a472249e31f7c6bf435180dfaf4e",
"flutter.js": "24bc71911b75b5f8135c949e27a2984e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "4dea0d7c944ebaf5e87a0c8519142a22",
".git/config": "01921b5a9ea190e8d851932082d3ecea",
".git/objects/3e/d0ddd7136a48520910e7e4bf665362facd60d4": "c8322669a78b5f07c75b1decdc05718d",
".git/objects/50/08ddfcf53c02e82d7eee2e57c38e5672ef89f6": "d18c553584a7393b594e374cfe29b727",
".git/objects/68/43fddc6aef172d5576ecce56160b1c73bc0f85": "2a91c358adf65703ab820ee54e7aff37",
".git/objects/6f/7661bc79baa113f478e9a717e0c4959a3f3d27": "985be3a6935e9d31febd5205a9e04c4e",
".git/objects/9b/87e8803e9a8bef574edce05a974ad56ec57263": "04d0a49ddd0f390d80790795da0cdc06",
".git/objects/69/b2023ef3b84225f16fdd15ba36b2b5fc3cee43": "6ccef18e05a49674444167a08de6e407",
".git/objects/56/7dcb3deb6a6177537a92cd988b38e8cf3035e6": "a169bbb6886e45e97eb6e9d8160819b0",
".git/objects/51/03e757c71f2abfd2269054a790f775ec61ffa4": "d437b77e41df8fcc0c0e99f143adc093",
".git/objects/0b/0df692ceae55a4ec49d2c6b0daad26566565ea": "0c4e4414afc4358e34e25a925fca12ad",
".git/objects/93/b363f37b4951e6c5b9e1932ed169c9928b1e90": "c8d74fb3083c0dc39be8cff78a1d4dd5",
".git/objects/b5/0afd37aedba11eb504114ad05bed369fd82625": "44a99bba325e78f9336dc0cd5b754623",
".git/objects/b2/53d3b02290323a1c55381aa45d57a788acbbca": "d32e210b10a90e9f149db62aaf2196f1",
".git/objects/d9/5b1d3499b3b3d3989fa2a461151ba2abd92a07": "a072a09ac2efe43c8d49b7356317e52e",
".git/objects/ad/ced61befd6b9d30829511317b07b72e66918a1": "37e7fcca73f0b6930673b256fac467ae",
".git/objects/bd/8c000ef1bc584e15ed534cb5141c6aa2fd135a": "bd4351e16056a13a29c1a85f449fb69d",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/f3/3e0726c3581f96c51f862cf61120af36599a32": "afcaefd94c5f13d3da610e0defa27e50",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/c9/23fb8385e38d9c3ccc14099e1d7f3b789e512d": "5bd034e6dbe7fad98e243c96ca72a9b7",
".git/objects/c9/7b5c459d9320a6534f5e72d9524d12578f19cb": "51ddfe73e19e5230509a90419f23609f",
".git/objects/fd/05cfbc927a4fedcbe4d6d4b62e2c1ed8918f26": "5675c69555d005a1a244cc8ba90a402c",
".git/objects/e3/7b92021040851ca7101d3e9732b637ad2ddace": "530d37abe8699047a3bfe60a96a723e1",
".git/objects/fe/a1acf7a28f8e720f64b773615628f4cdf46c29": "71064dce2690b1850d2bdf51d129f399",
".git/objects/c8/3af99da428c63c1f82efdcd11c8d5297bddb04": "144ef6d9a8ff9a753d6e3b9573d5242f",
".git/objects/c1/e20eab09f17771671eb872f721f70a3bba0384": "0a54ce4751288b3d9085d95d2f332314",
".git/objects/c6/8dc7f14e071b9ca4a6c3ffdd005225b1b4a13f": "34d7742a8fb019273ed5511e5efc9234",
".git/objects/20/965eeb5508a614317c021e72e9635c4417b872": "7e56825c892fcc9d383a41bd5f7a1ae9",
".git/objects/7c/3463b788d022128d17b29072564326f1fd8819": "37fee507a59e935fc85169a822943ba2",
".git/objects/7b/479e1c3d8609614d9e8a2a1e280c0ef8e90e47": "c01cb7ac197b76b9b5732ac542a06ba4",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/7e/824459cffdef1975c1dfc6b5b19417e7c88d42": "e537d4881f1d3a8ef7ab4a59143d34ae",
".git/objects/10/afc97b2ca95ca1a718f4e061cfc670c53106ee": "4171b6a5eafacd3d6f9218678db87174",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/00/f389d682309455e5ca766231a9c156b4ceed80": "1f31bcd71f3c7833708fba80aa047f0b",
".git/objects/36/fc84b54654f30ab9b4b7ba1df09ab329977119": "35cbea6579eed698f8e9bfdfdb26e621",
".git/objects/3a/8cda5335b4b2a108123194b84df133bac91b23": "1636ee51263ed072c69e4e3b8d14f339",
".git/objects/3a/bf18c41c58c933308c244a875bf383856e103e": "30790d31a35e3622fd7b3849c9bf1894",
".git/objects/30/889270e14aac8dbe0588792c8ba6bfb01977f2": "ca12cecc4a7caa4187c10423adad4bad",
".git/objects/08/27c17254fd3959af211aaf91a82d3b9a804c2f": "360dc8df65dabbf4e7f858711c46cc09",
".git/objects/55/bcdc5b7c5f98a38a4290f4a4245ce4c5c0484b": "a0d44220119e640374f543e08ba1741f",
".git/objects/0a/76dceb1fd16601db6174e023562c9d198f92bc": "3d87b032c459899cd7538a2e590eba37",
".git/objects/90/db416bd54f7946b6e4174372094c29f79ebce4": "a584814e938bd1fccc6b2ad53f015a34",
".git/objects/90/413d72c6642d4a3615b46f9493ab1d8fe7aac9": "cb64f9c95b2567aad629b76ccac2d6d5",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/a0/572b81f3cd2dcbde15293c03a6c4e4825c0150": "40d8456b13b23bf8f8f96ae8dc5e13f6",
".git/objects/dd/21354a89ad5167b852759aac284d380638735d": "98322a902511001965fad74106dbb9d1",
".git/objects/d5/f1d288097cd82e208198b045111374362b5a38": "24eba9824631fb6c803113efa6b96af4",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/db/5d968e7d1fd60ed78fc4776bd4289ab09202b7": "2b63ba136c9b482636227139a21c04ec",
".git/objects/db/09f5aea5c3fecf37da7ba13a1ea68448503b94": "1b024dc0b7b98fdda2f7efd7810615e2",
".git/objects/a8/16643f47794a5119941b673ba1c3eebbd19d23": "93a55dd3f966409a589c10ea564f860c",
".git/objects/a8/e755cac2f06b24deadf29ebbb6075f14b324f4": "610d382c025e0993698543011193e9e2",
".git/objects/b9/2a0d854da9a8f73216c4a0ef07a0f0a44e4373": "f62d1eb7f51165e2a6d2ef1921f976f3",
".git/objects/b9/3e39bd49dfaf9e225bb598cd9644f833badd9a": "666b0d595ebbcc37f0c7b61220c18864",
".git/objects/e6/eb8f689cbc9febb5a913856382d297dae0d383": "466fce65fb82283da16cdd7c93059ff3",
".git/objects/f0/2827f49c0b23aaea8d86fef1b818630d635636": "40e2eed1ac0082369d90969bdd01d95d",
".git/objects/ff/78f76ebca961466ad5f839b7bb2a897ae75d54": "22a5c2c2fe87dd07076ecfd16aff6bea",
".git/objects/f6/e6c75d6f1151eeb165a90f04b4d99effa41e83": "95ea83d65d44e4c524c6d51286406ac8",
".git/objects/e7/dbacc5e571eff9b1ff9567bbd7687ec197679a": "0bf4b3e2a72afe83ba11a6d54affc612",
".git/objects/cb/6b7a6137f8e01d986294349a6bc2fadc6d1849": "9df7d09456db8013ef6b3c4b23309f7a",
".git/objects/1b/bd62e41b56a96929d6a383ea1ceb87271aa63d": "60d33f6444c75bcfad209f07e66b4996",
".git/objects/8d/006e6a4946f62772f0616b4b2b8615bc5c7ceb": "560e1d5145f97be7c39034978224c141",
".git/objects/85/63aed2175379d2e75ec05ec0373a302730b6ad": "997f96db42b2dde7c208b10d023a5a8e",
".git/objects/82/13e978da96d20b3aa69f1c44f6d5beae501d9e": "fe5967ccc7f692c58fa5327518456c92",
".git/objects/2e/a7bc46a22aec1705da214a9255a79503d9ece5": "9c1f41f9a66e83f78bdf968859ecc7c3",
".git/objects/13/22c61fd45ea65872809f2e8affbdeb2e3b5aad": "227945699225fdd4567b0f13441062b7",
".git/objects/8e/7fe92928ee2ce0627da1f587052cfac9b08f95": "ccd2dafbeea1164a2191192dbf27cc3b",
".git/HEAD": "36d2e6bfefea098ed28d3260f6fd2002",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "55d2e262dd69ed0856acf8442e7e2f51",
".git/logs/refs/heads/deploy": "55d2e262dd69ed0856acf8442e7e2f51",
".git/logs/refs/remotes/origin/deploy": "fcb261f31a057fdc315af9b31f310c62",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/refs/heads/deploy": "ed3c753eb89deb769c74c0c8ea799d9d",
".git/refs/remotes/origin/deploy": "ed3c753eb89deb769c74c0c8ea799d9d",
".git/gk/config": "775d37e0b502abc5f870a39e8b9c19a9",
".git/index": "f71b2d9cbc70facde00d5ad5babc7280",
".git/COMMIT_EDITMSG": "63479451324c1b90cfd082b2a8608a39",
"assets/NOTICES": "2b0d624ba75e5a25311680f2b5a758b8",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/AssetManifest.bin.json": "6ac9d7e76cecfed6871f8b07e924f5c5",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/shaders/stretch_effect.frag": "40d68efbbf360632f614c731219e95f0",
"assets/AssetManifest.bin": "85c08a4d77be305862225c93895707f7",
"assets/fonts/MaterialIcons-Regular.otf": "c0ad29d56cfe3890223c02da3c6e0448",
"assets/assets/images/ship.png": "4f7ecc777e9d828bf109773c2c535472",
"assets/assets/images/meteorBrown_big2.png": "bde749ddd82ba85da67a38cb79aa74f2",
"assets/assets/images/parts/cockpitRed_0.png": "45e53058bbd636168b048a0f9e0e5ce9",
"assets/assets/images/parts/wingRed_4.png": "b6c38263df5f62eaeed622552360a817",
"assets/assets/images/parts/cockpitRed_1.png": "8765f44067a6200d512476c2251950cf",
"assets/assets/images/parts/cockpitRed_3.png": "c423febd9d6d5064604ffab6b3d6b33a",
"assets/assets/images/parts/cockpitRed_2.png": "c6edfd8facbdfaa6b85fc47a36aa4e1c",
"assets/assets/images/parts/wingRed_2.png": "deab24a5265178334c07b2c442711a8a",
"assets/assets/images/parts/wingRed_3.png": "01cd8b591de7a1c070ea8fcb83faccc6",
"assets/assets/images/parts/wingRed_1.png": "e28813a094c947d3587ac04b8ab7bb90",
"assets/assets/images/parts/cockpitRed_4.png": "80ca785e2c801b4b121f8ae05c12c462",
"canvaskit/skwasm.js": "8060d46e9a4901ca9991edd3a26be4f0",
"canvaskit/skwasm_heavy.js": "740d43a6b8240ef9e23eed8c48840da4",
"canvaskit/skwasm.js.symbols": "3a4aadf4e8141f284bd524976b1d6bdc",
"canvaskit/canvaskit.js.symbols": "a3c9f77715b642d0437d9c275caba91e",
"canvaskit/skwasm_heavy.js.symbols": "0755b4fb399918388d71b59ad390b055",
"canvaskit/skwasm.wasm": "7e5f3afdd3b0747a1fd4517cea239898",
"canvaskit/chromium/canvaskit.js.symbols": "e2d09f0e434bc118bf67dae526737d07",
"canvaskit/chromium/canvaskit.js": "a80c765aaa8af8645c9fb1aae53f9abf",
"canvaskit/chromium/canvaskit.wasm": "a726e3f75a84fcdf495a15817c63a35d",
"canvaskit/canvaskit.js": "8331fe38e66b3a898c4f37648aaf7ee2",
"canvaskit/canvaskit.wasm": "9b6a7830bf26959b200594729d73538e",
"canvaskit/skwasm_heavy.wasm": "b0be7910760d205ea4e011458df6ee01"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
