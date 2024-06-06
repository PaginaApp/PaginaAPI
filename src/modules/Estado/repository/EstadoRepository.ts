/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Estado } from '../entity/Estado';
import { IEstadoRepository } from './IEstadoRepository.interface';

class EstadoRepository implements IEstadoRepository {
  async findBy(partial: Partial<Estado>): Promise<Estado | null> {
    const estado = await prisma.estado.findFirst({
      where: { ...partial },
    });

    return estado;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Estado>): Promise<IPaginatedResponse<Estado>> {
    const data = await prisma.estado.findMany({
      where: { ...filter },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      results: data,
      total: data.length,
      page,
      limit,
    };
  }
}

export { EstadoRepository };
