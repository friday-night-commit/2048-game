import type { NextFunction, Request, Response } from 'express';

import renderBundle from './bundle';
import { store } from 'client/src/store';

export interface RenderData {
  value: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const location = req.url;
  const initialState = store.getState();
  const html = renderBundle({
    location,
    data: { value: 'test' },
    initialState,
  });
  res.status(200).send(html);
  next();
};
