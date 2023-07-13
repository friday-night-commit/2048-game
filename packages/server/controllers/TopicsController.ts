import type { Request, Response, NextFunction } from 'express';
import dbTopicsController from '../db/controllers/topics';
import ApiError from './ApiError';
import { getYandexId } from '../middlewares/checkYandexUser';
import checkTextLength from './checkTextLength';

const titleParamSchema = {
  name: 'title',
  type: 'string',
  required: true,
  validator_functions: [checkTextLength(200)]
};

const textParamSchema = {
  name: 'text',
  type: 'string',
  required: true,
  validator_functions: [checkTextLength(600)]
};

const userIdParamSchema = {
  name: 'userId',
  type: 'number',
  required: true
};

export const paramsSchemas = {
  post: [titleParamSchema, textParamSchema],
  put: [titleParamSchema, textParamSchema, userIdParamSchema]
};

class TopicsController {
  async getTopic(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;

    try {
      const topic = await dbTopicsController.getTopicById(Number(topicId));
      if (topic) {
        res.status(200).json(topic);
      } else {
        return next(ApiError.badRequest(`Пост с id ${topicId} не найден`));
      }
    } catch (err) {
      return next(
        ApiError.badRequest(`Пост с id ${topicId} не найден`, err as Error)
      );
    }
  }

  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line no-console
      const topics = await dbTopicsController.getAllTopics();
      res.status(200).json(topics);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось получить посты', err as Error));
    }
  }

  async getAllTags(_req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await dbTopicsController.getAllTags();
      res.status(200).json(tags);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось получить теги', err as Error));
    }
  }

  async createTopic(req: Request, res: Response, next: NextFunction) {
    const { title, text, tag, imageUrl } = req.body;
    try {
      const topic = await dbTopicsController.createTopic(
        title,
        text,
        Number(res.locals.user.id),
        tag,
        imageUrl
      );

      if (topic) {
        res.status(201).json(topic);
      } else {
        return next(ApiError.badRequest('Не получилось создать пост'));
      }
    } catch (err) {
      return next(
        ApiError.badRequest('Не получилось создать пост', err as Error)
      );
    }
  }

  async updateTopic(req: Request, res: Response, next: NextFunction) {
    const yandexId = getYandexId(res);
    if (yandexId != req.body.userId) {
      return next(ApiError.forbidden('Нет прав редактировать пост'));
    }

    try {
      const topic = await dbTopicsController.updateTopicById(req.body);
      if (topic) {
        res.status(200).json(topic);
      } else {
        return next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      return next(
        ApiError.badRequest('Не получилось обновить пост', err as Error)
      );
    }
  }

  async deleteTopic(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    try {
      await dbTopicsController.deleteTopicById(Number(topicId));
      res.send( topicId );
    } catch (err) {
      return next(
        ApiError.badRequest('Не получилось удалить пост', err as Error)
      );
    }
  }
}

export default new TopicsController();
