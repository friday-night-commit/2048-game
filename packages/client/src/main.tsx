import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';

import './index.scss';
import App from './App';
import { setupStore } from './store';

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App></App>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
