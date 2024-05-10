import { ICategoriaLivroRepository } from '@modules/Categoria-Livro/repository/ICategoria_LivroRepository.interface';
import { ICategoriaRepository } from '@modules/Categoria/repository/ICategoriaRepository.interface';
import { inject, injectable } from 'tsyringe';
import { ICreateLivroDTO } from '../DTO/ICreateLivroDTO';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class CreateLivroService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,

    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository,

    @inject('CategoriaLivroRepository')
    private categoriaLivroRepository: ICategoriaLivroRepository,
  ) {}

  async execute(data: ICreateLivroDTO, cat_ids: string[]): Promise<Livro> {
    const livro = await this.livroRepository.create(data);

    await Promise.all(
      cat_ids.map(async (cat_id) => {
        const categoria = await this.categoriaRepository.findBy({
          cat_Id: cat_id,
        });

        if (!categoria) {
          throw new Error('Categoria não encontrada');
        }

        await this.categoriaLivroRepository.create({
          cat_Id: categoria.cat_Id,
          liv_Id: livro.liv_Id,
        });
      }),
    );

    return livro;
  }
}

export { CreateLivroService };
