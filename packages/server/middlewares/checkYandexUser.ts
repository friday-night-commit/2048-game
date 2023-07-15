import type { RequestHandler, Response } from 'express';

import ApiError from '../controllers/ApiError';

export const getYandexId = (res: Response): number | void => {
  try {
    return res.locals.user.yandexId;
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

const checkYandexUser: RequestHandler = async (_req, res, next) => {
  const yandexId = getYandexId(res);

  if (yandexId) {
    next();
  } else {
    next(ApiError.forbidden('Авторизованный пользователь не найден', res.locals.userError));
  }
};

export default checkYandexUser;
