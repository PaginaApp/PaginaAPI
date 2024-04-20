import { Router } from 'express';
import { TransacaoController } from '../controller/Transacao.controller';
import { CreateTransacaoMiddleware } from './validator/Transacao.validator';

const transacaoRoutes = Router();

const transacaoController = new TransacaoController();

transacaoRoutes.post(
  '/',
  CreateTransacaoMiddleware,
  transacaoController.create,
);

export { transacaoRoutes };
