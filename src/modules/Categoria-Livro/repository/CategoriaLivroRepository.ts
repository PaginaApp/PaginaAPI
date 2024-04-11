import { prisma } from '@shared/database';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CategoriaLivro } from '../entitie/CategoriaLivro';
import { ICategoriaLivroRepository } from './ICategoria_LivroRepository.interface';

class CategoriaLivroRepository implements ICategoriaLivroRepository {
  async findBy(
    partial: Partial<CategoriaLivro>,
  ): Promise<CategoriaLivro | null> {
    const data = await prisma.categoria_Livro.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    limit = 10,
    page = 1,
    filter,
  }: IPaginatedRequest<CategoriaLivro>): Promise<
    IPaginatedResponse<CategoriaLivro>
  > {
    const data = await prisma.categoria_Livro.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.categoria_Livro.count({
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

export { CategoriaLivroRepository };
