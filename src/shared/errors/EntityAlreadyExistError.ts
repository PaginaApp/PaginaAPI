import { BaseError } from './BaseError';

class EntityAlreadyExistError extends BaseError {
  constructor(message: string) {
    super('EntityAlreadyExistError', 409, true, message);
  }
}

export { EntityAlreadyExistError };
