import { prisma } from '@shared/database';
import { NotImplementedError } from '@shared/errors/NotImplementedError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateExemplarTransacaoDTO } from '../DTO/CreateExemplarTransacaoDTO';
import { ExemplarTransacao } from '../entitie/ExemplarTransacao';
import { IExemplarTransacaoRepository } from './ExemplarTransacaoRepository.interface';

class ExemplarTransacaoRepository implements IExemplarTransacaoRepository {
  async create(entity: CreateExemplarTransacaoDTO): Promise<ExemplarTransacao> {
    const data = await prisma.exemplar_Transacao.create({
      data: entity,
    });

    return data;
  }

  async findBy(
    partial: Partial<ExemplarTransacao>,
  ): Promise<ExemplarTransacao | null> {
    const data = await prisma.exemplar_Transacao.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<ExemplarTransacao>): Promise<
    IPaginatedResponse<ExemplarTransacao>
  > {
    const data = await prisma.exemplar_Transacao.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.exemplar_Transacao.count({
      where: filter,
    });

    return {
      results: data,
      total,
      page,
      limit,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  update(entity: null): Promise<ExemplarTransacao> {
    throw new NotImplementedError('Impossível atualizar exemplar transação');
  }

  async delete(entity: ExemplarTransacao): Promise<void> {
    await prisma.exemplar_Transacao.delete({
      where: {
        trs_id_exe_id: {
          trs_id: entity.trs_id,
          exe_id: entity.exe_id,
        },
      },
    });
  }
}

export { ExemplarTransacaoRepository };
