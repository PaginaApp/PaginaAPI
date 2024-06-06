import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IcreatePapelDTO } from '../DTO/ICreatePapelDTO';
import { IUpdatePapelDTO } from '../DTO/IUpdatePapelDTO';
import { Papel } from '../entity/Papel';
import { IPapelRepository } from './IPapelRepository.interface';

class PapelRepository implements IPapelRepository {
  async create(entity: IcreatePapelDTO): Promise<Papel> {
    const papel = await prisma.papel.create({
      data: {
        pap_Nome: entity.pap_Nome,
      },
    });

    return papel;
  }

  async findBy(partial: Partial<Papel>): Promise<Papel | null> {
    const papel = await prisma.papel.findFirst({
      where: { ...partial },
    });

    return papel;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Papel>): Promise<IPaginatedResponse<Papel>> {
    const data = await prisma.papel.findMany({
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

  async update(entity: IUpdatePapelDTO): Promise<Papel> {
    const papel = await prisma.papel.update({
      where: { pap_Id: entity.pap_Id },
      data: entity,
    });

    return papel;
  }

  async delete(entity: Papel): Promise<void> {
    await prisma.papel.delete({
      where: { pap_Id: entity.pap_Id },
    });
  }
}

export { PapelRepository };
