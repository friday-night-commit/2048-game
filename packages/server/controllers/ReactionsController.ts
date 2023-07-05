import type { Request, Response, NextFunction } from 'express';

import dbReactionsController from '../db/controllers/reactions';
import ApiError from './ApiError';
import checkTextLength from './checkTextLength';

const typeParamSchema = {
  name: 'type',
  type: 'string',
  required: true,
  validator_functions: [checkTextLength(10)]
};
export const paramsSchemas = {
  post: [typeParamSchema]
};

class ReactionController {
  async getTopicReactions(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    try {
      const comments = await dbReactionsController.getReactionsByTopicId(
        Number(topicId)
      );
      res.status(200).json(comments);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать комментарий', err as Error));
    }
  }

  async createReaction(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const { type } = req.body;
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
      return next(ApiError.badRequest('Не получилось создать реакцию', err as Error));
    }
  }
}

export default new ReactionController();
