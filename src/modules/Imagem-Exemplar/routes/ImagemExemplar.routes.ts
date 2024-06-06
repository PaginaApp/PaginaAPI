import { Router } from 'express';
import { ImagemExemplarController } from '../controller/ImagemExemplar.controller';
import {
  CreateImagemExemplarMidleware,
  DeleteImagemExemplarMidleware,
  GetImagemExemplarMidleware,
} from './validator/ImagemExemplar.validator';

const imagemExemplarRoutes = Router();

const imagemExemplarController = new ImagemExemplarController();

imagemExemplarRoutes.post(
  '/:exe_Id/imagem-exemplar',
  CreateImagemExemplarMidleware,
  imagemExemplarController.create,
);

imagemExemplarRoutes.get(
  '/imagem-exemplar/:iex_Id',
  GetImagemExemplarMidleware,
  imagemExemplarController.show,
);

imagemExemplarRoutes.delete(
  '/imagem-exemplar/:iex_Id',
  DeleteImagemExemplarMidleware,
  imagemExemplarController.delete,
);

imagemExemplarRoutes.get(
  '/:exe_Id/imagem-exemplar',
  imagemExemplarController.listImagemExemplarByExemplarId,
);

export { imagemExemplarRoutes };
