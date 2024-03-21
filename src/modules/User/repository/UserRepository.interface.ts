import { IEnderecoDTO } from '@modules/Endereco/DTO/IEnderecoDTO';
import { IRepository } from '@shared/interfaces/Repository';
import { IcreateUserDTO } from '../DTO/ICreateUserDTO';
import { IUpdateUserDTO } from '../DTO/IUpdateUserDTO';
import { User } from '../entity/User';

interface IUserRepository
  extends IRepository<User, IcreateUserDTO, IUpdateUserDTO> {
  endereco(data: IEnderecoDTO, usu_Id: string): Promise<IEnderecoDTO>;
}

export { IUserRepository };
