import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { Categoria } from '@modules/Categoria/entitie/Categoria';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { TipoTransacao } from '@modules/Tipo-Transacao/entitie/TipoTransacao';
import { ITipoTransacaoRepository } from '@modules/Tipo-Transacao/repository/TipoTransacaoRepository.interface';
import { ITransacaoAceitaRepository } from '@modules/Transacao-Aceita/repository/TransacaoAceitaRepository.interface';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
export class ListHomeService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,

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

  public async execute(
    data: IPaginatedRequest<Exemplar>,
  ): Promise<IPaginatedResponse<Exemplar>> {
    const exemplar = await this.exemplarRepository.listBy(data);

    // adiciona os livro e categoria e tipo de transação, estado da capa e estado das páginas
    await Promise.all(
      exemplar.results.map(async (item) => {
        const livro = await this.livroRepository.findBy({
          liv_Id: item.exe_liv_id,
        });
        const estadoCapa = await this.estadoCapaRepository.findBy({
          ecp_Id: item.exe_ecp_id,
        });

        const estadoPaginas = await this.estadoPaginasRepository.findBy({
          epg_Id: item.exe_epg_id,
        });

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

        const transacaoAceita = await this.transacaoAceitaRepository.listBy({
          filter: { exe_Id: item.exe_Id },
          page: 1,
          limit: 5,
        });

        // para cada transação aceita, busca o tipo de transação
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

        // se o exemplar não tem nenhuma categoria aceita remove da listagem
        if (categorias.length === 0) {
          exemplar.results = exemplar.results.filter(
            (exe) => exe.exe_Id !== item.exe_Id,
          );
          return;
        }

        Object.assign(item, {
          livro,
          estadoCapa,
          estadoPaginas,
          categorias,
          tiposTransacao,
        });
      }),
    );

    return exemplar;
  }
}
