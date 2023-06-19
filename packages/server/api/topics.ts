import { Router } from 'express';

import TopicsController from '../controllers/TopicsController';

const router: Router = Router();

router
  .route('/forum/topics/:topicId')
  .get(TopicsController.getTopic)
  .put(TopicsController.updateTopic)
  .delete(TopicsController.deleteTopic);
router
  .route('/forum/topics')
  .post(TopicsController.createTopic)
  .get(TopicsController.getAllTopics);

export default router;
