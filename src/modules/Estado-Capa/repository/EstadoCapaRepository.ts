import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { EstadoCapa } from '../entitie/EstadoCapa';
import { IEstadoCapaRepository } from './IEstadoCapaRepository.interface';

class EstadoCapaRepository implements IEstadoCapaRepository {
  async findBy(partial: Partial<EstadoCapa>): Promise<EstadoCapa | null> {
    const data = await prisma.estado_Capa.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    filter,
    limit = 10,
    page = 1,
  }: IPaginatedRequest<EstadoCapa>): Promise<IPaginatedResponse<EstadoCapa>> {
    const data = await prisma.estado_Capa.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.estado_Capa.count({
      where: filter,
    });

    return {
      results: data,
      total,
      page,
      limit,
    };
  }
}

export { EstadoCapaRepository };
