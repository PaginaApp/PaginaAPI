import { NextFunction, Request, Response } from 'express';
import { BaseErrorHandler } from './BaseErrorHandler';
import { CelebrateErrorHandler } from './CelebrateErrorHandler';

async function globalErrorHandler(
  err: Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line no-unused-vars
  _: NextFunction,
): Promise<Response<any>> {
  const baseError = await BaseErrorHandler(err, request, response);
  if (baseError) return baseError;

  const celebrateError = await CelebrateErrorHandler(err, request, response);
  if (celebrateError) return celebrateError;

  console.dir(err, { depth: 2 });
  return response.status(500).json({
    status: 'error',
    message: 'Server error',
  });
}

export { globalErrorHandler };
