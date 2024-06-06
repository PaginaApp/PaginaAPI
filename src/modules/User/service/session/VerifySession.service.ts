import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { inject, injectable } from 'tsyringe';

@injectable()
class VerifySessionService {
  constructor(
    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute(token: string, user_Id: string): Promise<boolean> {
    if (!token || !user_Id) return false;

    const userAutenticationData = await this.fireBaseProvider.verifyIdToken(
      token,
    );

    if (userAutenticationData.uid !== user_Id) {
      return false;
    }

    const user = await this.userRepository.findBy({
      usu_Id: user_Id,
    });

    if (!user) {
      return false;
    }

    return true;
  }
}

export { VerifySessionService };
