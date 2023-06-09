import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from './store';
import { initServiceWorker } from './ServiceWorkers/initServiceWorker';
import App from './App-ssr';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { UserService } from './api/UserService';

import './index.scss';

const store = createStore(
  new UserService(new YandexAPIRepository()),
  JSON.parse(window.__REDUX_INITIAL_STATE__)
);
delete window.__REDUX_INITIAL_STATE__;

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
