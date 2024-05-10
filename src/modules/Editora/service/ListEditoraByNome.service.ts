import { Editora } from '@prisma/client';
import { BadRequestError } from '@shared/errors/BadRequestError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { IEditoraRepository } from '../repository/IEditoraRepository.interface';

@injectable()
class ListEditoraByNomeService {
  constructor(
    @inject('EditoraRepository')
    private editoraRepository: IEditoraRepository,
  ) {}

  async execute(
    data: IPaginatedRequest<Editora>,
  ): Promise<IPaginatedResponse<Editora>> {
    if (!data.filter || !data.filter.edi_Nome) {
      throw new BadRequestError('Nome da editora não informado');
    }

    const nome = data.filter.edi_Nome;

    const editoras = await this.editoraRepository.listByName({
      filter: {
        edi_Nome: nome,
      },
      page: data.page,
      limit: data.limit,
    });

    return editoras;
  }
}

export { ListEditoraByNomeService };
