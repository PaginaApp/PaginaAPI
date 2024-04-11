import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class FindByISBNService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(liv_ISBN: string): Promise<Livro | null> {
    const livro = await this.livroRepository.findBy({
      liv_ISBN,
    });

    if (!livro) {
      throw new EntityNotFoundError(
        'Livro não encontrado tente novamente mais tarde!!',
      );
    }

    return livro;
  }
}

export { FindByISBNService };
