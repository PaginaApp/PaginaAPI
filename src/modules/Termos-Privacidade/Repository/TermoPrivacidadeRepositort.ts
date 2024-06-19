/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@shared/database';
import { NotImplementedError } from '@shared/errors/NotImplementedError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateTermoPrivacidade } from '../DTO/CreateTermoPrivacidade';
import { TermoPrivacidade } from '../Entitie/TermoPrivacidade';
import { ITermoPrivacidadeRepository } from './ITermoPrivacidade.repository';

class TermoPrivacidadeRepository implements ITermoPrivacidadeRepository {
  async create(entity: CreateTermoPrivacidade): Promise<TermoPrivacidade> {
    const termoPrivacidade = prisma.termo_privacidade.create({
      data: entity,
    });

    return termoPrivacidade;
  }

  async findBy(
    partial: Partial<TermoPrivacidade>,
  ): Promise<TermoPrivacidade | null> {
    const termoPrivacidade = prisma.termo_privacidade.findFirst({
      where: partial,
    });

    return termoPrivacidade;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<TermoPrivacidade>): Promise<
    IPaginatedResponse<TermoPrivacidade>
  > {
    const data = await prisma.termo_privacidade.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
    });

    const total = await prisma.termo_privacidade.count({
      where: filter,
    });

    return {
      limit,
      page,
      results: data,
      total,
    };
  }

  // eslint-disable-next-line no-unused-vars
  update(entity: null): Promise<TermoPrivacidade> {
    throw new NotImplementedError('Impossível atualizar termo de privacidade');
  }

  // eslint-disable-next-line no-unused-vars
  delete(entity: TermoPrivacidade): Promise<void> {
    throw new NotImplementedError('Impossível deletar termo de privacidade');
  }

  async findActual(date: Date): Promise<TermoPrivacidade | null> {
    const termoPrivacidade = prisma.termo_privacidade.findFirst({
      where: {
        tpr_CriadoEm: {
          lte: date,
        },
      },
      orderBy: {
        tpr_CriadoEm: 'desc',
      },
    });

    return termoPrivacidade;
  }
}

export { TermoPrivacidadeRepository };
