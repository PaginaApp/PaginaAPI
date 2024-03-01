import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePapel } from '../service/CreatePapel.service';
import { DeletePapel } from '../service/DeletePapel.service';
import { FindPapelByIdService } from '../service/FindPapelById.service';
import { ListPapel } from '../service/ListPapel.service';
import { UpdatePapel } from '../service/UpdatePapel.service';

class PapelController {
  async create(req: Request, res: Response) {
    const { pap_Nome } = req.body;

    const createPapel = container.resolve(CreatePapel);

    const papel = await createPapel.execute(pap_Nome);

    return res.status(201).json(papel);
  }

  async FindById(req: Request, res: Response) {
    const { pap_Id } = req.params;

    const findPapelByIdService = container.resolve(FindPapelByIdService);
    const papel = await findPapelByIdService.execute(pap_Id);

    return res.status(200).json(papel);
  }

  async DeletePapel(req: Request, res: Response) {
    const { pap_Id } = req.params;

    const deletePapel = container.resolve(DeletePapel);

    await deletePapel.execute(pap_Id);

    return res.status(204).send();
  }

  async ListPapel(req: Request, res: Response) {
    const { page, limit } = req.query;

    const listPapelService = container.resolve(ListPapel);

    const papeis = await listPapelService.execute({
      page: Number(page),
      limit: Number(limit),
    });

    return res.status(200).json(papeis);
  }

  async UpdatePapel(req: Request, res: Response) {
    const { pap_Id } = req.params;
    const { pap_Nome } = req.body;

    const updatePapel = container.resolve(UpdatePapel);

    const papel = await updatePapel.execute({ pap_Id, pap_Nome });

    return res.status(200).json(papel);
  }
}

export { PapelController };
