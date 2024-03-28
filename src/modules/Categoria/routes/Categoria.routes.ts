import { Router } from 'express';
import { CategoriaController } from '../controller/Categoria.controller';

const categoriaRoutes = Router();

const categoriaController = new CategoriaController();

categoriaRoutes.get('/', categoriaController.ListAll);

export { categoriaRoutes };
