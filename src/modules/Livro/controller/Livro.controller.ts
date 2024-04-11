import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Livro from '../entitie/Livro';
import { CreateLivroService } from '../service/CreateLivro.service';
import { FindByISBNService } from '../service/FindByISBN.service';
import { FindByNameService } from '../service/FindByName.service';
import { ListByISBNService } from '../service/ListByISBN.service';
import { ListByNameService } from '../service/ListByName.service';
import { UpdateLivroService } from '../service/UpdateLivro.service';

class LivroController {
  async findByName(req: Request, res: Response) {
    const { liv_Titulo } = req.params;

    const findByNameService = container.resolve(FindByNameService);

    const livro = await findByNameService.execute(liv_Titulo);

    return res.status(200).json(livro);
  }

  async findByISBN(req: Request, res: Response) {
    const { liv_ISBN } = req.params;

    const findByNameService = container.resolve(FindByISBNService);

    const livro = await findByNameService.execute(liv_ISBN);

    return res.status(200).json(livro);
  }

  async listByName(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { liv_Titulo } = req.query;

    const listByNameService = container.resolve(ListByNameService);

    const livros = await listByNameService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: { liv_Titulo } as Partial<Livro>,
    });

    return res.status(200).json(livros);
  }

  async listByISBN(req: Request, res: Response) {
    const { page, limit } = req.query;
    const { liv_ISBN } = req.body;

    const listByNameService = container.resolve(ListByISBNService);

    const livros = await listByNameService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: { liv_ISBN } as Partial<Livro>,
    });

    return res.status(200).json(livros);
  }

  async createLivro(req: Request, res: Response) {
    const {
      liv_Titulo,
      liv_Ano,
      liv_Sinopse,
      liv_ISBN,
      liv_aut_id,
      liv_edi_id,
    } = req.body;

    const createLivroService = container.resolve(CreateLivroService);

    const data = await createLivroService.execute({
      liv_Titulo,
      liv_Ano,
      liv_Sinopse,
      liv_ISBN,
      liv_aut_id,
      liv_edi_id,
    });

    return res.status(200).json(data);
  }

  async updateLivro(req: Request, res: Response) {
    const {
      liv_Titulo,
      liv_Ano,
      liv_Sinopse,
      liv_ISBN,
      liv_aut_id,
      liv_edi_id,
    } = req.body;

    const { liv_Id } = req.params;

    const updateLivroService = container.resolve(UpdateLivroService);

    const data = await updateLivroService.execute({
      liv_Titulo,
      liv_Ano,
      liv_Sinopse,
      liv_ISBN,
      liv_aut_id,
      liv_edi_id,
      liv_Id,
    });

    return res.status(200).json(data);
  }
}

export { LivroController };
