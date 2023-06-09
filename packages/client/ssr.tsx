import { ThemeProvider } from '@material-tailwind/react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';

import App from './src/App-ssr';
import { createStore } from './src/store';
import { UserService } from './src/api/UserService';

async function render(uri, repository) {
  const store = createStore(new UserService(repository));
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
