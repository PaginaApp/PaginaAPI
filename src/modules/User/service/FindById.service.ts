import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { IShowUserDTO } from '../DTO/IShowUserDTO';
import { IUserRepository } from '../repository/UserRepository.interface';

@injectable()
class FindById {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<IShowUserDTO> {
    const user = await this.usersRepository.findBy({ usu_Id: id });

    if (!user) {
      throw new EntityNotFoundError('Usuario não encontrado');
    }

    const userDTO: IShowUserDTO = {
      usu_Id: user.usu_Id,
      usu_Nome: user.usu_Nome,
      usu_Email: user.usu_Email,
      usu_Telefone: user.usu_Telefone,
      // nota e titulo estão mockados por enquanto
      usu_Titulo: 'titulo',
      usu_Nota: 5,
    };

    return userDTO;
  }
}

export { FindById };
