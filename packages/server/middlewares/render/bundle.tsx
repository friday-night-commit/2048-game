import htmlescape from 'htmlescape';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import type { RootState } from 'client/src/store';
import type { RenderData } from './render';
import { Provider } from 'react-redux';
import type React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { initialStore } from 'client/src/store'; // Ошибка импорта  Must use import to load ES Module:

interface PageHtmlParams {
  bundleHtml: string;
  data: RenderData;
  initialState: RootState;
}

function getPageHtml(params: PageHtmlParams) {
  const { bundleHtml, data, initialState } = params;

  const html = renderToStaticMarkup(
    <html>
      <head>
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: bundleHtml }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `Client.default(${htmlescape(data)},${htmlescape(
              initialState
            )});`,
          }}
        />
      </body>
    </html>
  );
  return `<!doctype html>${html}`;
}

interface RenderBundleArguments {
  location: string;
  data: RenderData;
  initialState: RootState;
}

export default (props: RenderBundleArguments) => {
  const bundleHtml = renderToString(
    <Bundle
      location={props.location}
      initialState={props.initialState}
      data={props.data}
    />
  );
  // eslint-disable-next-line no-console
  console.log('location', props.location);
  return {
    html: getPageHtml({
      data: props.data,
      initialState: props.initialState,
      bundleHtml,
    }),
  };
};

export const Bundle: React.FC<RenderBundleArguments> = props => {
  const { location, initialState } = props;
  return (
    <Provider store={initialStore(initialState)}>
      <StaticRouter location={location}>
        <label>Test Bundle</label>
      </StaticRouter>
    </Provider>
  );
};
