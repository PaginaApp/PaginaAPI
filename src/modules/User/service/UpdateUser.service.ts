import { User } from '@prisma/client';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserDTO } from '../DTO/IUpdateUserDTO';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    usu_Id,
    usu_Telefone,
    usu_Rua,
    usu_Numero,
    usu_Bairro,
    usu_CEP,
    usu_Complemento,
    usu_cid_id,
  }: IUpdateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findBy({ usu_Id });

    if (!userExists) {
      throw new EntityNotFoundError('User not found');
    }

    // adicionar verificação de cidade e estado

    const user = await this.userRepository.update({
      usu_Id,
      usu_Telefone,
      usu_Rua,
      usu_Numero,
      usu_Bairro,
      usu_CEP,
      usu_Complemento,
      usu_cid_id,
    });

    return user;
  }
}

export { UpdateUserService };
