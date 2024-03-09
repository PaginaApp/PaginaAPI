import { BaseError } from './BaseError';

class UnknownError extends BaseError {
  constructor(message: string) {
    super('UnknownError', 500, true, message);
  }
}

export { UnknownError };
