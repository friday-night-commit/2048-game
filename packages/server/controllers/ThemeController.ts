import type { Request, Response, NextFunction } from 'express';

import dbThemeController from '../db/controllers/theme';
import ApiError from './ApiError';

enum ErrorMsg {
  NOT_CREATED = 'Не получилось добавить тему!',
  NOT_UPDATE = 'Не получилось обновить тему',
  NOT_DELETED = 'Не получилось удалить тему',
  NO_THEMES = 'Темы не найдены',
  NOT_FOUND = 'Тема не найдена. Параметр поиска: '
}

enum ParamsName {
  THEME_ID = 'theme id',
  THEME_NAME = 'theme name',
  USER_ID = 'user id'
}

const themeIdParamSchema = {
  name: 'themeId',
  type: 'number',
  required: true,
};

const userIdParamSchema = {
  name: 'userId',
  type: 'number',
  required: true,
};

export const paramsSchemas = {
  put: [themeIdParamSchema, userIdParamSchema]
};

class ThemeController {
  async getThemeById(req: Request, res: Response, next: NextFunction) {
    const { themeId } = req.params;

    try {
      const theme = await dbThemeController.getThemeById(
        Number(themeId)
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsName.THEME_ID + themeId)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsName.THEME_ID + themeId,
          err as Error
        )
      );
    }
  }

  async getThemeByName(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params;

    try {
      const theme = await dbThemeController.getThemeByName(
        name
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsName.THEME_NAME + name)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsName.THEME_NAME + name,
          err as Error
        )
      );
    }
  }

  async getThemeByUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    try {
      const theme = await dbThemeController.getThemeByUser(
        Number(userId)
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsName.USER_ID + userId)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsName.USER_ID + userId,
          err as Error
        )
      );
    }
  }

  async updateThemeForUser(req: Request, res: Response, next: NextFunction) {
    const { themeId, userId } = req.body;

    try {
      const theme = await dbThemeController.updateThemeForUser(
        Number(themeId),
        Number(userId),
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsName.THEME_ID + themeId)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsName.THEME_ID + themeId,
          err as Error
        )
      );
    }
  }
}

export default new ThemeController();
