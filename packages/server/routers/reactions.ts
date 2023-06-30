import { Router } from 'express';

import ReactionsController from '../controllers/ReactionsController';

const router: Router = Router();

router
  .route('/:topicId')
  .post(ReactionsController.createReaction)
  .get(ReactionsController.getTopicReactions);

export default router;
