import { Router } from 'express';
import { UserController } from '../controller/User.controller';
import {
  createUserMiddleware,
  findByIdMiddleware,
} from './validators/User.validator';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', createUserMiddleware, userController.create);

userRouter.get('/:id', findByIdMiddleware, userController.FindById);

userRouter.delete('/:id', findByIdMiddleware, userController.DeleteUser);

userRouter.get('/', userController.ListUser);

export { userRouter };
