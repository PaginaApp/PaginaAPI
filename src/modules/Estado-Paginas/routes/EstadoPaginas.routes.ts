import { Router } from 'express';
import { EstadoPaginasController } from '../controller/EstadoPagina.controller';
import { FindEstadoPaginasByIdMiddleware } from './validator/EstadoPaginas.validator';

const estadoPaginasRoutes = Router();

const estadoPaginasController = new EstadoPaginasController();

estadoPaginasRoutes.get(
  '/:epg_Id',
  FindEstadoPaginasByIdMiddleware,
  estadoPaginasController.findById,
);

estadoPaginasRoutes.get('/', estadoPaginasController.listAll);

export { estadoPaginasRoutes };
