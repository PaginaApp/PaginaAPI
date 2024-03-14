interface ICreateSessionDTO {
  deviceToken?: string;
  usu_Email: string;
  usu_Senha: string;
  rememberMe?: boolean;
}

export { ICreateSessionDTO };
