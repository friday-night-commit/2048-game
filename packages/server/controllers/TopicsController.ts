import type { Request, Response, NextFunction } from 'express';
import dbTopicsController from '../db/controllers/topics';
import { ApiError } from './error';
import getYandexId from './getYandexIdUtil';

class TopicsController {
  async getTopic(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const yandexId = getYandexId(res);

    if (!yandexId) {
    //   return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    try {
      const topic = await dbTopicsController.getTopicById(Number(topicId));
      if (topic) {
        res.status(200).json(topic);
      } else {
        return next(ApiError.badRequest(`Пост с id ${topicId} не найден`));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('getTopic err', err);
      return next(ApiError.badRequest(`Пост с id ${topicId} не найден`));
    }
  }

  async getAllTopics(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await dbTopicsController.getAllTopics();
      res.status(200).json(topics);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('err', e);
      return next(ApiError.badRequest('Не получилось получить посты'));
    }
  }

  async getAllTags(_req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await dbTopicsController.getAllTags();
      res.status(200).json(tags);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('err', e);
      return next(ApiError.badRequest('Не получилось получить теги'));
    }
  }

  async createTopic(req: Request, res: Response, next: NextFunction) {
    const { title, text, tag, imageUrl } = req.body;
    const yandexId = getYandexId(res);

    // eslint-disable-next-line no-console
    console.log('yandexId', yandexId);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!title) {
      return next(ApiError.badRequest('Не задан заголовок поста'));
    }

    if (!text) {
      return next(ApiError.badRequest('Не задан текст поста'));
    }

    if (!tag) {
      return next(ApiError.badRequest('Не задан тэг поста'));
    }

    try {


      const topic = await dbTopicsController.createTopic(
        title,
        text,
        Number(yandexId),
        tag,
        imageUrl
      );
      if (topic) {
        res.status(201).json(topic);
      } else {
        return next(ApiError.badRequest('Не получилось создать пост'));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
      return next(ApiError.badRequest('Не получилось создать пост'));
    }
  }

  async updateTopic(req: Request, res: Response, next: NextFunction) {
    const { title, text, userId } = req.body;
    const { topicId } = req.params;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

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
      return next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  async deleteTopic(req: Request, res: Response, next: NextFunction) {
    const { topicId } = req.params;
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.forbidden('Авторизованный пользователь не найден'));
    }

    if (!topicId) {
      return next(ApiError.notFound('Не задан topic id'));
    }

    try {
      await dbTopicsController.deleteTopicById(Number(topicId));
      res.status(204).json(topicId);
    } catch (err) {
      return next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }
}

export default new TopicsController();
