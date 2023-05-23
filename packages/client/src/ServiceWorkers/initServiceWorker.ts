export const initServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(
          (registration: ServiceWorkerRegistration) => {
            // eslint-disable-next-line no-console
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            );
          },
          err => {
            throw new Error(`ServiceWorker registration failed: ${err}`);
          }
        )
        .catch(err => {
          throw new Error(err);
        });
    });
  } else {
    throw new Error('service worker is not supported');
  }
};
