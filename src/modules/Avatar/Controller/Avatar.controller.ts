import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAvatarService } from '../Service/CreateAvatar.service';
import { DeleteAvatarService } from '../Service/DeleteAvatar.service';
import { GetAvatarService } from '../Service/GetAvatar.service';

class AvatarController {
  async uploadAvatar(req: Request, res: Response) {
    const { usu_Id } = req.params;

    const { avatar } = req.body;

    const avatarBuffer = Buffer.from(avatar, 'base64');

    const updateAvatar = container.resolve(CreateAvatarService);

    const user = await updateAvatar.execute(usu_Id, avatarBuffer);

    return res.status(200).json(user);
  }

  async deleteAvatar(req: Request, res: Response) {
    const { usu_Id } = req.params;

    const deleteAvatar = container.resolve(DeleteAvatarService);

    const user = await deleteAvatar.execute(usu_Id);

    return res.status(200).json(user);
  }

  async getAvatar(req: Request, res: Response) {
    const { usu_Id } = req.params;

    const getAvatar = container.resolve(GetAvatarService);

    const user = await getAvatar.execute(usu_Id);

    res.set('Content-Type', 'image/png');
    return res.status(200).send(user);
  }
}

export { AvatarController };
