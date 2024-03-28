import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAllCategoriaService } from '../service/ListAll.service';

class CategoriaController {
  async ListAll(req: Request, res: Response) {
    const listAllService = container.resolve(ListAllCategoriaService);

    const categorias = await listAllService.execute();

    return res.status(200).json(categorias);
  }
}

export { CategoriaController };
