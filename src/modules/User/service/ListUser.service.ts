import { IPaginatedRequest } from '@shared/interfaces/IPaginatedRequest';
import { IPaginatedResponse } from '@shared/interfaces/IPaginatedResponse';
import { inject, injectable } from 'tsyringe';
import { User } from '../entity/User';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class ListUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
    filter,
  }: IPaginatedRequest<User>): Promise<IPaginatedResponse<User>> {
    const users = await this.userRepository.listBy({
      page,
      limit,
      ...filter,
    });

    return users;
  }
}

export { ListUserService };
