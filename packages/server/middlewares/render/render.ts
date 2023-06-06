import type { NextFunction, Request, Response } from 'express';

import render from './bundle';
import { initialUserState } from './initialStore';

export default (req: Request, res: Response, next: NextFunction) => {
  const location = req.url;
  const html = render({
    location,
    initialState: initialUserState, // Для примера
  });
  res.status(200).send(html);
  next();
};
