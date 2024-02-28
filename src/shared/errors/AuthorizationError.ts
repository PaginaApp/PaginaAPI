// erro de autorização extendendo a classe BaseError
import { BaseError } from './BaseError';

class AuthorizationError extends BaseError {
  constructor(message: string) {
    super('AuthorizationError', 401, true, message);
  }
}

export { AuthorizationError };
