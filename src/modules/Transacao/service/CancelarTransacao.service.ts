import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { Transacao } from '../entitie/Transacao';
import { ITransacaoRepository } from '../repository/TransacaoRepository.interface';

@injectable()
class CancelarTransacaoService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,
  ) {}

  async execute(trs_Id: string): Promise<Transacao> {
    const transacao = await this.transacaoRepository.findBy({
      trs_Id,
    });

    if (!transacao) {
      throw new EntityNotFoundError('Transação não encontrada');
    }

    // verifica se a já foi concluída ou cancelada
    const statusTransacao = await this.statusTransacaoRepository.findBy({
      str_Id: transacao.trs_str_id,
    });

    if (!statusTransacao) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    if (
      statusTransacao.str_Nome === 'Concluída' ||
      statusTransacao.str_Nome === 'Cancelada'
    ) {
      throw new EntityNotFoundError('Transação já foi concluída ou cancelada');
    }

    const ExemplaresTransacao = await this.exemplarTransacaoRepository.listBy({
      filter: {
        trs_id: transacao.trs_Id,
      },
      page: 1,
      limit: 2,
    });

    // exemplar recebe o status de disponível
    const exemplaresPromises = ExemplaresTransacao.results.map(
      async (exemplarTransacao) => {
        const exemplar = await this.exemplarRepository.findBy({
          exe_Id: exemplarTransacao.exe_id,
        });

        if (!exemplar) {
          throw new EntityNotFoundError('Exemplar não encontrado');
        }

        exemplar.exe_Negociando = false;

        return this.exemplarRepository.update(exemplar);
      },
    );

    await Promise.all(exemplaresPromises);

    const statusCancelado = await this.statusTransacaoRepository.findBy({
      str_Nome: 'Cancelada',
    });

    if (!statusCancelado) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    transacao.trs_str_id = statusCancelado.str_Id;

    await this.transacaoRepository.update(transacao);

    // adiciona o status da transação
    Object.assign(transacao, { statusTransacao: statusCancelado });

    const exemplarPromises = ExemplaresTransacao.results.map(
      async (exemplarTransacao) => {
        const exemplar = await this.exemplarRepository.findBy({
          exe_Id: exemplarTransacao.exe_id,
        });

        if (!exemplar) {
          throw new EntityNotFoundError('Exemplar não encontrado');
        }

        Object.assign(transacao, {
          exemplar,
        });

        return exemplar;
      },
    );

    await Promise.all(exemplarPromises);

    return transacao;
  }
}

export { CancelarTransacaoService };
