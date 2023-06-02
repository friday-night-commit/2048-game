import type { NextFunction, Request, Response } from 'express';

import renderBundle from './bundle';
import type { RootState } from 'client/src/store';

export interface RenderData {
  value: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const location = req.url;
  const bundleName = 'style';
  const initialState: any | RootState = {
    // Убрать any
    reducer: 'test',
  };
  const html = renderBundle({
    bundleName,
    location,
    data: { value: 'sss' },
    initialState,
  });
  res.status(200).send(html);

  next();
};
