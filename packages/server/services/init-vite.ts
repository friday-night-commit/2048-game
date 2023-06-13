import type { ViteDevServer } from 'vite';

const isDev = process.env.NODE_ENV === 'development';
import { createServer as createViteServer } from 'vite';
import type { Express } from 'express';
import path from 'node:path';

export const distPath = path.dirname(require.resolve('client/dist/index.html'));
export const srcPath = path.dirname(require.resolve('client'));
export const ssrClientPath = require.resolve('client/ssr-dist/ssr.cjs');

export const initVite = async (
  app: Express
): Promise<ViteDevServer | undefined> => {
  let vite = undefined;
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
  return vite;
};
