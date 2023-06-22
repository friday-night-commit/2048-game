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
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
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
    const yandexId = getYandexId(res);

    if (!yandexId) {
         return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!text) {
      return next(ApiError.badRequest('Не задан текст комментария'));
    }

    try {
      const comment = await dbCommentsController.createComment(
        text,
        Number(res.locals.user.id),
        Number(topicId),
        parentId
      );

      if (comment) {
        const updatedComment = await dbCommentsController.getCommentById(comment.id);
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

  async getLastComments(req: Request, res: Response, next: NextFunction) {
    const limit = req.query.limit || 3;
    const yandexId = getYandexId(res);

    if (!yandexId) {
       return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }
    try {
     const lastComments = await dbCommentsController.getLastComments(Number(limit));
      res.status(200).json(lastComments);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('ee', err);
      return next(ApiError.badRequest('Не получилось получить последние комментарии'));
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line no-console
    console.log('deleteComment');
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
      res.sendStatus(204);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось удалить комментарий'));
    }
  }
}

export default new CommentsController();
