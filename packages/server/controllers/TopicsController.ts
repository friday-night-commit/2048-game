import type { Request, Response, NextFunction } from 'express';

import dbTopicsController from '../db/controllers/topics';
import ApiError from './ApiError';
import { getYandexId } from '../middlewares/checkYandexUser';

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
      const topics = await dbTopicsController.getAllTopics();
      res.status(200).json(topics);
    } catch (err) {
      return next(ApiError.badRequest('Посты не найдены', err as Error));
    }
  }

  async createTopic(req: Request, res: Response, next: NextFunction) {
    const { title, text } = req.body;
    const yandexId = getYandexId(res);

    if (!title) {
      return next(ApiError.badRequest('Не задан заголовок поста'));
    }

    if (!text) {
      return next(ApiError.badRequest('Не задан текст поста'));
    }

    try {
      const topic = await dbTopicsController.createTopic(
        title,
        text,
        Number(yandexId)
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
    const { title, text, userId } = req.body;
    const { topicId } = req.params;
    const yandexId = getYandexId(res);

    if (!title) {
      return next(ApiError.badRequest('Не задан заголовок поста'));
    }

    if (!text) {
      return next(ApiError.badRequest('Не задан текст поста'));
    }

    if (!topicId) {
      return next(ApiError.notFound('Не задан topic id'));
    }

    if (yandexId != userId) {
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

    if (!topicId) {
      return next(ApiError.notFound('Не задан topic id'));
    }

    try {
      await dbTopicsController.deleteTopicById(Number(topicId));
      res.sendStatus(204);
    } catch (err) {
      return next(
        ApiError.badRequest('Не получилось удалить пост', err as Error)
      );
    }
  }
}

export default new TopicsController();
