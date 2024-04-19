import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from '../repository/IExemplarRepository.interface';

@injectable()
export class ListHomeService {
  constructor(
    @inject('ExemplarRepository')
    private exemplarRepository: IExemplarRepository,
  ) {}

  public async execute(
    data: IPaginatedRequest<Exemplar>,
  ): Promise<IPaginatedResponse<Exemplar>> {
    const exemplar = await this.exemplarRepository.listBy(data);

    return exemplar;
  }
}
