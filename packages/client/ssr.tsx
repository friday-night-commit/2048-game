import App from './src/App-ssr';
import { ThemeProvider } from '@material-tailwind/react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { store } from './src/store';

async function render(uri) {
  const initialState = store.getState();
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </StaticRouter>
  );

  return [initialState, renderResult];
}

export { render };
