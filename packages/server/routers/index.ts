import { Router } from 'express';

import TopicRouter from './topics';
import CommentRouter from './comments';
import ReactionRouter from './reactions';
import ThemeRouter from './theme';

const router: Router = Router();

router
  .use('/forum/topics', TopicRouter)
  .use('/forum/comments', CommentRouter)
  .use('/forum/reactions', ReactionRouter)
  .use('/theme', ThemeRouter);


export default router;
