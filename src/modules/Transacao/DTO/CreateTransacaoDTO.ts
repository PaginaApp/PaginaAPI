import { Decimal } from '@prisma/client/runtime/library';

class CreateTransacaoDTO {
  trs_Data: Date;

  trs_Preco?: Decimal;

  trs_Prazo?: number;

  // tipo da transação
  trs_ttr_id: string;

  // status da transação
  trs_str_id: string;

  trs_usu_Leitor_id: string;

  trs_usu_Anunciante_id: string;

  exe_Principal_id: string;

  exe_Secundario_id?: string;
}

export { CreateTransacaoDTO };
