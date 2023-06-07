import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import type React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice, UserState } from './initialStore';
import { Route, Routes } from 'react-router-dom';

interface PageHtmlParams {
  bundleHtml: string;
  initialState: UserState;
}

function getPageHtml(params: PageHtmlParams) {
  const { bundleHtml, initialState } = params;
  // eslint-disable-next-line no-console
  console.log('bundleHtml', bundleHtml);
  const html = `
    <html>
      <head>
        <title>2048-Game SSR</title>
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
      <div id='root'>${bundleHtml}</div>
        <script>
          window.__INITIAL_STATE__ =${JSON.stringify(initialState)}
        </script>
      </body>
    </html>
  `;
  return `<!doctype html>${html}`;
}

interface RenderBundleArguments {
  location: string;
  initialState: UserState;
}

export default (props: RenderBundleArguments): string => {
  const bundleHtml = renderToString(
    <Bundle location={props.location} initialState={props.initialState} />
  );
  // eslint-disable-next-line no-console
  console.log('location', props.location);
  return getPageHtml({
    initialState: props.initialState,
    bundleHtml,
  });
};

export const Bundle: React.FC<RenderBundleArguments> = props => {
  const { location } = props;
  const store = configureStore(userSlice);
  return (
    <Provider store={store}>
      <StaticRouter location={location}>
        <SSR_APP_Component />
      </StaticRouter>
    </Provider>
  );
};

const SSR_APP_Component = () => {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<div>Here should be React Component From Client</div>}
        />
      </Routes>
    </>
  );
};
