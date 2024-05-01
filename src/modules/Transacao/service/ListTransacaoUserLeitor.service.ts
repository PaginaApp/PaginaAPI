import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Transacao } from '../entitie/Transacao';
import { ITransacaoRepository } from '../repository/TransacaoRepository.interface';

@injectable()
class ListTransacaoUserLeitorService {
  constructor(
    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('TipoTransacaoRepository')
    private tipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<Transacao>,
  ): Promise<IPaginatedResponse<Transacao>> {
    if (!data.filter?.trs_usu_Leitor_id) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const user = await this.userRepository.findBy({
      usu_Id: data.filter.trs_usu_Leitor_id,
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const transacoes = await this.transacaoRepository.listBy({
      page: data.page,
      limit: data.limit,
      filter: data.filter,
    });

    const transacoesPromises = transacoes.results.map(async (transacao) => {
      const tipoTransacao = await this.tipoTransacaoRepository.findBy({
        ttr_Id: transacao.trs_ttr_id,
      });

      if (!tipoTransacao) {
        throw new EntityNotFoundError('Tipo de transação não encontrado');
      }

      const statusTransacao = await this.statusTransacaoRepository.findBy({
        str_Id: transacao.trs_str_id,
      });

      if (!statusTransacao) {
        throw new EntityNotFoundError('Status de transação não encontrado');
      }

      const exemplaresTransacao = await this.exemplarTransacaoRepository.listBy(
        {
          filter: {
            trs_id: transacao.trs_Id,
          },
          page: 1,
          limit: 2,
        },
      );

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

      const exemplares = await Promise.all(exemplaresPromises);

      Object.assign(transacao, {
        tipoTransacao,
        statusTransacao,
        exemplares,
      });
    });

    await Promise.all(transacoesPromises);
    return transacoes;
  }
}

export { ListTransacaoUserLeitorService };
