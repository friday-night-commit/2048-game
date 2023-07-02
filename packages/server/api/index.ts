import { Router } from 'express';

import TopicRouter from './topics';
import CommentRouter from './comments';

const router: Router = Router();

router
  .use('/forum/topics', TopicRouter)
  .use('/forum/comments', CommentRouter);

export default router;
