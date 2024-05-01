import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { Exemplar } from '@modules/Exemplar/entitie/Exemplar';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { Transacao } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ITransacaoRepository } from '../repository/TransacaoRepository.interface';

@injectable()
class FindTransacaoByIdService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('TipoTransacaoRepository')
    private tipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,
  ) {}

  async execute(trs_Id: string): Promise<Transacao> {
    const transacao = await this.transacaoRepository.findBy({
      trs_Id,
    });

    if (!transacao) {
      throw new EntityNotFoundError('Transação não encontrada');
    }

    const tipoTransacao = await this.tipoTransacaoRepository.findBy({
      ttr_Id: transacao.trs_ttr_id,
    });

    if (!tipoTransacao) {
      throw new EntityNotFoundError('Tipo de transação não encontrado');
    }

    Object.assign(transacao, { tipoTransacao });

    const statusTransacao = await this.statusTransacaoRepository.findBy({
      str_Id: transacao.trs_str_id,
    });

    if (!statusTransacao) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    Object.assign(transacao, { statusTransacao });

    const exemplaresTransacao = await this.exemplarTransacaoRepository.listBy({
      filter: {
        trs_id: transacao.trs_Id,
      },
      page: 1,
      limit: 2,
    });

    const exemplaresPromises = exemplaresTransacao.results.map(
      async (exemplar) => {
        const exemplarFind = await this.exemplarRepository.findBy({
          exe_Id: exemplar.exe_id,
        });

        if (!exemplarFind) {
          throw new EntityNotFoundError('Exemplar não encontrado');
        }

        return exemplarFind;
      },
    );

    const exemplares: Exemplar[] = await Promise.all(exemplaresPromises);

    Object.assign(transacao, { exemplares });

    return {
      ...transacao,
      trs_Preco: transacao.trs_Preco || new Decimal(0),
      trs_Prazo: transacao.trs_Prazo || 0,
    };
  }
}

export { FindTransacaoByIdService };
