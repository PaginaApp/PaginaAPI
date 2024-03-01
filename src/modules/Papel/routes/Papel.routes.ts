import { Router } from 'express';
import { PapelController } from '../controller/Papel.controller';
import {
  createPapelMiddleware,
  deletePapelMiddleware,
  findByIdMiddleware,
  listPapelMiddleware,
  updatePapelMiddleware,
} from './validator/Papel.validator';

const papelRoutes = Router();

const papelController = new PapelController();

papelRoutes.post('/', createPapelMiddleware, papelController.create);

papelRoutes.get('/:pap_Id', findByIdMiddleware, papelController.FindById);

papelRoutes.delete(
  '/:pap_Id',
  deletePapelMiddleware,
  papelController.DeletePapel,
);

papelRoutes.get('/', listPapelMiddleware, papelController.ListPapel);

papelRoutes.put('/:pap_Id', updatePapelMiddleware, papelController.UpdatePapel);

export { papelRoutes };
