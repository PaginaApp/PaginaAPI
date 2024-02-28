import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export default function verifyAutorization(roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AuthorizationError('authorization not found');
    }

    const [, token] = authHeader.split(' ');

    if (roles.length) {
      if (!req.headers.authorization) {
        throw new AuthorizationError('authorization not found');
      }

      const tokenData = verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;

      if (!tokenData.role || !roles.includes(tokenData.role)) {
        throw new AuthorizationError('user not authorized');
      }
    }

    return next();
  };
}
