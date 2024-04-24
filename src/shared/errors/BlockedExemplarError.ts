import { BaseError } from './BaseError';

class BlockedExemplarError extends BaseError {
  constructor(msg: string) {
    super('Exemplar bloqueado', 409, true, msg);
  }
}

export { BlockedExemplarError };
