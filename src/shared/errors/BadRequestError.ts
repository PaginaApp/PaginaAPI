// erro de autorização extendendo a classe BaseError
import { BaseError } from './BaseError';

class BadRequestError extends BaseError {
  constructor(message: string) {
    super('BadRequestError', 400, true, message);
  }
}

export { BadRequestError };
