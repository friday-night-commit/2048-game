import dbThemeController from '../db/controllers/theme';
import type { RequestHandler } from 'express';
import { INITIAL_THEME } from 'client/src/Components/ThemeToggler/theme.interfaces';


export const theming: RequestHandler = async (_req, _res, next) => {
  const themeInDB = await dbThemeController.getThemeByName(INITIAL_THEME);
  if (!themeInDB) {
    await dbThemeController.fillTable();
  }

 next();
};