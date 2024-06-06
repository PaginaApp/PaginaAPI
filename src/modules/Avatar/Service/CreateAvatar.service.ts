import { UserRepository } from '@modules/User/repository/UserRepository';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { EntityNotFoundError } from '@shared/errors/EntityNotFoundError';
import { inject, injectable } from 'tsyringe';
import { AvatarDTO } from '../DTO/AvatarDTO';

@injectable()
class CreateAvatarService {
  constructor(
    @inject('FireBaseProvider')
    private fireBaseProvider: IFireBase,

    @inject('UserRepository')
    private userRepository: UserRepository,
  ) {}

  async execute(usu_Id: string, avatar: Buffer): Promise<AvatarDTO> {
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

    const fileName = `${process.env.AVATAR_DIRECTORY}/${user.usu_Id}`;

    await this.fireBaseProvider.uploadFile(fileName, avatar);

    user.usu_avatar = fileName;

    const updatedUser = await this.userRepository.update({
      usu_Id: user.usu_Id,
      usu_avatar: fileName,
    });

    if (!updatedUser.usu_avatar) {
      throw new EntityNotFoundError('Usuário não encontrado');
    }

    return {
      name: updatedUser.usu_avatar,
    };
  }
}

export { CreateAvatarService };
