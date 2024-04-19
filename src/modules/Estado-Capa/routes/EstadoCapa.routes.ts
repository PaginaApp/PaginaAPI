import { Router } from 'express';
import { EstadoCapaController } from '../controller/EstadoCapa.controller';
import { FindEstadoCapaByIdMiddleware } from './validator/EstadoCapa.validator';

const estadoCapaRoutes = Router();

const estadoCapaController = new EstadoCapaController();

estadoCapaRoutes.get('/', estadoCapaController.listAll);

estadoCapaRoutes.get(
  '/:ecp_Id',
  FindEstadoCapaByIdMiddleware,
  estadoCapaController.findById,
);

export { estadoCapaRoutes };
