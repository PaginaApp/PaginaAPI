import { Decimal } from '@prisma/client/runtime/library';

class UpdateExemplarDTO {
  exe_usu_id: string;

  exe_Id: string;

  exe_Descricao: string;

  exe_Negociando: boolean;

  exe_liv_id: string;

  exe_epg_id: string;

  exe_ecp_id: string;

  exe_Prazo: number;

  exe_Preco: Decimal;
}

export { UpdateExemplarDTO };
