import { Router } from 'express';

import validateParams from '../middlewares/validateParams';

import ThemeController, {
  paramsSchemas as themeParamsSchemas,
} from '../controllers/ThemeController';

const router: Router = Router();

router
  .route('/changeTheme/:id([0-9]+)/:userId([0-9]+)')
  .put(validateParams(themeParamsSchemas.put), ThemeController.updateThemeForUser);
router
  .route('/getThemeByName/:name([a-zA-Z]+)')
  .get(ThemeController.getThemeByName);
router
  .route('/getThemeByUser/:userId([0-9]+)')
  .get(ThemeController.getThemeByUser);
router
  .route('/getThemeById/:id([0-9]+)')
  .get(ThemeController.getThemeById);

export default router;
