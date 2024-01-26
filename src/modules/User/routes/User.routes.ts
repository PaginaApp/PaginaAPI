import { Router } from 'express';
import { UserController } from '../controller/User.controller';
import { createUserMiddleware } from './validators/User.validator';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', createUserMiddleware, userController.create);

export { userRouter };
