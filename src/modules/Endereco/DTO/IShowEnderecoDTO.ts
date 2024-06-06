class IShowEnderecoDTO {
  usu_Rua: string;

  usu_Numero: string;

  usu_Bairro: string;

  usu_CEP: string;

  usu_Complemento?: string | null;

  usu_cid: {
    cid_Nome: string;
    cid_Id: string;
    cid_est: {
      est_Nome: string;
      est_Id: string;
    };
  };
}

export { IShowEnderecoDTO };
