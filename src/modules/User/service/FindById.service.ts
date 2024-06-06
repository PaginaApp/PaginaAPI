import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { User } from '../entity/User';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class FindById {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findBy({ usu_Id: id });

    if (!user) {
      throw new EntityNotFoundError('Usuario não encontrado');
    }

    return user;
  }
}

export { FindById };
