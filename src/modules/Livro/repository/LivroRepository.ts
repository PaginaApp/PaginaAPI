import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { ICreateLivroDTO } from '../DTO/ICreateLivroDTO';
import { IUpdateLivroDTO } from '../DTO/IUpdateLivroDTO';
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

  async create(entity: ICreateLivroDTO): Promise<Livro> {
    const livro = await prisma.livro.create({
      data: entity,
    });

    return livro;
  }

  async delete(entity: Livro): Promise<void> {
    await prisma.livro.delete({
      where: {
        liv_Id: entity.liv_Id,
      },
    });
  }

  async update(entity: IUpdateLivroDTO): Promise<Livro> {
    const livro = await prisma.livro.update({
      where: {
        liv_Id: entity.liv_Id,
      },
      data: {
        ...entity,
      },
    });

    return livro;
  }

  async listByTitulo({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Livro>): Promise<IPaginatedResponse<Livro>> {
    const data = await prisma.livro.findMany({
      where: {
        liv_Titulo: {
          contains: filter?.liv_Titulo || '',
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.livro.count({
      where: {
        liv_Titulo: {
          contains: filter?.liv_Titulo || '',
          mode: 'insensitive',
        },
      },
    });

    return {
      results: data,
      total,
      page,
      limit,
    };
  }
}

export { LivroRepository };
