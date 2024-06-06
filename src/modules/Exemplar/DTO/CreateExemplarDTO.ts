import { Decimal } from '@prisma/client/runtime/library';

class CreateExemplarDTO {
  exe_Descricao: string;

  exe_Negociando: boolean;

  exe_liv_id: string;

  exe_usu_id: string;

  exe_epg_id: string;

  exe_ecp_id: string;

  exe_Preco?: Decimal;

  exe_Prazo?: number;
}

export { CreateExemplarDTO };
