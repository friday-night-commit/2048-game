import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';
import { renderSSR } from './middlewares';

const app: Express = express()
  .use(express.json())
  .use(cookieParser())
  .use(cors())
  .use('/api', router)
  .use(renderSSR);

export { app };
