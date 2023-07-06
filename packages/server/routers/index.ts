import { Router } from 'express';

import TopicRouter from './topics';
import CommentRouter from './comments';
import ReactionRouter from './reactions';

const router: Router = Router();

router
  .use('/forum/topics', TopicRouter)
  .use('/forum/comments', CommentRouter)
  .use('/forum/reactions', ReactionRouter);

export default router;
