import { Router } from 'express';

import TopicRouter from './topics';
import ThemeRouter from '../routers/theme';


const router: Router = Router();

router.use('/forum/topics', TopicRouter);
router.use('/theme', ThemeRouter);


export default router;
