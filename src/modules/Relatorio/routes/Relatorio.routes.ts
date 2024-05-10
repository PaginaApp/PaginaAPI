import verifyAutorization from '@shared/middlewares/VerifyAutorization';
import { Router } from 'express';
import { RelatorioController } from '../controller/Relatorio.controller';
import { getExemplaresPorMesMiddleware } from './Validator/Relatorio.validator';

const relatorioRoutes = Router();

const relatorioController = new RelatorioController();

relatorioRoutes.get(
  '/exemplares/:ano',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  getExemplaresPorMesMiddleware,
  relatorioController.getExemplaresPorMes,
);

relatorioRoutes.get(
  '/users/idade',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  relatorioController.getUserByAge,
);

relatorioRoutes.get(
  '/transacoes/:ano',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  getExemplaresPorMesMiddleware,
  relatorioController.getTransacaoPorMes,
);

relatorioRoutes.get(
  '/categorias/:ano',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  getExemplaresPorMesMiddleware,
  relatorioController.getCategoriasCadastradasPorMes,
);

export { relatorioRoutes };
