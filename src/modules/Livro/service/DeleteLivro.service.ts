import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class DeleteLivroService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(liv_Id: string) {
    const livro = await this.livroRepository.findBy({
      liv_Id,
    });

    if (!livro) {
      throw new EntityNotFoundError('Livro não encontrado tente novamente');
    }

    // adicionar verificação de se existe exemplar

    await this.livroRepository.delete(livro);
  }
}

export { DeleteLivroService };
