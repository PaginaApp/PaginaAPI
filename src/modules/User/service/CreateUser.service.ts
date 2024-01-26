import { IHashProvider } from '@shared/container/providers/hashProvider/model/IHashProvider';
import { EntityAlreadyExistError } from '@shared/errors/EntityAlreadyExistError';
import { HashError } from '@shared/errors/HashError';
import { inject, injectable } from 'tsyringe';
import { IcreateUserDTO } from '../DTO/ICreateUserDTO';
import { User } from '../entity/User';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class CreateUser {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(DTO: IcreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findBy({
      usu_Email: DTO.usu_Email,
    });

    if (userAlreadyExists) {
      throw new EntityAlreadyExistError(
        'Usuario já existe, tente outro email!!!',
      );
    }

    // adicionar verificações de id de papel, cidade e estado.

    const hashedPassword = await this.hashProvider.generateHash(DTO.usu_Senha);

    if (!this.hashProvider.compareHash(DTO.usu_Senha, hashedPassword)) {
      throw new HashError('Erro ao gerar hash');
    }

    const user = await this.usersRepository.create({
      ...DTO,
      usu_Senha: hashedPassword,
    });

    return user;
  }
}

export { CreateUser };
