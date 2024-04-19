import { prisma } from '@shared/database';
import { NotImplementedError } from '@shared/errors/NotImplementedError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateListaDeDesejoDTO } from '../DTO/CreateListaDeDesejoDTO';
import { ListaDeDesejo } from '../entitie/ListaDeDesejo';
import { IListaDeDesejoRepository } from './ListaDeDesejoRepository.interface';

class ListaDeDesejoRepository implements IListaDeDesejoRepository {
  async create(entity: CreateListaDeDesejoDTO): Promise<ListaDeDesejo> {
    const data = await prisma.lista_De_Desejos.create({
      data: entity,
    });

    return data;
  }

  async findBy(partial: Partial<ListaDeDesejo>): Promise<ListaDeDesejo | null> {
    const data = await prisma.lista_De_Desejos.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    limit = 10,
    page = 1,
    filter,
  }: IPaginatedRequest<ListaDeDesejo>): Promise<
    IPaginatedResponse<ListaDeDesejo>
  > {
    const data = await prisma.lista_De_Desejos.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.lista_De_Desejos.count({
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
  update(entity: null): Promise<ListaDeDesejo> {
    throw new NotImplementedError('Impossível atualizar lista de desejos.');
  }

  async delete(entity: ListaDeDesejo): Promise<void> {
    await prisma.lista_De_Desejos.delete({
      where: {
        usu_id_liv_id: {
          usu_id: entity.usu_id,
          liv_id: entity.liv_id,
        },
      },
    });
  }
}

export { ListaDeDesejoRepository };
