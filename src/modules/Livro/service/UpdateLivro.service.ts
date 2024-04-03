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
  ) {}

  async execute(data: IUpdateLivroDTO): Promise<Livro> {
    const livro = await this.livroRepository.findBy({
      liv_Id: data.liv_Id,
    });

    if (!livro) {
      throw new EntityNotFoundError('Livro não encontrado, tente novamente');
    }

    const updatedLivro = await this.livroRepository.update(data);

    return updatedLivro;
  }
}

export { UpdateLivroService };
