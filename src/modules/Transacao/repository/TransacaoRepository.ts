import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateTransacaoDTO } from '../DTO/CreateTransacaoDTO';
import { UpdateTransacaoDTO } from '../DTO/UpdateTransacaoDTO';
import { Transacao } from '../entitie/Transacao';
import { ITransacaoRepository } from './TransacaoRepository.interface';

class TransacaoRepository implements ITransacaoRepository {
  async create(entity: CreateTransacaoDTO): Promise<Transacao> {
    const data = await prisma.transacao.create({
      data: {
        trs_Prazo: entity.trs_Prazo || 0,
        trs_Preco: entity.trs_Preco || 0,
        trs_str_id: entity.trs_str_id,
        trs_ttr_id: entity.trs_ttr_id,
        trs_usu_Anunciante_id: entity.trs_usu_Anunciante_id,
        trs_usu_Leitor_id: entity.trs_usu_Leitor_id,
        trs_Data: entity.trs_Data,
      },
    });

    return data;
  }

  async findBy(partial: Partial<Transacao>): Promise<Transacao | null> {
    const data = await prisma.transacao.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Transacao>): Promise<IPaginatedResponse<Transacao>> {
    const data = await prisma.transacao.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.transacao.count({
      where: filter,
    });

    return {
      page,
      limit,
      results: data,
      total,
    };
  }

  async update(entity: UpdateTransacaoDTO): Promise<Transacao> {
    const data = await prisma.transacao.update({
      where: {
        trs_Id: entity.trs_Id,
      },
      data: entity,
    });

    return data;
  }

  async delete(entity: Transacao): Promise<void> {
    await prisma.transacao.delete({
      where: {
        trs_Id: entity.trs_Id,
      },
    });
  }

  async countByDateByType(
    startDate: Date,
    endDate: Date,
    trs_ttr_id: string,
  ): Promise<number> {
    const data = await prisma.transacao.count({
      where: {
        trs_Data: {
          gte: startDate,
          lte: endDate,
        },
        trs_ttr_id,
      },
    });

    return data;
  }
}

export { TransacaoRepository };
