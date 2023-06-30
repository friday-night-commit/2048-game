import type { Request, Response, NextFunction } from 'express';

import dbReactionsController from '../db/controllers/reactions';
import { ApiError } from './error';
import getYandexId from './getYandexIdUtil';

class ReactionController {
  async getTopicReactions(req: Request, res: Response, next: NextFunction) {
    console.log('getTopicReactions');
    const { topicId } = req.params;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    try {
      const comments = await dbReactionsController.getReactionsByTopicId(
        Number(topicId)
      );
      res.status(200).json(comments);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать комментарий'));
    }
  }

  async createReaction(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const { text } = req.body;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!text) {
      return next(ApiError.badRequest('Не задан текст комментария'));
    }

    try {
      const comment = await dbReactionsController.createReaction(
        Number(res.locals.user.id),
        Number(topicId)
      );

      if (comment) {
        const updatedComment =
          await dbReactionsController.getReactionsByTopicId(comment.id);
        res.status(201).json(updatedComment);
      } else {
        return next(ApiError.badRequest('Не получилось создать комментарий'));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ee', err);
      return next(ApiError.badRequest('Не получилось создать комментарий'));
    }
  }
}

export default new ReactionController();
