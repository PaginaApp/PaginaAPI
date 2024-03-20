import verifyAutorization from '@shared/middlewares/VerifyAutorization';
import { Router } from 'express';
import { UserController } from '../controller/User.controller';
import {
  createUserMiddleware,
  findByIdMiddleware,
} from './validators/User.validator';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', createUserMiddleware, userController.create);

userRouter.get(
  '/:id',
  findByIdMiddleware,
  verifyAutorization([
    process.env.PAPEL_ADMINISTRADOR as string,
    process.env.PAPEL_USUARIO as string,
  ]),
  userController.FindById,
);

userRouter.delete('/:id', findByIdMiddleware, userController.DeleteUser);

userRouter.get('/', userController.ListUser);

userRouter.put('/:usu_Id', userController.UpdateUser);

export { userRouter };
