import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IUpdateLivroDTO } from '../DTO/IUpdateLivroDTO';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class UpdateLivroService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
  ) {}

  async execute(data: IUpdateLivroDTO, cat_ids: string[]): Promise<Livro> {
    const livro = await this.livroRepository.findBy({
      liv_Id: data.liv_Id,
    });

    if (!livro) {
      throw new EntityNotFoundError('Livro não encontrado, tente novamente');
    }

    const updatedLivro = await this.livroRepository.update(data);

    const categorias = await this.categoriaLivroRepository.listBy({
      filter: { liv_id: data.liv_Id },
    });

    await Promise.all(
      categorias.results.map(async (categoria) => {
        await this.categoriaLivroRepository.delete({
          cat_Id: categoria.cat_id,
          liv_Id: data.liv_Id,
        });
      }),
    );

    await Promise.all(
      cat_ids.map(async (cat_id) => {
        const categoria = await this.categoriaRepository.findBy({
          cat_Id: cat_id,
        });

        if (!categoria) {
          throw new EntityNotFoundError('Categoria não encontrada');
        }

        await this.categoriaLivroRepository.create({
          cat_Id: categoria.cat_Id,
          liv_Id: data.liv_Id,
        });
      }),
    );

    return updatedLivro;
  }
}

export { UpdateLivroService };
