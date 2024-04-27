import { Cidade } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { ICidadeRepository } from './ICidadeRepository.interface';

class CidadeRepository implements ICidadeRepository {
  async findBy(partial: Partial<Cidade>): Promise<Cidade | null> {
    const cidade = await prisma.cidade.findFirst({
      where: { ...partial },
    });

    return cidade;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Cidade>): Promise<IPaginatedResponse<Cidade>> {
    const data = await prisma.cidade.findMany({
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

  findByNameAndState(
    cid_Nome: string,
    cid_est_id: string,
  ): Promise<Cidade | null> {
    const data = prisma.cidade.findFirst({
      where: {
        cid_Nome: {
          equals: cid_Nome,
          mode: 'insensitive',
        },
        cid_est_id,
      },
    });

    return data;
  }
}

export { CidadeRepository };
