import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteAvatarService {
  constructor(
    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,

    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute(usu_Id: string): Promise<void> {
    const user = await this.userRepository.findBy({ usu_Id });

    if (!user) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    if (
      user.usu_avatar &&
      !user.usu_avatar.includes(process.env.AVATAR_DEFAULT as string)
    ) {
      await this.fireBaseProvider.deleteFile(user.usu_avatar);
    }

    user.usu_avatar = null;

    await this.userRepository.update({
      usu_Id: user.usu_Id,
      usu_avatar: process.env.AVATAR_DEFAULT,
    });
  }
}

export { DeleteAvatarService };
