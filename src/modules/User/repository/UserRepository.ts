import { IEnderecoDTO } from '@modules/Endereco/DTO/IEnderecoDTO';
import { prisma } from '@shared/database';
import { UnknownError } from '@shared/errors/UnknownError';
import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { IcreateUserDTO } from '../DTO/ICreateUserDTO';
import { IUpdateUserDTO } from '../DTO/IUpdateUserDTO';
import { User } from '../entity/User';
import { IUserRepository } from './UserRepository.interface';

class UserRepository implements IUserRepository {
  async create(entity: IcreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...entity,
        usu_pap_id: entity.usu_pap_id,
      },
    });

    return user;
  }

  async findBy(partial: Partial<User>): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { ...partial },
    });

    return user;
  }

  async listBy({
    page = 1,
    limit = 10,
    filter,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const data = await prisma.user.findMany({
      where: { ...filter },
      skip: (page - 1) * limit,
      take: limit,
    });

    const total = await prisma.user.count({
      where: filter,
    });

    return {
      results: data,
      total,
      page,
      limit,
    };
  }

  async update(entity: IUpdateUserDTO): Promise<User> {
    const user = await prisma.user.update({
      where: { usu_Id: entity.usu_Id },
      data: entity,
    });

    return user;
  }

  async delete(entity: User): Promise<void> {
    await prisma.user.delete({
      where: { usu_Id: entity.usu_Id },
    });
  }

  async endereco(data: IEnderecoDTO, usu_Id: string): Promise<IEnderecoDTO> {
    const endereco = await prisma.user.update({
      where: { usu_Id },
      data: {
        usu_Rua: data.usu_Rua,
        usu_Numero: data.usu_Numero,
        usu_Bairro: data.usu_Bairro,
        usu_CEP: data.usu_CEP,
        usu_Complemento: data.usu_Complemento,
        usu_cid_id: data.usu_cid_id,
      },
    });

    if (
      !endereco.usu_Bairro ||
      !endereco.usu_CEP ||
      !endereco.usu_Numero ||
      !endereco.usu_Rua ||
      !endereco.usu_cid_id
    ) {
      throw new UnknownError('Erro ao atualizar endereço');
    }
    return {
      usu_Bairro: endereco.usu_Bairro,
      usu_CEP: endereco.usu_CEP,
      usu_Complemento: endereco.usu_Complemento,
      usu_Numero: endereco.usu_Numero,
      usu_Rua: endereco.usu_Rua,
      usu_cid_id: endereco.usu_cid_id,
    };
  }

  async changePassword(usu_Id: string, newPassword: string): Promise<User> {
    const user = await prisma.user.update({
      where: { usu_Id },
      data: {
        usu_Senha: newPassword,
      },
    });

    return user;
  }

  async CountByAge(start: Date, end: Date): Promise<number> {
    const count = await prisma.user.count({
      where: {
        usu_Nasc: {
          gte: start,
          lte: end,
        },
      },
    });

    return count;
  }
}

export { UserRepository };
