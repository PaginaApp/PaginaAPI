import { IRefreshTokenDTO } from '@modules/User/DTO/IRefreshTokenDTO';
import { IRefreshTokenResponseDTO } from '@modules/User/DTO/IRefreshTokenResponseDTO';
import { IShowUserDTO } from '@modules/User/DTO/IShowUserDTO';
import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { UserMapper } from '@shared/util/UserMapper';
import { inject, injectable } from 'tsyringe';

@injectable()
class RefreshSessionService {
  constructor(
    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,

    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute({
    usu_Id,
    token,
  }: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO> {
    const user = await this.userRepository.findBy({ usu_Id });

    if (!user) {
      throw new AuthorizationError('Sesão não encontrada');
    }

    const tokenData = await this.fireBaseProvider.verifyIdToken(token);

    if (tokenData.uid !== usu_Id) {
      throw new AuthorizationError('Sesão não encontrada');
    }

    await this.fireBaseProvider.signOut(usu_Id);

    const newToken = await this.fireBaseProvider.signIn(usu_Id);

    const showUser: IShowUserDTO = UserMapper(user);

    return {
      user: showUser,
      accessToken: newToken,
    };
  }
}

export { RefreshSessionService };
