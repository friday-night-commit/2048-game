import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import App from './src/App-ssr';
import { createStore } from './src/store';
import { UserService } from './src/api/UserService';
import { routesArr } from './src/router';
import { matchPath } from 'react-router-dom';
import { ThemeProvider } from './src/Utils/ThemeProvider';

async function render(uri, repository) {
  const [pathname] = uri.split('?');
  const store = createStore(new UserService(repository));
  const currentRoute = routesArr.find(route => matchPath(pathname, route.path));
  if (currentRoute?.loader) {
    const { loader } = currentRoute;
    await loader(store.dispatch);
  }

  const initialState = store.getState();
  const renderResult = renderToString(
    <StaticRouter location={uri}>
      <Provider store={store}>
        <ThemeProvider store={store}>
          <App />
        </ThemeProvider>
      </Provider>
    </StaticRouter>
  );

  return [initialState, renderResult];
}

export { render };
