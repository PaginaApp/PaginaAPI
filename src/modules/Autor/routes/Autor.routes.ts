import verifyAutorization from '@shared/middlewares/VerifyAutorization';
import { Router } from 'express';
import { AutorController } from '../controller/Autor.controller';
import {
  createAutorMiddleware,
  deleteAutorMiddleware,
  listAutorMiddleware,
} from './validator/Autor.validator';

const autorRoutes = Router();

const autorController = new AutorController();

autorRoutes.post(
  '/',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  createAutorMiddleware,
  autorController.create,
);

autorRoutes.delete(
  '/:aut_Id',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  deleteAutorMiddleware,
  autorController.Delete,
);

autorRoutes.get(
  '/',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  listAutorMiddleware,
  autorController.list,
);

// rota para listar os autores com nomes parecidos com o nome passado
autorRoutes.get(
  '/search',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  listAutorMiddleware,
  autorController.listByName,
);

export { autorRoutes };
