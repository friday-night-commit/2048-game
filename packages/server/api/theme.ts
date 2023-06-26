import { Router } from 'express';

import validateParams from '../middlewares/validateParams';

import ThemeController, {
  paramsSchemas as themeParamsSchemas,
} from '../controllers/ThemeController';

const router: Router = Router();

router
  .route('')
  .post(validateParams(themeParamsSchemas.post), ThemeController.createTheme)
  .get(ThemeController.getAllThemes);
router
  .route('/:themeId([0-9]+)/:userId([0-9]+)')
  .post(validateParams(themeParamsSchemas.post), ThemeController.createThemeUser)
  .put(validateParams(themeParamsSchemas.put), ThemeController.updateThemeForUser)
  .delete(ThemeController.deleteThemeForUser);
router
  .route('/:themeName([a-Z]+)')
  .get(ThemeController.getThemeByName);
router
  .route('/:userId([0-9]+)')
  .get(ThemeController.getThemeByUser);
router
  .route('/:themeId([0-9]+)/:themeName([a-Z]+)')
  .put(validateParams(themeParamsSchemas.put), ThemeController.updateTheme);
router
  .route('/:themeId([0-9]+)')
  .get(ThemeController.getThemeById)
  .delete(ThemeController.deleteTheme);

export default router;
