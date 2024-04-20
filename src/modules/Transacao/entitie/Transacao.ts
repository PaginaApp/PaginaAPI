import { Decimal } from '@prisma/client/runtime/library';

class Transacao {
  trs_Id: string;

  trs_Data: Date;

  trs_Preco?: Decimal;

  trs_Prazo?: number;

  // tipo da transação
  trs_ttr_id: string;

  // status da transação
  trs_str_id: string;

  trs_usu_Leitor_id: string;

  trs_usu_Anunciante_id: string;

  trs_CriadoEm: Date;

  trs_AtualizadoEm: Date;
}

export { Transacao };
