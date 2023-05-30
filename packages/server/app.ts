import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';


const getSSR = (_request: Request, response: Response) => {
  response.json('<h1>Hello SSR</h1>');
  return;
};

const app: Express = express()
  .use(express.json())
  .use(cookieParser())
  .use(cors())
  .use('/api', router)
  .get('/', getSSR);

export { app };


