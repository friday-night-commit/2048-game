import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const port = Number(process.env.SERVER_PORT) || 3001;
  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/index.html'));
  const srcPath = path.dirname(require.resolve('client'));
  const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

  const app = express()
    .use(express.json())
    .use(cookieParser())
    .use(cors())
    .use('/api', router);

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });
    if (vite) {
      app.use(vite.middlewares);
    }
  }
  // static
  if (!isDev && !!distPath) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template: string;
      if (!isDev && !!distPath) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        );
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8'
        );
        if (vite) {
          template = await vite.transformIndexHtml(url, template);
        }
      }

      interface SSRModule {
        render: (uri: string) => Promise<[Record<string, any>, string]>;
      }

      let mod: SSRModule;

      if (isDev) {
        mod = (await vite!.ssrLoadModule(
          path.resolve(srcPath, 'ssr.tsx')
        )) as SSRModule;
      } else {
        mod = await import(ssrClientPath);
      }
      const { render } = mod;
      const [initialState, appHtml] = await render(url);
      const initStateSerialized = JSON.stringify(initialState);

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace('<!--store-data-->', initStateSerialized);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (isDev) {
        vite!.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer().then();
