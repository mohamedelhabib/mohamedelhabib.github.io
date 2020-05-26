/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1970/01/01/_404/index.html",
    "revision": "06546f88946a31ae00e0a9161004474b"
  },
  {
    "url": "2020/05/10/secure-api-using-openid-connect-and-spring-security/index.html",
    "revision": "4b5686d75b9c08463e708e7ad7e6d5da"
  },
  {
    "url": "2020/05/11/dockerize-scala-application/index.html",
    "revision": "154baf14794daf86845bdf22be6486de"
  },
  {
    "url": "2020/05/15/kubernetes-istio-into-local-environment-with-k3d/index.html",
    "revision": "242815aa55d5bbcd182c99d511eb5d4a"
  },
  {
    "url": "2020/05/18/insall-kafka-strimzi-operator-into-k3s/index.html",
    "revision": "c2976a6e3ede558d5890349a5b67a516"
  },
  {
    "url": "assets/css/0.styles.05b5abf3.css",
    "revision": "a471957bec80143ba5eb3b166da4b28c"
  },
  {
    "url": "assets/icons/android-icon-144x144.png",
    "revision": "c42dcbfa0618b50327da1fc81e90cf33"
  },
  {
    "url": "assets/icons/android-icon-192x192.png",
    "revision": "d02fe5c93cc5a47e542ab9177bfcbd29"
  },
  {
    "url": "assets/icons/android-icon-36x36.png",
    "revision": "584fe4c291ab66d0d5dd4ca8c97f3789"
  },
  {
    "url": "assets/icons/android-icon-48x48.png",
    "revision": "481597a55911d0340799f78954dea6fc"
  },
  {
    "url": "assets/icons/android-icon-72x72.png",
    "revision": "31d967421b0b9025dad49228ae2bc00f"
  },
  {
    "url": "assets/icons/android-icon-96x96.png",
    "revision": "e674e78e952ff5bb6aeae0c06fc16e71"
  },
  {
    "url": "assets/icons/apple-icon-114x114.png",
    "revision": "33a1d27c8da7ccded1248875895d6a43"
  },
  {
    "url": "assets/icons/apple-icon-120x120.png",
    "revision": "0af566792eca6edd4c9bb6069bb3da57"
  },
  {
    "url": "assets/icons/apple-icon-144x144.png",
    "revision": "c42dcbfa0618b50327da1fc81e90cf33"
  },
  {
    "url": "assets/icons/apple-icon-152x152.png",
    "revision": "fb0b9073b52606ca64f452b5f63b4d68"
  },
  {
    "url": "assets/icons/apple-icon-180x180.png",
    "revision": "211230e166ce669f9407c7cd7a550779"
  },
  {
    "url": "assets/icons/apple-icon-57x57.png",
    "revision": "5ae93d83e199b71b6678897fad5c3a8e"
  },
  {
    "url": "assets/icons/apple-icon-60x60.png",
    "revision": "ae696df92899c3fa6fb4e8ac9567c483"
  },
  {
    "url": "assets/icons/apple-icon-72x72.png",
    "revision": "31d967421b0b9025dad49228ae2bc00f"
  },
  {
    "url": "assets/icons/apple-icon-76x76.png",
    "revision": "d4a71660e21272e3e71c9039c00e2a96"
  },
  {
    "url": "assets/icons/apple-icon-precomposed.png",
    "revision": "a8137b7143d1192471fb6e9a67384ab1"
  },
  {
    "url": "assets/icons/apple-icon.png",
    "revision": "a8137b7143d1192471fb6e9a67384ab1"
  },
  {
    "url": "assets/icons/favicon-16x16.png",
    "revision": "f4ca1e6cc4f539609ef9d4c287df364e"
  },
  {
    "url": "assets/icons/favicon-32x32.png",
    "revision": "4cef5a5a0c58a0090a62e82bd234b7be"
  },
  {
    "url": "assets/icons/favicon-96x96.png",
    "revision": "e674e78e952ff5bb6aeae0c06fc16e71"
  },
  {
    "url": "assets/icons/ms-icon-144x144.png",
    "revision": "c42dcbfa0618b50327da1fc81e90cf33"
  },
  {
    "url": "assets/icons/ms-icon-150x150.png",
    "revision": "335c62dac5b6bb091f7bd31f834852f6"
  },
  {
    "url": "assets/icons/ms-icon-310x310.png",
    "revision": "7f6177a08a540969f887ee12affc4623"
  },
  {
    "url": "assets/icons/ms-icon-70x70.png",
    "revision": "c6461a20addc7a1a43775182b9b5b8e9"
  },
  {
    "url": "assets/img/kiali-dashboard.png",
    "revision": "f7ba8340d84bfa2ec2fcd6b14aaebd68"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.efdfd574.js",
    "revision": "4a68b54c2f4b391031baa3172c1b35c0"
  },
  {
    "url": "assets/js/11.af07a843.js",
    "revision": "cfc29cf280e9eb17443a93030462e575"
  },
  {
    "url": "assets/js/12.cd13affe.js",
    "revision": "0820b1195ead3286642a37e2b16c921c"
  },
  {
    "url": "assets/js/13.39b88b44.js",
    "revision": "539e10472aacff96a901d86e5900a957"
  },
  {
    "url": "assets/js/14.a9fa26a6.js",
    "revision": "2e97b28b720596bee2e84e4ddffef46d"
  },
  {
    "url": "assets/js/15.c0b71d42.js",
    "revision": "c78a4ee3dcfa02ec51e061fb33fba745"
  },
  {
    "url": "assets/js/2.79e1ebb6.js",
    "revision": "8cf9a9bae456d2f10f009c5a4e15f34e"
  },
  {
    "url": "assets/js/3.8bab5a9e.js",
    "revision": "955b40b3c847fdf66817681e17d5669a"
  },
  {
    "url": "assets/js/4.c6323ad2.js",
    "revision": "f938b51332752a5e69f23ace8ff8f1d9"
  },
  {
    "url": "assets/js/5.f132e9b5.js",
    "revision": "40401c7171048a0cebc41dde7e53fb80"
  },
  {
    "url": "assets/js/6.d7f91b89.js",
    "revision": "ed355ef0d827ad90f3fc9da1e894fa8f"
  },
  {
    "url": "assets/js/7.ada2a324.js",
    "revision": "2b81c3546179b9205150581d30f4ebe0"
  },
  {
    "url": "assets/js/8.724a125e.js",
    "revision": "c0d7a7c97a65d635beb326f98b925f3c"
  },
  {
    "url": "assets/js/9.2d0a0718.js",
    "revision": "0b23ce5686a9429556e37391fc91f412"
  },
  {
    "url": "assets/js/app.8bb2a787.js",
    "revision": "4a6bbe73453c534a485b471179d0cf04"
  },
  {
    "url": "index.html",
    "revision": "bf539e75d989ab33614026d4b1b4331a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
