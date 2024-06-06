import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { IExemplarRepository } from '@modules/Exemplar/repository/IExemplarRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class DeleteLivroService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
  ) {}

  async execute(liv_Id: string) {
    const livro = await this.livroRepository.findBy({
      liv_Id,
    });

    if (!livro) {
      throw new EntityNotFoundError('Livro não encontrado tente novamente');
    }

    const exemplares = await this.exemplarRepository.listBy({
      filter: {
        exe_liv_id: livro.liv_Id,
      },
    });

    if (exemplares.results.length > 0) {
      throw new EntityNotFoundError(
        'Livro possui exemplares impossível deletar',
      );
    }

    // deleta as relações com categorias
    const categorias = await this.categoriaLivroRepository.listBy({
      filter: {
        liv_id: livro.liv_Id,
      },
    });

    if (categorias.results.length > 0) {
      categorias.results.forEach(async (categoria) => {
        return this.categoriaLivroRepository.delete({
          cat_Id: categoria.cat_id,
          liv_Id: categoria.liv_id,
        });
      });
    }

    await this.livroRepository.delete(livro);
  }
}

export { DeleteLivroService };
