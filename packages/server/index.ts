// import dotenv from 'dotenv';
// dotenv.config({ path: __dirname + '../../.env' });
import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'node:path';
import { distPath, initVite } from './services/init-vite';
import { getYandexUser, renderSSR } from './middlewares';

import { dbConnect } from './db';
// import dbTopicsController from './db/controllers/topics';

import apiRouter from './api';

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

  app.use('/api', apiRouter);
  app.use('/uploads', express.static('uploads'));
  app.use('*', async (req, res, next) => renderSSR(req, res, next, vite));

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

startServer();

dbConnect();
  // .then(() => dbTopicsController.createTopic('the new topic', 'some text', 1)); // test
