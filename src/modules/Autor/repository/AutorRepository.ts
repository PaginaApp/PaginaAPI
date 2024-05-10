import { Autor } from '@prisma/client';
import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateAutorDTO } from '../DTO/CreateAutorDTO';
import { IAutorRepository } from './IAutorRepository.interface';

class AutorRepository implements IAutorRepository {
  async findBy(partial: Partial<Autor>): Promise<Autor | null> {
    const autor = await prisma.autor.findFirst({
      where: partial,
    });

    return autor;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Autor>): Promise<IPaginatedResponse<Autor>> {
    const data = await prisma.autor.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.autor.count({
      where: filter,
    });

    return {
      results: data,
      total,
      page,
      limit,
    };
  }

  async create(entity: CreateAutorDTO): Promise<Autor> {
    const data = await prisma.autor.create({
      data: {
        aut_Nome: entity.aut_Nome,
      },
    });

    return data;
  }

  async delete(entity: Autor): Promise<void> {
    await prisma.autor.delete({
      where: {
        aut_Id: entity.aut_Id,
      },
    });
  }

  async listByName({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<Autor>): Promise<IPaginatedResponse<Autor>> {
    const data = await prisma.autor.findMany({
      where: {
        aut_Nome: {
          contains: filter!.aut_Nome,
          mode: 'insensitive',
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.autor.count({
      where: {
        aut_Nome: {
          contains: filter!.aut_Nome,
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

export { AutorRepository };
