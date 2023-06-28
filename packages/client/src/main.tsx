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
delete window.__REDUX_INITIAL_STATE__;

hydrateRoot(
  document.getElementById('root') as HTMLElement,
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
);

initServiceWorker();
