import { avatarRouter } from '@modules/Avatar/Routes/Avatar.router';
import { enderecoRouter } from '@modules/Endereco/routes/Endereco.routes';
import { listaDeDesejoRoutes } from '@modules/Listas-de-desejos/routes/ListaDeDesejo.routes';
import verifyAutorization from '@shared/middlewares/VerifyAutorization';
import { Router } from 'express';
import { UserController } from '../controller/User.controller';
import {
  changePasswordMiddleware,
  createUserMiddleware,
  findByIdMiddleware,
  listUserMiddleware,
  updateUserMiddleware,
} from './validators/User.validator';

const userRouter = Router();

const userController = new UserController();

userRouter.use(enderecoRouter);

userRouter.use(avatarRouter);

userRouter.use(listaDeDesejoRoutes);

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

userRouter.get('/', listUserMiddleware, userController.ListUser);

userRouter.put('/:usu_Id', updateUserMiddleware, userController.UpdateUser);

userRouter.put(
  '/:usu_Id/senha',
  changePasswordMiddleware,
  userController.ChangePassword,
);

export { userRouter };
