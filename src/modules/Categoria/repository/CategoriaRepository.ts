import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { Categoria } from '../entitie/Categoria';
import { ICategoriaRepository } from './ICategoriaRepository.interface';

class CategoriaRepository implements ICategoriaRepository {
  async findBy(partial: Partial<Categoria>): Promise<Categoria | null> {
    const data = await prisma.categoria.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Categoria>): Promise<IPaginatedResponse<Categoria>> {
    const data = await prisma.categoria.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.categoria.count({
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

export { CategoriaRepository };
