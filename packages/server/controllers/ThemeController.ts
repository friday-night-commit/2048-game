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

const themeNameParamSchema = {
  name: 'name',
  type: 'string',
  required: true,
};

const userIdParamSchema = {
  name: 'userId',
  type: 'number',
  required: true,
};

export const paramsSchemas = {
  post: [themeIdParamSchema, themeNameParamSchema],
  put: [themeIdParamSchema, themeNameParamSchema, userIdParamSchema]
};

class ThemeController {
  async createTheme(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    try {
      const theme = await dbThemeController.createTheme(name);
      if (theme) {
        res.status(201).json(theme);
      } else {
        return next(ApiError.badRequest(ErrorMsg.NOT_CREATED));
      }
    } catch (err) {
      return next(
        ApiError.badRequest(ErrorMsg.NOT_CREATED, err as Error)
      );
    }
  }

  async createThemeUser(req: Request, res: Response, next: NextFunction) {
    const { themeId, userId } = req.body;

    try {
      const theme = await dbThemeController.createThemeUserLink(themeId, userId);
      if (theme) {
        res.status(201).json(theme);
      } else {
        return next(ApiError.badRequest(ErrorMsg.NOT_CREATED));
      }
    } catch (err) {
      return next(
        ApiError.badRequest(ErrorMsg.NOT_CREATED, err as Error)
      );
    }
  }

  async getAllThemes(_req: Request, res: Response, next: NextFunction) {
    try {
      const topics = await dbThemeController.getAllThemes();
      res.status(200).json(topics);
    } catch (err) {
      return next(ApiError.badRequest(ErrorMsg.NO_THEMES, err as Error));
    }
  }

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
    const { themeName } = req.params;

    try {
      const theme = await dbThemeController.getThemeByName(
        themeName
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsName.THEME_NAME + themeName)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsName.THEME_NAME + themeName,
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

  async updateTheme(req: Request, res: Response, next: NextFunction) {
    const { themeId, themeName } = req.params;

    try {
      const theme = await dbThemeController.updateThemeById(
        themeName,
        Number(themeId)
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_UPDATE)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_UPDATE,
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

  async deleteThemeForUser(req: Request, res: Response, next: NextFunction) {
    const { themeId } = req.params;

    try {
      await dbThemeController.deleteThemeUserByThemeId(Number(themeId));
      res.sendStatus(204);
    } catch (err) {
      return next(
        ApiError.badRequest(ErrorMsg.NOT_DELETED, err as Error)
      );
    }
  }

  async deleteTheme(req: Request, res: Response, next: NextFunction) {
    const { themeId } = req.params;

    try {
      await dbThemeController.deleteThemeUserByThemeId(Number(themeId))
        .then( () => dbThemeController.deleteThemeById(Number(themeId)));
      res.sendStatus(204);
    } catch (err) {
      return next(
        ApiError.badRequest(ErrorMsg.NOT_DELETED, err as Error)
      );
    }
  }
}

export default new ThemeController();
