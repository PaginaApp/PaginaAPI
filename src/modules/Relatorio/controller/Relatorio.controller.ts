import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ExemplarPorMesService } from '../service/ExemplarPorMes.service';
import { MediaUserPorIdadeService } from '../service/MediaUserPorIdade.service';

class RelatorioController {
  async getExemplaresPorMes(req: Request, res: Response) {
    const { ano } = req.params;
    const exemplarPorMesService = container.resolve(ExemplarPorMesService);

    const data = await exemplarPorMesService.execute(Number(ano));

    return res.json(data);
  }

  async getUserByAge(req: Request, res: Response) {
    const mediaUserPorIdadeService = container.resolve(
      MediaUserPorIdadeService,
    );

    const data = await mediaUserPorIdadeService.execute();

    return res.json(data);
  }
}

export { RelatorioController };
