import { IRepository } from '@shared/interfaces/Repository';
import { IcreateUserDTO } from '../DTO/ICreateUserDTO';
import { IUpdateUserDTO } from '../DTO/IUpdateUserDTO';
import { User } from '../entity/User';

interface IUserRepository
  extends IRepository<User, IcreateUserDTO, IUpdateUserDTO> {}

export { IUserRepository };
