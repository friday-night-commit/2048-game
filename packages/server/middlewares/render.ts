import type { NextFunction, Request, Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { distPath, srcPath, ssrClientPath } from '../services/init-vite';
import type { ViteDevServer } from 'vite';
import { YandexAPIRepository } from '../repository/YandexAPIRepository';
import jsesc from 'jsesc';

const isDev = process.env.NODE_ENV === 'development';

interface SSRModule {
  render: (
    uri: string,
    repository: any
  ) => Promise<[Record<string, unknown>, string]>;
}

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  vite: ViteDevServer | undefined
) => {
  const url = req.originalUrl;
  try {
    let template: string;
    if (!isDev && !!distPath) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
    } else {
      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
      if (vite) {
        template = await vite.transformIndexHtml(url, template);
      }
    }

    let mod: SSRModule;
    if (isDev && vite) {
      mod = (await vite.ssrLoadModule(
        path.resolve(srcPath, 'ssr.tsx')
      )) as SSRModule;
    } else {
      mod = await import(ssrClientPath);
    }
    const { render } = mod;
    const [initialState, appHtml] = await render(
      url,
      new YandexAPIRepository(req.headers?.cookie)
    );

    const initStateSerialized = jsesc(initialState, {
      json: true,
      isScriptContext: true,
    });

    const html = template
      .replace('<!--ssr-outlet-->', appHtml)
      .replace('<!--store-data-->', JSON.stringify(initStateSerialized));

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    if (isDev && vite) {
      vite.ssrFixStacktrace(e as Error);
    }
    next(e);
  }
};
