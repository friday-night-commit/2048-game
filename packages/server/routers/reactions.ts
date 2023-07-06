import { Router } from 'express';
import validateParams from '../middlewares/validateParams';
import ReactionsController, {
  paramsSchemas as reactionsParamsSchemas,
} from '../controllers/ReactionsController';

const router: Router = Router();

router
  .route('/:topicId([0-9]+)')
  .post(validateParams(reactionsParamsSchemas.post),ReactionsController.createReaction)
  .get(ReactionsController.getTopicReactions);

export default router;
