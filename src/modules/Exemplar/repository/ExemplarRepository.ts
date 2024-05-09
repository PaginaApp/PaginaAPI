import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateExemplarDTO } from '../DTO/CreateExemplarDTO';
import { UpdateExemplarDTO } from '../DTO/UpdateExemplarDTO';
import { Exemplar } from '../entitie/Exemplar';
import { IExemplarRepository } from './IExemplarRepository.interface';

class ExemplarRepository implements IExemplarRepository {
  async create(entity: CreateExemplarDTO): Promise<Exemplar> {
    const data = await prisma.exemplar.create({
      data: entity,
    });

    return data;
  }

  async findBy(partial: Partial<Exemplar>): Promise<Exemplar | null> {
    const data = await prisma.exemplar.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    filter,
    limit = 10,
    page = 1,
  }: IPaginatedRequest<Exemplar>): Promise<IPaginatedResponse<Exemplar>> {
    const data = await prisma.exemplar.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.exemplar.count({
      where: filter,
    });

    return {
      limit,
      page,
      total,
      results: data,
    };
  }

  async update(entity: UpdateExemplarDTO): Promise<Exemplar> {
    const data = await prisma.exemplar.update({
      where: {
        exe_Id: entity.exe_Id,
      },

      data: entity,
    });

    return data;
  }

  async delete(entity: Exemplar): Promise<void> {
    await prisma.exemplar.delete({
      where: {
        exe_Id: entity.exe_Id,
      },
    });
  }

  async countByMonth(month: number, year: number): Promise<number> {
    const data = await prisma.exemplar.count({
      where: {
        AND: [
          {
            exe_CriadoEm: {
              gte: new Date(year, month, 1),
            },
          },
          {
            exe_CriadoEm: {
              lt: new Date(year, month + 1, 1),
            },
          },
        ],
      },
    });

    return data;
  }

  exemplaresByMonth(month: number, year: number): Promise<Exemplar[]> {
    const data = prisma.exemplar.findMany({
      where: {
        AND: [
          {
            exe_CriadoEm: {
              gte: new Date(year, month, 1),
            },
          },
          {
            exe_CriadoEm: {
              lt: new Date(year, month + 1, 1),
            },
          },
        ],
      },
    });

    return data;
  }
}

export { ExemplarRepository };
