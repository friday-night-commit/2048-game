import type { Request, Response, NextFunction } from 'express';

import dbCommentsController from '../db/controllers/comments';
import ApiError from './ApiError';
import checkTextLength from './checkTextLength';

const textParamSchema = {
  name: 'text',
  type: 'string',
  required: true,
  validator_functions: [checkTextLength(400)],
};

const parentIdParamSchema = {
  name: 'parentId',
  type: 'number',
  required: false,
};

export const paramsSchemas = {
  post: [textParamSchema, parentIdParamSchema],
};

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
      return next(
        ApiError.badRequest('Не получилось создать комментарий', err as Error)
      );
    }
  }

  async getLastComments(req: Request, res: Response, next: NextFunction) {
    const limit = req.query.limit || 3;

    try {
      const lastComments = await dbCommentsController.getLastComments(Number(limit));
      res.status(200).json(lastComments);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось получить последние комментарии', err as Error));
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;

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
