import htmlescape from 'htmlescape';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import type { RootState } from 'client/src/store';
import type { RenderData } from './render';

function getBundle(bundleName: string, lang: string) {
  const module = `../../../ssr.bundles.${lang}`;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(module).bundles[bundleName];
}

interface PageHtmlParams {
  bundleName: string;
  bundleHtml: string;
  data: RenderData;
  initialState: any | RootState;
}

function getPageHtml(params: PageHtmlParams) {
  const { bundleName, bundleHtml, data } = params;
  const baseUrl = '';
  const bundleFilePath = `${baseUrl}${bundleName}.bundle`;

  const html = renderToStaticMarkup(
    <html>
      <head>
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <link rel='stylesheet' href={`${bundleFilePath}.css`} />
      </head>
      <body>
        <div id='root' dangerouslySetInnerHTML={{ __html: bundleHtml }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `Client.default(${htmlescape(data)});`,
          }}
        />
      </body>
    </html>
  );
  return `<!doctype html>${html}`;
}

interface RenderBundleArguments {
  bundleName: string;
  location: string;
  data: RenderData;
  initialState: RootState;
}

export default ({
  bundleName,
  location,
  data,
  initialState,
}: RenderBundleArguments) => {
  const Bundle = getBundle(bundleName, 'ru');
  if (!Bundle) {
    throw new Error(`Bundle ${bundleName} not found`);
  }
  const bundleHtml = renderToString(<Bundle data={data} />);
  // eslint-disable-next-line no-console
  console.log('location', location);
  return {
    html: getPageHtml({
      bundleName,
      bundleHtml,
      data,
      initialState,
    }),
  };
};
