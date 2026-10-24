(function () {
  const VERSION = '0.8.0';
  const versionLabel = document.getElementById('app-version');
  versionLabel.textContent = `v${VERSION}`;
  document.getElementById('refresh-app').addEventListener('click', function () {
    const url = new URL(window.location.href);
    // A fresh document URL avoids reusing a cached HTML response. This is not
    // a service worker update or a guarantee that Safari clears its full cache.
    url.searchParams.set('refresh', Date.now().toString());
    window.location.replace(url.href);
  });
})();
