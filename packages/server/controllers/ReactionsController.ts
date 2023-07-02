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
    const { type } = req.body;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      // return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!type) {
      return next(ApiError.badRequest('Не задан тип реакции'));
    }

    try {
      const reaction = await dbReactionsController.createReaction(
        Number(res.locals.user.id),
        Number(topicId),
        type
      );
      if (reaction) {
        res.status(201).json(reaction);
      } else {
        return next(ApiError.badRequest('Не получилось создать комментарий'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать реакцию'));
    }
  }
}

export default new ReactionController();
