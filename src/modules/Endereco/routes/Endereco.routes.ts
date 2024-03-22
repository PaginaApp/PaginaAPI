import { Router } from 'express';
import { EnderecoController } from '../controller/Endereco.controller';
import {
  createEnderecoMiddleware,
  showEnderecoMiddleware,
  updateEnderecoMiddleware,
} from './validators/Endereco.validator';

const enderecoRouter = Router();

const enderecoController = new EnderecoController();

enderecoRouter.post(
  '/:usu_Id/endereco',
  createEnderecoMiddleware,
  enderecoController.create,
);

enderecoRouter.put(
  '/:usu_Id/endereco',
  updateEnderecoMiddleware,
  enderecoController.update,
);

enderecoRouter.get(
  '/:usu_Id/endereco',
  showEnderecoMiddleware,
  enderecoController.show,
);

export { enderecoRouter };
