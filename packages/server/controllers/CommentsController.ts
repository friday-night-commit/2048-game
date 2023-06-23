import type { Request, Response, NextFunction } from 'express';

import dbCommentsController from '../db/controllers/comments';
import ApiError from './ApiError';
import { getYandexId } from '../middlewares/checkYandexUser';

class CommentsController {
  async getComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;

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
        ApiError.badRequest(
          `Комментарий с id ${commentId} не найден`,
          err as Error
        )
      );
    }
  }

  async getTopicComments(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;

    if (!topicId) {
      return next(ApiError.badRequest(`Пост с id ${topicId} не найден`));
    }

    try {
      const comments = await dbCommentsController.getCommentsByTopicId(
        Number(topicId)
      );
      res.status(200).json(comments);
    } catch (err) {
      return next(
        ApiError.badRequest(
          `Комментарий к посту с id ${topicId} не найдены`,
          err as Error
        )
      );
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const { text, parentId } = req.body;
    const yandexId = getYandexId(res);

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
      return next(
        ApiError.badRequest('Не получилось создать комментарий', err as Error)
      );
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;

    if (!commentId) {
      return next(ApiError.notFound('Не задан comment id'));
    }

    try {
      await dbCommentsController.deleteCommentById(Number(commentId));
      res.sendStatus(204);
    } catch (err) {
      return next(
        ApiError.badRequest('Не получилось удалить комментарий', err as Error)
      );
    }
  }
}

export default new CommentsController();
