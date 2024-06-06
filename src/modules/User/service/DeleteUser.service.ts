import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findBy({ usu_Id: id });

    if (!user) {
      throw new EntityNotFoundError('Usuario não encontrado');
    }

    try {
      await this.usersRepository.delete(user);
    } catch (error) {
      // usuario tem relacionamento com outra tabela
      await this.usersRepository.update({ usu_Id: id, usu_Ativo: false });
    }
  }
}

export { DeleteUserService };
