import { BaseError } from './BaseError';

class EntityUsedError extends BaseError {
  constructor(message: string) {
    super('EntityAlreadyExistError', 403, true, message);
  }
}

export { EntityUsedError };
