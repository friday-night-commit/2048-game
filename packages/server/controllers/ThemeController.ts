import type { Request, Response, NextFunction } from 'express';

import dbThemeController from '../db/controllers/theme';
import ApiError from './ApiError';
import { getYandexId } from '../middlewares/checkYandexUser';

enum ErrorMsg {
  NOT_CREATED = 'Не получилось добавить тему!',
  NOT_UPDATE = 'Не получилось обновить тему',
  NOT_DELETED = 'Не получилось удалить тему',
  NO_PARAMS = 'Нет нужного параметра: ',
  NOT_FOUND = 'Тема не найдена. Параметр поиска: '
}

enum ParamsDB {
  THEME_ID = 'theme id',
  THEME_NAME = 'theme name',
  YANDEX_ID = 'yandex id'
}

class ThemeController {
  async createTheme(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_NAME));
    }

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
    const { themeId } = req.body;
    const yandexId = getYandexId(res);

    if (!themeId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_ID));
    }

    if (!yandexId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.YANDEX_ID));
    }

    try {
      const theme = await dbThemeController.createThemeUserLink(themeId, yandexId);
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

  async getThemeById(req: Request, res: Response, next: NextFunction) {
    const { themeId } = req.params;

    if (!themeId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_ID));
    }

    try {
      const theme = await dbThemeController.getThemeById(
        Number(themeId)
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsDB.THEME_ID + themeId)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsDB.THEME_ID + themeId,
          err as Error
        )
      );
    }
  }

  async getThemeByName(req: Request, res: Response, next: NextFunction) {
    const { themeName } = req.params;

    if (!themeName) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_NAME));
    }

    try {
      const theme = await dbThemeController.getThemeByName(
        themeName
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsDB.THEME_NAME + themeName)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsDB.THEME_NAME + themeName,
          err as Error
        )
      );
    }
  }

  async getThemeByUser(res: Response, next: NextFunction) {
    const yandexId = getYandexId(res);

    if (!yandexId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.YANDEX_ID));
    }

    try {
      const theme = await dbThemeController.getThemeByUser(
        Number(yandexId)
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsDB.YANDEX_ID + yandexId)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsDB.YANDEX_ID + yandexId,
          err as Error
        )
      );
    }
  }

  async updateTheme(req: Request, res: Response, next: NextFunction) {
    const { themeId, themeName } = req.params;

    if (!themeId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_ID));
    }

    if (!themeName) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_NAME));
    }

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
    const { themeId } = req.params;
    const yandexId = getYandexId(res);

    if (!themeId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.THEME_ID));
    }

    if (!yandexId) {
      return next(ApiError.badRequest(ErrorMsg.NO_PARAMS + ParamsDB.YANDEX_ID));
    }

    try {
      const theme = await dbThemeController.updateThemeForUser(
        Number(themeId),
        yandexId
      );
      if (theme) {
        res.status(200).json(theme);
      } else {
        return next(
          ApiError.badRequest(ErrorMsg.NOT_FOUND + ParamsDB.THEME_ID + themeId)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(
          ErrorMsg.NOT_FOUND + ParamsDB.THEME_ID + themeId,
          err as Error
        )
      );
    }
  }

  async deleteThemeForUser(req: Request, res: Response, next: NextFunction) {
    const { themeId } = req.params;

    if (!themeId) {
      return next(ApiError.notFound(ErrorMsg.NO_PARAMS + ParamsDB.THEME_ID));
    }

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

    if (!themeId) {
      return next(ApiError.notFound(ErrorMsg.NO_PARAMS + ParamsDB.THEME_ID));
    }

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
