import htmlescape from 'htmlescape';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import type React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { configureStore } from '@reduxjs/toolkit';
import { userSlice, UserState } from './initialStore';

interface PageHtmlParams {
  bundleHtml: string;
  initialState: UserState;
}

function getPageHtml(params: PageHtmlParams) {
  const { bundleHtml, initialState } = params;

  const html = renderToStaticMarkup(
    <html>
      <head>
        <title>2048-Game</title>
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: bundleHtml }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `Client.default(${htmlescape(initialState)});`,
          }}
        />
      </body>
    </html>
  );
  return `<!doctype html>${html}`;
}

interface RenderBundleArguments {
  location: string;
  initialState: UserState;
}

export default (props: RenderBundleArguments) => {
  const bundleHtml = renderToString(
    <Bundle location={props.location} initialState={props.initialState} />
  );
  // eslint-disable-next-line no-console
  console.log('location', props.location);
  return {
    html: getPageHtml({
      initialState: props.initialState,
      bundleHtml,
    }),
  };
};

export const Bundle: React.FC<RenderBundleArguments> = props => {
  const { location } = props;
  const store = configureStore(userSlice);
  return (
    <Provider store={store}>
      <StaticRouter location={location}>
        <label>Test Bundle</label>
      </StaticRouter>
    </Provider>
  );
};
