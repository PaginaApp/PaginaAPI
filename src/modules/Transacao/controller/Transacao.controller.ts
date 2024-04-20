import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTransacaoService } from '../service/CreateTransacao.service';

class TransacaoController {
  async create(request: Request, response: Response) {
    const {
      trs_Data,
      trs_Preco,
      trs_Prazo,
      // tipo da transação
      trs_ttr_id,

      trs_usu_Leitor_id,
      trs_usu_Anunciante_id,
      exe_Principal_id,
      exe_Secundario_id,
    } = request.body;

    // criação da transação
    const createTransacaoService = container.resolve(CreateTransacaoService);

    const transacao = await createTransacaoService.execute({
      trs_Data,
      trs_Preco,
      trs_Prazo,
      // tipo da transação
      trs_ttr_id,
      // status da transação em espera, aguardando aprovação do anunciante
      trs_str_id: process.env.TRANSACAO_STATUS_INICIAL_ID as string,
      trs_usu_Leitor_id,
      trs_usu_Anunciante_id,
      exe_Principal_id,
      exe_Secundario_id,
    });

    return response.status(201).json(transacao);
  }
}

export { TransacaoController };
