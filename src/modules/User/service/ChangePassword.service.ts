import { IHashProvider } from '@shared/container/providers/hashProvider/model/IHashProvider';
import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { inject, injectable } from 'tsyringe';
import { ChangePasswordDTO } from '../DTO/ChangePasswordDTO';
import { User } from '../entity/User';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
export class ChangePasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: ChangePasswordDTO): Promise<User> {
    const user = await this.userRepository.findBy({ usu_Id: data.usu_Id });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      data.usu_Senha,
      user.usu_Senha,
    );

    if (!passwordMatch) {
      throw new AuthorizationError('Incorrect password');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.novaSenha);

    return this.userRepository.changePassword(user.usu_Id, hashedPassword);
  }
}
