import { Router } from 'express';

import TopicRouter from './topics';

const router: Router = Router();

router.use('/forum/topics', TopicRouter);

export default router;
