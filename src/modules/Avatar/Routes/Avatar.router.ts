import { Router } from 'express';
import { AvatarController } from '../Controller/Avatar.controller';
import {
  createAvatarMiddleware,
  deleteAvatarMiddleware,
  getAvatarMiddleware,
} from './validator/Avatar.validator';

const avatarRouter = Router();

const avatarController = new AvatarController();

avatarRouter.post(
  '/:usu_Id/avatar',
  createAvatarMiddleware,
  avatarController.uploadAvatar,
);

avatarRouter.delete(
  '/:usu_Id/avatar',
  deleteAvatarMiddleware,
  avatarController.deleteAvatar,
);

avatarRouter.get(
  '/:usu_Id/avatar',
  getAvatarMiddleware,
  avatarController.getAvatar,
);

export { avatarRouter };
