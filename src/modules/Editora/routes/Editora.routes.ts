import verifyAutorization from '@shared/middlewares/VerifyAutorization';
import { Router } from 'express';
import { EditoraController } from '../controller/Editora.controler';
import {
  createEditoraMiddleware,
  deleteEditoraMiddleware,
  listEditoraMiddleware,
} from './validator/Editora.validator';

const editoraRoutes = Router();

const editoraController = new EditoraController();

editoraRoutes.post(
  '/',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  createEditoraMiddleware,
  editoraController.create,
);

editoraRoutes.delete(
  '/:edi_Id',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  deleteEditoraMiddleware,
  editoraController.Delete,
);

editoraRoutes.get(
  '/',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  listEditoraMiddleware,
  editoraController.list,
);

editoraRoutes.get(
  '/search',
  verifyAutorization([process.env.PAPEL_ADMINISTRADOR as string]),
  listEditoraMiddleware,
  editoraController.listByName,
);

export { editoraRoutes };
