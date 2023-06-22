// import dotenv from 'dotenv';
// dotenv.config({ path: __dirname + '../../.env' });
import 'dotenv/config';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'node:path';

import { distPath, initVite } from './services/init-vite';
import { getYandexUser, checkYandexUser, renderSSR } from './middlewares';
import { dbConnect } from './db';
import apiRouter from './api';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';

const isDev = process.env.NODE_ENV === 'development';

async function startServer() {
  const port = Number(process.env.SERVER_PORT) || 5000;

  const app = express().use(cookieParser()).use(cors())
    .use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
    .use(bodyParser.json({ limit: '50mb' }));

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

  const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage });

  app.post('/upload', upload.single('image'), (req, res) => {
    // eslint-disable-next-line no-console
    console.log('req.file', req.file);
    if (!req.file) {
      return;
    }
    res.json({
      url: `/uploads/${req.file.originalname}`,
    });
  });

  app.use('*', getYandexUser);
  app.use('/uploads', express.static('uploads'));
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
