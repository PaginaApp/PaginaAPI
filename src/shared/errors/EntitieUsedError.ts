import { BaseError } from './BaseError';

class EntityUsedError extends BaseError {
  constructor(message: string) {
    super('EntityUsedError', 409, true, message);
  }
}

export { EntityUsedError };
