import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { Editora } from '../entitie/Editora';
import { IEditoraRepository } from '../repository/IEditoraRepository.interface';

@injectable()
class ListEditoraService {
  constructor(
    @inject('EditoraRepository')
    private EditoraRepository: IEditoraRepository,
  ) {}

  async execute({
    limit,
    page,
    filter,
  }: IPaginatedRequest<Editora>): Promise<IPaginatedResponse<Editora>> {
    const editoras = await this.EditoraRepository.listBy({
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

export { ListEditoraService };
