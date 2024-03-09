import { ICreateSessionDTO } from '@modules/User/DTO/ICreateSessionDTO';
import { ICreateSessionResponseDTO } from '@modules/User/DTO/ICreateSessionResponseDTO';
import { IShowUserDTO } from '@modules/User/DTO/IShowUserDTO';
import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { IHashProvider } from '@shared/container/providers/hashProvider/model/IHashProvider';
import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateSessionService {
  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,
  ) {}

  async execute({
    usu_Email,
    usu_Senha,
  }: ICreateSessionDTO): Promise<ICreateSessionResponseDTO> {
    const user = await this.userRepository.findBy({ usu_Email });

    if (!user) {
      throw new AuthorizationError('Email ou senha incorretos');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      usu_Senha,
      user.usu_Senha,
    );

    if (!passwordMatch) {
      throw new AuthorizationError('Email ou senha incorretos');
    }

    const token = await this.fireBaseProvider.signInWithEmailAndPassword(
      user.usu_Id,
    );

    const showUser: IShowUserDTO = {
      ...user,
      usu_Titulo: 'titulo',
      usu_Nota: 5,
    };

    return {
      accessToken: token,
      user: showUser,
    };
  }
}
