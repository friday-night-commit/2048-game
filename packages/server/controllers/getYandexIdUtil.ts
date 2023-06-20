import type { Response } from 'express';

export default function getYandexId(res: Response): number | void {
  try {
    return res.locals.user.yandexId;
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
