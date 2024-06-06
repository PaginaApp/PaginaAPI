import { User as IUser } from '@prisma/client';

class User implements IUser {
  usu_Id: string;

  usu_Nome: string;

  usu_Email: string;

  usu_Senha: string;

  usu_Telefone: string;

  usu_CPF: string;

  usu_Nasc: Date;

  usu_Privacidade: boolean;

  usu_Uso: boolean;

  usu_avatar: string | null;

  usu_pap_id: string;

  usu_Rua: string | null;

  usu_Numero: string | null;

  usu_Bairro: string | null;

  usu_CEP: string | null;

  usu_Complemento: string | null;

  usu_cid_id: string | null;

  usu_CriadoEm: Date;

  usu_AtualizadoEm: Date;

  usu_Ativo: boolean;
}

export { User };
