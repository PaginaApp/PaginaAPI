import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { inject, injectable } from 'tsyringe';
import Livro from '../entitie/Livro';
import { ILivroRepository } from '../repository/ILivroRepository.interface';

@injectable()
class ListByISBNService {
  constructor(
    @inject('LivroRepository')
    private livroRepository: ILivroRepository,
  ) {}

  async execute({
    filter,
    page,
    limit,
  }: IPaginatedRequest<Livro>): Promise<any> {
    const livros = await this.livroRepository.listBy({
      filter,
      limit,
      page,
    });

    return {
      results: livros.results,
      total: livros.total,
      page: livros.page,
      limit: livros.limit,
    };
  }
}

export { ListByISBNService };
