import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class FindByNameService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(liv_Titulo: string): Promise<Livro | null> {
    const livro = await this.livroRepository.findBy({
      liv_Titulo,
    });

    return livro;
  }
}

export { FindByNameService };
