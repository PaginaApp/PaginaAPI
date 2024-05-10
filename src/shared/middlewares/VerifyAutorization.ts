import { IUserRepository } from '@modules/User/repository/UserRepository.interface';
import { IFireBase } from '@shared/container/providers/FireBase/model/IFireBase.interface';
import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

export default function verifyAutorization(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const fireBaseProvider: IFireBase = container.resolve('FireBaseProvider');

    const userRepository: IUserRepository = container.resolve('UserRepository');

    const authHeaderToken = req.headers.authorization;

    if (!authHeaderToken) {
      throw new AuthorizationError('authorization not found');
    }

    const [, token] = authHeaderToken.split(' ');

    const userAutenticationData = await fireBaseProvider.verifyIdToken(token);

    const user = await userRepository.findBy({
      usu_Id: userAutenticationData.uid,
    });

    if (!user) {
      throw new AuthorizationError('User not found');
    }

    if (!user.usu_Ativo) {
      throw new AuthorizationError('User not found');
    }

    if (!roles.includes(user.usu_pap_id)) {
      throw new AuthorizationError('User not authorized');
    }

    return next();
  };
}
