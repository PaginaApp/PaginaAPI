import bcrypt from 'bcrypt';
import { IHashProvider } from '../model/IHashProvider';

class HashProvider implements IHashProvider {
  async generateHash(payload: string) {
    return bcrypt.hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string) {
    return bcrypt.compare(payload, hashed);
  }
}

export { HashProvider };
