import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Livro from '../entitie/Livro';
import { FindByNameService } from '../service/FindByName.service';
import { ListByNameService } from '../service/ListByName.service';

class LivroController {
  async findByName(req: Request, res: Response) {
    const { liv_Titulo } = req.params;

    const findByNameService = container.resolve(FindByNameService);

    const livro = await findByNameService.execute(liv_Titulo);

    return res.status(200).json(livro);
  }

  async findByISBN(req: Request, res: Response) {
    const { liv_ISBN } = req.params;

    const findByNameService = container.resolve(FindByNameService);

    const livro = await findByNameService.execute(liv_ISBN);

    return res.status(200).json(livro);
  }

  async listByName(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { liv_Titulo } = req.params;

    const listByNameService = container.resolve(ListByNameService);

    const livros = await listByNameService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: liv_Titulo as Partial<Livro>,
    });

    return res.status(200).json(livros);
  }

  async listByISBN(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { liv_ISBN } = req.params;

    const listByNameService = container.resolve(ListByNameService);

    const livros = await listByNameService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: { liv_ISBN } as Partial<Livro>,
    });

    return res.status(200).json(livros);
  }
}

export { LivroController };
