import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';

@injectable()
class GetAvatarService {
  constructor(
    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,

    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  public async execute(usu_Id: string): Promise<Buffer> {
    const user = await this.userRepository.findBy({ usu_Id });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    if (!user.usu_avatar) {
      return this.fireBaseProvider.downloadFile(
        process.env.AVATAR_DEFAULT ?? '',
      );
    }

    const avatar = await this.fireBaseProvider.downloadFile(user.usu_avatar);

    return avatar;
  }
}

export { GetAvatarService };
