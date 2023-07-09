import { Router } from 'express';

import CommentsController from '../controllers/CommentsController';

const router: Router = Router();

router.route('/lastcomments').get(CommentsController.getLastComments);

export default router;
