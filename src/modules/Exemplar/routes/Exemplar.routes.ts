import { imagemExemplarRoutes } from '@modules/Imagem-Exemplar/routes/ImagemExemplar.routes';
import { Router } from 'express';
import { ExemplarController } from '../controller/Exemplar.controller';
import {
  createExemplarMiddleware,
  deleteExemplarMiddleware,
  findExemplarMiddleware,
  listExemplarByLivroMiddleware,
  listExemplarByUserMiddleware,
  listExemplarMiddleware,
  updateExemplarMiddleware,
} from './validator/Exemplar.validator';

const exemplarRoutes = Router();

const exemplarController = new ExemplarController();

exemplarRoutes.use(imagemExemplarRoutes);

exemplarRoutes.post('/', createExemplarMiddleware, exemplarController.create);

exemplarRoutes.put(
  '/:exe_Id',
  updateExemplarMiddleware,
  exemplarController.update,
);

exemplarRoutes.delete(
  '/:exe_Id',
  deleteExemplarMiddleware,
  exemplarController.delete,
);

exemplarRoutes.get(
  '/:exe_Id',
  findExemplarMiddleware,
  exemplarController.findExemplar,
);

// lista os exemplares de um usuário
exemplarRoutes.get(
  '/user/:exe_usu_id',
  listExemplarByUserMiddleware,
  exemplarController.listExemplarByUser,
);

// lista os exemplares de um livro
exemplarRoutes.get(
  '/livro/:exe_liv_id',
  listExemplarByLivroMiddleware,
  exemplarController.listExemplarByLivro,
);

exemplarRoutes.get(
  '/',
  listExemplarMiddleware,
  exemplarController.listExemplar,
);

export { exemplarRoutes };
