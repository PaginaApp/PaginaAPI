import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTermoService } from '../Service/CreateTermo.service';
import { FindActualService } from '../Service/FindActual.service';

class TermoPrivacidadeController {
  async create(req: Request, res: Response) {
    const { tpr_usu_id, tpr_Texto } = req.body;

    const createTermoService = container.resolve(CreateTermoService);

    const termo = await createTermoService.execute({ tpr_usu_id, tpr_Texto });

    return res.json(termo);
  }

  async findActual(req: Request, res: Response) {
    const findActualService = container.resolve(FindActualService);

    const termo = await findActualService.execute();

    return res.json(termo);
  }
}

export { TermoPrivacidadeController };
