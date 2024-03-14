import { IDeleteSessionDTO } from '@modules/User/DTO/IDeleteSessionDTO';
import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteSessionService {
  constructor(
    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,

    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute({ usu_Id, refreshToken }: IDeleteSessionDTO): Promise<void> {
    const user = await this.userRepository.findBy({ usu_Id });

    if (!user) {
      throw new AuthorizationError('Sesão não encontrada');
    }

    const tokenData = await this.fireBaseProvider.verifyIdToken(refreshToken);

    if (tokenData.uid !== usu_Id) {
      throw new AuthorizationError('Sesão não encontrada');
    }

    await this.fireBaseProvider.signOut(usu_Id);
  }
}

export { DeleteSessionService };
