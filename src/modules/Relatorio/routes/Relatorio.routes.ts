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

relatorioRoutes.get('/users/idade', relatorioController.getUserByAge);

relatorioRoutes.get(
  '/transacoes/:ano',
  getExemplaresPorMesMiddleware,
  relatorioController.getTransacaoPorMes,
);

relatorioRoutes.get(
  '/categorias/:ano',
  getExemplaresPorMesMiddleware,
  relatorioController.getCategoriasCadastradasPorMes,
);

export { relatorioRoutes };
