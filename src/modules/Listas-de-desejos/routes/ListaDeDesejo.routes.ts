import { Router } from 'express';
import { ListaDeDesejoController } from '../controller/ListaDeDesejo.controller';
import {
  createListaDeDesejoMiddleware,
  deleteListaDeDesejoMiddleware,
  indexListaDeDesejoMiddleware,
} from './validator/ListaDeDesejo.validator';

const listaDeDesejoRoutes = Router();

const listaDeDesejoController = new ListaDeDesejoController();

listaDeDesejoRoutes.post(
  '/:usu_Id/ListaDeDesejo',
  createListaDeDesejoMiddleware,
  listaDeDesejoController.create,
);

listaDeDesejoRoutes.delete(
  '/:usu_Id/ListaDeDesejo/:liv_Id',
  deleteListaDeDesejoMiddleware,
  listaDeDesejoController.delete,
);

listaDeDesejoRoutes.get(
  '/:usu_Id/ListaDeDesejo',
  indexListaDeDesejoMiddleware,
  listaDeDesejoController.index,
);

export { listaDeDesejoRoutes };
