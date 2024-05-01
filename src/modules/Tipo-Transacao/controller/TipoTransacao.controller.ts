import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTipoTransacaoService } from '../service/ListTipoTransacao.service';

class TipoTransacaoController {
  async list(request: Request, response: Response) {
    const listTipoTransacaoService = container.resolve(
      ListTipoTransacaoService,
    );
    const tipoTransacoes = await listTipoTransacaoService.execute();
    return response.json(tipoTransacoes);
  }
}

export { TipoTransacaoController };
