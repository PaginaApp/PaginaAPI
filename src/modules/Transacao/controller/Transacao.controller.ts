import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AceitarTransacaoService } from '../service/AceitarTransacao.service';
import { CreateTransacaoService } from '../service/CreateTransacao.service';
import { FindTransacaoByIdService } from '../service/FindTransacaoById.service';
import { ListTransacaoUserAnuncianteService } from '../service/ListTransacaoUserAnunciante.service';
import { ListTransacaoUserLeitorService } from '../service/ListTransacaoUserLeitor.service';

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
      trs_str_id: process.env.TRANSACAO_STATUS_INICIAL as string,
      trs_usu_Leitor_id,
      trs_usu_Anunciante_id,
      exe_Principal_id,
      exe_Secundario_id,
    });

    return response.status(201).json(transacao);
  }

  async findById(request: Request, response: Response) {
    const { trs_Id } = request.params;

    const findTransacaoByIdService = container.resolve(
      FindTransacaoByIdService,
    );

    const transacao = await findTransacaoByIdService.execute(trs_Id);

    return response.status(200).json(transacao);
  }

  async aceitarTransacao(request: Request, response: Response) {
    const { trs_Id } = request.params;

    const aceitarTransacaoService = container.resolve(AceitarTransacaoService);

    const transacao = await aceitarTransacaoService.execute(trs_Id);

    return response.status(200).json(transacao);
  }

  async ListTransacaoUserAnunciante(request: Request, response: Response) {
    const { trs_usu_Anunciante_id } = request.params;

    const listTransacaoUserAnuncianteService = container.resolve(
      ListTransacaoUserAnuncianteService,
    );

    const transacoes = await listTransacaoUserAnuncianteService.execute({
      page: 1,
      limit: 10,
      filter: {
        trs_usu_Anunciante_id,
      },
    });

    return response.status(200).json(transacoes);
  }

  async ListTransacaoUserLeitor(request: Request, response: Response) {
    const { trs_usu_Leitor_id } = request.params;

    const listTransacaoUserLeitorService = container.resolve(
      ListTransacaoUserLeitorService,
    );

    const transacoes = await listTransacaoUserLeitorService.execute({
      page: 1,
      limit: 10,
      filter: {
        trs_usu_Leitor_id,
      },
    });

    return response.status(200).json(transacoes);
  }
}

export { TransacaoController };
