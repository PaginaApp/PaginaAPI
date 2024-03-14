import { IShowUserDTO } from '@modules/User/DTO/IShowUserDTO';
import { User } from '@modules/User/entity/User';

function UserMapper(user: User): IShowUserDTO {
  return {
    usu_Id: user.usu_Id,
    usu_Nome: user.usu_Nome,
    usu_Email: user.usu_Email,
    usu_Telefone: user.usu_Telefone,
    usu_Titulo: 'titulo',
    usu_Nota: 5,
  };
}

export { UserMapper };
