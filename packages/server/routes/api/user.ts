import { Router } from 'express';
import { getUser } from '../../controllers/user';

const userRouter: Router = Router();

userRouter.route('user').get(getUser);

export default userRouter;
