import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAutorService } from '../service/CreateAutor.service';
import { DeleteAutorService } from '../service/DeleteAutor.service';
import { ListAutorService } from '../service/ListAutor.service';
import { ListAutorByNameService } from '../service/ListAutorByName.service';

class AutorController {
  async create(req: Request, res: Response) {
    const { aut_Nome } = req.body;

    const createAutorService = container.resolve(CreateAutorService);

    const data = await createAutorService.execute({ aut_Nome });

    return res.status(200).json(data);
  }

  async Delete(req: Request, res: Response) {
    const { aut_Id } = req.params;

    const deleteAutorService = container.resolve(DeleteAutorService);

    const data = await deleteAutorService.execute(aut_Id);

    return res.status(200).json(data);
  }

  async list(req: Request, res: Response) {
    const { page, limit } = req.query;

    const listAutorService = container.resolve(ListAutorService);

    const data = await listAutorService.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json(data);
  }

  async listByName(req: Request, res: Response) {
    const { page, limit, aut_Nome } = req.query;

    const listAutorByNameService = container.resolve(ListAutorByNameService);

    const data = await listAutorByNameService.execute({
      page: Number(page),
      limit: Number(limit),
      filter: {
        aut_Nome: String(aut_Nome),
      },
    });

    return res.status(200).json(data);
  }
}

export { AutorController };
