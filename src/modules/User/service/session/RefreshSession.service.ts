import { IRefreshTokenDTO } from '@modules/User/DTO/IRefreshTokenDTO';
import { IRefreshTokenResponseDTO } from '@modules/User/DTO/IRefreshTokenResponseDTO';
import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { AuthorizationError } from '@shared/errors/AuthorizationError';
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
    refreshToken,
  }: IRefreshTokenDTO): Promise<IRefreshTokenResponseDTO> {
    const user = await this.userRepository.findBy({ usu_Id });

    if (!user) {
      throw new AuthorizationError('Sesão não encontrada');
    }

    const tokenData = await this.fireBaseProvider.verifyIdToken(refreshToken);

    if (tokenData.uid !== usu_Id) {
      throw new AuthorizationError('Sesão não encontrada');
    }

    await this.fireBaseProvider.signOut(usu_Id);

    const newToken = await this.fireBaseProvider.signInWithEmailAndPassword(
      usu_Id,
    );

    const showUser = {
      ...user,
      usu_Titulo: 'titulo',
      usu_Nota: 5,
    };

    return {
      user: showUser,
      accessToken: newToken,
    };
  }
}

export { RefreshSessionService };
