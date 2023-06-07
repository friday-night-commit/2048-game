import App from './src/App-ssr';
import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { store } from './src/store';
// import routes from './src/routes';
// import { matchPath } from 'react-router-dom';
// import { UserService } from './src/api/UserService';

async function render(uri) {
  // const [pathname] = uri.split('?');
  // const store = createStore(new UserService(repository));
  // const currentRoute = Object.entries(routes).find(([_, route]) => matchPath(pathname, route));
  // const { loader } = currentRoute?.[1];
  // if (loader) {
  //   await loader(store.dispatch);
  // }
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
