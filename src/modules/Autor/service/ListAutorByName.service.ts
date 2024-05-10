import { BadRequestError } from '@shared/errors/BadRequestError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Autor } from '../entitie/Autor';
import { IAutorRepository } from '../repository/IAutorRepository.interface';

@injectable()
class ListAutorByNameService {
  constructor(
    @inject('AutorRepository')
    private autorRepository: IAutorRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<Autor>,
  ): Promise<IPaginatedResponse<Autor>> {
    if (!data.filter || !data.filter.aut_Nome) {
      throw new BadRequestError('Nome do autor não informado');
    }

    const nome = data.filter.aut_Nome;

    const list = await this.autorRepository.listByName({
      page: data.page,
      limit: data.limit,
      filter: {
        aut_Nome: nome,
      },
    });

    return {
      limit: list.limit,
      page: list.page,
      results: list.results,
      total: list.total,
    };
  }
}

export { ListAutorByNameService };
