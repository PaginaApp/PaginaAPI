import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ExemplarPorMesService } from '../service/ExemplarPorMes.service';

class RelatorioController {
  async getExemplaresPorMes(req: Request, res: Response) {
    const { ano } = req.params;
    const exemplarPorMesService = container.resolve(ExemplarPorMesService);

    const data = await exemplarPorMesService.execute(Number(ano));

    return res.json(data);
  }
}

export { RelatorioController };
