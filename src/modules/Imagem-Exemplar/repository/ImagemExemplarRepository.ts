import { prisma } from '@shared/database';
import { NotImplementedError } from '@shared/errors/NotImplementedError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { CreateImagemExemplarDTO } from '../DTO/CreateImagemExemplarDTO';
import { ImagemExemplar } from '../entitie/ImagemExemplar';
import { IImagemExemplarRepository } from './ImagemExemplarRepository.interface';

class ImagemExemplarRepository implements IImagemExemplarRepository {
  async create(entity: CreateImagemExemplarDTO): Promise<ImagemExemplar> {
    // espera a criação da imagem no banco de dados
    const data = await prisma.imagem_Exemplar.create({
      data: {
        iex_exe_id: entity.iex_exe_id,
        iex_Path: 'temp',
      },
    });

    await prisma.imagem_Exemplar.update({
      where: {
        iex_Id: data.iex_Id,
      },
      data: {
        iex_Path: `${process.env.EXEMPLAR_DIRECTORY}/${data.iex_Id}`,
      },
    });

    return data;
  }

  async findBy(
    partial: Partial<ImagemExemplar>,
  ): Promise<ImagemExemplar | null> {
    const data = await prisma.imagem_Exemplar.findFirst({
      where: partial,
    });

    return data;
  }

  async listBy({
    filter,
    limit = 10,
    page = 1,
  }: IPaginatedRequest<ImagemExemplar>): Promise<
    IPaginatedResponse<ImagemExemplar>
  > {
    const data = await prisma.imagem_Exemplar.findMany({
      where: filter,
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.imagem_Exemplar.count({
      where: filter,
    });

    return {
      limit,
      page,
      total,
      results: data,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  update(entity: null): Promise<ImagemExemplar> {
    throw new NotImplementedError(
      'Metodo não implementado, apague a imagem e crie outra.',
    );
  }

  async delete(entity: ImagemExemplar): Promise<void> {
    await prisma.imagem_Exemplar.delete({
      where: {
        iex_Id: entity.iex_Id,
      },
    });
  }
}

export { ImagemExemplarRepository };
