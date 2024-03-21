class ICreateEnderecoDTO {
  usu_Id: string;

  endereco: {
    usu_Rua: string;
    usu_Numero: string;
    usu_Bairro: string;
    usu_CEP: string;
    usu_Complemento?: string | null;
    usu_cid_nome: string;
    usu_est_UF: string;
  };
}

export { ICreateEnderecoDTO };
