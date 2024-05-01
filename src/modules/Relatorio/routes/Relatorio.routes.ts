import { Router } from 'express';
import { RelatorioController } from '../controller/Relatorio.controller';
import { getExemplaresPorMesMiddleware } from './Validator/Relatorio.validator';

const relatorioRoutes = Router();

const relatorioController = new RelatorioController();

relatorioRoutes.get(
  '/exemplares/:ano',
  getExemplaresPorMesMiddleware,
  relatorioController.getExemplaresPorMes,
);

export { relatorioRoutes };
