import { Router } from 'express';
import userRouter from './api/user';

const router: Router = Router();

router.use(userRouter);

export default router;
