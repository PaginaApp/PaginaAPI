import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import Livro from '../entitie/Livro';
import { ILivroRepository } from './ILivroRepository.interface';

class LivroRepository implements ILivroRepository {
  async findBy(partial: Partial<Livro>): Promise<Livro | null> {
    const data = await prisma.livro.findFirst({
      where: { ...partial },
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Livro>): Promise<IPaginatedResponse<Livro>> {
    const data = await prisma.livro.findMany({
      where: { ...filter },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.livro.count();

    return {
      results: data,
      total,
      page,
      limit,
    };
  }
}

export { LivroRepository };
