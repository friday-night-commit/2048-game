import dbThemeController from '../db/controllers/theme';
import type { RequestHandler } from 'express';


export const theming: RequestHandler = async (_req, _res, next) => {
  const themeInDB = await dbThemeController.getThemeByName('light');
  if (!themeInDB) {
    await dbThemeController.fillTable();
  }

 next();
};