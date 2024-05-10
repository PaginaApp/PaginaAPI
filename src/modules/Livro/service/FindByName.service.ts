import { IAutorRepository } from '@modules/Autor/repository/IAutorRepository.interface';
import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { IEditoraRepository } from '@modules/Editora/repository/IEditoraRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class FindByNameService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('AutorRepository')
    private autorRepository: IAutorRepository,

    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,
  ) {}

  async execute(liv_Titulo: string): Promise<Livro | null> {
    const livro = await this.livroRepository.findBy({
      liv_Titulo,
    });

    if (!livro) {
      throw new EntityNotFoundError(
        'Livro não encontrado tente novamente mais tarde!!',
      );
    }

    const autor = await this.autorRepository.findBy({
      aut_Id: livro.liv_aut_id,
    });

    const editora = await this.editoraRepository.findBy({
      edi_Id: livro.liv_edi_id,
    });

    if (!autor || !editora) {
      throw new EntityNotFoundError(
        'Autor não encontrado tente novamente mais tarde!!',
      );
    }

    // pegar as categorias do livro
    const categorias = await this.categoriaLivroRepository.listBy({
      filter: { liv_id: livro.liv_Id },
    });

    // pegar o nome de cada categoria
    const categoriasNomes = await Promise.all(
      categorias.results.map(async (categoria) => {
        const categoriaData = await this.categoriaRepository.findBy({
          cat_Id: categoria.cat_id,
        });

        return categoriaData;
      }),
    );

    Object.assign(livro, { autor, editora, categorias: categoriasNomes });

    return livro;
  }
}

export { FindByNameService };
