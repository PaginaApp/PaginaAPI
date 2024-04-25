import { Router } from 'express';
import { TransacaoController } from '../controller/Transacao.controller';
import {
  AceitarTransacaoMiddleware,
  CreateTransacaoMiddleware,
  FindTransacaoByIdMiddleware,
  ListTransacaoUserAnuncianteMiddleware,
} from './validator/Transacao.validator';

const transacaoRoutes = Router();

const transacaoController = new TransacaoController();

transacaoRoutes.post(
  '/',
  CreateTransacaoMiddleware,
  transacaoController.create,
);

transacaoRoutes.get(
  '/:trs_Id',
  FindTransacaoByIdMiddleware,
  transacaoController.findById,
);

transacaoRoutes.put(
  '/:trs_Id/aceitar',
  AceitarTransacaoMiddleware,
  transacaoController.aceitarTransacao,
);

transacaoRoutes.get(
  '/anunciante/:trs_usu_Anunciante_id',
  ListTransacaoUserAnuncianteMiddleware,
  transacaoController.ListTransacaoUserAnunciante,
);

export { transacaoRoutes };
