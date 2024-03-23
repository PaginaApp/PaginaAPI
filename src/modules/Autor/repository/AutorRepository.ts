import { Autor } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IAtorRepository } from './IAutorRepository.interface';

class AtorRepository implements IAtorRepository {
  async findBy(partial: Partial<Autor>): Promise<Autor | null> {
    const autor = await prisma.autor.findFirst({
      where: partial,
    });

    return autor;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Autor>): Promise<IPaginatedResponse<Autor>> {
    const data = await prisma.autor.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.autor.count({
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

export { AtorRepository };
