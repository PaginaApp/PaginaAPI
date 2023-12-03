import { CelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';
import { BaseErrorHandler } from './BaseErrorHandler';
import { CelebrateErrorHandler } from './CelebrateErrorHandler';
import { BaseError } from '@shared/errors/BaseError';


async function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Promise<Response<any>> {
  
    console.log('globalErrorHandler');
    console.log(err instanceof BaseError);
    const baseError = await BaseErrorHandler(err, request, response);
        if (BaseError) return baseError;

    const celebrateError = await CelebrateErrorHandler(err, request, response);
        if (CelebrateError) return celebrateError;


    console.dir(err, { depth: 10 });
    return response.status(500).json({
        status: 'error',
        message: 'Server error',
    });

}

export { globalErrorHandler }