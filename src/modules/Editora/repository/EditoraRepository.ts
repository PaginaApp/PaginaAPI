import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Editora } from '../entitie/Editora';
import { IEditoraRepository } from './IEditoraRepository.interface';

class EditoraRepository implements IEditoraRepository {
  async findBy(partial: Partial<Editora>): Promise<Editora | null> {
    const editora = await prisma.editora.findFirst({
      where: partial,
    });

    return editora;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Editora>): Promise<IPaginatedResponse<Editora>> {
    const data = await prisma.editora.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.editora.count({
      where: filter,
    });

    return {
      results: data,
      total,
      page,
      limit,
    };
  }

  async create(entity: Editora): Promise<Editora> {
    const data = await prisma.editora.create({
      data: {
        edi_Nome: entity.edi_Nome,
      },
    });

    return data;
  }

  async delete(entity: Editora): Promise<void> {
    await prisma.editora.delete({
      where: {
        edi_Id: entity.edi_Id,
      },
    });
  }
}
export { EditoraRepository };
