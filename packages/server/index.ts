import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'node:path';

import { distPath, initVite } from './services/init-vite';
import { getYandexUser, checkYandexUser, renderSSR } from './middlewares';
import { dbConnect } from './db';
import apiRouter from './api';

// import dbUsersController from './db/controllers/users';
// import dbTopicsController from './db/controllers/topics';

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const port = Number(process.env.SERVER_PORT) || 5000;

  const app = express().use(cookieParser()).use(cors());

  const vite = await initVite(app);

  if (!isDev && !!distPath) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));
  }

  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: {
        '*': '',
      },
      target: 'https://ya-praktikum.tech',
    })
  );

  app.use(express.json());

  app.use('*', getYandexUser);

  app.use('/api/forum/topics', checkYandexUser);

  app.use('/api', apiRouter);

  app.use('*', async (req, res, next) => renderSSR(req, res, next, vite));

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();

dbConnect();
  // .then(() =>
  //   dbUsersController.createUserFromYandexData({
  //     id: 1069910,
  //     yandexId: 1069910,
  //     firstName: '\u042E\u043B\u0438\u044F',
  //     secondName: '\u0410\u0440\u0430\u043D\u043E\u0432\u0438\u0447',
  //     displayName: 'julia.aranovich',
  //     login: 'julia.aranovich',
  //     avatar: '',
  //     email: 'julia.aranovich@yandex.ru',
  //     phone: '',
  //   })
  // )
  // .then(() => dbTopicsController.createTopic('title', 'text', 1069910));
