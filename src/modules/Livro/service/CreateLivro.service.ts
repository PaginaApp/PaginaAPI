import { inject, injectable } from 'tsyringe';
import { ICreateLivroDTO } from '../DTO/ICreateLivroDTO';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class CreateLivroService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(data: ICreateLivroDTO): Promise<Livro> {
    const livro = await this.livroRepository.create(data);

    return livro;
  }
}

export { CreateLivroService };
