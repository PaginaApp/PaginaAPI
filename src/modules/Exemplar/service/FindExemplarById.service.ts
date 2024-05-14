import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { IEstadoCapaRepository } from '@modules/Estado-Capa/repository/IEstadoCapaRepository.interface';
import { IEstadoPaginasRepository } from '@modules/Estado-Paginas/repository/IEstadoPaginaRepository.interface';
import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
class FindExemplarByIdService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('EstadoCapaRepository')
    private estadoCapaRepository: IEstadoCapaRepository,

    @inject('EstadoPaginasRepository')
    private estadoPaginasRepository: IEstadoPaginasRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,

    @inject('AutorRepository')
    private autorRepository: IAutorRepository,

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
  ) {}

  async execute(exe_Id: string): Promise<Exemplar> {
    const exemplar = await this.exemplarRepository.findBy({
      exe_Id,
    });

    if (!exemplar) {
      throw new EntityNotFoundError('Exemplar não encontrado');
    }

    const estadoCapa = await this.estadoCapaRepository.findBy({
      ecp_Id: exemplar.exe_ecp_id,
    });

    if (!estadoCapa) {
      throw new EntityNotFoundError('Estado da capa não encontrado');
    }

    const estadoPaginas = await this.estadoPaginasRepository.findBy({
      epg_Id: exemplar.exe_epg_id,
    });

    if (!estadoPaginas) {
      throw new EntityNotFoundError('Estado das páginas não encontrado');
    }

    Object.assign(exemplar, {
      estadoCapa,
      estadoPaginas,
    });

    const livro = await this.livroRepository.findBy({
      liv_Id: exemplar.exe_liv_id,
    });

    if (!livro) {
      throw new EntityNotFoundError('Livro não encontrado');
    }

    const editora = await this.editoraRepository.findBy({
      edi_Id: livro.liv_edi_id,
    });

    if (!editora) {
      throw new EntityNotFoundError('Editora não encontrada');
    }

    const autor = await this.autorRepository.findBy({
      aut_Id: livro.liv_aut_id,
    });

    if (!autor) {
      throw new EntityNotFoundError('Autor não encontrado');
    }

    Object.assign(livro, {
      editora,
      autor,
    });

    Object.assign(exemplar, {
      livro,
    });

    const categoriasLivros = await this.categoriaLivroRepository.listBy({
      filter: { liv_id: livro.liv_Id },
    });

    const categorias = await Promise.all(
      categoriasLivros.results.map(async (categoria) => {
        const cat = await this.categoriaRepository.findBy({
          cat_Id: categoria.cat_id,
        });

        return cat;
      }),
    );

    Object.assign(livro, {
      categorias,
    });

    return exemplar;
  }
}

export { FindExemplarByIdService };
