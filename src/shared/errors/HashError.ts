import { BaseError } from './BaseError';

class HashError extends BaseError {
  constructor(message: string) {
    super('HashError', 500, true, message);
  }
}

export { HashError };
