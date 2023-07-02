import { Router } from 'express';
import TopicsController from '../controllers/TopicsController';
import CommentsController from '../controllers/CommentsController';

const router: Router = Router();

router
  .route('/')
  .post(TopicsController.createTopic)
  .get(TopicsController.getAllTopics);
router
  .route('/:topicId')
  .get(TopicsController.getTopic)
  .put(TopicsController.updateTopic)
  .delete(TopicsController.deleteTopic);
router
  .route('/:topicId/comments')
  .post(CommentsController.createComment)
  .get(CommentsController.getTopicComments);
router
  .route('/:topicId/comments/:commentId')
  .get(CommentsController.getComment)
  .delete(CommentsController.deleteComment);
router.route('/tags/all').get(TopicsController.getAllTags);

export default router;
