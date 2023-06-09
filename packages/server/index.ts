import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';

import path from 'node:path';
import { distPath, initVite } from './services/init-vite';
import { renderSSR } from './middlewares';

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const port = Number(process.env.SERVER_PORT) || 3001;

  const app = express()
    .use(express.json())
    .use(cookieParser())
    .use(cors())
    .use('/api', router);

  const vite = await initVite(app);

  if (!isDev && !!distPath) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use('*', async (req, res, next) => renderSSR(req, res, next, vite));

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer().then();
