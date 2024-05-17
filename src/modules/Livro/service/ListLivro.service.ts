import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class ListLivroService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<Livro>,
  ): Promise<IPaginatedResponse<Livro>> {
    const livros = await this.livroRepository.listBy({
      limit: data.limit,
      page: data.page,
    });
    return livros;
  }
}

export { ListLivroService };
