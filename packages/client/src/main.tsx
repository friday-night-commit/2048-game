import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { createStore } from './store';
import { initServiceWorker } from './ServiceWorkers/initServiceWorker';
import App from './App-ssr';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { UserService } from './api/UserService';

import './index.scss';
import { ThemeProvider } from './Utils/ThemeProvider';

let initialState = {};
try {
  initialState = JSON.parse(window.__REDUX_INITIAL_STATE__);
} catch (e) {
  //
}

const store = createStore(
  new UserService(new YandexAPIRepository()),
  initialState as StoreState
);
export type RootTypeStore = typeof store;

delete window.__REDUX_INITIAL_STATE__;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <CookiesProvider>
    <ThemeProvider store={store}>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </CookiesProvider>

);

initServiceWorker();
