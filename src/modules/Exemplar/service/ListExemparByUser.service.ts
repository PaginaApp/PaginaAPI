import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { ITransacaoRepository } from '@modules/Transacao/repository/TransacaoRepository.interface';
import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class ListExemplarByUserService {
  constructor(
    @inject('UserRepository')
    private userRespository: IUserRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('ExemplarTransacaoRepository')
    private exemplarTransacaoRepository: IExemplarTransacaoRepository,

    @inject('TransacaoRepository')
    private transacaoRepository: ITransacaoRepository,

    @inject('StatusTransacaoRepository')
    private statusTransacaoRepository: IStatusTransacaoRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<Exemplar>,
  ): Promise<IPaginatedResponse<Exemplar>> {
    if (!data.filter || !data.filter.exe_usu_id) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const user = this.userRespository.findBy({
      usu_Id: data.filter.exe_usu_id,
    });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    const exemplares = await this.exemplarRepository.listBy({
      filter: data.filter,
      limit: data.limit,
      page: data.page,
    });

    const estadoCapa = await this.estadoCapaRepository.listBy({
      filter: {},
      limit: 100,
      page: 1,
    });

    const estadoPaginas = await this.estadoPaginasRepository.listBy({
      filter: {},
      limit: 100,
      page: 1,
    });

    // inclui os estados de capa e paginas no exemplar
    exemplares.results = await Promise.all(
      exemplares.results.map(async (exemplar) => {
        if (exemplar.exe_Negociando) {
          // verifica se a transação já passou do prazo de X dias no .env
          const transacoesExemplar =
            await this.exemplarTransacaoRepository.listBy({
              filter: {
                exe_id: exemplar.exe_Id,
              },
              page: 1,
              limit: 1000,
            });

          await Promise.all(
            transacoesExemplar.results.map(async (transacaoExemplar) => {
              const transacao = await this.transacaoRepository.findBy({
                trs_Id: transacaoExemplar.trs_id,
              });

              if (!transacao) {
                return null;
              }

              const statusTransacao =
                await this.statusTransacaoRepository.findBy({
                  str_Id: transacao.trs_str_id,
                });

              if (
                !statusTransacao ||
                statusTransacao.str_Nome !== 'Em andamento'
              ) {
                return null;
              }

              // data de hoje
              const dataAtual = new Date();

              // data da transação
              const dataTransacao = transacao.trs_Data;

              // diferença de dias entre a data de hoje e a data da transação
              const diffTime = Math.abs(
                dataAtual.getTime() - dataTransacao.getTime(),
              );

              // diferença de dias
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              if (
                diffDays >
                (process.env.TRANSACAO_DIAS_CANCELAMENTO as unknown as number)
              ) {
                exemplar.exe_Negociando = false;

                await this.exemplarRepository.update(exemplar);
                return transacao;
              }

              return null;
            }),
          );
        }

        const estadoCapaResult = estadoCapa.results.find(
          (estado) => estado.ecp_Id === exemplar.exe_ecp_id,
        );

        const estadoPaginasResult = estadoPaginas.results.find(
          (estado) => estado.epg_Id === exemplar.exe_epg_id,
        );

        return Object.assign(exemplar, {
          estadoCapa: estadoCapaResult,
          estadoPaginas: estadoPaginasResult,
        });
      }),
    );

    return exemplares;
  }
}

export { ListExemplarByUserService };
