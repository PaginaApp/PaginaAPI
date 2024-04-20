import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { StatusTransacao } from '../entitie/StatusTransacao';
import { IStatusTransacaoRepository } from './StatusTransacaoRepository.interface';

class StatusTransacaoRepository implements IStatusTransacaoRepository {
  async findBy(
    partial: Partial<StatusTransacao>,
  ): Promise<StatusTransacao | null> {
    const data = prisma.status_Transacao.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<StatusTransacao>): Promise<
    IPaginatedResponse<StatusTransacao>
  > {
    const data = await prisma.status_Transacao.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.status_Transacao.count({
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

export { StatusTransacaoRepository };
