import { Router } from 'express';
import { TipoTransacaoController } from '../controller/TipoTransacao.controller';

const tipoTransacoesRoutes = Router();

const tipoTransacaoController = new TipoTransacaoController();

tipoTransacoesRoutes.get('/', tipoTransacaoController.list);

export { tipoTransacoesRoutes };
