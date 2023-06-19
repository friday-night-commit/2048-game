import { Router } from 'express';

import topics from './topics';

const router: Router = Router();

router
  .use(topics);

export default router;
