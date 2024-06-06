import { BaseError } from './BaseError';

class EntityNotFoundError extends BaseError {
  constructor(message: string) {
    super('EntityNotFoundError', 404, true, message);
  }
}

export { EntityNotFoundError };
