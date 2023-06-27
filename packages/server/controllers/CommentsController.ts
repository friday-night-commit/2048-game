import type { Request, Response, NextFunction } from 'express';

import dbCommentsController from '../db/controllers/comments';
import { ApiError } from './error';
import getYandexId from './getYandexIdUtil';

class CommentsController {
  async getComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    try {
      const comment = await dbCommentsController.getCommentById(
        Number(commentId)
      );
      if (comment) {
        res.status(200).json(comment);
      } else {
        return next(
          ApiError.badRequest(`Комментарий с id ${commentId} не найден`)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(`Комментарий с id ${commentId} не найден`)
      );
    }
  }

  async getTopicComments(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const yandexId = 666; // getYandexId(res);

    if (!yandexId) {
      // return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    try {
      const comments = await dbCommentsController.getCommentsByTopicId(
        Number(topicId)
      );
      res.status(200).json(comments);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать комментарий'));
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const { text, parentId } = req.body;
    let yandexId = getYandexId(res);

    if (!yandexId) {
      yandexId = 666;
      //  return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!text) {
      return next(ApiError.badRequest('Не задан текст комментария'));
    }

    try {
      const comment = await dbCommentsController.createComment(
        text,
        Number(yandexId),
        Number(topicId),
        parentId
      );

      if (comment) {
        res.status(201).json(comment);
      } else {
        return next(ApiError.badRequest('Не получилось создать комментарий'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать комментарий'));
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!commentId) {
      return next(ApiError.notFound('Не задан comment id'));
    }

    try {
      await dbCommentsController.deleteCommentById(Number(commentId));
      res.status(204).end();
    } catch (err) {
      return next(ApiError.badRequest('Не получилось удалить комментарий'));
    }
  }
}

export default new CommentsController();
