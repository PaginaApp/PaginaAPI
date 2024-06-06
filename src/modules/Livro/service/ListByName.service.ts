import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class ListByNameService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('AutorRepository')
    private autorRepository: IAutorRepository,

    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
  ) {}

  async execute({
    filter,
    page,
    limit,
  }: IPaginatedRequest<Livro>): Promise<IPaginatedResponse<Livro>> {
    const livros = await this.livroRepository.listByTitulo({
      filter,
      limit,
      page,
    });

    const promises = livros.results.map(async (livro) => {
      const autor = await this.autorRepository.findBy({
        aut_Id: livro.liv_aut_id,
      });
      const editora = await this.editoraRepository.findBy({
        edi_Id: livro.liv_edi_id,
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

      return {
        ...livro,
        autor,
        editora,
        categorias,
      };
    });

    livros.results = await Promise.all(promises);

    return {
      results: livros.results,
      total: livros.total,
      page: livros.page,
      limit: livros.limit,
    };
  }
}

export { ListByNameService };
