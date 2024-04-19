import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindById } from '../service/FindById.service';
import { ListAll } from '../service/ListAll.service';

class EstadoCapaController {
  async findById(req: Request, res: Response) {
    const { ecp_Id } = req.params;

    const findByIdService = container.resolve(FindById);

    const data = await findByIdService.execute(ecp_Id);

    return res.status(200).json(data);
  }

  async listAll(req: Request, res: Response) {
    const listAllService = container.resolve(ListAll);

    const data = await listAllService.execute();

    return res.status(200).json(data);
  }
}

export { EstadoCapaController };
