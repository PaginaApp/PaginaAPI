import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Papel } from '../entity/Papel';
import { IPapelRepository } from '../repository/IPapelRepository.interface';

@injectable()
class ListPapel {
  constructor(
    @inject('PapelRepository')
    private papelRepository: IPapelRepository,
  ) {}

  async execute({
    page,
    limit,
    filter,
  }: IPaginatedRequest<Papel>): Promise<IPaginatedResponse<Papel>> {
    const papeis = await this.papelRepository.listBy({
      page,
      limit,
      ...filter,
    });

    return papeis;
  }
}

export { ListPapel };
