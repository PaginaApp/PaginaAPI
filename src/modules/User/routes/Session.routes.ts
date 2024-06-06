import { Router } from 'express';
import { SessionController } from '../controller/Session.controller';
import {
  CreateSessionValidator,
  DeleteSessionValidator,
  RefreshSessionValidator,
} from './validators/Session.validator';

const sessionRouter = Router();

const sessionController = new SessionController();

sessionRouter.post('/', CreateSessionValidator, sessionController.create);

sessionRouter.delete(
  '/:usu_Id',
  DeleteSessionValidator,
  sessionController.delete,
);

sessionRouter.put(
  '/:usu_Id',
  RefreshSessionValidator,
  sessionController.refresh,
);

sessionRouter.get('/:user_Id', sessionController.verify);

export { sessionRouter };
