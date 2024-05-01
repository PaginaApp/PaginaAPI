import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateListaDeDesejoService } from '../service/CreateListaDeDesejo.service';
import { DeleteListaDeDesejoService } from '../service/DeleteListaDeDesejo.service';
import { ListListaDeDesejoService } from '../service/ListListaDeDesejo.service';

class ListaDeDesejoController {
  async create(request: Request, response: Response) {
    const { usu_Id } = request.params;

    const { liv_Id } = request.body;

    const createListaDeDesejoService = container.resolve(
      CreateListaDeDesejoService,
    );

    const listaDeDesejo = await createListaDeDesejoService.execute({
      usu_id: usu_Id,
      liv_id: liv_Id,
    });

    return response.json(listaDeDesejo);
  }

  async delete(request: Request, response: Response) {
    const { usu_Id, liv_Id } = request.params;

    const deleteListaDeDesejoService = container.resolve(
      DeleteListaDeDesejoService,
    );

    await deleteListaDeDesejoService.execute(usu_Id, liv_Id);

    return response.status(204).send();
  }

  async index(request: Request, response: Response) {
    const { usu_Id } = request.params;

    const { page, limit } = request.query;

    const listListaDeDesejoService = container.resolve(
      ListListaDeDesejoService,
    );

    const listaDeDesejo = await listListaDeDesejoService.execute({
      filter: { usu_id: usu_Id },
      page: Number(page),
      limit: Number(limit),
    });

    return response.json(listaDeDesejo);
  }
}

export { ListaDeDesejoController };
