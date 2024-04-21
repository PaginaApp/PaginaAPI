import { Router } from 'express';
import { TransacaoController } from '../controller/Transacao.controller';
import {
  CreateTransacaoMiddleware,
  FindTransacaoByIdMiddleware,
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

export { transacaoRoutes };
