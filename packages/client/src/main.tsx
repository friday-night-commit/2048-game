import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store';

import './index.scss';
import { initServiceWorker } from './ServiceWorkers/initServiceWorker';
import App from './App-ssr';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

initServiceWorker();
