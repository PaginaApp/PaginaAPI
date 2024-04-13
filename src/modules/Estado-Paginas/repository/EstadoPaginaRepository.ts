import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { EstadoPaginas } from '../entitie/EstadoPaginas';
import { IEstadoPaginasRepository } from './IEstadoPaginaRepository.interface';

class EstadoPaginasRepository implements IEstadoPaginasRepository {
  async findBy(partial: Partial<EstadoPaginas>): Promise<EstadoPaginas | null> {
    const data = await prisma.estado_Paginas.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    filter,
    limit = 10,
    page = 1,
  }: IPaginatedRequest<EstadoPaginas>): Promise<
    IPaginatedResponse<EstadoPaginas>
  > {
    const data = await prisma.estado_Paginas.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.estado_Paginas.count({
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

export { EstadoPaginasRepository };
