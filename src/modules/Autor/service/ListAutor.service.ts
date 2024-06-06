import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Autor } from '../entitie/Autor';
import { IAutorRepository } from '../repository/IAutorRepository.interface';

@injectable()
class ListAutorService {
  constructor(
    @inject('AutorRepository')
    private AutorRepository: IAutorRepository,
  ) {}

  async execute({
    limit,
    page,
    filter,
  }: IPaginatedRequest<Autor>): Promise<IPaginatedResponse<Autor>> {
    const editoras = await this.AutorRepository.listBy({
      limit,
      page,
      filter,
    });

    return {
      limit: editoras.limit,
      page: editoras.page,
      results: editoras.results,
      total: editoras.total,
    };
  }
}

export { ListAutorService };
