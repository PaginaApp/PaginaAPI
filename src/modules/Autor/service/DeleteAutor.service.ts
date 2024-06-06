import { ILivroRepository } from '@modules/Livro/repository/ILivroRepository.interface';
import { EntityUsedError } from '@shared/errors/EntitieUsedError';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IAutorRepository } from '../repository/IAutorRepository.interface';

@injectable()
class DeleteAutorService {
  constructor(
    @inject('AutorRepository')
    private autorRepository: IAutorRepository,

    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(aut_Id: string): Promise<void> {
    const autor = await this.autorRepository.findBy({
      aut_Id,
    });

    if (!autor) {
      throw new EntityNotFoundError('Autor não encontrado');
    }

    const livros = await this.livroRepository.listBy({
      filter: {
        liv_aut_id: aut_Id,
      },
    });

    if (livros.results.length > 0) {
      throw new EntityUsedError('Autor sendo utilizado impossivel deletar');
    }

    await this.autorRepository.delete(autor);
  }
}

export { DeleteAutorService };
