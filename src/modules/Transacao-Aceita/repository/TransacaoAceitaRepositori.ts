import { prisma } from '@shared/database';
import { NotImplementedError } from '@shared/errors/NotImplementedError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateTransacaoAceitaDTO } from '../DTO/CreateTransacaoAceitaDTO';
import { TransacaoAceita } from '../entitie/TransacaoAceita';
import { ITransacaoAceitaRepository } from './TransacaoAceitaRepository.interface';

class TransacaoAceitaRepository implements ITransacaoAceitaRepository {
  async create(entity: CreateTransacaoAceitaDTO): Promise<TransacaoAceita> {
    const data = await prisma.transacao_Aceita.create({
      data: entity,
    });

    return data;
  }

  async findBy(
    partial: Partial<TransacaoAceita>,
  ): Promise<TransacaoAceita | null> {
    const data = await prisma.transacao_Aceita.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<TransacaoAceita>): Promise<
    IPaginatedResponse<TransacaoAceita>
  > {
    const data = await prisma.transacao_Aceita.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.transacao_Aceita.count({
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
  update(entity: null): Promise<TransacaoAceita> {
    throw new NotImplementedError('Method not implemented.');
  }

  async delete(entity: TransacaoAceita): Promise<void> {
    await prisma.transacao_Aceita.delete({
      where: {
        ttr_Id_exe_Id: {
          ttr_Id: entity.ttr_Id,
          exe_Id: entity.exe_Id,
        },
      },
    });
  }
}

export { TransacaoAceitaRepository };
