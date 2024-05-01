import { Decimal } from '@prisma/client/runtime/library';

class UpdateTransacaoDTO {
  trs_Id: string;

  trs_Data?: Date;

  trs_Preco?: Decimal;

  trs_Prazo?: number;

  // status
  trs_str_id?: string;
}

export { UpdateTransacaoDTO };
