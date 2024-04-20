import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { TipoTransacao } from '../entitie/TipoTransacao';
import { ITipoTransacaoRepository } from './TipoTransacaoRepository.interface';

class TipoTransacaoRepository implements ITipoTransacaoRepository {
  async findBy(partial: Partial<TipoTransacao>): Promise<TipoTransacao | null> {
    const data = await prisma.tipo_Transacao.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<TipoTransacao>): Promise<
    IPaginatedResponse<TipoTransacao>
  > {
    const data = await prisma.tipo_Transacao.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: filter,
    });

    const total = await prisma.tipo_Transacao.count({
      where: filter,
    });

    return {
      limit,
      page,
      results: data,
      total,
    };
  }
}

export { TipoTransacaoRepository };
