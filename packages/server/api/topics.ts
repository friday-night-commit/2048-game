import { Router } from 'express';

import validateParams from '../middlewares/validateParams';

import TopicsController, {
  paramsSchemas as topicsParamsSchemas,
} from '../controllers/TopicsController';
import CommentsController, {
  paramsSchemas as commentsParamsSchemas,
} from '../controllers/CommentsController';

const router: Router = Router();

router
  .route('')
  .post(validateParams(topicsParamsSchemas.post), TopicsController.createTopic)
  .get(TopicsController.getAllTopics);
router
  .route('/:topicId([0-9]+)')
  .get(TopicsController.getTopic)
  .put(validateParams(topicsParamsSchemas.put), TopicsController.updateTopic)
  .delete(TopicsController.deleteTopic);
router
  .route('/:topicId([0-9]+)/comments')
  .post(
    validateParams(commentsParamsSchemas.post),
    CommentsController.createComment
  )
  .get(CommentsController.getTopicComments);
router
  .route('/:topicId([0-9]+)/comments/:commentId([0-9]+)')
  .get(CommentsController.getComment)
  .delete(CommentsController.deleteComment);

export default router;
