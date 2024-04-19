import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindByIdService } from '../service/FindById.service';
import { ListAllService } from '../service/ListAll.service';

class EstadoPaginasController {
  async findById(req: Request, res: Response) {
    const { epg_Id } = req.params;

    const estadoPaginaService = container.resolve(FindByIdService);

    const estadoPagina = await estadoPaginaService.execute(epg_Id);

    return res.status(200).json(estadoPagina);
  }

  async listAll(req: Request, res: Response) {
    const estadoPaginaService = container.resolve(ListAllService);

    const estadoPagina = await estadoPaginaService.execute();

    return res.status(200).json(estadoPagina);
  }
}

export { EstadoPaginasController };
