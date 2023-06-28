import { Router } from 'express';

import validateParams from '../middlewares/validateParams';

import ThemeController, {
  paramsSchemas as themeParamsSchemas,
} from '../controllers/ThemeController';

const router: Router = Router();

router
  .route('')
  .get(ThemeController.createTheme);
router
  .route('/allThemes')
  .get(ThemeController.getAllThemes);
router
  .route('/:id([0-9]+)/:userId([0-9]+)')
  .post(validateParams(themeParamsSchemas.post), ThemeController.createThemeUser)
  .put(validateParams(themeParamsSchemas.put), ThemeController.updateThemeForUser)
  .delete(ThemeController.deleteThemeForUser);
router
  .route('/getThemeByName/:name([a-zA-Z]+)')
  .get(ThemeController.getThemeByName);
router
  .route('/getThemeByUser/:userId([0-9]+)')
  .get(ThemeController.getThemeByUser);
router
  .route('/:themeId([0-9]+)/:name(^[0-9]+)')
  .put(validateParams(themeParamsSchemas.put), ThemeController.updateTheme);
router
  .route('/getThemeById/:id([0-9]+)')
  .get(ThemeController.getThemeById)
  .delete(ThemeController.deleteTheme);

export default router;
