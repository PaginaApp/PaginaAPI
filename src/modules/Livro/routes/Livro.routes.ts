import { Router } from 'express';
import { LivroController } from '../controller/Livro.controller';
import {
  findLivroByISBNMiddleware,
  findLivroByNameMiddleware,
  listLivroByISBNMiddleware,
  listLivroByNameMiddleware,
} from './validators/Livro.validator';

const livroRoutes = Router();

const livroController = new LivroController();

livroRoutes.get(
  '/titulo/:liv_Titulo',
  findLivroByNameMiddleware,
  livroController.findByName,
);

livroRoutes.get(
  '/ISBN/:liv_ISBN',
  findLivroByISBNMiddleware,
  livroController.findByISBN,
);

livroRoutes.get(
  '/titulo',
  listLivroByNameMiddleware,
  livroController.listByName,
);

livroRoutes.get('/ISBN', listLivroByISBNMiddleware, livroController.listByISBN);

export { livroRoutes };
