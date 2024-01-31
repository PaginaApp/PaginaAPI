import { prisma } from '@shared/database';
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

    return {
      results: data,
      total: data.length,
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
}

export { UserRepository };
