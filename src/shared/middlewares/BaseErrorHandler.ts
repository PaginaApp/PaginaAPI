import { BaseError } from '@shared/errors/BaseError';
import { Request, Response, NextFunction } from 'express';

async function BaseErrorHandler(
    err: Error,
    request: Request,
    response: Response,
    ): Promise<Response<any> | any>  {

        console.log('BaseErrorHandler');
    if (err instanceof BaseError) {

        console.log('BaseErrorHandler');

        console.dir(err, { depth: 10 });
        return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        isOperational: err.isOperational,
        });
    }
    
}

export{BaseErrorHandler}