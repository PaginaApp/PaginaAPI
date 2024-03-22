import { BaseError } from './BaseError';

class NotImplementedError extends BaseError {
  constructor(message: string) {
    super('NotImplementedError', 500, true, message);
  }
}

export { NotImplementedError };
