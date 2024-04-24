import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { BlockedExemplarError } from '@shared/errors/BlockedExemplarError';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ITransacaoRepository } from '../repository/TransacaoRepository.interface';

@injectable()
class AceitarTransacaoService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,
  ) {}

  async execute(trs_Id: string) {
    // busca a transação pelo id
    const transacao = await this.transacaoRepository.findBy({
      trs_Id,
    });

    // verifica se a transação existe
    if (!transacao) {
      throw new EntityNotFoundError('Transação não encontrada');
    }

    const exemplaresTransacao = await this.exemplarTransacaoRepository.listBy({
      filter: {
        trs_id: transacao.trs_Id,
      },

      page: 1,
      limit: 2,
    });

    const statusCancelado = await this.statusTransacaoRepository.findBy({
      str_Nome: 'Cancelada',
    });

    if (!statusCancelado) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    // verifica se o exemplar já não está em outra transação aceita antes dos X dias no .env
    exemplaresTransacao.results.forEach(async (exemplarTransacao) => {
      const transcoesExemplar = await this.exemplarTransacaoRepository.listBy({
        filter: {
          exe_id: exemplarTransacao.exe_id,
        },
        page: 1,
        limit: 1000,
      });

      transcoesExemplar.results.forEach(async (transacaoExemplar) => {
        const Exetransacao = await this.transacaoRepository.findBy({
          trs_Id: transacaoExemplar.trs_id,
        });

        // busca no banco, verifica se a transação já foi aceita e se já passou do prazo de cancelamento
        if (
          Exetransacao &&
          Exetransacao.trs_str_id !== statusCancelado.str_Id &&
          Exetransacao.trs_str_id !==
            (process.env.TRANSACAO_STATUS_INICIAL as string)
        ) {
          const dataAtual = new Date();

          const dataTransacao = new Date(Exetransacao.trs_Data);

          // verifica se a transação já passou do prazo de cancelamento
          dataTransacao.setDate(
            dataTransacao.getDate() +
              Number(process.env.TRANSACAO_DIAS_CANCELAMENTO),
          );

          if (dataAtual < dataTransacao) {
            // transação ainda não passou do prazo de cancelamento bloqueia a transação
            throw new BlockedExemplarError(
              'Exemplar bloqueado, já está em outra transação aceita',
            );
          }
        }
      });
    });

    // verifica se a transação já foi aceita
    if (transacao.trs_str_id !== process.env.TRANSACAO_STATUS_INICIAL) {
      throw new BlockedExemplarError('Transação já aceita');
    }

    // atualiza o status da transação para aceita
    const statusAceita = await this.statusTransacaoRepository.findBy({
      str_Nome: 'Em andamento',
    });

    if (!statusAceita) {
      throw new EntityNotFoundError('Status de transação não encontrado');
    }

    const updatedTransacao = await this.transacaoRepository.update({
      trs_Id: transacao.trs_Id,
      trs_str_id: statusAceita.str_Id,
    });

    // adiciona o status da transação
    Object.assign(updatedTransacao, { statusTransacao: statusAceita });

    return updatedTransacao;
  }
}

export { AceitarTransacaoService };
