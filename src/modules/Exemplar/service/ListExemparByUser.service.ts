import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { Categoria } from '@modules/Categoria/entitie/Categoria';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { IExemplarTransacaoRepository } from '@modules/Exemplar-Transacao/repository/ExemplarTransacaoRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { IStatusTransacaoRepository } from '@modules/Status-Transacao/repository/StatusTransacaoRepository.interface';
import { TipoTransacao } from '@modules/Tipo-Transacao/entitie/TipoTransacao';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { ITransacaoAceitaRepository } from '@modules/Transacao-Aceita/repository/TransacaoAceitaRepository.interface';
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

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,

    @inject('TipoTransacaoRepository')
    private TipoTransacaoRepository: ITipoTransacaoRepository,

    @inject('TransacaoAceitaRepository')
    private transacaoAceitaRepository: ITransacaoAceitaRepository,
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

    await Promise.all(
      exemplares.results.map(async (item) => {
        const livroPromise = this.livroRepository.findBy({
          liv_Id: item.exe_liv_id,
        });

        const [livro] = await Promise.all([livroPromise]);

        const categoriaLivro = await this.categoriaLivroRepository.listBy({
          filter: { liv_id: item.exe_liv_id },
          page: 1,
          limit: 3,
        });

        // para cada categoria, busca a categoria
        const categorias: Categoria[] = [];
        await Promise.all(
          categoriaLivro.results.map(async (cat) => {
            const categoria = await this.categoriaRepository.findBy({
              cat_Id: cat.cat_id,
            });

            if (!categoria) {
              return;
            }

            categorias.push(categoria);
          }),
        );

        // tipos de transação
        const transacaoAceita = await this.transacaoAceitaRepository.listBy({
          filter: { exe_Id: item.exe_Id },
          page: 1,
          limit: 5,
        });

        // para cada transação aceita busca o tipo de transação
        const tiposTransacao: TipoTransacao[] = [];
        await Promise.all(
          transacaoAceita.results.map(async (transacao) => {
            const tipoTransacao = await this.TipoTransacaoRepository.findBy({
              ttr_Id: transacao.ttr_Id,
            });

            if (!tipoTransacao) {
              return;
            }

            tiposTransacao.push(tipoTransacao);
          }),
        );

        Object.assign(item, {
          livro,
          categorias,
          tiposTransacao,
        });
      }),
    );

    return exemplares;
  }
}

export { ListExemplarByUserService };
